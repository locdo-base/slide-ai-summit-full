// Slide bán hàng ngắn — bản click-through của Cycle Ngan COD. Mỗi scene = một slide.
// Bấm → phát đúng đoạn video của scene đó rồi dừng ở khung cuối; chuyển cảnh liền mạch như video.
(function () {
  const { CompositionContext, useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakRadio } = window;
  const W = 2560, H = 1280, EPS = 0.001;
  const AF = "'Afacad', Inter, system-ui, sans-serif", MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";

  function derive(raw) {
    const scenes = typeof raw === 'string' ? JSON.parse(raw) : (raw || []);
    let ps = 0, as = 0; const secs = [], cues = {};
    scenes.forEach(s => {
      const nat = typeof s.nat === 'number' && s.nat > 0 ? s.nat : s.dur;
      secs.push({ name: s.name, desc: s.desc, ps, dur: s.dur, as, nat });
      if (!(s.name in cues)) cues[s.name] = Math.round(as * 1000) / 1000;
      ps += s.dur; as += nat;
    });
    return { secs, cues, total: ps, authTotal: as };
  }
  function warp(d, t) {
    const ss = d.secs; let s = ss[ss.length - 1];
    for (const x of ss) { if (t < x.ps + x.dur) { s = x; break; } }
    const local = Math.min(Math.max(t - s.ps, 0), s.dur);
    return Math.min(s.as + local * (s.nat / s.dur), d.authTotal);
  }
  // Giữ khung ~0.55s authored trước ranh giới — caption/Service Card fade-out 0.4s trước cue kế tiếp
  const HOLD = 0.55;
  const endOf = (d, i) => { const s = d.secs[i]; if (i === d.secs.length - 1) return s.ps + s.dur - EPS; return Math.max(s.ps, s.ps + s.dur - HOLD * (s.dur / s.nat)); };
  const readHash = (n) => { const m = /slide-(\d+)/.exec(location.hash); return m ? Math.min(Math.max(+m[1] - 1, 0), n - 1) : null; };

  function SlideBanHangNganApp() {
    const d = React.useMemo(() => derive(window.OM_SCENES), []);
    const N = d.secs.length;
    const [tw, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { showCaptions: true, speed: 1, autoAdvance: false });
    const init = readHash(N);
    const [st, setSt] = React.useState(() => init == null || init === 0
      ? { idx: 0, t: 0, playing: true }
      : { idx: init, t: endOf(d, init), playing: false });
    const [fade, setFade] = React.useState(0);
    const [chrome, setChrome] = React.useState(true);
    const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
    const stRef = React.useRef(st); stRef.current = st;
    const twRef = React.useRef(tw); twRef.current = tw;

    // Đồng hồ phát
    React.useEffect(() => {
      if (!st.playing) return;
      let raf, last = performance.now();
      const tick = (now) => {
        const dt = Math.min((now - last) / 1000, 0.1) * (+twRef.current.speed || 1); last = now;
        const s = stRef.current, end = endOf(d, s.idx);
        const t = Math.min(s.t + dt, end);
        if (t >= end) {
          if (twRef.current.autoAdvance && s.idx < N - 1) setSt({ idx: s.idx + 1, t: d.secs[s.idx + 1].ps, playing: true });
          else setSt({ ...s, t: end, playing: false });
          return;
        }
        setSt({ ...s, t }); raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [st.playing, st.idx]);

    React.useEffect(() => { history.replaceState(null, '', '#slide-' + (st.idx + 1)); }, [st.idx]);

    const next = React.useCallback(() => {
      const s = stRef.current;
      if (s.idx >= N - 1) { if (s.playing) setSt({ ...s, t: endOf(d, s.idx), playing: false }); return; }
      // Nối tiếp từ vị trí hiện tại để chuyển cảnh liền mạch
      setSt({ idx: s.idx + 1, t: Math.max(s.t, d.secs[s.idx + 1].ps), playing: true });
    }, []);
    const jump = React.useCallback((i) => {
      i = Math.min(Math.max(i, 0), N - 1);
      setFade(1);
      setTimeout(() => { setSt({ idx: i, t: endOf(d, i), playing: false }); setFade(0); }, 220);
    }, []);
    const prev = React.useCallback(() => { const s = stRef.current; if (s.idx > 0) jump(s.idx - 1); }, []);
    const replay = React.useCallback(() => { const s = stRef.current; setSt({ idx: s.idx, t: d.secs[s.idx].ps, playing: true }); }, []);

    React.useEffect(() => {
      const onKey = (e) => {
        if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
        const k = e.key;
        if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter') { e.preventDefault(); next(); }
        else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
        else if (k === 'Home') jump(0);
        else if (k === 'End') jump(N - 1);
        else if (k === 'r' || k === 'R') replay();
        else if (k === 'f' || k === 'F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(); }
      };
      const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
      const onHash = () => { const i = readHash(N); if (i != null && i !== stRef.current.idx) jump(i); };
      let hideT; const onMove = () => { setChrome(true); clearTimeout(hideT); hideT = setTimeout(() => setChrome(false), 2600); };
      onMove();
      window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize);
      window.addEventListener('hashchange', onHash); window.addEventListener('mousemove', onMove);
      return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); window.removeEventListener('hashchange', onHash); window.removeEventListener('mousemove', onMove); clearTimeout(hideT); };
    }, []);

    const T = warp(d, st.t);
    const ctx = React.useMemo(() => ({ T, CUES: d.cues, time: st.t, duration: d.total, authoredTotal: d.authTotal, playing: st.playing }), [T, st.playing]);
    const k = Math.min(vp.w / W, vp.h / H);
    const sec = d.secs[st.idx];
    const prog = Math.min(Math.max((st.t - sec.ps) / sec.dur, 0), 1);
    const Piece = window[window.SLIDE_PIECE || 'CycleNganCodPiece'];
    const btn = { width: 52, height: 52, borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.06)', color: '#fff', font: `500 22px ${AF}`, cursor: 'pointer', display: 'grid', placeItems: 'center', padding: 0 };

    return (
      <div style={{ position: 'fixed', inset: 0, background: '#061530', overflow: 'hidden', cursor: chrome ? 'default' : 'none' }}>
        <div onClick={next} data-screen-label={String(st.idx + 1).padStart(2, '0') + ' ' + sec.name}
          style={{ position: 'absolute', left: (vp.w - W * k) / 2, top: (vp.h - H * k) / 2, width: W, height: H, transform: `scale(${k})`, transformOrigin: '0 0', overflow: 'hidden' }}>
          <CompositionContext.Provider value={ctx}>{Piece && <Piece tweaks={tw} />}</CompositionContext.Provider>
          <div style={{ position: 'absolute', inset: 0, background: '#061530', opacity: fade, transition: 'opacity .22s cubic-bezier(.16,1,.3,1)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'absolute', left: '50%', bottom: 24, transform: `translateX(-50%) translateY(${chrome ? 0 : 16}px)`, opacity: chrome ? 1 : 0, transition: 'opacity .3s, transform .3s cubic-bezier(.16,1,.3,1)', display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', borderRadius: 999, background: 'rgba(6,17,48,.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 20px 50px rgba(0,0,0,.35)', fontFamily: AF, color: '#fff', zIndex: 10 }}>
          <button style={{ ...btn, opacity: st.idx === 0 ? .4 : 1 }} onClick={prev} title="Slide trước (←)">←</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 340, padding: '0 6px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ font: `500 14px ${MONO}`, letterSpacing: 1.5, color: '#A9D6FF', fontVariantNumeric: 'tabular-nums' }}>{String(st.idx + 1).padStart(2, '0')} / {N}</span>
              <span style={{ font: `500 16px ${AF}`, color: '#D5DEEA', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{sec.name}</span>
            </div>
            <div style={{ display: 'flex', gap: 2, height: 3 }}>
              {d.secs.map((s, i) => <span key={i} onClick={() => jump(i)} style={{ flex: s.dur, borderRadius: 2, cursor: 'pointer', background: i < st.idx ? '#A9D6FF' : i > st.idx ? 'rgba(255,255,255,.18)' : `linear-gradient(90deg,#A9D6FF ${prog * 100}%, rgba(255,255,255,.18) ${prog * 100}%)` }} />)}
            </div>
          </div>
          <button style={btn} onClick={replay} title="Phát lại slide (R)">↺</button>
          <button style={{ ...btn, background: 'rgba(169,214,255,.16)', borderColor: 'rgba(169,214,255,.45)', opacity: st.idx === N - 1 && !st.playing ? .4 : 1 }} onClick={next} title="Slide sau (→ / Space)">→</button>
        </div>

        <TweaksPanel>
          <TweakSection label="Nội dung" />
          <TweakToggle label="Caption trên màn hình" value={tw.showCaptions !== false} onChange={(v) => setTweak('showCaptions', v)} />
          <TweakSection label="Trình chiếu" />
          <TweakRadio label="Tốc độ phát" value={String(tw.speed ?? 1)} options={['1', '1.5', '2']} onChange={(v) => setTweak('speed', +v)} />
          <TweakToggle label="Tự chạy tiếp (như video)" value={!!tw.autoAdvance} onChange={(v) => setTweak('autoAdvance', v)} />
        </TweaksPanel>
      </div>
    );
  }
  window.SlideBanHangNganApp = SlideBanHangNganApp;
})();
