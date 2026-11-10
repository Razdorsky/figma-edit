<script lang="ts">
  // Figma Enhanced booking bar (owner, 2026-11-10; docs/figma-enhanced-booking.md): the designer's CHECK AVAILABILITY
  // unrolls it under the floating header, in the dark brown glass of the mega panels. One calendar takes both dates —
  // the first click is the check-in, the second the check-out — and "CHECK RATES" opens Orbe's results in a new tab.
  // The same mechanics as Figma PR's bar (src/lib/pr/components/Booking.svelte), in this edition's own files and dress.
  import { tick, untrack } from 'svelte';
  import { bookingResults } from '#lib/enhanced/site.ts';
  import { tr, type Locale } from '#lib/enhanced/i18n.ts';

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
    const query = matchMedia('(min-width: 761px)'); // two months from tablets up, where the header has the button
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
    window.open(bookingResults(iso(checkIn), iso(checkOut), Number(guests?.value || 2), locale), '_blank', 'noopener');
  }
  function windowKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !open || document.querySelector('dialog[open]')) return;
    if (picking) { closeCalendar(picking === 'out' ? outField : inField); return; }
    open = false;
    onclose?.();
  }
  function pointerdown(event: PointerEvent) {
    const target = event.target instanceof Element ? event.target : null;
    if (picking && target && !calendar?.contains(target) && !target.closest('.booking-date')) closeCalendar();
  }
</script>

<svelte:window onkeydown={windowKeydown} />
<svelte:document onpointerdown={pointerdown} />

<div class="booking-panel" id="booking-panel" data-open={open || undefined} inert={!open}>
  <div class="booking-clip">
    <form class="booking-bar" data-booking onsubmit={submit}>
      <div class="booking-field">
        <span class="booking-label" id="booking-checkin-label">{tr(locale, 'Check in')}</span>
        <button type="button" class="booking-date" bind:this={inField} aria-labelledby="booking-checkin-label booking-checkin-value" aria-haspopup="dialog" aria-expanded={picking === 'in'} aria-controls="booking-calendar" data-active={picking === 'in' || undefined} onclick={() => openCalendar('in')}>
          <span id="booking-checkin-value">{checkIn ? shortDate.format(checkIn) : tr(locale, 'Add date')}</span>
        </button>
      </div>
      <div class="booking-field">
        <span class="booking-label" id="booking-checkout-label">{tr(locale, 'Check out')}</span>
        <button type="button" class="booking-date" bind:this={outField} aria-labelledby="booking-checkout-label booking-checkout-value" aria-haspopup="dialog" aria-expanded={picking === 'out'} aria-controls="booking-calendar" data-active={picking === 'out' || undefined} onclick={() => openCalendar('out')}>
          <span id="booking-checkout-value">{checkOut ? shortDate.format(checkOut) : tr(locale, 'Add date')}</span>
        </button>
      </div>
      <label class="booking-field"><span class="booking-label">{tr(locale, 'Guests')}</span>
        <select name="adults" bind:this={guests}>
          <option value="1">{tr(locale, '1 Adult')}</option>
          <option value="2" selected>{tr(locale, '2 Adults')}</option>
          <option value="3">{tr(locale, '3 Adults')}</option>
          <option value="4">{tr(locale, '4 Adults')}</option>
        </select>
      </label>
      <input type="hidden" name="checkin" value={checkIn ? iso(checkIn) : ''} />
      <input type="hidden" name="checkout" value={checkOut ? iso(checkOut) : ''} />
      <button type="submit" class="booking-submit">{tr(locale, 'CHECK RATES')}</button>
      <p class="booking-note" aria-live="polite">{note}</p>
    </form>
  </div>
  {#if picking}
    <div class="booking-calendar" id="booking-calendar" role="dialog" aria-label={tr(locale, 'Choose your dates')} bind:this={calendar} data-lenis-prevent>
      <div class="booking-months">
        {#each months as first, m (iso(first))}
          <div class="booking-month">
            <div class="booking-month-head">
              {#if m === 0}
                <button type="button" class="booking-month-step" aria-label={tr(locale, 'Previous month')} disabled={first <= day(today.getFullYear(), today.getMonth(), 1)} onclick={() => (shown = addMonths(shown, -1))}>
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
                </button>
              {/if}
              <h3 class="booking-month-title">{title(first)}</h3>
              {#if m === months.length - 1}
                <button type="button" class="booking-month-step booking-month-next" aria-label={tr(locale, 'Next month')} disabled={addMonths(first, 1) >= limit} onclick={() => (shown = addMonths(shown, 1))}>
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
                </button>
              {/if}
            </div>
            <table class="booking-days" role="grid" aria-label={title(first)}>
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
                            class="booking-day"
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
      <p class="booking-foot" aria-live="polite">
        {#if picking === 'out' && !checkOut}{tr(locale, 'Choose a check-out date.')}{:else if nights}{nights} {nights === 1 ? tr(locale, 'night') : tr(locale, 'nights')}{/if}
      </p>
    </div>
  {/if}
</div>
