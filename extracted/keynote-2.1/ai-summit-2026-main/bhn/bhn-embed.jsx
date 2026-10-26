// Bản nhúng của "Slide bán hàng ngắn" vào deck CRM HCM. Deck điều khiển idx; mỗi idx phát đúng đoạn của scene rồi dừng.
(function () {
  const SCENES = window.OM_SCENES || "[{\"name\":\"Móc câu · Completed\",\"dur\":7,\"desc\":\"Mock 12c: đủ 4 cột 100% · tagline 17 giờ · 4,9 triệu\"},{\"name\":\"Tua ngược 17 giờ\",\"dur\":5,\"desc\":\"Đồng hồ chạy lùi 15:00 → 22:05\"},{\"name\":\"22:05 · Tin nhắn khách hàng\",\"dur\":11.6,\"desc\":\"P1: khách hỏi, AI xin tên/SĐT, bàn giao chuyên viên\",\"nat\":8},{\"name\":\"Agent phân loại · bàn giao\",\"dur\":16.5,\"desc\":\"P4+P5: Inbox — phân loại, tra kiến thức, cập nhật hồ sơ, flow, custom fields\",\"nat\":8},{\"name\":\"Kho còn 2 · Critical\",\"dur\":5,\"desc\":\"Bảng tồn kho thật\"},{\"name\":\"Báo giá · tồn kho thật\",\"dur\":7,\"desc\":\"P2: SKU JJ-DC-002 · 4.900.000đ · đang có 2 chiếc\"},{\"name\":\"Service card · Prospector\",\"dur\":12,\"desc\":\"P9: kho được đọc + toggle số tồn chính xác → Service Card Prospector\"},{\"name\":\"Tóm tắt · khách xác nhận\",\"dur\":8,\"desc\":\"P3: AI tóm tắt, khách xác nhận, AI không tự chốt\"},{\"name\":\"Đơn nháp · dấu vết xác nhận\",\"dur\":6,\"desc\":\"P6: created a draft order — confirmed by…\"},{\"name\":\"Cửa hàng xác nhận · bổ sung\",\"dur\":5,\"desc\":\"P8 → đơn JJDH-0004: custom fields điền\"},{\"name\":\"22:22 · Confirmed\",\"dur\":5,\"desc\":\"Confirmed · pipeline\"},{\"name\":\"Kiểm tồn · giữ hàng\",\"dur\":7,\"desc\":\"Fulfill all — reserve\"},{\"name\":\"Service card · Order\",\"dur\":7,\"desc\":\"Settings Fulfillment + Service Card Order\"},{\"name\":\"08:45 · Xuất kho\",\"dur\":5,\"desc\":\"Dispatch: Ahamove thu hộ\"},{\"name\":\"Phiếu xuất trừ 1\",\"dur\":4,\"desc\":\"Stock decreases −1\"},{\"name\":\"Báo tiến độ cho khách\",\"dur\":4,\"desc\":\"Chat: Order → Prospector → khách hàng\"},{\"name\":\"Delivered · lịch sử\",\"dur\":6,\"desc\":\"Delivered 100% + ledger\"},{\"name\":\"Giao đủ · thu 0đ\",\"dur\":5,\"desc\":\"Collected ₫0 — giao xong chưa phải là hoàn tất\"},{\"name\":\"Đối soát COD\",\"dur\":5,\"desc\":\"Record payment: Cash · COD Ahamove\"},{\"name\":\"Phiếu thu · Paid in full\",\"dur\":4,\"desc\":\"JJPT-0006\"},{\"name\":\"Tạo hoá đơn từ đơn\",\"dur\":4,\"desc\":\"New invoice: tiền đã thu tự đối trừ\"},{\"name\":\"Hoá đơn điện tử khớp tiền\",\"dur\":5,\"desc\":\"Draft → Issued → Paid\"},{\"name\":\"Đủ 4 cột · Completed\",\"dur\":5,\"desc\":\"Hoàn tất\"},{\"name\":\"Kho còn 1 · Copilot\",\"dur\":7,\"desc\":\"Tồn kho tự cập nhật + Copilot\"},{\"name\":\"Service Map · đầy đủ\",\"dur\":10,\"desc\":\"5 node + 2 vòng phản hồi + tầng nền tảng\"},{\"name\":\"Câu chốt\",\"dur\":6,\"desc\":\"Kết\"}]";
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
  // Deck dùng 25 scene đầu (bỏ scene cuối "Câu chốt")
  // Bỏ scene 23 "Kho còn 1 · Copilot" (slide 29 cũ)
  const MAP = [...Array(25).keys()].filter(i => i !== 23);
  window.BanHangNganScenes = MAP.map(i => D.secs[i].name);
  function BanHangNganEmbed({ idx = 0, showCaptions = true, speed = 1 }) {
    const d = D, N = window.BanHangNganScenes.length, i0 = Math.min(Math.max(+idx || 0, 0), N - 1);
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
    const Piece = window.CycleNganCodPiece, Ctx = window.CompositionContext;
    if (!Piece || !Ctx) return null;
    return React.createElement('div', { ref: boxRef, style: { position: 'absolute', left: 0, top: 0, width: 2560, height: 1280, overflow: 'hidden' } },
      React.createElement(Ctx.Provider, { value: ctx }, React.createElement(Piece, { tweaks: { showCaptions } })));
  }
  window.BanHangNganEmbed = BanHangNganEmbed;
})();
