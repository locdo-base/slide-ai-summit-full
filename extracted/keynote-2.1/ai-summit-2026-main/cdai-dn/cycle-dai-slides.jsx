// Cycle Dài · bản slide click — caption trái · demo phải · timeline gọn trên demo · Service Card gọn cột trái
(function () {
  const B = window.DaiBase;
  const { FW, FH, DEMO_X, FRAME_TOP, FRAME_W, AF, MONO, BLUE, AMBER, GREEN, RED, INK2, INK3, TONE, lerp, ez, io, rise, clamp } = B;
  const { Easing } = window;
  const win = (T, from, to, d = 0.5) => Math.min(ez(T, from, d), ez(to, T, 0.4));
  const COLW = 1240, LX0 = 180;

  // ---------- Caption cột trái ----------
  function Caption({ T, from, to, eyebrow, title, sub, tone = 'blue', big, wide }) {
    if (T < from || T > to) return null;
    const col = TONE[tone];
    const box = wide ? { left: LX0, top: 250, width: 3000 } : { left: LX0, top: 230, height: 820, width: COLW, justifyContent: 'center' };
    return <div style={{ position: 'absolute', ...box, display: 'flex', flexDirection: 'column', gap: wide ? 10 : 20, opacity: win(T, from, to), transform: `translateY(${(1 - ez(T, from, 0.5)) * 20}px)` }}>
      {eyebrow && <span style={{ display: 'flex', alignItems: 'flex-start', gap: 14, font: `500 ${wide ? 32 : 30}px/1.3 ${MONO}`, letterSpacing: 2, textTransform: 'uppercase', color: col }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: col, flex: 'none', marginTop: wide ? 15 : 12 }} />{eyebrow}</span>}
      <span style={{ font: `700 ${wide ? 74 : big ? 140 : 78}px/1.12 ${AF}`, color: big ? col : '#fff', letterSpacing: -0.5, textWrap: 'pretty' }}>{title}</span>
      {!wide && <span style={{ width: 72, height: 3, background: col, borderRadius: 2, marginTop: 4 }} />}
      {sub && <span style={{ font: `400 34px/1.4 ${AF}`, color: INK2, textWrap: 'pretty', ...rise(T, from + 0.35, 0.5, 12) }}>{sub}</span>}
    </div>;
  }

  // ---------- Service Card gọn ----------
  const LAYERS = ['Tạo Service', 'Input / Output', 'Thuộc tính', 'AI Agent', 'Tích hợp'];
  const CARDS = {
    A: { app: 'lead', name: 'Lead Service', sub: 'Quà tặng doanh nghiệp & Bán sỉ', emph: 3, rows: ['Mỗi phân khúc một service: Quà tặng DN · Thiết kế riêng', 'Lead từ Ads, form → MQL, Account, Contact, Deal', '13 trường B2B · 6 stage · nhãn Quà Tết, Khắc logo', 'AI Scoring Fit/Intent · MQL khi Fit ≥ C và Intent ≥ 50', 'Meta Lead Form (AdManager) · chuyển sang Sales'] },
    B: { app: 'sales', name: 'Sales Pipeline', sub: 'Bán sỉ & Quà tặng doanh nghiệp', emph: 3, rows: ['Mỗi mô hình bán một pipeline', 'SQL từ Lead → báo giá, đơn hàng · kết quả Won về Lead', '6 giai đoạn có xác suất & ngưỡng trễ · lý do Won/Lost', 'AI Copilot theo luật riêng: tồn kho, bậc giảm, cọc 30%', 'Commerce (Quote + Order) · Forecast · Dashboard'] },
    C: { app: 'commerce', name: 'Quote Service', sub: 'Báo giá quà tặng doanh nghiệp', emph: 3, rows: ['Mỗi loại báo giá một service: thiết bị · quà tặng · thiết kế riêng', 'Deal + bảng giá → báo giá đã ký → Order', 'Pháp nhân bán · bảng giá sỉ · chiết khấu · hiệu lực 30 ngày', 'Duyệt nội bộ bắt buộc trước khi publish', 'Mở từ deal Sales · ký giấy / ký điện tử'] },
    D: { app: 'commerce', name: 'Order Service', sub: 'Đơn sỉ Jasmine', emph: 2, rows: ['Mỗi kênh một service đơn: bán lẻ · sỉ & CTV', 'Báo giá đã ký → lịch thu · hoá đơn · giao hàng', 'Lịch thu 30/70 · Draft → Confirmed → Delivered', 'Copilot của service đơn hàng', 'Invoice · Payment · Shipping · Inventory'] },
    E: { app: 'admanager', name: 'Campaign', sub: 'Meta Ads – Quà Tết doanh nghiệp 2027', emph: 4, rows: ['Mỗi chiến dịch một bản ghi: mục tiêu, thời gian, ngân sách', 'Ngân sách, kênh → lead có nguồn · nhận ngược kết quả Won', '60 lead · CPL < 500.000đ · ≥ 8 MQL · 20/06 – 31/10', 'AI Analysis đọc hiệu quả chiến dịch', 'Push custom audience lên Meta: tệp Won → Lookalike'] },
  };
  function ServiceCard({ T, at, to, id, tone = 'blue' }) {
    if (T < at || T > to) return null;
    const c = CARDS[id], col = TONE[tone];
    return <div style={{ position: 'absolute', left: LX0, top: 300, width: 1100, display: 'flex', flexDirection: 'column', gap: 22, opacity: Math.min(ez(T, at, 0.5), ez(to, T, 0.4)), transform: `translateY(${(1 - ez(T, at, 0.5)) * 20}px)` }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 14, font: `500 26px ${MONO}`, letterSpacing: 2, textTransform: 'uppercase', color: col }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: col }} />Service card</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><img src={`assets/app-icons/${c.app}.svg`} alt="" style={{ width: 62, height: 62, borderRadius: 12 }} /><div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ font: `700 60px/1.05 ${AF}`, color: '#fff' }}>{c.name}</span><span style={{ font: `400 29px ${AF}`, color: INK2 }}>{c.sub}</span></div></div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 34, marginTop: 6 }}>
        <span style={{ position: 'absolute', left: 5, top: 20, bottom: 20, width: 2, background: 'rgba(255,255,255,.14)' }} />
        {c.rows.map((r, i) => { const t0 = at + 0.4 + i * 0.14, hi = c.emph === i && T >= t0 + 2.0; return (
          <div key={i} style={{ position: 'relative', display: 'grid', gridTemplateColumns: '48px 1fr', columnGap: 12, alignItems: 'center', padding: '13px 19px', borderRadius: 14, background: hi ? `${col}1F` : 'rgba(255,255,255,.06)', border: `1px solid ${hi ? col : 'rgba(255,255,255,.14)'}`, boxShadow: hi ? `0 0 38px ${col}44` : 'none', transition: 'background .3s, border-color .3s, box-shadow .3s', ...rise(T, t0, 0.5, 14) }}>
            <span style={{ position: 'absolute', left: -34, top: '50%', width: 12, height: 12, borderRadius: '50%', background: hi ? col : BLUE, transform: 'translateY(-50%)', boxShadow: hi ? `0 0 0 6px ${col}33` : 'none' }} />
            <span style={{ font: `500 26px ${MONO}`, color: col, alignSelf: 'start', marginTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}><span style={{ font: `600 31px/1.15 ${AF}`, color: '#fff' }}>{LAYERS[i]}</span><span style={{ font: `400 25px/1.3 ${AF}`, color: INK2, textWrap: 'pretty' }}>{r}</span></span>
          </div>); })}
      </div>
    </div>;
  }

  // ---------- Chặng service (cột trái, dưới cùng) ----------
  const CHAIN = [['admanager', 'Campaign'], ['lead', 'Lead'], ['sales', 'Sales'], ['commerce', 'Quote'], ['commerce', 'Order']];
  function Chain({ cur, show }) {
    if (show <= 0) return null;
    return <div onClick={(e) => { if (window.__cdaiGoRecap) { e.stopPropagation(); window.__cdaiGoRecap(); } }} style={{ position: 'absolute', left: LX0, top: 1075, width: COLW, display: 'flex', flexDirection: 'column', gap: 12, opacity: show, cursor: 'pointer' }}>
      <span style={{ font: `500 20px ${MONO}`, letterSpacing: 2, color: INK3 }}>ĐANG Ở SERVICE</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{CHAIN.map(([ic, n], i) => { const a = i === cur; return <React.Fragment key={n}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: a ? '6px 14px 6px 6px' : 6, borderRadius: 999, background: a ? 'rgba(169,214,255,.16)' : 'transparent', border: `1px solid ${a ? 'rgba(169,214,255,.55)' : 'transparent'}`, opacity: a ? 1 : 0.5, transition: 'all .3s' }}><img src={`assets/app-icons/${ic}.svg`} alt="" style={{ width: 36, height: 36, borderRadius: 8 }} />{a && <span style={{ font: `600 26px ${AF}`, color: '#fff' }}>{n}</span>}</span>
        {i < 4 && <span style={{ width: 14, height: 2, background: 'rgba(255,255,255,.25)' }} />}</React.Fragment>; })}</div>
    </div>;
  }

  // ---------- Timeline gọn trên khung demo ----------
  const MILES = [[0, 'Form Ads', 0], [1, 'Warm 56', 1], [12, 'Meeting', 0], [18, 'MQL 75', 1], [22, 'Pipeline', 0], [25, 'Bàn giao', 1], [40, 'Playbook', 0], [55, 'Bị so giá', 1, 'red'], [72, 'Giảm 30%', 0], [76, 'CFO duyệt', 1], [84, 'Ký · Won', 0, 'green']];
  function Timeline({ dayF, day, show, tone }) {
    if (show <= 0) return null;
    // Cột trái, dưới heading. Mốc theo ngày được giãn theo đoạn cho đều nhãn.
    const KN = [[0, 0], [1, 70], [12, 190], [18, 300], [22, 400], [25, 490], [40, 620], [55, 720], [72, 830], [76, 915], [84, 1000]];
    const M = v => { for (let i = 1; i < KN.length; i++) { const [a0, b0] = KN[i - 1], [a1, b1] = KN[i]; if (v <= a1) return b0 + (b1 - b0) * (v - a0) / (a1 - a0); } return 1000; };
    const W = 1320, H = 150, LY = 66, LX = 110, LW = W - LX - 230, X = d => LX + M(d) / 1000 * LW, col = TONE[tone] || BLUE;
    return <div style={{ position: 'absolute', left: LX0, top: 70, width: W, height: H, opacity: show, transform: `translateY(${(1 - show) * -16}px)` }}>
      <div style={{ position: 'absolute', left: X(0), width: LW, top: LY, height: 3, background: 'rgba(255,255,255,.16)', borderRadius: 2 }} />
      <span style={{ position: 'absolute', right: W - X(0) + 22, top: LY - 12, font: `500 20px ${MONO}`, letterSpacing: 1.5, color: INK3, whiteSpace: 'nowrap' }}>26/06</span>
      <span style={{ position: 'absolute', left: X(84) + 22, top: LY - 12, font: `500 20px ${MONO}`, letterSpacing: 1.5, color: INK3, whiteSpace: 'nowrap' }}>18/09 · NGÀY 84</span>
      <div style={{ position: 'absolute', left: X(0), top: LY, height: 3, width: X(dayF) - X(0), background: `linear-gradient(90deg, ${BLUE}, ${col})`, borderRadius: 2, boxShadow: `0 0 18px ${col}66` }} />
      {MILES.map(([d, label, up, hi]) => { if (d > dayF + 0.01) return null; const cur = d === day, c = hi ? TONE[hi] : cur ? col : BLUE, big = cur || !!hi; return (
        <div key={d} style={{ position: 'absolute', left: X(d), top: 0, width: 0, height: H }}>
          <span style={{ position: 'absolute', left: big ? -11 : -7, top: LY + 1.5 - (big ? 11 : 7), width: big ? 22 : 14, height: big ? 22 : 14, borderRadius: '50%', background: c, boxShadow: cur ? `0 0 0 6px ${c}33, 0 0 24px ${c}` : 'none', transition: 'all .3s' }} />
          <div style={{ position: 'absolute', left: 0, transform: 'translateX(-50%)', ...(up ? { bottom: H - LY + 18 } : { top: LY + 22 }), display: 'flex', flexDirection: 'column', alignItems: 'center', whiteSpace: 'nowrap', opacity: cur ? 1 : hi ? .95 : .6, transition: 'opacity .3s' }}>
            <span style={{ font: `500 20px ${MONO}`, letterSpacing: 1.5, color: c }}>NGÀY {d}</span>
            <span style={{ font: `${big ? 600 : 400} ${big ? 25 : 20}px ${AF}`, color: big ? '#fff' : INK2 }}>{label}</span>
          </div>
        </div>); })}
    </div>;
  }

  // ---------- Service Map ----------
  const NODES = [['admanager', 'Campaign', 'Meta Ads Quà Tết 2027'], ['lead', 'Lead Service', 'Quà tặng doanh nghiệp'], ['sales', 'Sales Pipeline', 'Bán sỉ & quà tặng'], ['commerce', 'Quote Service', 'Báo giá quà tặng DN'], ['commerce', 'Order Service', 'Đơn sỉ Jasmine']];
  const EDGES = ['lead có nguồn', 'MQL / SQL', 'yêu cầu báo giá', 'báo giá đã ký'];
  const PLATFORM = ['Service registry', 'Stages & Settings', 'Unified task', 'Operator', 'Data fields', 'Approval', 'Service exchange', 'Copilot mỗi service'];
  function ServiceMap({ T, at, full, out }) {
    if (T < at) return null;
    const NW = 570, NH = 210, GAP = 157.5, X0 = 180, Y = 420, cx = i => X0 + i * (NW + GAP);
    const op = out ? ez(out, T, 0.5) : 1;
    const loopP = full ? ez(T, at + 1.2, 1.8) : 0, platP = full ? ez(T, at + 3.0, 0.8) : 0, tagP = full ? ez(T, at + 4.2, 0.6) : 0;
    const sales = cx(2) + NW / 2, leadX = cx(1) + NW / 2, campX = cx(0) + NW / 2, yb = Y + NH, yl = yb + 110;
    const loop = `M ${sales} ${yb} L ${sales} ${yl} L ${campX} ${yl} L ${campX} ${yb}`, branch = `M ${leadX} ${yl} L ${leadX} ${yb}`;
    return <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <svg style={{ position: 'absolute', inset: 0 }} width={FW} height={FH}>
        {EDGES.map((e, i) => { const t0 = full ? at + 0.2 + i * 0.15 : at + 0.9 + i * 0.75, p = ez(T, t0, 0.7); if (p <= 0) return null; const x1 = cx(i) + NW, x2 = cx(i + 1), y = Y + NH / 2, xm = (x1 + x2) / 2; return (
          <g key={i}><line x1={x1} y1={y} x2={x1 + (x2 - x1) * p} y2={y} stroke="rgba(255,255,255,.35)" strokeWidth="3" />{p >= 1 && <polygon points={`${x2 - 14},${y - 9} ${x2},${y} ${x2 - 14},${y + 9}`} fill={BLUE} />}
            <g opacity={ez(T, t0 + 0.4, 0.4)}><rect x={xm - 100} y={y - 66} width="200" height="46" rx="23" fill="rgba(6,21,48,.85)" stroke="rgba(255,255,255,.30)" /><text x={xm} y={y - 35} textAnchor="middle" fill="#fff" style={{ font: `500 24px ${AF}` }}>{e}</text></g></g>); })}
        {loopP > 0 && <g>
          <path d={loop} fill="none" stroke={AMBER} strokeWidth="3.5" pathLength="1" style={{ strokeDasharray: `${loopP} 1` }} />
          <path d={branch} fill="none" stroke={AMBER} strokeWidth="3.5" pathLength="1" style={{ strokeDasharray: `${ez(T, at + 2.4, 0.6)} 1` }} />
          {loopP >= 1 && <React.Fragment><polygon points={`${campX - 9},${yb + 14} ${campX},${yb} ${campX + 9},${yb + 14}`} fill={AMBER} /><polygon points={`${leadX - 9},${yb + 14} ${leadX},${yb} ${leadX + 9},${yb + 14}`} fill={AMBER} opacity={ez(T, at + 2.9, 0.3)} /></React.Fragment>}
          <g opacity={ez(T, at + 1.9, 0.4)}><rect x={(sales + leadX) / 2 - 110} y={yl - 23} width="220" height="46" rx="23" fill="rgba(6,21,48,.9)" stroke={AMBER} /><text x={(sales + leadX) / 2} y={yl + 8} textAnchor="middle" fill={AMBER} style={{ font: `600 24px ${AF}` }}>kết quả Won</text></g>
          <g opacity={ez(T, at + 2.6, 0.4)}><rect x={(leadX + campX) / 2 - 140} y={yl - 23} width="280" height="46" rx="23" fill="rgba(6,21,48,.9)" stroke={AMBER} /><text x={(leadX + campX) / 2} y={yl + 8} textAnchor="middle" fill={AMBER} style={{ font: `600 24px ${AF}` }}>tệp khách Won (ICP)</text></g>
        </g>}
      </svg>
      {NODES.map(([ic, n, s], i) => { const t0 = full ? at + 0.1 + i * 0.08 : at + 0.5 + i * 0.75; return (
        <div key={n} style={{ position: 'absolute', left: cx(i), top: Y, width: NW, height: NH, borderRadius: 24, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 20px 50px rgba(0,0,0,.35)', padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 10, ...rise(T, t0, 0.5, 24) }}>
          <img src={`assets/app-icons/${ic}.svg`} alt="" style={{ width: 58, height: 58, borderRadius: 12 }} />
          <span style={{ font: `700 43px/1.1 ${AF}`, color: '#fff' }}>{n}</span><span style={{ font: `400 29px ${AF}`, color: INK2 }}>{s}</span>
        </div>); })}
      {full && <div style={{ position: 'absolute', left: 180, right: 180, top: 820, opacity: platP, transform: `translateY(${(1 - platP) * 20}px)` }}>
        <div style={{ font: `500 29px ${MONO}`, letterSpacing: 2, color: INK3, marginBottom: 18 }}>TẦNG NỀN TẢNG · CÁC MÔ HÌNH THỐNG NHẤT</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{PLATFORM.map((p, i) => <span key={p} style={{ padding: '12px 26px', borderRadius: 999, border: '1px solid rgba(255,255,255,.30)', background: 'rgba(6,21,48,.5)', font: `500 31px ${AF}`, color: INK2, whiteSpace: 'nowrap', ...rise(T, at + 3.1 + i * 0.08, 0.4, 12) }}>{p}</span>)}</div>
      </div>}
      {full && <div style={{ position: 'absolute', left: 180, top: 1030, font: `700 77px/1.15 ${AF}`, color: '#fff', opacity: tagP, transform: `translateY(${(1 - tagP) * 20}px)` }}>App chỉ là chiếc hộp. <span style={{ color: AMBER }}>Service mới là thứ vận hành.</span></div>}
    </div>;
  }

  // ---------- Pháo hoa: tất định theo T (tua/giữ khung đều đúng) ----------
  const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const FWC = ['#A9D6FF', '#4ADE80', '#F0A23B', '#FFFFFF', '#FFD166', '#F87171', '#C4B5FD'];
  function Fireworks({ T, at, count, dur, seed = 1, area = [0, 0, FW, FH * 0.7], z = 30, scale = 1, clip, floor = FH + 20 }) {
    if (T < at || T > at + dur + 3) return null;
    const out = [];
    for (let b = 0; b < count; b++) {
      const r = (k) => rnd(seed * 97 + b * 13 + k);
      const tb = at + (b / count) * dur * 0.85 + r(1) * 0.3, rise = 0.55 + r(2) * 0.25, tx = tb + rise;
      const x0 = area[0] + r(3) * area[2], y0 = area[1] + 80 + r(4) * area[3], sx = x0 + (r(5) - 0.5) * 160;
      const col = FWC[Math.floor(r(6) * FWC.length)], col2 = FWC[Math.floor(r(7) * FWC.length)];
      if (T >= tb && T < tx) { const p = Easing.easeOutCubic((T - tb) / rise), y = lerp(floor, y0, p), x = lerp(sx, x0, p); out.push(<line key={'r' + b} x1={x} y1={y} x2={x} y2={y + 70} stroke={col} strokeWidth={3 * scale} strokeLinecap="round" opacity={0.9} />); }
      const tau = T - tx, life = 1.9 + r(8) * 0.6; if (tau < 0 || tau > life) continue;
      const n = 46 + Math.floor(r(9) * 22), v0 = (380 + r(10) * 260) * scale, fade = 1 - tau / life;
      if (tau < 0.25) out.push(<circle key={'f' + b} cx={x0} cy={y0} r={(120 + 80 * tau) * scale} fill={col} opacity={(0.35 * (1 - tau / 0.25))} />);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + r(11 + i) * 0.2, v = v0 * (0.75 + rnd(b * 31 + i) * 0.35);
        const pos = (t) => { const d = (1 - Math.exp(-2.2 * t)) / 2.2; return [x0 + Math.cos(a) * v * d, y0 + Math.sin(a) * v * d + 140 * t * t]; };
        const [x, y] = pos(tau), [px, py] = pos(Math.max(0, tau - 0.12)), c = i % 3 === 0 ? col2 : col;
        const tw = tau > life * 0.55 ? (0.5 + 0.5 * Math.sin((tau * 40) + i)) : 1;
        out.push(<line key={b + '-' + i} x1={px} y1={py} x2={x} y2={y} stroke={c} strokeWidth={3.2 * scale * (0.5 + fade * 0.5)} strokeLinecap="round" opacity={fade * tw} />);
      }
    }
    return <svg width={FW} height={FH} style={{ position: 'absolute', inset: 0, zIndex: z, pointerEvents: 'none', clipPath: clip, filter: 'drop-shadow(0 0 10px rgba(255,255,255,.45))' }}>{out}</svg>;
  }

  // Pháo hoa Won: bắn liên tục theo đồng hồ thật (không phụ thuộc T đang giữ khung) cho tới khi sang slide
  function WonFireworks({ T, at }) {
    const t0 = React.useRef(performance.now()), [now, setNow] = React.useState(0);
    React.useEffect(() => { let raf; const tick = () => { setNow((performance.now() - t0.current) / 1000); raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, []);
    const CYC = 3.9, k = Math.floor(now / CYC), local = now - k * CYC;
    return <React.Fragment>
      <Fireworks T={local} at={0} dur={CYC} count={16} seed={7 + k} area={[60, 0, 3720, 820]} scale={1.2} z={60} />
      {k > 0 && <Fireworks T={local + CYC} at={0} dur={CYC} count={16} seed={6 + k} area={[60, 0, 3720, 820]} scale={1.2} z={60} />}
    </React.Fragment>;
  }

  // ---------- Piece ----------
  const KEYS = { hook: 'Móc câu · Won', rew: 'Tua ngược 84 → 0', map1: 'Service Map · mở', camp: 'Ngày 0 · Campaign', warm: 'Lead · Warm 56', feed: 'Mỗi lần chạm cộng điểm', mql: 'MQL · A2 · 75', why: 'Vì sao 75 điểm', cardA: 'Service card · Lead', pipe: 'Pipeline 6 giai đoạn', deal: 'Deal · nhận bàn giao', dm: '5 người quyết định', play: 'Playbook · todo tự động', pcop: 'Copilot · tóm tắt deal', d55: 'Ngày 55 · bị so giá', cfo: 'Phá băng · CFO duyệt', quote: 'Báo giá từ deal', review: 'Gửi duyệt nội bộ', pub: 'Approved · Published', cardC: 'Service card · Quote', sign: 'Ký → chuyển thành đơn', order: 'Đơn · lịch thu 30/70', cardD: 'Service card · Order', cop1: 'Copilot · tóm tắt 84 ngày', cop2: 'Copilot · việc còn thiếu', cardB: 'Service card · Sales', won: 'Won', lwon: 'Lead nhận kết quả Won', push: 'Push custom audience', cardE: 'Service card · Campaign', map2: 'Service Map · đầy đủ', end: 'Câu chốt' };
  const ORDER = Object.keys(KEYS);
  const CHAIN_OF = { camp: 0, warm: 1, feed: 1, mql: 1, why: 1, cardA: 1, pipe: 2, deal: 2, dm: 2, play: 2, pcop: 2, d55: 2, cfo: 2, quote: 3, review: 3, pub: 3, cardC: 3, sign: 3, order: 4, cardD: 4, cop1: 2, cop2: 2, cardB: 2, won: 2, lwon: 1, push: 1, cardE: 0 };

  function CycleDaiPiece({ tweaks }) {
    const { T, CUES } = window.React.useContext(window.CompositionContext);
    const C = {}; ORDER.forEach(k => { C[k] = CUES[KEYS[k]] ?? (k === 'end' ? Infinity : NaN); });
    ORDER.slice().reverse().forEach((k, i, arr) => { if (Number.isNaN(C[k])) C[k] = i === 0 ? Infinity : C[arr[i - 1]]; });
    const L = window.DaiLead || {}, S = window.DaiSales || {}, M = window.DaiCommerce || {}, PB = window.DaiPlaybook || {};
    const ready = L.LeadScreen && S.DealScreen && M.OrderScreen;
    const next = (k) => C[ORDER[ORDER.indexOf(k) + 1]];
    const caps = [
      ['map1', { eyebrow: '5 service · 1 dòng dữ liệu', title: 'Output của bước trước là input của bước sau', wide: true }],
      ['camp', { eyebrow: 'Campaign', title: 'Ngày 0 · 21:47 · một form Meta Ads', sub: 'Mỗi lead sinh ra đều mang theo nguồn: chiến dịch nào, kênh nào.' }],
      ['warm', { eyebrow: 'Lead Service', title: 'Người điền form chưa chắc là người mua', sub: 'Lead mới được chấm Warm 56: có quan tâm, chưa đủ để giao Sales.' }],
      ['feed', { eyebrow: 'Lead Service', title: 'Mỗi lần chạm đều cộng điểm', sub: 'Email, cuộc gọi, ghi chú trong 3 tuần đẩy điểm từ 56 lên 75.' }],
      ['mql', { eyebrow: 'Lead Service · AI Scoring', title: 'Đủ điểm, lead tự thành MQL', sub: 'Luật MQL: Fit ≥ C và Intent ≥ 50. Lead sẵn sàng chuyển Sales.', tone: 'green' }],
      ['why', { eyebrow: 'Lead Service · AI Scoring', title: 'Qualify bằng luật, không bằng cảm tính', sub: 'Fit: khách có đúng chân dung không. Intent: khách có sẵn sàng mua không.' }],
      ['pipe', { eyebrow: 'Sales Pipeline', title: 'SQL → SAL → Báo giá → Ký hợp đồng', sub: 'Sales nhận lead đã qualify và đưa deal qua 6 giai đoạn.' }],
      ['deal', { eyebrow: 'Sales Pipeline', title: 'Nhận bàn giao, không hỏi lại từ đầu', sub: 'Nhu cầu, số lượng, nguồn lead đã có sẵn trong deal.' }],
      ['dm', { eyebrow: 'Sales Pipeline', title: '5 người quyết định', sub: 'Deal B2B cần biết ai đề xuất, ai so giá, ai duyệt chi, ai ký.' }],
      ['play', { eyebrow: 'Sales Pipeline · Playbook', title: 'Cycle dài, Sales không phải đoán việc tiếp theo', sub: 'Dựa trên giá trị, giai đoạn và người quyết định, playbook tự sinh todo theo kịch bản đã thiết lập.' }],
      ['pcop', { eyebrow: 'Sales Pipeline · AI Copilot', title: 'Hỏi một câu, thấy cả deal', sub: 'Copilot tóm tắt người quyết định, rủi ro và việc cần làm tiếp.' }],
      ['d55', { eyebrow: 'Deal đứng 21 ngày ở Báo giá', title: 'Ngày 55: bị so giá, Jasmine đắt nhất', sub: 'Báo giá lần 1: 1,7 tỷ, cao hơn 2 nhà cung cấp khác khoảng 18%.', tone: 'red' }],
      ['cfo', { eyebrow: 'Sales Pipeline', title: 'Phá băng bằng dữ liệu', sub: 'Giảm 30% có người duyệt. CFO đồng ý 1,19 tỷ, thanh toán 30/70.' }],
      ['quote', { eyebrow: 'Quote Service', title: 'Báo giá sinh ra từ deal', sub: 'Sản phẩm, số lượng, chiết khấu có sẵn. Tổng tự tính.' }],
      ['review', { eyebrow: 'Quote Service · Approval', title: 'Giảm giá phải có người duyệt', sub: 'Báo giá chỉ được gửi khách sau khi qua duyệt nội bộ.' }],
      ['pub', { eyebrow: 'Quote Service', title: 'Đã duyệt, được gửi cho khách', sub: 'Trạng thái Published · mã báo giá JJBG-0006.', tone: 'green' }],
      ['sign', { eyebrow: 'Quote → Order Service', title: 'Ký là có đơn', sub: 'Khách chấp nhận và ký, báo giá chuyển thành đơn hàng.' }],
      ['order', { eyebrow: 'Order Service', title: 'Đơn hàng có sẵn lịch thu 30/70', sub: 'Cọc 357 triệu sau ký, 833 triệu sau nghiệm thu.' }],
      ['cop1', { eyebrow: 'Sales Pipeline · AI Copilot', title: 'Hỏi một câu, thấy cả 84 ngày', sub: 'Copilot đọc toàn bộ lịch sử deal và tóm tắt theo từng giai đoạn.' }],
      ['cop2', { eyebrow: 'Sales Pipeline · AI Copilot', title: 'AI Copilot tóm tắt 84 ngày', sub: 'Ba việc tiếp theo, mỗi việc có người phụ trách và hạn.' }],
      ['won', { eyebrow: 'Sales Pipeline · Ngày 84', title: 'Won', sub: '18/09/2026 · ký hợp đồng 1,19 tỷ · nhận cọc 30%.', tone: 'green', big: true }],
      ['lwon', { eyebrow: 'Sales → Lead Service', title: 'Lead biết mình thành doanh thu', sub: 'Kết quả Won ghi ngược về lead gốc và chiến dịch gốc.', tone: 'green' }],
      ['push', { eyebrow: 'Lead Service → Campaign', title: 'Quảng cáo học từ khách thật', sub: 'Tệp khách Won gửi lên Meta làm mẫu để tìm khách tương tự.', tone: 'amber' }],
      ['map2', { eyebrow: 'Service Map', title: 'Năm service, một dòng dữ liệu, một vòng lặp', wide: true }],
    ];
    const dayMap = [[C.camp, 0], [C.warm, 1], [C.feed, 12], [C.mql, 18], [C.pipe, 22], [C.deal, 25], [C.play, 40], [C.d55, 55], [C.cfo, 72], [C.review, 76], [C.sign, 84]];
    let day = 0, dayF = 0, prevD = 0; dayMap.forEach(([t, d]) => { if (T >= t) { day = d; dayF = lerp(prevD, d, ez(T, t, 1.1)); prevD = d; } });
    const showTL = Math.min(ez(T, C.camp + 0.3, 0.7), ez(C.map2, T, 0.5));
    let curKey = ORDER[0]; ORDER.forEach(k => { if (T >= C[k]) curKey = k; });
    const tone = curKey === 'd55' ? 'red' : ['won', 'lwon'].includes(curKey) ? 'green' : ['push', 'cardE'].includes(curKey) ? 'amber' : 'blue';
    const rewP = T >= C.rew && T < C.map1 ? Easing.easeInOutCubic(clamp((T - C.rew - 0.3) / 3.6, 0, 1)) : 0;
    const rewDay = Math.round(84 * (1 - rewP)), inHook = T < C.map1;
    const chainShow = Math.min(ez(T, C.camp + 0.4, 0.6), ez(C.map2, T, 0.5));
    return <div data-screen-label={curKey} style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: AF, color: '#fff', background: '#061530' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'linear-gradient(135deg,#123A78 0%,#0A1F44 55%,#061530 100%)' }}>
        <div style={{ position: 'absolute', left: `${20 + Math.sin(T / 9) * 12}%`, top: `${10 + Math.cos(T / 11) * 10}%`, width: 1600, height: 1000, transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse, rgba(102,180,240,.16) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.08) 1.5px, transparent 1.5px)', backgroundSize: '48px 48px', opacity: .5 }} />
        {[['red', 'rgba(248,113,113,.20)'], ['green', 'rgba(74,222,128,.18)'], ['amber', 'rgba(240,162,59,.16)']].map(([k, c]) => <div key={k} style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${c} 0%, transparent 60%)`, opacity: tone === k || (k === 'green' && inHook) ? 1 : 0, transition: 'opacity .8s' }} />)}

        {ready && <div style={{ position: 'absolute', inset: 0, filter: rewP > 0 ? `blur(${rewP * 18}px)` : 'none', opacity: inHook ? 1 - rewP * 0.75 : 1 }}>
          <S.DealScreen T={T} from={C.hook} to={C.rew + 1.2} C={C} phase="hook" />
          <L.CampaignScreen T={T} from={C.camp} to={C.warm} at={C.camp} />
          <L.LeadScreen T={T} from={C.warm} to={C.pipe} C={C} />
          <S.PipelineScreen T={T} from={C.pipe} to={C.deal} at={C.pipe} />
          <S.DealScreen T={T} from={C.deal} to={C.play} C={C} phase="journey" />
          {PB.PlaybookScreen && <PB.PlaybookScreen T={T} from={C.play} to={C.pcop} at={C.play} C={C} />}
          {PB.CopilotDealScreen && <PB.CopilotDealScreen T={T} from={C.pcop} to={C.d55} at={C.pcop} C={C} />}
          <S.DealScreen T={T} from={C.d55} to={C.quote} C={C} phase="journey" />
          <M.QuoteModalScreen T={T} from={C.quote} to={C.pub} C={C} />
          <M.QuoteScreen T={T} from={C.pub} to={C.order} C={C} />
          <M.OrderScreen T={T} from={C.order} to={C.cop1} C={C} />
          <S.DealScreen T={T} from={C.cop1} to={C.lwon} C={C} phase="close" />
          <L.LeadScreen T={T} from={C.lwon} to={C.push} C={C} won />
          <L.LeadListScreen T={T} from={C.push} to={C.map2} at={C.push} />
        </div>}
        {T < C.map1 && <div style={{ position: 'absolute', left: LX0, top: 0, height: FH, width: 1300, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 40, opacity: ez(C.rew + 0.6, T, 0.5) }}>
          <span style={{ font: `500 31px ${MONO}`, letterSpacing: 3, color: INK3, marginBottom: 32, ...rise(T, C.hook + 0.6, 0.7, 24) }}>BÁN HÀNG CHU KỲ DÀI</span>
          <span style={{ font: `800 190px/0.95 ${AF}`, color: '#fff', letterSpacing: -5, ...rise(T, C.hook + 1.0, 0.7, 40) }}>84 ngày.</span>
          <span style={{ font: `800 190px/0.95 ${AF}`, color: GREEN, letterSpacing: -5, ...rise(T, C.hook + 1.6, 0.7, 40) }}>1,19 tỷ.</span>
          <span style={{ width: 96, height: 3, background: GREEN, borderRadius: 2, margin: '40px 0 24px', ...rise(T, C.hook + 2.3, 0.6, 12) }} />
          <span style={{ font: `400 36px/1.35 ${AF}`, color: INK2, ...rise(T, C.hook + 2.5, 0.6, 16) }}>Việt Phúc × Jasmine Jewelry<br />26/06 → 18/09/2026 · một deal quà Tết doanh nghiệp</span>
        </div>}
        {T >= C.rew && T < C.map1 && <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, paddingBottom: 160, opacity: Math.min(ez(T, C.rew + 0.2, 0.5), ez(C.map1, T, 0.5)) }}>
          <span style={{ font: `500 28px ${MONO}`, letterSpacing: 3, color: INK3 }}>NGÀY</span>
          <span style={{ font: `500 300px/1 ${MONO}`, color: '#fff', letterSpacing: -8, fontVariantNumeric: 'tabular-nums' }}>{String(rewDay).padStart(2, '0')}</span>
          <span style={{ font: `700 62px ${AF}`, color: '#fff', opacity: ez(T, C.rew + 3.4, 0.5) }}>Tua lại từ ngày 0</span>
        </div>}

        <Fireworks T={T} at={C.hook + 1.3} dur={5.4} count={10} seed={3} area={[1680, 240, 1850, 450]} scale={0.95} floor={1200} clip="inset(240px 180px 90px 1560px round 0 0 16px 16px)" />
        {T >= C.won + 3.9 && T < C.lwon + 0.5 && <WonFireworks T={T} at={C.won + 3.9} />}
        <ServiceMap T={T} at={C.map1} out={C.camp} />
        <ServiceMap T={T} at={C.map2} full out={C.end} />
        {[['cardA', 'A'], ['cardB', 'B'], ['cardC', 'C'], ['cardD', 'D'], ['cardE', 'E', 'amber']].map(([k, id, t]) => <ServiceCard key={k} T={T} at={C[k] + 0.3} to={next(k)} id={id} tone={t} />)}
        {tweaks.showCaptions !== false && caps.map(([k, g]) => <Caption key={k} T={T} from={C[k]} to={next(k)} {...g} />)}
        <Chain cur={CHAIN_OF[curKey] ?? -1} show={CHAIN_OF[curKey] != null && !curKey.startsWith('card') ? chainShow : 0} />
        <Timeline dayF={dayF} day={day} show={showTL} tone={tone} />

        {T >= C.end && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 160, background: '#061530', opacity: ez(T, C.end, 0.8) }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'center' }}>
            <span style={{ font: `800 140px/1.1 ${AF}`, color: '#fff', letterSpacing: -2, ...rise(T, C.end + 0.6, 0.7, 24) }}>Deal dài không thua vì thiếu khách.</span>
            <span style={{ font: `800 140px/1.1 ${AF}`, color: AMBER, letterSpacing: -2, ...rise(T, C.end + 1.8, 0.7, 24) }}>Deal dài thua vì mất trí nhớ.</span>
          </div>
        </div>}
      </div>
    </div>;
  }
  window.CycleDaiPiece = CycleDaiPiece;
})();
