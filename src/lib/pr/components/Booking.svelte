<script lang="ts">
  // Figma PR booking bar (docs/figma-pr-system.md, "Booking bar"): Four Seasons' bar in Rosewood's dress. The green
  // reserve button unrolls it under the header; one calendar takes both dates — the first click is the check-in, the
  // second the check-out — and "CHECK RATES" opens Orbe's results for the dates and guests in a new tab.
  import { tick, untrack } from 'svelte';
  import { bookingFor } from '#lib/pr/site.ts';
  import { tr, type Locale } from '#lib/pr/i18n.ts';

  type Props = { open?: boolean; locale?: Locale; onclose?: () => void };
  let { open = $bindable(false), locale = 'en', onclose }: Props = $props();

  // Calendar days are local dates at noon, so a change of daylight saving time never moves them.
  const day = (y: number, m: number, d: number) => new Date(y, m, d, 12);
  const addDays = (d: Date, n: number) => day(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const addMonths = (d: Date, n: number) => day(d.getFullYear(), d.getMonth() + n, 1);
  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const nightsBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86400000);

  const lang = $derived(locale === 'es' ? 'es-419' : 'en-US');
  // Weeks start on Sunday in the United States and on Monday in Latin America.
  const weekStart = $derived(locale === 'es' ? 1 : 0);
  const shortDate = $derived(new Intl.DateTimeFormat(lang, { month: 'short', day: 'numeric', year: 'numeric' }));
  const fullDate = $derived(new Intl.DateTimeFormat(lang, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
  const monthName = $derived(new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }));
  const weekdays = $derived(Array.from({ length: 7 }, (_, i) => day(2023, 0, 1 + ((i + weekStart) % 7)))); // 1 Jan 2023 was a Sunday

  let today = $state(day(2026, 0, 1));
  let checkIn = $state<Date | null>(null);
  let checkOut = $state<Date | null>(null);
  let picking = $state<'in' | 'out' | null>(null);
  let hovered = $state<Date | null>(null);
  let shown = $state(day(2026, 0, 1));
  let focused = $state(day(2026, 0, 1));
  let wide = $state(true);
  let note = $state('');
  let calendar: HTMLElement | undefined = $state();
  let inField: HTMLButtonElement | undefined = $state();
  let outField: HTMLButtonElement | undefined = $state();
  let guests: HTMLSelectElement | undefined = $state();

  const months = $derived(wide ? [shown, addMonths(shown, 1)] : [shown]);
  const lastShown = $derived(months[months.length - 1]);
  const limit = $derived(addMonths(today, 18));
  const nights = $derived(checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0);

  // On opening: tonight and two nights, unless the guest has chosen.
  $effect(() => {
    const isOpen = open;
    untrack(() => {
      if (!isOpen) { picking = null; hovered = null; return; }
      const now = new Date();
      today = day(now.getFullYear(), now.getMonth(), now.getDate());
      if (!checkIn || checkIn < today) { checkIn = today; checkOut = addDays(today, 2); }
    });
  });
  $effect(() => {
    const query = matchMedia('(min-width: 900px)');
    const sync = () => (wide = query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  });

  function weeks(first: Date) {
    const offset = (first.getDay() - weekStart + 7) % 7;
    const length = day(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [...Array(offset).fill(null), ...Array.from({ length }, (_, i) => day(first.getFullYear(), first.getMonth(), i + 1))];
    while (cells.length % 7) cells.push(null);
    return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  }
  const title = (d: Date) => { const text = monthName.format(d); return text.charAt(0).toUpperCase() + text.slice(1); };
  const disabled = (d: Date) => d < today || d >= limit;
  const inRange = (d: Date) => {
    const end = checkOut ?? (picking === 'out' && hovered && checkIn && hovered > checkIn ? hovered : null);
    return !!checkIn && !!end && d > checkIn && d < end;
  };
  function label(d: Date) {
    const parts = [fullDate.format(d)];
    if (checkIn && iso(d) === iso(checkIn)) parts.push(tr(locale, 'check-in date'));
    if (checkOut && iso(d) === iso(checkOut)) parts.push(tr(locale, 'check-out date'));
    return parts.join(', ');
  }

  async function focusDay(d: Date) {
    if (d < today) d = today;
    if (d >= limit) d = addDays(limit, -1);
    focused = d;
    const first = day(d.getFullYear(), d.getMonth(), 1);
    if (first < shown) shown = first;
    else if (first > lastShown) shown = addMonths(first, -(months.length - 1));
    await tick();
    calendar?.querySelector<HTMLButtonElement>(`[data-date="${iso(d)}"]`)?.focus();
  }
  async function openCalendar(which: 'in' | 'out') {
    picking = which === 'out' && !checkIn ? 'in' : which;
    note = '';
    const start = picking === 'out' && checkOut ? checkOut : checkIn ?? today;
    shown = day(start.getFullYear(), start.getMonth(), 1);
    if (picking === 'out' && checkIn && !checkOut) shown = day(checkIn.getFullYear(), checkIn.getMonth(), 1);
    await focusDay(start);
  }
  async function closeCalendar(returnTo?: HTMLElement) {
    picking = null; hovered = null;
    await tick();
    returnTo?.focus();
  }
  async function choose(d: Date) {
    if (disabled(d)) return;
    if (picking === 'in' || !checkIn || d <= checkIn) {
      // First click: the check-in. The calendar stays open for the check-out.
      checkIn = d; checkOut = null; picking = 'out';
      await focusDay(addDays(d, 1));
    } else {
      // Second click: the check-out. The calendar closes and the guests come next.
      checkOut = d; note = '';
      await closeCalendar(guests);
    }
  }
  function keydown(event: KeyboardEvent, d: Date) {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(d, -1), ArrowRight: () => addDays(d, 1), ArrowUp: () => addDays(d, -7), ArrowDown: () => addDays(d, 7),
      PageUp: () => day(d.getFullYear(), d.getMonth() - 1, Math.min(d.getDate(), 28)), PageDown: () => day(d.getFullYear(), d.getMonth() + 1, Math.min(d.getDate(), 28)),
      Home: () => addDays(d, -((d.getDay() - weekStart + 7) % 7)), End: () => addDays(d, 6 - ((d.getDay() - weekStart + 7) % 7))
    };
    if (moves[event.key]) { event.preventDefault(); focusDay(moves[event.key]()); return; }
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeCalendar(picking === 'out' ? outField : inField); }
  }
  function submit(event: SubmitEvent) {
    event.preventDefault();
    if (!checkIn) { openCalendar('in'); return; }
    if (!checkOut) { note = tr(locale, 'Choose a check-out date.'); openCalendar('out'); return; }
    note = '';
    window.open(bookingFor(iso(checkIn), iso(checkOut), Number(guests?.value || 2), locale), '_blank', 'noopener');
  }
  function windowKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !open || document.querySelector('dialog[open]')) return;
    if (picking) { closeCalendar(picking === 'out' ? outField : inField); return; }
    open = false;
    onclose?.();
  }
  function pointerdown(event: PointerEvent) {
    const target = event.target instanceof Element ? event.target : null;
    if (picking && target && !calendar?.contains(target) && !target.closest('.pr-date')) closeCalendar();
  }
</script>

<svelte:window onkeydown={windowKeydown} />
<svelte:document onpointerdown={pointerdown} />

<div class="pr-booking-panel" id="pr-booking" data-open={open || undefined} inert={!open}>
  <div class="pr-booking-clip">
    <form class="pr-booking" data-booking onsubmit={submit}>
      <div class="pr-field">
        <span class="pr-field-label" id="pr-checkin-label">{tr(locale, 'Check in')}</span>
        <button type="button" class="pr-date" bind:this={inField} aria-labelledby="pr-checkin-label pr-checkin-value" aria-haspopup="dialog" aria-expanded={picking === 'in'} aria-controls="pr-calendar" data-active={picking === 'in' || undefined} onclick={() => openCalendar('in')}>
          <span id="pr-checkin-value">{checkIn ? shortDate.format(checkIn) : tr(locale, 'Add date')}</span>
        </button>
      </div>
      <div class="pr-field">
        <span class="pr-field-label" id="pr-checkout-label">{tr(locale, 'Check out')}</span>
        <button type="button" class="pr-date" bind:this={outField} aria-labelledby="pr-checkout-label pr-checkout-value" aria-haspopup="dialog" aria-expanded={picking === 'out'} aria-controls="pr-calendar" data-active={picking === 'out' || undefined} onclick={() => openCalendar('out')}>
          <span id="pr-checkout-value">{checkOut ? shortDate.format(checkOut) : tr(locale, 'Add date')}</span>
        </button>
      </div>
      <label class="pr-field"><span class="pr-field-label">{tr(locale, 'Guests')}</span>
        <select name="adults" bind:this={guests}>
          <option value="1">{tr(locale, '1 Adult')}</option>
          <option value="2" selected>{tr(locale, '2 Adults')}</option>
          <option value="3">{tr(locale, '3 Adults')}</option>
          <option value="4">{tr(locale, '4 Adults')}</option>
        </select>
      </label>
      <input type="hidden" name="checkin" value={checkIn ? iso(checkIn) : ''} />
      <input type="hidden" name="checkout" value={checkOut ? iso(checkOut) : ''} />
      <button type="submit" class="pr-button">{tr(locale, 'CHECK RATES')}</button>
      <p class="pr-booking-note" aria-live="polite">{note}</p>
    </form>
  </div>
  {#if picking}
    <div class="pr-calendar" id="pr-calendar" role="dialog" aria-label={tr(locale, 'Choose your dates')} bind:this={calendar}>
      <div class="pr-calendar-months">
        {#each months as first, m (iso(first))}
          <div class="pr-month">
            <div class="pr-month-head">
              {#if m === 0}
                <button type="button" class="pr-month-step" aria-label={tr(locale, 'Previous month')} disabled={first <= day(today.getFullYear(), today.getMonth(), 1)} onclick={() => (shown = addMonths(shown, -1))}>
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
                </button>
              {/if}
              <h3 class="pr-month-title">{title(first)}</h3>
              {#if m === months.length - 1}
                <button type="button" class="pr-month-step pr-month-next" aria-label={tr(locale, 'Next month')} disabled={addMonths(first, 1) >= limit} onclick={() => (shown = addMonths(shown, 1))}>
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
                </button>
              {/if}
            </div>
            <table class="pr-days" role="grid" aria-label={title(first)}>
              <thead>
                <tr>
                  {#each weekdays as w (w.getDay())}
                    <th scope="col" abbr={new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(w)}>{new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(w).replace('.', '')}</th>
                  {/each}
                </tr>
              </thead>
              <tbody>
                {#each weeks(first) as week, w (w)}
                  <tr>
                    {#each week as d, i (i)}
                      <td>
                        {#if d}
                          <button
                            type="button"
                            class="pr-day"
                            data-date={iso(d)}
                            tabindex={iso(d) === iso(focused) ? 0 : -1}
                            disabled={disabled(d)}
                            aria-label={label(d)}
                            aria-pressed={(checkIn && iso(d) === iso(checkIn)) || (checkOut && iso(d) === iso(checkOut)) ? true : false}
                            data-start={(checkIn && iso(d) === iso(checkIn)) || undefined}
                            data-end={(checkOut && iso(d) === iso(checkOut)) || undefined}
                            data-range={inRange(d) || undefined}
                            data-today={iso(d) === iso(today) || undefined}
                            onclick={() => choose(d)}
                            onkeydown={event => keydown(event, d)}
                            onpointerenter={() => (hovered = d)}
                            onfocus={() => (focused = d)}
                          >{d.getDate()}</button>
                        {/if}
                      </td>
                    {/each}
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/each}
      </div>
      <p class="pr-calendar-foot" aria-live="polite">
        {#if picking === 'out' && !checkOut}{tr(locale, 'Choose a check-out date.')}{:else if nights}{nights} {nights === 1 ? tr(locale, 'night') : tr(locale, 'nights')}{/if}
      </p>
    </div>
  {/if}
</div>
