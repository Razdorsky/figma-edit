// The story engine of the Interactive Prototype edition: the one timeline that scrolling moves, the gate, the
// sound, the rail, the lists chosen with the cursor, and the layers of booking and inner pages.
// docs/interactive-prototype.md describes every mechanic.
//
// The code is the prototype's own (Vessyl-concept, received 2026-11-10) and is kept close to its source, so that a
// later version of the prototype can be compared with it line by line. What was changed for the site is listed in
// the document under "What the port changed".

/**
 * Starts the story on the page that is already in the document.
 * @param {{photo:(name:string)=>string, pages:Record<string,import('./content/pages.ts').InnerPage>}} options
 *   photo() gives the address of a photograph; pages are the inner pages by the key their links carry in data-p
 * @returns {()=>void} stops the loops, the listeners and the sound
 */
export function installStory({photo, pages}) {
  const controller=new AbortController(), {signal}=controller;
  let alive=true, frameId=0, breatheId=0;

  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const lerp=(a,b,k)=>a+(b-a)*k;
  const ease=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let vh=innerHeight, T=0, Tt=0;

  /* the timeline: the scenes' windows OVERLAP, so no border between them shows */
  const BEATS=[
    {el:'L1',  a:0.000, b:0.088, chap:'01 · Threshold',          rail:-1},
    {el:'L2',  a:0.070, b:0.152, chap:'02 · The place',          rail:-1},
    {el:'L3',  a:0.135, b:0.232, chap:'03 · The Dome',           rail:-1},
    {el:'L4',  a:0.215, b:0.342, chap:'04 · Stay',               rail:0},
    {el:'L5',  a:0.322, b:0.468, chap:'05 · Experiences',        rail:1},
    {el:'L6',  a:0.448, b:0.552, chap:'06 · Sound and movement', rail:2, sub:'sound'},
    {el:'L11', a:0.534, b:0.628, chap:'07 · The studio',         rail:2, sub:'studio'},
    {el:'L7',  a:0.610, b:0.702, chap:'08 · The table',          rail:2, sub:'table'},
    {el:'L8',  a:0.684, b:0.778, chap:'09 · The whole property', rail:3},
    {el:'L9',  a:0.760, b:0.850, chap:'10 · Plan your visit',    rail:4, sub:'getting'},
    {el:'L10', a:0.832, b:1.000, chap:'11 · What you can book',  rail:-1}
  ];
  BEATS.forEach(B=>{ B.node=document.getElementById(B.el);
    B.bg=B.node.querySelector('.lbg'); B.lc=B.node.querySelector('.lc'); });

  const story=document.getElementById('story');
  const railItems=[...document.querySelectorAll('.rail-i')];
  const idxLis=[...document.querySelectorAll('#units li')];
  const idxWrap=document.getElementById('units');
  const s4=[...document.querySelectorAll('#L4 .swap')];
  const s5=[...document.querySelectorAll('#L5 .swap')];
  const expLis=[...document.querySelectorAll('#exps li')];
  const expWrap=document.getElementById('exps');
  const ticks=[...document.querySelectorAll('#ticks i')];
  const chap=document.getElementById('chap');
  const thread=document.getElementById('thread');

  function measure(){ vh=innerHeight; story.style.height=(20*vh)+'px'; }
  addEventListener('resize',measure,{signal});

  let tmx=0,tmy=0,mx=0,my=0,pointerY=null,pointerX=null,pointerSeen=false,overRail=false;
  addEventListener('mousemove',e=>{ tmx=e.clientX/innerWidth-.5; tmy=e.clientY/innerHeight-.5;
    pointerY=e.clientY; pointerX=e.clientX; pointerSeen=true;
    /* the cursor is over the menu: the lists in the scene freeze and do not argue with the rail */
    overRail = innerWidth>860 && e.clientX < 310; },{signal});

  /* the introduction, sentence by sentence */
  const introTxt="The Vessyl is a hotel in Arenal, Costa Rica, built around a dome made for sound. Fourteen units sit apart from one another across the property, so getting from your bed to dinner is a walk through forest rather than a hallway.\n\nThere is a river you can swim in, horses, a kitchen that changes its menu every day, and a founder who lives here. Some people come for three nights and never leave the land. Some drive up for one session in the Dome and go back to their hotel in town. Both are the right way to do this.";
  const introEl=document.getElementById('introtxt');
  introTxt.split('\n\n').forEach((para,pi)=>{
    const p=document.createElement('span'); p.style.display='block';
    if(pi) p.style.marginTop='22px';
    para.split(/(?<=\.) /).forEach(s=>{ const l=document.createElement('span'); l.className='line';
      const i=document.createElement('span'); i.textContent=s+' '; l.appendChild(i); p.appendChild(l); });
    introEl.appendChild(p);
  });
  const introLines=[...introEl.querySelectorAll('.line')];
  let counted=false;
  function runCount(){ document.querySelectorAll('[data-count]').forEach(el=>{
    const to=+el.dataset.count; let t0=null;
    const step=ts=>{ if(!t0)t0=ts; const k=clamp((ts-t0)/1100,0,1);
      el.textContent=Math.round(to*(1-Math.pow(1-k,3))); if(k<1)requestAnimationFrame(step); };
    requestAnimationFrame(step); }); }

  function swapTo(set,active,dir){
    set.forEach((el,i)=>{ el.style.zIndex=i<=active?(i===active?3:2):1;
      el.style.clipPath=i<=active?'inset(0 0 0 0)'
        :(dir==='x'?'inset(0 0 0 100%)':'inset(100% 0 0 0)'); }); }
  swapTo(s4,0,'x'); swapTo(s5,0,'y');
  let a4=0,a5=0,railCur=-1,expCur=-1;

  function setRail(cur,exp){
    if(cur!==railCur){ railCur=cur;
      railItems.forEach((r,i)=>r.classList.toggle('cur', i===cur)); }
    if(exp!==expCur){ expCur=exp;
      railItems.forEach((r,i)=>r.classList.toggle('exp', i===exp)); }
  }
  function hitSub(key){
    document.querySelectorAll('.rail-sub button').forEach(b=>
      b.classList.toggle('hit', !!key && b.dataset.p===key));
  }

  /* one mechanism for both lists: the cursor chooses the active item */
  function hover(wrap, lis, a, reach, base, grow){
    if(overRail && wrap._best!=null) return wrap._best;   // frozen
    const r0=wrap.getBoundingClientRect();
    const probe = pointerSeen ? pointerY : r0.top + r0.height*clamp(a*1.3,0,1);
    let best=0,bd=1e9; const ds=[];
    lis.forEach((li,j)=>{ const r=li.getBoundingClientRect(), c=r.top+r.height/2, d=c-probe;
      ds.push(d); if(Math.abs(d)<bd){ bd=Math.abs(d); best=j; } });
    lis.forEach((li,j)=>{
      const near=1-clamp(Math.abs(ds[j])/reach,0,1);
      li.classList.toggle('on', j===best);
      li.style.opacity=(0.24+near*0.76).toFixed(3);
      li.style.transform=`translate3d(${(near*20).toFixed(1)}px,${(ds[j]*0.05).toFixed(1)}px,0)`;
      li.querySelector('.t').style.fontSize=(base+near*grow).toFixed(1)+'px';
    });
    wrap._best=best;
    return best;
  }
  const railEl=document.getElementById('rail'), footEl=document.querySelector('footer');
  function railAboveFooter(){
    if(!railEl||!footEl) return;
    const fTop=footEl.getBoundingClientRect().top;
    const h=railEl.offsetHeight;
    /* where the rail would stand without the lift */
    const natBottom=vh/2+h/2;
    const need=natBottom+28-fTop;               /* 28: the gap above the footer */
    /* it cannot rise further than this: it would run into the logo above */
    const maxLift=Math.max(0, vh/2-h/2-74);
    const lift=Math.max(0, Math.min(need, maxLift));
    railEl.style.setProperty('--lift', lift.toFixed(1)+'px');
    /* when the footer has taken the screen and no room is left, the rail leaves instead of hanging over it */
    const over=need-maxLift;
    const o=over<=0 ? 1 : Math.max(0, 1-over/150);
    railEl.style.opacity=o.toFixed(2);
    railEl.style.pointerEvents=o<0.08?'none':'auto';
  }

  function frame(){
    if(!alive) return;
    /* a window without height (a hidden pane, a tab not laid out yet) makes this 0/0. The prototype kept the NaN
       and its scene stayed black until a reload; here the story waits at its start instead */
    const run=story.offsetHeight-vh;
    Tt = run>0 ? clamp((scrollY-story.offsetTop)/run,0,1) : 0;
    railAboveFooter();
    T = reduce ? Tt : lerp(T,Tt,.13);
    mx=lerp(mx,tmx,.07); my=lerp(my,tmy,.07);

    let top=null, topV=0, railWant=-1, expWant=-1, subKey=null;

    BEATS.forEach((B,i)=>{
      const span=B.b-B.a, a=(T-B.a)/span;
      /* visibility: a share W of the window to come in and the same to leave. The windows overlap,
         so at a joint both scenes are on screen at once */
      let v=0;
      if(a>-0.25 && a<1.25){
        /* a square root, so that the brightness at a joint adds up to about 1
           and a dark picture does not mix with a light one into mud */
        const W=.16;
        /* the first scene does not come in: at the very top of the page it is already in place */
        v = a<0 ? 0 : (i===0 && a<W) ? 1
          : a<W ? Math.sqrt(ease(a/W)) : a>1 ? 0 : a>1-W ? Math.sqrt(ease((1-a)/W)) : 1;
      }
      B.node.style.opacity=v.toFixed(3);
      B.node.classList.toggle('live', v>.5);
      if(v<=0.004){ B.node.style.visibility='hidden'; return; }
      B.node.style.visibility='';
      if(v>topV){ topV=v; top=i; }

      const q=clamp(a,0,1);
      /* background: it comes in a little larger and leaves larger still, a movement through the picture */
      const sc = 1.14 - 0.14*clamp(a+.18,0,1) + Math.max(0,a-.78)*0.5;
      B.bg.style.transform=
        `scale(${sc.toFixed(4)}) translate3d(${(mx*-34).toFixed(1)}px,${(my*-22 - (q-.5)*110).toFixed(1)}px,0)`;
      /* the content moves faster than the background and leaves earlier */
      const midY = B.lc.classList.contains('mid') ? '-50%' : '0px';
      B.lc.style.transform=`translate3d(${(mx*9).toFixed(1)}px,calc(${midY} + ${((.5-a)*150).toFixed(1)}px),0)`;
      B.lc.style.opacity=((i===0&&a<.17)?1:a<.17?ease(clamp((a-.03)/.14,0,1)):a>.74?ease(clamp((1-a)/.26,0,1)):1).toFixed(3);

      if(B.el==='L2'){
        introLines.forEach((l,j)=>l.classList.toggle('in', a>.04+j*.05));
        if(a>.3&&!counted){ counted=true; runCount(); }
      }
      if(B.el==='L4' && v>.5){
        const k=hover(idxWrap, idxLis, a, 230, 36, 14);
        if(k!==a4){ a4=k; swapTo(s4,k,'x'); }
        subKey=['villas','treehouse','tents'][k];
      }
      if(B.el==='L5' && v>.5){
        const k=hover(expWrap, expLis, a, 180, 28, 10);
        if(k!==a5){ a5=k; swapTo(s5,k,'y'); }
        subKey=['day','freq','dark','two','horses','presents'][k];
      }
      if(v>.5 && B.rail>=0){ railWant=B.rail; expWant=B.rail; if(B.sub) subKey=B.sub; }
    });

    if(top!==null){
      ticks.forEach((t,j)=>t.classList.toggle('on', j===top));
      const want=BEATS[top].chap;
      if(chap.textContent!==want && !chap.dataset.busy){
        chap.dataset.busy='1';
        chap.style.transform='translateY(-120%)'; chap.style.opacity='0';
        setTimeout(()=>{ chap.textContent=want; chap.style.transition='none';
          chap.style.transform='translateY(120%)';
          requestAnimationFrame(()=>{ chap.style.transition=''; chap.style.transform='none';
            chap.style.opacity='1'; delete chap.dataset.busy; }); },240);
      }
    }
    setRail(railWant,expWant); hitSub(subKey);
    /* the thread on the left is the only thing that runs through the whole story without a break */
    thread.style.height=(T*vh*1.1).toFixed(0)+'px';
    thread.style.left=(54+Math.sin(T*6.0)*4).toFixed(1)+'px';
    thread.style.opacity=(0.25+0.6*Math.sin(Math.PI*clamp(T,0,1))).toFixed(2);

    frameId=requestAnimationFrame(frame);
  }

  /* ══ gate: a hold or a scroll ══════════════════════════════ */
  const gate=document.getElementById('gate'), garc=document.getElementById('garc');
  const gdot=document.getElementById('gdot'), gring=document.getElementById('gring');
  const halo=document.getElementById('halo'), flash=document.getElementById('flash');
  const L1=document.getElementById('L1');
  let holding=false, hv=0, pulse=0, gateOpen=true, ctx=null, gain=null, soundOn=false;
  let holdStart=0;

  /* Sound in three layers, all in one key: F major.
     The first version sounded uneasy for three reasons, and all three are gone:
       · the bass crept chromatically (Bb-A-B-G): a semitone in the low register is a device of horror films.
         The chords are now diatonic, with a common tone between neighbours and steps no larger than a tone
       · a detune of 0.4% gave beating, that "trembling". The second voice is now a pure fifth, with no beating
       · the base lay at 49 Hz. The lowest note is now 87 Hz, and what lies below is cut by a filter
     Only the SOUND button touches the volume. */
  let oscs=[], chordI=0, driftTimer=null, noteTimer=null, wet=null, lp=null, hp=null;

  /* F major. The voices are led smoothly: F holds in three chords of the four */
  const CHORDS=[
    [ 87.31, 130.81, 174.61],   /* F  ·  F2  C3  F3 */
    [ 87.31, 110.00, 146.83],   /* Dm ·  F2  A2  D3 */
    [ 87.31, 116.54, 174.61],   /* Bb ·  F2  Bb2 F3 */
    [ 98.00, 130.81, 164.81]    /* C  ·  G2  C3  E3 */
  ];
  /* the major pentatonic from F: not one semitone, nothing to clash with */
  const PENTA=[174.61, 196.00, 220.00, 261.63, 293.66, 349.23];

  function buildAudio(){
    ctx=new (window.AudioContext||window.webkitAudioContext)();
    gain=ctx.createGain(); gain.gain.value=0;
    lp=ctx.createBiquadFilter(); lp.type='lowpass';  lp.frequency.value=1100; lp.Q.value=0.4;
    hp=ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=62;   hp.Q.value=0.3;
    hp.connect(lp); lp.connect(gain); gain.connect(ctx.destination);
    wet=ctx.createGain(); wet.gain.value=0.9; wet.connect(hp);

    CHORDS[0].forEach((f,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='sine'; o.frequency.value=f; g.gain.value=[0.55,.4,.26][i];
      o.connect(g); g.connect(hp); o.start(); oscs.push(o);
    });
    const lfo=ctx.createOscillator(), lg=ctx.createGain();
    lfo.type='sine'; lfo.frequency.value=0.045; lg.gain.value=0.022;
    lfo.connect(lg); lg.connect(gain.gain); lfo.start();

    drift(); setTimeout(note, 2200);
  }
  function drift(){
    if(!ctx||!alive) return;
    chordI=(chordI+1)%CHORDS.length;
    const t=ctx.currentTime, set=CHORDS[chordI];
    oscs.forEach((o,i)=>{
      o.frequency.cancelScheduledValues(t);
      o.frequency.setValueAtTime(o.frequency.value,t);
      o.frequency.linearRampToValueAtTime(set[i], t+9);
    });
    clearTimeout(driftTimer); driftTimer=setTimeout(drift, 14000);
  }
  let lastNote=-1;
  function note(){
    clearTimeout(noteTimer); if(!alive) return;
    if(!ctx||!soundOn){ noteTimer=setTimeout(note, 3000); return; }
    /* the next note is a neighbouring degree, with no leaps across the pentatonic */
    let k;
    if(lastNote<0) k=2;
    else { const step=[-1,-1,1,1,2,-2][Math.floor(Math.random()*6)];
           k=Math.min(PENTA.length-1, Math.max(0, lastNote+step)); }
    if(k===lastNote) k=(k+1)%PENTA.length;
    lastNote=k;
    const f=PENTA[k], t=ctx.currentTime;
    const o=ctx.createOscillator(), g=ctx.createGain();
    const o2=ctx.createOscillator(), g2=ctx.createGain();
    o.type='sine';  o.frequency.value=f;
    o2.type='sine'; o2.frequency.value=f*1.5;        /* a pure fifth: warm, no beating */
    g.gain.setValueAtTime(0.0001,t);
    g.gain.linearRampToValueAtTime(0.07, t+2.6);     /* a soft attack, nothing clicks */
    g.gain.exponentialRampToValueAtTime(0.0001, t+9.5);
    g2.gain.setValueAtTime(0.0001,t);
    g2.gain.linearRampToValueAtTime(0.016, t+3.0);
    g2.gain.exponentialRampToValueAtTime(0.0001, t+8.5);
    o.connect(g); g.connect(wet); o2.connect(g2); g2.connect(wet);
    o.start(t); o2.start(t); o.stop(t+10); o2.stop(t+10);
    noteTimer=setTimeout(note, 5000+Math.random()*3500);
  }
  function tone(on){
    if(on && !soundOn) return;
    if(!ctx){ if(!on) return; buildAudio(); }
    if(ctx.state==='suspended') ctx.resume();
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(on?.17:0, ctx.currentTime+(on?2.6:1.8));
  }
  const sndBtn=document.getElementById('snd');
  sndBtn.onclick=function(){ soundOn=!soundOn; this.classList.toggle('on',soundOn);
    this.textContent=soundOn?'SOUND ON':'SOUND';
    tone(soundOn); };

  /* entering with a hold: light, sound and a soft flash */
  /* the hold works anywhere on this screen; the ring is only the indicator */
  gate.addEventListener('pointerdown', e=>{ if(!gateOpen) return;
    if(e.target.closest('#galt')) return;
    e.preventDefault();
    if(!soundOn) sndBtn.click(); holding=true; holdStart=performance.now(); tone(true); });
  addEventListener('pointerup', ()=>{ if(holding){ holding=false; } },{signal});

  /* entering by scrolling: silent */
  ['wheel','touchmove'].forEach(ev=>addEventListener(ev,()=>openSite(false),{passive:true,signal}));
  addEventListener('keydown', e=>{
    if(gateOpen && [' ','ArrowDown','PageDown','Enter'].includes(e.key)) openSite(false); },{signal});
  document.getElementById('galt').onclick=()=>openSite(false);

  function openSite(withLight){
    if(!gateOpen) return; gateOpen=false; holding=false;
    gdot.textContent='in';
    gate.style.opacity='0'; gate.style.pointerEvents='none';
    setTimeout(()=>{ gate.style.display='none'; }, 1100);
    if(withLight){
      pulse=1;
      flash.style.transition='opacity .22s linear'; flash.style.opacity='.42';
      setTimeout(()=>{ flash.style.transition='opacity 1.6s cubic-bezier(.22,1,.36,1)';
        flash.style.opacity='0'; },240);
    }
    reveal();
  }

  /* ── the chrome appears after the gate ── */
  function reveal(){
    const E='cubic-bezier(.22,1,.36,1)';
    const go=(el,ms,delay,props)=>setTimeout(()=>{ if(!el) return;
      el.style.transition=Object.keys(props).map(k=>k+' '+ms+'ms '+E).join(',');
      Object.assign(el.style,props); },delay);
    setTimeout(()=>{ document.querySelectorAll('#L1 .mline b').forEach((b,i)=>{
      b.style.transition='transform 1.1s '+E+' '+(i*110)+'ms'; b.style.transform='none'; }); },260);
    document.getElementById('herocta').style.opacity='0';
    go(document.getElementById('herocta'),800,1200,{opacity:'1'});
    [['logo',500],['chapwrap',600],['topright',700],['railfoot',1500]]
      .forEach(([id,d])=>go(document.getElementById(id),800,d,{opacity:'1'}));
    railItems.forEach((r,i)=>go(r,900,850+i*110,{opacity:'1',transform:'none'}));
    go(document.getElementById('allbtn'),800,1500,{opacity:'1'});
    go(document.getElementById('ticks'),800,1500,{opacity:'1'});
  }

  /* ── the ring and the breathing of the light ── */
  function breathe(){
    if(!alive) return;
    /* the ring fills by time, not by frames: exactly 1.5 s to the end */
    if(holding){ hv=clamp((performance.now()-holdStart)/1500,0,1); }
    else { hv=Math.max(0, hv-0.035); }
    if(garc) garc.style.strokeDashoffset=(219.9*(1-hv)).toFixed(1);
    pulse *= 0.992;
    const light=Math.max(hv, pulse);
    if(halo) halo.style.opacity=light.toFixed(3);
    const img=L1.querySelector('.lbg img');
    if(img) img.style.filter=
      'saturate('+(.9+light*.22).toFixed(2)+') brightness('+(1+light*.20).toFixed(2)+
      ') contrast('+(1.04+light*.05).toFixed(2)+')';
    if(holding && hv>=1 && gateOpen) openSite(true);
    breatheId=requestAnimationFrame(breathe);
  }
  breathe();

  /* ── the gate's own entrance ── */
  (function gateIntro(){
    const E='cubic-bezier(.22,1,.36,1)';
    const gl=document.getElementById('glogo'), gln=document.getElementById('gline'),
          gb=document.getElementById('gbody');
    setTimeout(()=>{ gl.style.opacity='1'; gl.style.transform='scale(1)'; },160);
    setTimeout(()=>{ gln.style.width='240px'; },820);
    setTimeout(()=>{ gb.style.opacity='1'; },1700);
  })();

  /* ══ booking and pages ═════════════════════════════════════ */
  const panel=document.getElementById('panel'), veil=document.getElementById('veil');
  const page=document.getElementById('page');
  function setTab(t){
    if(t==='ask') t='exp';
    document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
    document.getElementById('tabstay').hidden=t!=='stay';
    document.getElementById('tabexp').hidden=t!=='exp';
    document.getElementById('tabtable').hidden=t!=='table'; }
  function openBook(t){ panel.classList.add('on'); veil.classList.add('on'); setTab(t||'stay'); }
  function closeAll(){ panel.classList.remove('on'); veil.classList.remove('on');
    page.classList.remove('on');
    const ap=document.getElementById('all'); if(ap) ap.classList.remove('on'); }
  document.getElementById('openbook').onclick=()=>openBook('stay');
  document.getElementById('closep').onclick=closeAll;
  veil.onclick=closeAll;
  document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.t));
  addEventListener('keydown',e=>{ if(e.key==='Escape') closeAll(); },{signal});

  /* The inner pages are data, content/pages.json (docs/interactive-prototype.md, "Inner pages").
     A key that has no page there still opens the prototype's own outline. */
  const OUTLINE={photo:'02-dome-exterior.jpg',
    lede:['This page is not built out in the prototype yet. Their own copy goes here; the way in and the way back already work.'],
    facts:[['Status','outline'],['Copy','from their deck'],['Motion','as on this page'],['Rail','in place']],
    cta:{label:'Book a Dome session',book:'exp'}};
  const pimg=document.getElementById('pimg'), pfacts=document.getElementById('pfacts'),
        pcta=document.getElementById('pcta');
  function openPage(k){
    const d=pages[k]||{...OUTLINE,title:k.charAt(0).toUpperCase()+k.slice(1)};
    document.getElementById('ptitle').textContent=d.title;
    document.getElementById('plede').textContent=d.lede.join(' ');
    /* the photograph stays hidden until it has loaded, so the picture of the page opened before
       never shows under a new title; focus says which height of it the band keeps */
    const src=photo(d.photo);
    pimg.style.objectPosition=d.focus==null?'':'50% '+d.focus+'%';
    if(pimg.getAttribute('src')!==src){ pimg.style.opacity='0';
      pimg.onload=()=>{ pimg.style.opacity='1'; }; pimg.src=src; }
    pfacts.style.setProperty('--n',d.facts.length);
    pfacts.replaceChildren(...d.facts.map(x=>{ const cell=document.createElement('div'),
      b=document.createElement('b'), s=document.createElement('span');
      b.textContent=x[0]; s.textContent=x[1]; cell.append(b,s); return cell; }));
    /* the button carries the page's own words and leads to a tab of the booking panel or to another page */
    pcta.textContent=d.cta.label;
    if(d.cta.page){ pcta.dataset.p=d.cta.page; delete pcta.dataset.book; }
    else { pcta.dataset.book=d.cta.book; delete pcta.dataset.p; }
    page.scrollTop=0; page.classList.add('on'); veil.classList.add('on'); }
  const allPane=document.getElementById('all');
  function openAll(){ allPane.classList.add('on'); veil.classList.add('on'); }
  document.getElementById('closeall').onclick=()=>{ allPane.classList.remove('on');
    veil.classList.remove('on'); };
  document.getElementById('backbtn').onclick=closeAll;
  /* Not in the prototype (owner, 2026-11-11): while a layer is open, the story behind it does not scroll.
     The wheel over an open page ran on into the document once the page reached its end, so the reader
     came back to another chapter. Whatever opens or closes a layer changes its class; that settles the lock,
     and styles/base.css does the rest. */
  const layers=[page,panel,allPane], root=document.documentElement;
  const lock=()=>root.classList.toggle('layer-open',layers.some(l=>l.classList.contains('on')));
  const layerWatch=new MutationObserver(lock);
  layers.forEach(l=>layerWatch.observe(l,{attributes:true,attributeFilter:['class']}));
  /* In the capture phase, ahead of the site's router: a footer link is "#", and the router would otherwise
     scroll the story back to its top behind the page that opens */
  document.addEventListener('click',e=>{
    const al=e.target.closest('[data-all]');
    if(al){ e.preventDefault(); openAll(); return; }
    const b=e.target.closest('[data-p]');
    if(b){ e.preventDefault(); openPage(b.dataset.p); return; }
    const k=e.target.closest('[data-book]');
    if(k){ e.preventDefault(); openBook(k.dataset.book); } },{capture:true,signal});
  /* one value for each of the five sections: there used to be four, so the last item
     got undefined and threw the reader back to the first screen */
  const RAIL_T=[0.278, 0.395, 0.500, 0.730, 0.805];
  document.querySelectorAll('.rail-a').forEach((a,i)=>{ a.onclick=()=>{
    const t=RAIL_T[i]; if(t===undefined) return;
    scrollTo({top:story.offsetTop+(story.offsetHeight-vh)*t, behavior:'smooth'}); }; });
  measure(); setTimeout(measure,400); frameId=requestAnimationFrame(frame);

  return () => {
    alive=false; controller.abort();
    layerWatch.disconnect(); root.classList.remove('layer-open');
    cancelAnimationFrame(frameId); cancelAnimationFrame(breatheId);
    clearTimeout(driftTimer); clearTimeout(noteTimer);
    if(ctx){ ctx.close(); ctx=null; }
  };
}
