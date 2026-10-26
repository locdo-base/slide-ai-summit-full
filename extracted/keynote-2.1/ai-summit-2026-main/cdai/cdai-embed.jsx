// Bản nhúng của "Slide Cycle Dài" vào deck CRM HCM (Usecase 2). Deck điều khiển idx; mỗi idx phát đúng đoạn của scene rồi dừng.
(function () {
  const SCENES = "[{\"name\":\"Móc câu · Won\",\"dur\":7,\"desc\":\"Deal Won 1,19 tỷ · chữ lớn 84 ngày\"},{\"name\":\"Tua ngược 84 → 0\",\"dur\":5,\"desc\":\"Bộ đếm ngày chạy lùi\"},{\"name\":\"Ngày 0 · Campaign\",\"dur\":7,\"desc\":\"Campaign Meta Ads · lead đầu tiên\"},{\"name\":\"Lead · Warm 56\",\"dur\":7,\"desc\":\"Hồ sơ lead · điểm đếm lên 56\"},{\"name\":\"Mỗi lần chạm cộng điểm\",\"dur\":9,\"desc\":\"Feed thêm email, call, note, meeting · điểm lên 75\"},{\"name\":\"MQL · A2 · 75\",\"dur\":6,\"desc\":\"Stage chạy tới MQL · Hot A2\"},{\"name\":\"Vì sao 75 điểm\",\"dur\":8,\"desc\":\"Fit 95 · Intent 51 · 10 luật\"},{\"name\":\"Service card · Lead\",\"dur\":7,\"desc\":\"Service Card Lead Service\"},{\"name\":\"Pipeline 6 giai đoạn\",\"dur\":7,\"desc\":\"Board pipeline · giai đoạn sáng dần\"},{\"name\":\"Deal · nhận bàn giao\",\"dur\":8,\"desc\":\"Deal Việt Phúc · custom fields tự điền\"},{\"name\":\"5 người quyết định\",\"dur\":7,\"desc\":\"Note sơ đồ 5 người\"},{\"name\":\"Playbook · todo tự động\",\"dur\":9,\"desc\":\"Playbook sinh todo theo kịch bản\"},{\"name\":\"Copilot · tóm tắt deal\",\"dur\":10,\"desc\":\"Copilot tóm tắt deal ngày 40\"},{\"name\":\"Ngày 55 · bị so giá\",\"dur\":8,\"desc\":\"Báo giá 1,7 tỷ · đắt hơn ~18%\"},{\"name\":\"Phá băng · CFO duyệt\",\"dur\":8,\"desc\":\"Giảm 30% · CFO duyệt 30/70\"},{\"name\":\"Báo giá từ deal\",\"dur\":8,\"desc\":\"Tạo báo giá · tổng 1,7 → 1,19 tỷ\"},{\"name\":\"Gửi duyệt nội bộ\",\"dur\":7,\"desc\":\"Readiness 8/9 · Request approval\"},{\"name\":\"Approved · Published\",\"dur\":6,\"desc\":\"Báo giá Approved · Published\"},{\"name\":\"Service card · Quote\",\"dur\":7,\"desc\":\"Service Card Quote Service\"},{\"name\":\"Ký → chuyển thành đơn\",\"dur\":6,\"desc\":\"Accepted · Signed · Convert to order\"},{\"name\":\"Đơn · lịch thu 30/70\",\"dur\":7,\"desc\":\"Order Confirmed · 2 đợt thu\"},{\"name\":\"Service card · Order\",\"dur\":7,\"desc\":\"Service Card Order Service\"},{\"name\":\"Copilot · tóm tắt 84 ngày\",\"dur\":8,\"desc\":\"Copilot gõ câu hỏi · tóm tắt\"},{\"name\":\"Copilot · việc còn thiếu\",\"dur\":8,\"desc\":\"Người quyết định · 3 hành động\"},{\"name\":\"Service card · Sales\",\"dur\":7,\"desc\":\"Service Card Sales Pipeline\"},{\"name\":\"Won\",\"dur\":8,\"desc\":\"Close as won · thanh giai đoạn xanh\"},{\"name\":\"Lead nhận kết quả Won\",\"dur\":8,\"desc\":\"Lead 88 A1 · note ánh xạ ngược\"},{\"name\":\"Push custom audience\",\"dur\":7,\"desc\":\"Tệp Won lên Meta\"},{\"name\":\"Service card · Campaign\",\"dur\":7,\"desc\":\"Service Card Campaign\"},{\"name\":\"Service Map · đầy đủ\",\"dur\":9,\"desc\":\"Vòng lặp ICP · tầng nền tảng\"}]";
  const EPS = 0.001, HOLD = 0.55;
  function derive(raw) {
    const scenes = JSON.parse(raw); let ps = 0, as = 0; const secs = [], cues = {};
    scenes.forEach(s => { const nat = typeof s.nat === 'number' && s.nat > 0 ? s.nat : s.dur; secs.push({ name: s.name, ps, dur: s.dur, as, nat }); if (!(s.name in cues)) cues[s.name] = Math.round(as * 1000) / 1000; ps += s.dur; as += nat; });
    return { secs, cues, total: ps, authTotal: as };
  }
  function warp(d, t) { const ss = d.secs; let s = ss[ss.length - 1]; for (const x of ss) { if (t < x.ps + x.dur) { s = x; break; } } const local = Math.min(Math.max(t - s.ps, 0), s.dur); return Math.min(s.as + local * (s.nat / s.dur), d.authTotal); }
  const endOf = (d, i) => { const s = d.secs[i]; if (i === d.secs.length - 1) return s.ps + s.dur - EPS; return Math.max(s.ps, s.ps + s.dur - HOLD * (s.dur / s.nat)); };
  const D = derive(SCENES);
  // Khung hình của hiệu ứng là ưu tiên thấp: một cú bấm next/back luôn được xử lý ngay, không phải chờ hiệu ứng chạy xong
  const lowPri = (fn) => (React.startTransition ? React.startTransition(fn) : fn());
  // Bỏ scene 19 "Service card · Order" (slide 50 cũ)
  const MAP = D.secs.map((s, i) => i).filter(i => ![21,22].includes(i));
  window.CycleDaiScenes = MAP.map(i => D.secs[i].name);
  function CycleDaiEmbed({ idx = 0, showCaptions = true, speed = 1 }) {
    const d = D, N = window.CycleDaiScenes.length, i0 = Math.min(Math.max(+idx || 0, 0), N - 1);
    const [st, setSt] = React.useState(() => ({ idx: MAP[i0], t: d.secs[MAP[i0]].ps, playing: true }));
    const boxRef = React.useRef(null);
    const stRef = React.useRef(st); stRef.current = st;
    React.useEffect(() => {
      const s = stRef.current, i = MAP[Math.min(Math.max(+idx || 0, 0), N - 1)];
      if (i === s.idx) return;
      // Bấm là chuyển ngay sang slide đích, rồi hiệu ứng của slide đó chạy lại từ đầu — không nối tiếp đoạn đang phát dở
      setSt({ idx: i, t: d.secs[i].ps, playing: true });
      if (i < s.idx && boxRef.current && boxRef.current.animate) boxRef.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.16,1,.3,1)' });
    }, [idx]);
    React.useEffect(() => {
      if (!st.playing) return;
      let raf, last = performance.now();
      const tick = (now) => {
        const dt = Math.min((now - last) / 1000, 0.1) * (+speed || 1); last = now;
        const s = stRef.current, end = endOf(d, s.idx), t = Math.min(s.t + dt, end);
        if (t >= end) { lowPri(() => setSt(c => c.idx === s.idx ? { ...c, t: end, playing: false } : c)); return; }
        lowPri(() => setSt(c => c.idx === s.idx ? { ...c, t } : c)); raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [st.playing, st.idx]);
    const T = warp(d, st.t);
    const ctx = React.useMemo(() => ({ T, CUES: d.cues, time: st.t, duration: d.total, authoredTotal: d.authTotal, playing: st.playing }), [T, st.playing]);
    const Piece = window.CycleDaiPiece, Ctx = window.CompositionContext;
    if (!Piece || !Ctx) return null;
    return React.createElement('div', { ref: boxRef, style: { position: 'absolute', left: 0, top: 0, width: 2560, height: 1280, overflow: 'hidden' } },
      React.createElement(Ctx.Provider, { value: ctx }, React.createElement(Piece, { tweaks: { showCaptions } })));
  }
  window.CycleDaiEmbed = CycleDaiEmbed;
})();
