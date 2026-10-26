// Mockup DOM cho từng frame (thay ảnh chụp để nét trên LED). Mỗi frame một hiệu ứng theo thông điệp.
const B = window.CODBase;
const { Chrome, NavMock, NAVS, ez, io, rise, lerp, clamp, fmt, AF, MONO, UI, GREEN, RED, AMBER, BLUE, INK2, FW, FRAME_W, FRAME_H, FRAME_TOP, Tx, Pill, Btn, Card, CardHead, HOOK_COLS, CompletedBody } = B;
const { DEMO_X, SPLIT_W, SPLIT_TOP } = B;
const Z = 1.2, W0 = Math.round(FRAME_W / Z), H0 = Math.round(FRAME_H / Z);
const typed = (s, T, at, cps = 24) => T < at ? '' : s.slice(0, Math.floor((T - at) * cps));
const Caret = ({ on }) => on ? <span style={{ display: 'inline-block', width: 2, height: '1em', background: '#2563EB', verticalAlign: 'text-bottom', marginLeft: 1 }} /> : null;
const Sp = () => <span style={{ flex: 1 }} />;
const Lbl = ({ children, st }) => <Tx s={10.5} w={600} c="#98A2B3" st={{ letterSpacing: .6, ...st }}>{children}</Tx>;
const Hr = () => <div style={{ height: 1, background: '#E7E9EF' }} />;
const Sel = ({ children, hi = 0, st }) => <div style={{ display: 'flex', alignItems: 'center', padding: '9px 12px', borderRadius: 6, border: `${1 + hi}px solid ${hi > 0 ? `rgba(37,99,235,${hi})` : '#D0D5DD'}`, background: '#fff', boxShadow: `0 0 0 ${4 * hi}px rgba(37,99,235,.15)`, ...st }}><Tx s={13} c="#101828">{children}</Tx><Sp /><Tx s={11} c="#98A2B3">⌄</Tx></div>;

// Vùng nhấn: viền màu + làm tối phần còn lại (thay spotlight ảnh)
const Focus = ({ p, col = BLUE, st, label, children, pad = 8, right }) => (
  <div style={{ position: 'relative', ...st }}>
    {children}
    {p > 0 && <div style={{ position: 'absolute', inset: -pad, borderRadius: 10, border: `2.5px solid ${col}`, boxShadow: `0 0 0 6000px rgba(6,21,48,${0.42 * p}), 0 0 28px ${col}88`, opacity: p, pointerEvents: 'none', zIndex: 5 }}>
      {label && <span style={{ position: 'absolute', ...(right ? { right: -2 } : { left: -2 }), top: -38, padding: '5px 14px', borderRadius: 999, background: 'rgba(6,21,48,.9)', border: `1.5px solid ${col}`, font: `500 19px ${AF}`, color: '#fff', whiteSpace: 'nowrap' }}>{label}</span>}
    </div>}
  </div>
);
// Con trỏ chuột đi từ a → b rồi click
function Cursor({ T, at, a, b, dur = 0.9 }) {
  if (T < at || T > at + dur + 1.2) return null;
  const p = io(T, at, dur), x = lerp(a[0], b[0], p), y = lerp(a[1], b[1], p);
  const cl = clamp((T - at - dur) / 0.5, 0, 1);
  return <div style={{ position: 'absolute', left: x, top: y, zIndex: 9, pointerEvents: 'none' }}>
    {cl > 0 && cl < 1 && <span style={{ position: 'absolute', left: -14, top: -14, width: 28, height: 28, borderRadius: '50%', border: `2px solid ${BLUE}`, transform: `scale(${0.4 + cl * 1.4})`, opacity: 1 - cl }} />}
    <svg width="22" height="26" viewBox="0 0 22 26" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.4))', transform: cl > 0 && cl < 0.5 ? 'scale(.9)' : 'none' }}><path d="M2 2 L20 13 L11.5 14.5 L7 23 Z" fill="#101828" stroke="#fff" strokeWidth="1.5" /></svg>
  </div>;
}
const Toast = ({ T, at, children, col = '#16A34A' }) => { const p = ez(T, at, 0.5); if (p <= 0) return null; return <div style={{ position: 'absolute', right: 24, bottom: 20, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, background: '#fff', border: '1px solid #E7E9EF', boxShadow: '0 12px 30px rgba(0,0,0,.18)', opacity: p, transform: `translateY(${(1 - p) * 16}px)`, zIndex: 8 }}><span style={{ width: 18, height: 18, borderRadius: '50%', background: col, color: '#fff', display: 'grid', placeItems: 'center', font: `700 11px ${UI}` }}>✓</span><Tx s={13} w={500} c="#101828">{children}</Tx></div>; };

// Khung màn hình: Chrome + zoom Z + menu trái
function Screen({ T, from, to, nav, split = 0, children, zoom = Z }) {
  if (T < from || T > to + 0.5) return null;
  const w = FRAME_W, h = FRAME_H, op = Math.min(ez(T, from, 0.5), ez(to + 0.5, T, 0.45));
  const k = lerp(1, SPLIT_W / w, split), L = lerp(DEMO_X, 120, split), Tp = lerp(FRAME_TOP, SPLIT_TOP, split);
  const navW = nav ? (NAVS[nav].rail ? 236 : 180) : 0, iw = Math.round(w / zoom), ih = Math.round(h / zoom);
  return <Chrome w={w} h={h} L={L} Tp={Tp} k={k} op={op} rp={ez(T, from, 0.8)}>
    <div style={{ position: 'absolute', inset: 0, background: '#F7F8FA' }} />
    <div style={{ position: 'absolute', left: 0, top: 0, width: iw, height: ih, zoom, fontFamily: UI }}>
      {nav && <NavMock kind={nav} k={1.02} h={ih} />}
      <div style={{ position: 'absolute', left: navW, top: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{children}</div>
    </div>
  </Chrome>;
}
const Head = ({ title, code, status, tone = 'green', right, children }) => {
  const c = { green: ['#027A48', '#ECFDF3'], blue: ['#175CD3', '#EFF8FF'], gray: ['#667085', '#F2F4F7'] }[tone];
  return <div style={{ height: 52, flex: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}>
    <span style={{ width: 24, height: 24, borderRadius: 6, background: '#F2F4F7', display: 'grid', placeItems: 'center', font: `600 13px ${UI}`, color: '#667085' }}>‹</span>
    <Tx s={16} w={700} c="#101828">{title}</Tx>
    {code && <Tx s={10} c="#667085" st={{ fontFamily: MONO, padding: '2px 6px', background: '#F2F4F7', borderRadius: 4 }}>{code}</Tx>}
    {status && <Pill c={c[0]} bg={c[1]}>● {status}</Pill>}
    {children}<Sp /><span style={{ display: 'flex', gap: 8, flex: 'none' }}>{right}</span><Tx s={16} c="#667085">···</Tx>
  </div>;
};
const OrderLeft = ({ tabs = [['Overview', '', 1], ['Fulfillment', '0%'], ['Billing', ''], ['Activity', '8']], link = false, total = '₫4,900,000' }) => (
  <div style={{ width: 250, flex: 'none', borderRight: '1px solid #E7E9EF', background: '#fff', padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Lbl>CREATED BY</Lbl><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#B2CCFF' }} /><Tx s={13} w={600} c="#101828">Phương Hà</Tx><Tx s={12} c="#98A2B3">· Sep 21, 2026</Tx></span></div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><Lbl>ORDER TOTAL</Lbl><span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Tx s={28} w={800} c="#101828" st={{ letterSpacing: -0.8 }}>{total}</Tx><Tx s={12} w={500} c="#667085">VND</Tx></span></div>
    <Hr />
    {tabs.map(([l, r, act]) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', margin: '-5px -10px', borderRadius: 6, background: act ? '#EEF4FF' : 'transparent' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: act ? '#2563EB' : '#D0D5DD' }} /><Tx s={13} w={act ? 600 : 400} c={act ? '#1D4ED8' : '#344054'}>{l}</Tx><Sp /><Tx s={12} c="#98A2B3">{r}</Tx></span>)}
    <Hr />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', alignItems: 'center' }}><Lbl>PUBLIC LINK</Lbl><Sp />{link && <Pill c="#027A48" bg="#ECFDF3">● ACTIVE</Pill>}</span>{link ? <span style={{ padding: '7px 10px', borderRadius: 6, border: '1px solid #E7E9EF', font: `400 11px ${MONO}`, color: '#667085', whiteSpace: 'nowrap', overflow: 'hidden' }}>commerce.base.com.vn/p/base…</span> : <Tx s={12} c="#98A2B3">Available after confirming.</Tx>}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', alignItems: 'center' }}><Lbl>CUSTOMER DOCUMENT</Lbl><Sp /><Pill c="#667085" bg="#F2F4F7">Not composed</Pill></span><div style={{ height: 120, borderRadius: 6, border: '1px solid #E7E9EF', background: '#FAFBFC', padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ width: '70%', height: 6, background: '#D0D5DD', borderRadius: 2 }} />{[55, 80, 60].map((x, i) => <span key={i} style={{ width: `${x}%`, height: 4, background: '#E7E9EF', borderRadius: 2 }} />)}</div></div>
  </div>
);

// ================= 01 / 13 / 14 — Bảng tồn kho =================
const STOCK = [['Nhẫn Bạc Đá Chủ Halo Aurora', 'JJ-NH-003', 4, '1.800.000', 'Low stock'], ['Bộ Trang Sức Cỏ Bốn Lá Lucky Clover', 'JJ-BO-001', 6, '3.400.000', 'In stock', 'Set (set)'], ['Khuyên Tai Bạc Đá Vuông Crystal Drop', 'JJ-KT-001', 20, '1.120.000', 'In stock'], ['Dây Chuyền Bạc Mặt Đá Lục Emerald Halo', 'JJ-DC-002', 2, '1.960.000', 'Critical'], ['Dây Chuyền Bạc Mặt Đá Đỏ Ruby Halo', 'JJ-DC-001', 11, '1.960.000', 'In stock'], ['Lắc Tay Bạc Đính Đá Simple Chain', 'JJ-LT-001', 14, '1.680.000', 'In stock'], ['Nhẫn Bạc Full Đá Eternity', 'JJ-NH-005', 9, '1.520.000', 'In stock'], ['Nhẫn Bạc Xoắn Đính Đá Comet', 'JJ-NH-004', 12, '1.400.000', 'In stock'], ['Nhẫn Bạc Nơ Xinh Ribbon', 'JJ-NH-002', 15, '1.180.000', 'In stock'], ['Nhẫn Bạc Hoa Bốn Cánh Lucky Bloom', 'JJ-NH-001', 18, '1.280.000', 'In stock']];
const ST_C = { 'In stock': ['#027A48', '#ECFDF3'], 'Low stock': ['#B54708', '#FFFAEB'], Critical: ['#B42318', '#FEF3F2'] };
function StockTable({ T, at, after, narrow, label, qtyPop, noFocus }) {
  const EM = [...STOCK[3]]; EM[2] = 1;
  const rows = after ? [EM, ...STOCK.filter((_, i) => i !== 3)] : STOCK, hiIdx = after ? 0 : 3;
  const cols = narrow ? ['NAME', 'SKU', 'BARCODE', 'ON HAND', 'AVAILABLE', 'RESERVED'] : ['NAME', 'SKU', 'BARCODE', 'ON HAND', 'AVAILABLE', 'RESERVED', 'COST', 'UNIT', 'STATUS', 'UPDATED'];
  const grid = narrow ? '2.4fr .9fr .8fr .8fr .8fr .8fr' : '2.4fr .9fr .8fr .8fr .8fr .8fr .9fr .9fr 1fr 1fr';
  const hp = noFocus ? 0 : ez(T, at, 0.6), pop = qtyPop ? 1 + 0.35 * Math.sin(Math.PI * clamp((T - at - 0.3) / 0.6, 0, 1)) : 1;
  return <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
    <div style={{ height: 52, display: 'flex', alignItems: 'center', gap: 10 }}><Tx s={15} w={700} c="#101828">Stock items</Tx><Tx s={12} c="#98A2B3">10</Tx><Sp />{!narrow && <><span style={{ width: 170, padding: '7px 12px', borderRadius: 6, border: '1px solid #D0D5DD', font: `400 12px ${UI}`, color: '#98A2B3' }}>⌕ Search name / SKU / barcode…</span><span style={{ padding: '7px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>+ New stock item</span></>}</div>
    <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 12, padding: '8px 12px', borderBottom: '1px solid #E7E9EF' }}>{cols.map(c => <Lbl key={c} st={{ textAlign: ['ON HAND', 'AVAILABLE', 'RESERVED', 'COST'].includes(c) ? 'right' : 'left' }}>{c}</Lbl>)}</div>
    {rows.map(([n, sku, q, cost, st, unit = 'Piece (pc)'], i) => { const hi = i === hiIdx, rp = ez(T, at - 1.2 + i * 0.05, 0.4), dim = hi ? 1 : 1 - 0.55 * hp; const c = ST_C[st]; const isDate = after && hi ? '21 thg 9, 2026' : '15 thg 9, 2026'; return (
      <Focus key={sku} p={hi ? hp : 0} col={RED} label={hi ? label : null} pad={2} st={{ opacity: rp * dim, transform: `translateX(${(1 - rp) * -16}px)` }}>
        <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 12, alignItems: 'center', padding: '10px 12px', background: hi ? `rgba(254,243,242,${hp})` : '#fff', borderBottom: '1px solid #F2F4F7', borderRadius: hi ? 8 : 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}><span style={{ width: 22, height: 22, borderRadius: 6, background: '#EEF4FF', flex: 'none', display: 'grid', placeItems: 'center', font: `600 11px ${UI}`, color: '#2563EB' }}>◈</span><span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}><Tx s={13} w={600} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{n}</Tx><Tx s={11} c="#98A2B3" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{n}</Tx></span></span>
          <Tx s={11} c="#667085" st={{ fontFamily: MONO }}>{sku}</Tx><Tx s={12} c="#98A2B3">—</Tx>
          <Tx s={hi ? 18 : 13} w={700} c={hi ? '#B42318' : '#101828'} st={{ textAlign: 'right', display: 'inline-block', transform: hi ? `scale(${pop})` : 'none', transformOrigin: '100% 50%' }}>{q}</Tx>
          <Tx s={13} w={600} c="#16A34A" st={{ textAlign: 'right' }}>{q}</Tx><Tx s={13} c="#344054" st={{ textAlign: 'right' }}>0</Tx>
          {!narrow && <><Tx s={13} c="#344054" st={{ textAlign: 'right' }}>{cost}</Tx><Tx s={12} c="#667085">{unit}</Tx><span><Pill c={c[0]} bg={c[1]}>● {st}</Pill></span><Tx s={12} c="#667085">{isDate}</Tx></>}
        </div>
      </Focus>); })}
  </div>;
}
const InvHead = () => <div style={{ height: 52, flex: 'none', display: 'flex', alignItems: 'center', padding: '0 20px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}><Tx s={16} w={700} c="#101828">Kho Jasmine – 200 3/2</Tx></div>;
function StockScreen({ T, from, to, at }) { return <Screen T={T} from={from} to={to} nav="inventory"><StockTable T={T} at={at} label="Emerald Halo · JJ-DC-002 · còn 2 · Sắp hết hàng" qtyPop /></Screen>; }
function StockAfterScreen({ T, from, to, at }) { return <Screen T={T} from={from} to={to} nav="inventory"><StockTable T={T} at={at} after label="Emerald Halo · còn 1 · tồn kho tự cập nhật" qtyPop /></Screen>; }
function CopilotScreen({ T, from, to, at }) {
  const p = ez(T, at, 0.7), ans = 'Dây chuyền Emerald Halo (JJ-DC-002) còn lại 1 chiếc. Hệ thống đang khuyến nghị đặt hàng thêm 2.16 chiếc vì số lượng hiện tại đang dưới điểm đặt hàng lại.';
  const a = typed(ans, T, at + 1.6, 60), done = a.length >= ans.length, q3 = ez(T, at + 4.6, 0.5);
  return <Screen T={T} from={from} to={to} nav="inventory">
    <StockTable T={T} at={at - 3} after narrow noFocus />
    <div style={{ position: 'absolute', right: 16, top: 40, bottom: 16, width: 400, borderRadius: 12, background: '#fff', border: '1px solid #E7E9EF', boxShadow: '0 24px 60px rgba(0,0,0,.22)', display: 'flex', flexDirection: 'column', padding: 16, gap: 14, opacity: p, transform: `translateX(${(1 - p) * 60}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><img src="assets/app-icons/inventory.svg" alt="" style={{ width: 20, height: 20, borderRadius: 5 }} /><Tx s={14} w={700} c="#101828">Copilot</Tx><Pill c="#6941C6" bg="#F4EBFF">BETA</Pill><Sp /><Tx s={12} c="#98A2B3">ⓘ  ⟳  ···  ✕</Tx></div>
      <div style={{ alignSelf: 'flex-end', maxWidth: 320, padding: '10px 12px', borderRadius: 10, background: '#F2F4F7', ...rise(T, at + 0.5, 0.4, 8) }}><Tx s={13} c="#101828" st={{ whiteSpace: 'normal', lineHeight: 1.4 }}>Dây chuyền Emerald Halo (JJ-DC-002) vừa bán 1 chiếc, còn bao nhiêu và có cần đặt thêm không?</Tx></div>
      <div style={{ display: 'flex', gap: 14, borderBottom: '1px solid #E7E9EF', opacity: ez(T, at + 1.2, 0.3) }}><Tx s={13} w={600} c="#2563EB" st={{ paddingBottom: 6, borderBottom: '2px solid #2563EB' }}>Answer</Tx><Tx s={13} c="#667085">Thinking</Tx></div>
      <Tx s={13.5} c="#101828" st={{ whiteSpace: 'normal', lineHeight: 1.5 }}>{a}<Caret on={a.length > 0 && !done} /></Tx>
      {done && <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...rise(T, at + 4.0, 0.4, 8) }}><Lbl>ASK FOLLOW-UP</Lbl>
        {['Dây chuyền này có đang được bán ở Kho Jasmine – 200 3/2 không?', 'Khi nào thì cần đặt hàng bổ sung?', 'Tôi có thể tạo lệnh đặt hàng ngay bây giờ không?'].map((s, i) => <Focus key={i} p={i === 2 ? q3 : 0} col={AMBER} pad={6} label={i === 2 ? 'Đề xuất tạo lệnh đặt hàng' : null}><Tx s={13} w={600} c="#6941C6" st={{ whiteSpace: 'normal' }}>{s}</Tx></Focus>)}</div>}
      <Sp />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 999, border: '1px solid #D0D5DD' }}><Tx s={13} c="#98A2B3">Ask a question</Tx><Sp /><span style={{ width: 22, height: 22, borderRadius: '50%', background: '#D0D5DD' }} /></div>
    </div>
  </Screen>;
}

// ================= 02 / 04 — Order overview =================
const CF = [['Kênh bán', 'Fanpage Facebook', 1], ['Size nhẫn / độ dài dây', 'Dây 45cm'], ['Nội dung khắc', '—'], ['Ngày khách cần nhận', '22 thg 9, 2026'], ['Gói quà tặng kèm thiệp', 'YES', 2]];
function OrderOverview({ T, from, to, at, confirmed, split = 0 }) {
  const cP = confirmed ? ez(T, at, 0.4) : 0, flip = confirmed ? Math.sin(Math.PI * clamp((T - at) / 0.5, 0, 1)) : 0;
  const stages = ['Draft', 'Confirmed', 'Preparing', 'Ready', 'Shipped', 'Delivered'], active = confirmed && T >= at + 0.2 ? 1 : 0;
  const instrP = confirmed ? 0 : ez(T, at + 2.7, 0.5);
  return <Screen T={T} from={from} to={to} nav="order" split={split}>
    <Head title="Đơn online Quốc Bảo - +84908215736" code={confirmed ? 'JJDH-0004' : null} status={cP > 0 ? 'Confirmed' : 'Draft'} tone={cP > 0 ? 'blue' : 'gray'} right={confirmed ? <span style={{ padding: '7px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>◎ Complete order</span> : <span style={{ display: 'flex', gap: 8 }}><Btn>✎ Edit</Btn><Btn>▤ Design document</Btn><span style={{ padding: '7px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>◎ Confirm order</span></span>} />
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <OrderLeft tabs={[['Overview', '', 1], ['Fulfillment', confirmed ? '0%' : ''], ['Billing', ''], ['Activity', confirmed ? '9' : '8']]} link={confirmed} />
      <div style={{ flex: 1, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, background: '#EFF4FF', borderLeft: '3px solid #2563EB' }}><span style={{ width: 26, height: 26, borderRadius: 6, background: '#fff', display: 'grid', placeItems: 'center', font: `600 12px ${UI}`, color: '#2563EB' }}>{confirmed ? '⛟' : '◎'}</span><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">{cP > 0 ? 'Confirmed — awaiting execution' : 'Ready to confirm'}</Tx><Tx s={12} c="#667085">{cP > 0 ? 'Record a delivery, issue an invoice or collect a payment to start.' : 'Confirming locks the terms and opens fulfillment & billing.'}</Tx></span><Sp />{cP > 0 && <span style={{ padding: '6px 12px', borderRadius: 6, background: '#2563EB', font: `500 12px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none', opacity: cP }}>Go to fulfillment</span>}</div>
        <Card st={{ gap: 14 }}>
          <Tx s={14} w={700} c="#101828">Commercial agreement</Tx>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Lbl>CUSTOMER</Lbl><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 30, height: 30, borderRadius: 6, background: '#EEF4FF', display: 'grid', placeItems: 'center', font: `600 13px ${UI}`, color: '#2563EB' }}>T</span><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={14} w={600} c="#101828">Trần Quốc Bảo</Tx><Tx s={11} c="#98A2B3">No company details on file</Tx></span></span>
              <Lbl>SOLD BY</Lbl><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={13} w={600} c="#101828">Công ty TNHH Trang sức Jasmine</Tx><Tx s={11} c="#98A2B3">Tax ID 0110245678</Tx></span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderLeft: '1px solid #E7E9EF', paddingLeft: 24 }}>
              <Lbl>PAYMENT TERMS</Lbl>
              {[['Collection', 'Send invoice'], ['Terms', 'On receipt'], ['Currency', 'VND']].map(([a, b]) => <span key={a} style={{ display: 'flex' }}><Tx s={12} c="#667085">{a}</Tx><Sp /><Tx s={12} w={500} c="#101828">{b}</Tx></span>)}
              <Lbl st={{ marginTop: 6 }}>PROJECTED SCHEDULE</Lbl>
              {[['Order confirmed', 'Billing starts here', 'Sep 21, 2026', cP > 0 ? '#16A34A' : '#D0D5DD'], ['Invoice issued', 'Cut from the order', '₫4,900,000', '#2563EB'], ['Payment due', 'Due on invoice receipt', 'Sep 21, 2026', '#D0D5DD']].map(([a, b, c, d]) => <span key={a} style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: d, flex: 'none' }} /><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12} w={600} c="#101828">{a}</Tx><Tx s={11} c="#98A2B3">{b}</Tx></span><Sp /><Tx s={12} w={600} c="#101828">{c}</Tx></span>)}
            </div>
          </div>
          <Hr />
          <Lbl>DELIVERY</Lbl>
          <span style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}><Tx s={12} c="#667085">Recipient <b style={{ color: '#101828', fontWeight: 600 }}>Trần Quốc Bảo · 0908215736</b></Tx><Tx s={12} c="#667085">Ship to <b style={{ color: '#101828', fontWeight: 600 }}>45 Trương Định, Phường Võ Thị Sáu, Quận 3, Hồ Chí Minh…</b></Tx><Tx s={12} c="#667085">Promised <b style={{ color: '#101828', fontWeight: 600 }}>Sep 22, 2026</b></Tx></span>
          <Focus p={instrP} col={BLUE} pad={4} label="Giao trước 12:00 ngày 22/09" st={{ alignSelf: 'flex-start' }}><Tx s={12} c="#667085">Instructions <b style={{ color: '#101828', fontWeight: 600 }}>Giao trước 12:00 ngày 22/09. Quà kỷ niệm ngày cưới – gói hộp + thiệp…</b></Tx></Focus>
        </Card>
        <Card>
          <CardHead t="Line items" sub="1 item" />
          <div style={{ display: 'grid', gridTemplateColumns: '3fr .6fr 1fr 1fr', gap: 12, alignItems: 'center' }}>
            {['ITEM', 'QTY', 'UNIT PRICE', 'AMOUNT'].map((x, i) => <Lbl key={x} st={{ textAlign: i ? 'right' : 'left' }}>{x}</Lbl>)}
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">Dây Chuyền Bạc Mặt Đá Lục Emerald Halo</Tx><Tx s={11} c="#98A2B3" st={{ fontFamily: MONO }}>JJ-DC-002 · One-time</Tx></span>
            <Tx s={13} c="#344054" st={{ textAlign: 'right' }}>×1</Tx><Tx s={13} c="#344054" st={{ textAlign: 'right' }}>₫4,900,000</Tx><Tx s={13} w={700} c="#101828" st={{ textAlign: 'right' }}>₫4,900,000</Tx>
          </div>
        </Card>
      </div>
      <div style={{ width: 270, flex: 'none', borderLeft: '1px solid #E7E9EF', background: '#fff', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Tx s={13} w={700} c="#101828">Pipeline stage</Tx>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>{stages.map((s, i) => <span key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= active ? (i === active ? '#2563EB' : '#16A34A') : '#E7E9EF', transition: 'background .3s' }} />)}</div>
        <div style={{ display: 'flex', gap: 6 }}>{stages.map((s, i) => <Tx key={s} s={9.5} w={i === active ? 700 : 400} c={i === active ? '#101828' : '#98A2B3'} st={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</Tx>)}</div>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Tx s={11} c="#98A2B3">⌖ Next</Tx><Tx s={12} w={600} c="#101828" st={{ transform: `scale(${1 + 0.15 * flip})`, display: 'inline-block', transformOrigin: '0 50%' }}>{cP > 0 ? 'Preparing' : 'Confirmed'}</Tx><Tx s={11} c="#98A2B3">· {cP > 0 ? 'Fulfillment planned' : 'Order confirmed'}</Tx></span>
        <Hr /><Tx s={13} w={700} c="#101828">Order information</Tx>
        {[['Order service', 'Đơn hàng bán lẻ Jasmine'], ['Owner', 'Phương Hà'], ['Created', 'Sep 21, 2026'], ...(cP > 0 ? [['Confirmed', 'Sep 21, 2026, 10:22 PM']] : [])].map(([a, b]) => <span key={a} style={{ display: 'flex' }}><Tx s={12} c="#667085">{a}</Tx><Sp /><Tx s={12} w={500} c="#101828">{b}</Tx></span>)}
        <Hr /><Tx s={13} w={700} c="#101828">Custom fields</Tx>
        <Focus p={confirmed ? 0 : ez(T, at, 0.5) * (1 - instrP)} col={BLUE} pad={10} right label={confirmed ? null : 'Kênh Fanpage · dây 45cm · gói quà kèm thiệp · nhận 22/09'}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{CF.map(([a, b, kind], i) => { const t0 = confirmed ? -10 : at + 0.3 + i * 0.55; const v = confirmed ? b : typed(b, T, t0, 26); const on = T >= t0; return <span key={a} style={{ display: 'flex', flexDirection: 'column', gap: 3, opacity: on ? 1 : 0.35 }}><Tx s={11} c="#98A2B3">{a}</Tx>{kind === 1 ? <span><Pill c="#344054" bg="#F2F4F7">{v}</Pill></span> : kind === 2 ? <span style={{ opacity: v.length ? 1 : 0 }}><Pill c="#027A48" bg="#ECFDF3">{b}</Pill></span> : <Tx s={13} w={500} c="#101828">{v}<Caret on={!confirmed && on && v.length < b.length} /></Tx>}</span>; })}</div>
        </Focus>
      </div>
    </div>
    {confirmed && <Toast T={T} at={at + 0.6}>Order confirmed</Toast>}
    {!confirmed && <Toast T={T} at={at + 3.6}>Saved</Toast>}
  </Screen>;
}

// ================= 03 — Products & pricing =================
function ProductsStep({ T, from, to, at }) {
  const rowP = ez(T, at, 0.6), amt = ez(T, at + 0.4, 0.9), totP = ez(T, at + 1.3, 0.5), pop = 1 + 0.1 * Math.sin(Math.PI * clamp((T - at - 1.3) / 0.5, 0, 1));
  const steps = [['Details', 'VND', 1], ['Customer', 'Trần Quốc Bảo · 1 contact', 1], ['Products & pricing', '1 item · ₫0', 2], ['Payment terms', 'Invoice', 1], ['Review', 'Ready to confirm', 1]];
  return <Screen T={T} from={from} to={to} nav="order">
    <Head title="Đơn online Quốc Bảo - +84908215736" right={<Tx s={15} w={700} c="#101828" st={{ opacity: totP }}>{fmt(4900000 * amt)}</Tx>} />
    <div style={{ flex: 1, display: 'flex' }}>
      <div style={{ width: 200, flex: 'none', borderRight: '1px solid #E7E9EF', padding: '22px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Tx s={11} c="#667085">Step 3 of 5</Tx><span style={{ height: 3, background: '#E7E9EF', borderRadius: 2 }}><span style={{ display: 'block', width: '60%', height: '100%', background: '#2563EB', borderRadius: 2 }} /></span></span>
        {steps.map(([a, b, k]) => <span key={a} style={{ display: 'flex', gap: 10, padding: k === 2 ? '8px 10px' : '0 10px', margin: k === 2 ? '-8px -10px' : '0 -10px', borderRadius: 6, background: k === 2 ? '#EEF4FF' : 'transparent' }}><span style={{ width: 18, height: 18, borderRadius: '50%', flex: 'none', background: k === 2 ? '#2563EB' : '#16A34A', color: '#fff', display: 'grid', placeItems: 'center', font: `700 10px ${UI}` }}>{k === 2 ? '●' : '✓'}</span><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={13} w={600} c={k === 2 ? '#1D4ED8' : '#101828'}>{a}</Tx><Tx s={11} c="#98A2B3">{b}</Tx></span></span>)}
      </div>
      <div style={{ flex: 1, padding: '24px 70px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><Tx s={20} w={700} c="#101828">Products & pricing</Tx><Tx s={13} c="#667085" st={{ whiteSpace: 'normal' }}>List what the buyer is buying, the quantity, and the price they'll pay — discounts, taxes and fees update the totals as you go.</Tx></span>
        <span style={{ display: 'flex', gap: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #E7E9EF', background: '#fff' }}><Tx s={12} w={600} c="#101828">▣ Mua 2 nhẫn tặng 1 khuyên tai</Tx><Tx s={12} c="#667085">add 2 more to qualify</Tx></span>
        <Card st={{ padding: 0, gap: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr .6fr 1fr 1fr .3fr', gap: 12, padding: '10px 20px', borderBottom: '1px solid #E7E9EF' }}>{['ITEM', 'QTY', 'UNIT PRICE', 'AMOUNT', ''].map((x, i) => <Lbl key={i} st={{ textAlign: i ? 'right' : 'left' }}>{x}</Lbl>)}</div>
          <Focus p={ez(T, at + 0.6, 0.5)} col={BLUE} pad={0} label="JJ-DC-002 · ×1 · 4.900.000đ">
            <div style={{ display: 'grid', gridTemplateColumns: '3fr .6fr 1fr 1fr .3fr', gap: 12, alignItems: 'center', padding: '12px 20px', opacity: rowP, transform: `translateY(${(1 - rowP) * 14}px)`, background: '#fff' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">⋮⋮  Dây Chuyền Bạc Mặt Đá Lục Emerald Halo</Tx><Tx s={11} c="#98A2B3" st={{ fontFamily: MONO, marginLeft: 22 }}>JJ-DC-002 · One-time</Tx></span>
              <Tx s={13} w={600} c="#101828" st={{ textAlign: 'right' }}>1</Tx><Tx s={13} c="#344054" st={{ textAlign: 'right' }}>{fmt(4900000 * amt)}</Tx><Tx s={13} w={700} c="#101828" st={{ textAlign: 'right' }}>{fmt(4900000 * amt)}</Tx><Tx s={12} c="#98A2B3" st={{ textAlign: 'right' }}>⌄</Tx>
            </div>
          </Focus>
          <div style={{ display: 'flex', gap: 16, padding: '10px 20px' }}>{['+ Add product', '+ Add custom item', '▤ Add group'].map(x => <Tx key={x} s={12} w={500} c="#2563EB">{x}</Tx>)}</div>
          <div style={{ display: 'flex', padding: '10px 20px', background: '#FAFBFC', borderTop: '1px solid #E7E9EF' }}><Tx s={12} c="#667085">Subtotal · 1 line</Tx><Sp /><Tx s={13} w={700} c="#101828">{fmt(4900000 * amt)}</Tx></div>
        </Card>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ display: 'flex', gap: 8 }}><Tx s={13} w={700} c="#101828">Adjustments</Tx><Tx s={12} c="#667085">Subtotal – discounts + fees → taxable base + tax + surcharge.</Tx><Sp /><Tx s={12} c="#667085">0 active</Tx></span><Card st={{ gap: 10 }}><Tx s={12} c="#98A2B3">No discounts, taxes or fees yet.</Tx><span style={{ display: 'flex', gap: 8 }}><Btn>◇ Discount</Btn><Btn>◇ Fee</Btn><Btn>▤ Tax</Btn></span></Card></div>
          <Card st={{ width: 300, gap: 12, boxShadow: `0 0 0 ${2 * totP}px rgba(37,99,235,${0.6 * totP})` }}><span style={{ display: 'flex' }}><Tx s={14} w={700} c="#101828">Customer pays</Tx><Sp /><Lbl>VND</Lbl></span><span style={{ display: 'flex' }}><Tx s={12} c="#667085">Subtotal</Tx><Sp /><Tx s={12} c="#101828">{fmt(4900000 * amt)}</Tx></span><Hr /><span style={{ display: 'flex', alignItems: 'center' }}><Tx s={12} c="#667085">Total</Tx><Sp /><Tx s={22} w={800} c="#101828" st={{ display: 'inline-block', transform: `scale(${pop})`, transformOrigin: '100% 50%' }}>{fmt(4900000 * amt)}</Tx></span></Card>
        </div>
      </div>
    </div>
  </Screen>;
}

// ================= 05 / 06 / 08 — Delivery progress =================
function DeliveryScreen({ T, from, to, at, reserveAt, delivered }) {
  const rP = reserveAt != null ? ez(T, reserveAt, 0.6) : 0, planned = delivered || rP > 0.5;
  const dP = delivered ? ez(T, at, 1.2) : 0, pct = Math.round(dP * 100);
  const stepP = i => delivered ? ez(T, at + 0.4 + i * 0.5, 0.35) : 0;
  const ringR = 12, circ = 2 * Math.PI * ringR;
  const Stat = ({ l, v, sub, col = '#101828', hi }) => <div style={{ flex: 1, padding: '12px 14px', borderRadius: 8, background: '#FAFBFC', border: '1px solid #F2F4F7', display: 'flex', flexDirection: 'column', gap: 3 }}><Lbl>{l}</Lbl><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tx s={20} w={700} c={col}>{v}</Tx>{hi}</span><Tx s={11} c="#98A2B3">{sub}</Tx></div>;
  return <Screen T={T} from={from} to={to} nav="order">
    <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}><Tx s={15} w={700} c="#101828">…215736</Tx><Tx s={10} c="#667085" st={{ fontFamily: MONO, padding: '2px 6px', background: '#F2F4F7', borderRadius: 4 }}>JJDH-0004</Tx><Pill c="#175CD3" bg="#EFF8FF">● Confirmed</Pill><Pill c="#175CD3" bg="#EFF8FF">Execution in progress</Pill><Sp /><span style={{ padding: '6px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>◎ Complete order</span></div>
    <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
      <Card st={{ gap: 12, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tx s={15} w={700} c="#101828">Delivery progress</Tx><Tx s={12} c="#667085">{delivered ? '1 deliverable line · Everything ordered has been delivered' : planned ? '1 deliverable line · Delivery 1 still owes 1 unit. Stock is reserved on DO-JJ-202609-0002' : '1 deliverable line · 1 unit not assigned to any fulfillment yet'}</Tx><Sp />
          {!delivered && (planned ? <span style={{ padding: '7px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>▤ Dispatch from warehouse</span> : <Focus p={ez(T, at + 2.5, 0.5)} col={BLUE} pad={6} label="Fulfill all — reserve at Kho Jasmine"><span style={{ display: 'flex', gap: 8 }}><Btn>+ Customize…</Btn><span style={{ padding: '7px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>▤ Fulfill all — reserve at Kho Jasmine – 200 3/2</span></span></Focus>)}</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Stat l="OVERALL DELIVERED" v={`${pct}%`} sub={`${delivered && pct === 100 ? 1 : 0} of 1 unit`} col={delivered ? '#16A34A' : '#2563EB'} hi={<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r={ringR} fill="none" stroke="#E7E9EF" strokeWidth="3" /><circle cx="15" cy="15" r={ringR} fill="none" stroke="#16A34A" strokeWidth="3" strokeDasharray={`${circ * dP} ${circ}`} transform="rotate(-90 15 15)" strokeLinecap="round" /></svg>} />
          <Stat l="LINES COMPLETE" v={delivered ? '1/1' : '0/1'} sub={delivered ? 'every line delivered' : '1 still owing'} />
          <Stat l="STILL TO PLAN" v={planned ? '0' : '1'} sub={planned ? 'everything is assigned' : 'unit in no fulfillment'} col={planned ? '#101828' : '#2563EB'} />
          <Stat l="AT RISK" v="0" sub="stock covers what is left" col="#16A34A" />
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={12} c="#667085">▤ Stock at</Tx><Sel st={{ padding: '5px 10px' }}>Kho Jasmine – 200 3/2</Sel>{!planned && <Pill c="#667085" bg="#F2F4F7">best coverage</Pill>}</span>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr .8fr .8fr .8fr 1fr 1fr', gap: 12, padding: '6px 0', borderBottom: '1px solid #E7E9EF' }}>{['LINE', 'ORDERED', 'DELIVERED', 'REMAINING', 'PROGRESS', 'STATUS'].map((x, i) => <Lbl key={x} st={{ textAlign: i && i < 4 ? 'right' : i === 5 ? 'right' : 'left' }}>{x}</Lbl>)}</div>
        <Focus p={!planned && !delivered ? ez(T, at, 0.5) * (1 - ez(T, at + 2.5, 0.5)) : 0} col={BLUE} pad={4} label="2 available · 2 on hand · 0 reserved">
          <div style={{ display: 'grid', gridTemplateColumns: '3fr .8fr .8fr .8fr 1fr 1fr', gap: 12, alignItems: 'center' }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">› Dây Chuyền Bạc Mặt Đá Lục Emerald Halo</Tx><Tx s={11} c="#98A2B3" st={{ fontFamily: MONO }}>JJ-DC-002{planned ? ' · Delivery 1' : ''}</Tx></span>
            <Tx s={13} c="#344054" st={{ textAlign: 'right' }}>1</Tx><Tx s={13} w={delivered ? 700 : 400} c="#101828" st={{ textAlign: 'right' }}>{delivered && pct === 100 ? 1 : 0}</Tx><Tx s={13} w={700} c="#101828" st={{ textAlign: 'right' }}>{delivered && pct === 100 ? 0 : 1}</Tx>
            <span style={{ height: 5, borderRadius: 3, background: '#E7E9EF', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${delivered ? pct : 0}%`, background: '#16A34A' }} /></span>
            <span style={{ textAlign: 'right' }}>{delivered ? <Tx s={12} w={600} c="#16A34A">Delivered</Tx> : planned ? <Tx s={12} w={600} c="#667085">Planned</Tx> : <Tx s={12} w={600} c="#B54708">Not planned</Tx>}</span>
            {!planned && <span style={{ gridColumn: '5 / 7', textAlign: 'right' }}><Tx s={12} c="#667085"><b style={{ color: '#101828' }}>2</b> available · 2 on hand · 0 rsvd</Tx></span>}
          </div>
        </Focus>
      </Card>
      <Card st={{ gap: 12 }}>
        <span style={{ display: 'flex', gap: 8 }}><Tx s={15} w={700} c="#101828">Fulfillments</Tx><Tx s={12} c="#667085">{delivered ? '1 fulfilled' : planned ? '1 open' : ''}</Tx></span>
        {planned ? <Focus p={delivered ? 0 : ez(T, reserveAt + 0.5, 0.5) * (1 - ez(T, reserveAt + 3, 0.5))} col={BLUE} pad={6} label="DO-JJ-202609-0002 · reserved" st={{ opacity: delivered ? 1 : rP, transform: `translateY(${(1 - (delivered ? 1 : rP)) * 20}px)` }}>
          <div style={{ border: '1px solid #E7E9EF', borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 28, height: 28, borderRadius: 6, background: '#F2F4F7', display: 'grid', placeItems: 'center', font: `700 12px ${UI}`, color: '#344054' }}>F1</span><span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Tx s={14} w={700} c="#101828">Delivery 1</Tx><Pill c="#667085" bg="#F2F4F7">DEFAULT</Pill>{delivered ? <Pill c="#027A48" bg="#ECFDF3">⊙ Fulfilled</Pill> : <Pill c="#175CD3" bg="#EFF8FF">⊙ Open</Pill>}</span><span style={{ display: 'flex', gap: 8 }}><Tx s={11} c="#667085">▤ Kho Jasmine – 200 3/2 · DO-JJ-202609-0002</Tx>{delivered ? <Pill c="#027A48" bg="#ECFDF3">dispatched</Pill> : <Pill c="#667085" bg="#F2F4F7">reserved</Pill>}</span></span><Sp />{!delivered && <span style={{ padding: '6px 12px', borderRadius: 6, background: '#2563EB', font: `500 12px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>⛟ Create shipment</span>}</div>
            <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 300 }}><span style={{ display: 'flex' }}><Lbl>DELIVERY PROGRESS</Lbl><Sp /><Tx s={12} c="#667085"><b style={{ color: '#101828' }}>{delivered && pct === 100 ? '1' : '0'} / 1</b> · {delivered ? 'complete' : '1 to go'}</Tx></span><span style={{ height: 5, borderRadius: 3, background: '#E7E9EF', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${delivered ? pct : 0}%`, background: '#16A34A' }} /></span></span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Lbl>SHIPMENT</Lbl><Tx s={12} c="#667085">{delivered ? '⛟ No shipment' : '⛟ Not shipping yet'}</Tx></span><Sp />
              <Focus p={delivered ? ez(T, at + 2.2, 0.5) : ez(T, reserveAt + 3, 0.5)} col={delivered ? GREEN : BLUE} pad={8} label={delivered ? 'Reserved ✓ Dispatched ✓ Delivered ✓' : 'Reserved → Dispatched → Delivered'}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{(delivered ? ['Reserved', 'Dispatched', 'Delivered'] : ['Reserved', 'Shipment', 'Dispatched', 'Delivered']).map((s, i) => { const on = i === 0 || (delivered && stepP(i) > 0.5); return <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{i > 0 && <span style={{ width: 22, height: 1, background: '#D0D5DD' }} />}<span style={{ width: 16, height: 16, borderRadius: '50%', background: on ? '#16A34A' : '#fff', border: on ? 'none' : '1px solid #D0D5DD', color: on ? '#fff' : '#98A2B3', display: 'grid', placeItems: 'center', font: `700 9px ${UI}`, transform: delivered && i > 0 ? `scale(${1 + 0.4 * Math.sin(Math.PI * clamp((T - at - 0.4 - i * 0.5) / 0.35, 0, 1))})` : 'none' }}>{on ? '✓' : i + 1}</span><Tx s={12} c={on ? '#101828' : '#667085'}>{s}</Tx></span>; })}</span>
              </Focus>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Lbl>⌄ LINE ITEMS · 1</Lbl></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 16, height: 16, borderRadius: 4, background: delivered ? '#ECFDF3' : '#F2F4F7', color: '#16A34A', display: 'grid', placeItems: 'center', font: `700 10px ${UI}` }}>✓</span><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={13} w={600} c="#101828">Dây Chuyền Bạc Mặt Đá Lục Emerald Halo</Tx><Tx s={11} c="#98A2B3" st={{ fontFamily: MONO }}>JJ-DC-002</Tx></span></span>
          </div>
        </Focus> : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '18px 0' }}><Tx s={18} c="#98A2B3">⬡</Tx><Tx s={14} w={700} c="#101828">No fulfillment planned yet</Tx><Tx s={12} c="#667085" st={{ whiteSpace: 'normal', textAlign: 'center', maxWidth: 380, lineHeight: 1.45 }}>A fulfillment says <b>what goes out and from where</b>. Deliveries are then recorded against it, so one order can ship in several waves — or from several warehouses.</Tx></div>}
      </Card>
      {!planned && <Cursor T={T} at={at + 2.2} a={[560, 380]} b={[1120, 34]} dur={1.1} />}
    </div>
  </Screen>;
}

// ================= 15 / 16 — Service settings modal =================
const SETNAV = [['General'], ['FIELDS & TEMPLATES', 's'], ['Custom Fields'], ['Counter'], ['Documents'], ['COMMERCIAL', 's'], ['Payment'], ['WORKFLOW', 's'], ['Inbound email'], ['Customer portal'], ['Approval'], ['Stages'], ['Fulfillment'], ['Reasons'], ['PERMISSIONS', 's'], ['Access']];
function Modal({ title, sub, w = 900, children, side, active }) {
  return <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,24,40,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: w, maxHeight: '92%', borderRadius: 12, background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,.4)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid #E7E9EF' }}>{side && <span style={{ width: 26, height: 26, borderRadius: 6, background: '#ECFDF3', display: 'grid', placeItems: 'center', font: `600 12px ${UI}`, color: '#16A34A' }}>▤</span>}<span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={15} w={700} c="#101828">{title}</Tx>{sub && <Tx s={11} c="#98A2B3">{sub}</Tx>}</span><Sp /><Tx s={14} c="#98A2B3">✕</Tx></div>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {side && <div style={{ width: 180, flex: 'none', borderRight: '1px solid #E7E9EF', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>{SETNAV.map(([l, s]) => s ? <Lbl key={l} st={{ margin: '10px 0 4px 8px' }}>{l}</Lbl> : <span key={l} style={{ padding: '6px 8px', borderRadius: 6, background: l === active ? '#EEF4FF' : 'transparent' }}><Tx s={12.5} w={l === active ? 600 : 400} c={l === active ? '#1D4ED8' : '#344054'}>{l}</Tx></span>)}</div>}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>{children}</div>
      </div>
    </div>
  </div>;
}
const Field = ({ l, hint, hi = 0, label, children }) => <Focus p={hi} col={BLUE} pad={8} label={label} st={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Tx s={12} w={500} c="#344054">{l}</Tx>{children}{hint && <Tx s={11} c="#98A2B3" st={{ whiteSpace: 'normal' }}>{hint}</Tx>}</Focus>;
function SettingsScreen({ T, from, to, at, tab, split = 0 }) {
  const f1 = ez(T, at, 0.5), f2 = ez(T, at + (tab === 'Fulfillment' ? 3.3 : 2.5), 0.5);
  return <Screen T={T} from={from} to={to} nav="order" split={split}>
    <Head title="Đơn online Quốc Bảo - +84908215736" code="JJDH-0004" status="Confirmed" tone="blue" />
    <div style={{ flex: 1, background: '#F7F8FA' }} />
    <Modal title="Đơn hàng bán lẻ Jasmine" sub="Order Service · Settings" side active={tab}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid #E7E9EF' }}><Tx s={16} w={700} c="#101828">{tab}</Tx></div>
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {tab === 'Fulfillment' ? <>
          <Tx s={13} w={700} c="#101828">Fulfillment mode</Tx>
          <Field l="Default mode" hi={f1 * (1 - f2)} label="Inventory — reserve warehouse stock"><Sel hi={f1 * (1 - f2)}>Inventory — reserve warehouse stock</Sel></Field>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={700} c="#101828">Warehouse stock</Tx><Tx s={11} c="#98A2B3">Applies to fulfillments that reserve warehouse stock.</Tx></span>
          <Field l="When stock is short" hi={f2} label="Thiếu hàng → chặn · giữ hàng 48 giờ"><Sel hi={f2}>Block — refuse until enough stock is available</Sel><div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}><Tx s={12} w={500} c="#344054">Reservation expiry (hours)</Tx><span style={{ width: 90, padding: '8px 12px', borderRadius: 6, border: `1px solid ${f2 > 0 ? '#2563EB' : '#D0D5DD'}`, font: `600 13px ${UI}`, color: '#101828' }}>48</span><Tx s={11} c="#98A2B3">0 = never expires</Tx></div></Field>
          <Tx s={13} w={700} c="#101828">Completion</Tx>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 16 }}><Field l="Money"><Sel>Billed or paid in full</Sel></Field><Field l="Billing tolerance (%)"><span style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #D0D5DD', font: `400 13px ${UI}`, color: '#101828' }}>0</span></Field><Field l="Delivery"><Sel>Delivered in full</Sel></Field><Field l="Delivery tolerance (%)"><span style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #D0D5DD', font: `400 13px ${UI}`, color: '#101828' }}>0</span></Field></div>
        </> : <>
          <Field l="Payment processor" hint="Collects money for this service — public Pay actions, payment links and recorded settlements all hang off it." hi={f1 * (1 - f2)} label="Payment: Thu tiền khách hàng Jasmine"><Sel hi={f1 * (1 - f2)}>Thu tiền khách hàng Jasmine</Sel></Field>
          <Field l="Invoice book" hint="Invoices cut from these orders default to this invoice service (you can still pick another per invoice)." hi={f2} label="Invoice: Hoá đơn bán hàng Jasmine"><Sel hi={f2}>Hóa đơn bán hàng Jasmine</Sel></Field>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Tx s={12} w={500} c="#344054">Installment automation</Tx><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 30, height: 16, borderRadius: 8, background: '#D0D5DD', position: 'relative' }}><span style={{ position: 'absolute', left: 2, top: 2, width: 12, height: 12, borderRadius: '50%', background: '#fff' }} /></span><Tx s={13} c="#101828">Automatically request dated installments when due</Tx></span></span>
          <span style={{ alignSelf: 'flex-start', padding: '7px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>▤ Save payment</span>
        </>}
      </div>
    </Modal>
  </Screen>;
}

// ================= 07 — Dispatch dialog =================
function DispatchScreen({ T, from, to, at }) {
  const trk = typed('AHM-22092026-0847', T, at + 1.2, 16), full = trk.length >= 17, sel = ez(T, at, 0.4), dt = ez(T, at + 3.2, 0.5);
  const Opt = ({ t, s, on }) => <div style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: `${on ? 2 : 1}px solid ${on ? '#2563EB' : '#E7E9EF'}`, background: on ? '#EFF4FF' : '#fff', display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c={on ? '#1D4ED8' : '#101828'}>{t}</Tx><Tx s={11} c="#98A2B3">{s}</Tx></div>;
  const In = ({ v, hi, caret }) => <span style={{ padding: '9px 12px', borderRadius: 6, border: `${hi ? 2 : 1}px solid ${hi ? '#2563EB' : '#D0D5DD'}`, font: `500 13px ${UI}`, color: '#101828', minHeight: 36, boxShadow: hi ? '0 0 0 4px rgba(37,99,235,.15)' : 'none' }}>{v}<Caret on={caret} /></span>;
  return <Screen T={T} from={from} to={to} nav="order">
    <Head title="Đơn online Quốc Bảo - +84908215736" code="JJDH-0004" status="Confirmed" tone="blue" />
    <div style={{ flex: 1 }} />
    <Modal title="Dispatch from warehouse — Delivery 1" sub="Issues the reserved stock at Kho Jasmine – 200 3/2 and records the delivery — one move, in that order · 1 line" w={820} side={false}>
      <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ padding: '12px 14px', borderRadius: 8, background: '#EFF4FF', borderLeft: '3px solid #2563EB' }}><Tx s={12} c="#344054" st={{ whiteSpace: 'normal', lineHeight: 1.45 }}>▤ Warehouse delivery <b>DO-JJ-202609-0002</b> moves to <b>dispatched</b> in Inventory, then this delivery is recorded here. If Inventory refuses, nothing is recorded. It goes out <b>whole</b> — a warehouse delivery is issued in one move, so quantities are not editable here.</Tx></div>
        <div style={{ padding: '8px 12px', borderRadius: 6, background: '#F2F4F7' }}><Tx s={12} c="#344054"><b>1</b> unit across 1 line — everything still owed — will be issued and recorded.</Tx></div>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', gap: 12, alignItems: 'center' }}>{['ITEM', 'REMAINING', 'DISPATCHING', 'LEFT AFTER'].map((x, i) => <Lbl key={x} st={{ textAlign: i ? 'right' : 'left' }}>{x}</Lbl>)}<span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={13} w={600} c="#101828">Dây Chuyền Bạc Mặt Đá Lục Emerald Halo</Tx><Tx s={11} c="#98A2B3">JJ-DC-002 · 0 of 1 assigned delivered</Tx></span><Tx s={13} w={600} c="#101828" st={{ textAlign: 'right' }}>1</Tx><Tx s={13} w={600} c="#101828" st={{ textAlign: 'right' }}>1</Tx><Tx s={13} w={700} c="#16A34A" st={{ textAlign: 'right' }}>0</Tx></div>
        <Tx s={12} w={500} c="#344054">How did it go out?</Tx>
        <Focus p={sel * (1 - ez(T, at + 1.2, 0.4))} col={BLUE} pad={6} label="Ahamove · 3rd-party carrier"><div style={{ display: 'flex', gap: 12 }}><Opt t="⛟ 3rd-party carrier" s="GHN, GHTK, DHL…" on={sel > 0.5} /><Opt t="⇄ Direct delivery" s="Our staff or vehicle" /><Opt t="▤ Store pickup" s="Customer collects" /></div></Focus>
        <Focus p={ez(T, at + 1.2, 0.4) * (1 - dt)} col={BLUE} pad={8} label="Ahamove · AHM-22092026-0847"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><Field l="Carrier"><In v="Ahamove (Shipper nội thành)" /></Field><Field l="Tracking number"><In v={trk} hi={trk.length > 0 && !full} caret={trk.length > 0 && !full} /></Field></div></Focus>
        <Focus p={dt} col={BLUE} pad={8} label="22/09 · 8:45 AM"><div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}><Field l="Received by"><In v="Shipper Ahamove – Lê Văn Tâm" /></Field><Field l="Received at"><In v="▦ Sep 22, 2026 8:45 AM" hi={dt > 0} /></Field></div></Focus>
      </div>
    </Modal>
  </Screen>;
}

// ================= 09c — Stock effect =================
function StockEffectScreen({ T, from, to, at }) {
  const p = ez(T, at, 0.8), n = Math.round(-1 * p), arrow = ez(T, at + 2.1, 0.8), stat = (l, v, sub, col = '#101828') => <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid #E7E9EF', display: 'flex', flexDirection: 'column', gap: 4 }}><Lbl>{l}</Lbl><Tx s={22} w={700} c={col}>{v}</Tx><Tx s={11} c="#98A2B3">{sub}</Tx></div>;
  return <Screen T={T} from={from} to={to} nav="inventory">
    <InvHead />
    <div style={{ flex: 1, padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignContent: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card st={{ padding: 0, gap: 0, overflow: 'visible' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #E7E9EF' }}><Tx s={14} w={700} c="#101828">▤ Stock effect · Stock decreases</Tx><Sp /><Focus p={p * (1 - arrow)} col={RED} pad={8} label="Stock decreases · −1 unit"><span style={{ display: 'flex', alignItems: 'baseline', gap: 6, transform: `scale(${1 + 0.3 * Math.sin(Math.PI * clamp((T - at) / 0.8, 0, 1))})`, transformOrigin: '100% 50%' }}><Tx s={14} c="#B42318">↘</Tx><Tx s={26} w={800} c="#B42318">{n === 0 ? '0' : '−1'}</Tx><Lbl>UNITS</Lbl></span></Focus></div>
          <div style={{ display: 'flex' }}>{stat('# AFFECTED SKUS', '1', '↘ 1 destock')}{stat('▤ EXPECTED QTY', '1', '')}{stat('▤ ACTUAL QTY', '1', '')}{stat('= NET DELTA', '0', 'actual – expected', '#98A2B3')}</div>
        </Card>
        <Card st={{ gap: 10 }}>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Tx s={14} w={700} c="#101828">Line items</Tx><Pill c="#667085" bg="#F2F4F7">1</Pill><Sp /><Tx s={11} c="#98A2B3">1 expected · 1 actual</Tx></span>
          <div style={{ display: 'grid', gridTemplateColumns: '.3fr 3fr 1fr 1fr 1fr', gap: 12, padding: '4px 0', borderBottom: '1px solid #E7E9EF' }}>{['#', 'ITEM / SKU', 'AVAILABLE', 'QUANTITY', 'STATUS'].map((x, i) => <Lbl key={x} st={{ textAlign: i > 1 ? 'right' : 'left' }}>{x}</Lbl>)}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '.3fr 3fr 1fr 1fr 1fr', gap: 12, alignItems: 'center' }}><Tx s={12} c="#667085">› 1</Tx><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={13} w={600} c="#101828">Dây Chuyền Bạc Mặt Đá Lục Emerald Halo</Tx><Tx s={11} c="#98A2B3" st={{ fontFamily: MONO }}>JJ-DC-002  # TB-05</Tx></span><Tx s={13} c="#344054" st={{ textAlign: 'right' }}>{p >= 1 ? 1 : 2}</Tx><Tx s={13} w={700} c="#101828" st={{ textAlign: 'right' }}>1</Tx><span style={{ textAlign: 'right' }}><Pill c="#B42318" bg="#FEF3F2">↘ DESTOCK</Pill></span></div>
        </Card>
      </div>
      <Focus p={arrow} col={BLUE} pad={8} label="Kho Jasmine → Trần Quốc Bảo"><Card st={{ gap: 12 }}>
        <Tx s={14} w={700} c="#101828">⌄ ✣ Stock movement</Tx>
        <div style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #E7E9EF', display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ width: 28, height: 28, borderRadius: 6, background: '#FFFAEB', display: 'grid', placeItems: 'center', color: '#B54708' }}>▤</span><span style={{ display: 'flex', flexDirection: 'column' }}><Lbl>WAREHOUSE</Lbl><Tx s={13} w={600} c="#101828">Kho Jasmine – 200 3/2</Tx></span></div>
        <div style={{ display: 'flex', justifyContent: 'center', height: 26, position: 'relative' }}><span style={{ width: 2, height: 26 * arrow, background: AMBER, borderRadius: 1 }} />{arrow >= 1 && <span style={{ position: 'absolute', bottom: -2, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${AMBER}` }} />}</div>
        <div style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${arrow >= 1 ? AMBER : '#E7E9EF'}`, display: 'flex', gap: 10, alignItems: 'center', opacity: 0.5 + 0.5 * arrow }}><span style={{ width: 28, height: 28, borderRadius: 6, background: '#FFFAEB', display: 'grid', placeItems: 'center', color: '#B54708' }}>◯</span><span style={{ display: 'flex', flexDirection: 'column' }}><Lbl>CUSTOMER</Lbl><Tx s={13} w={600} c="#101828">Trần Quốc Bảo</Tx></span></div>
      </Card></Focus>
    </div>
  </Screen>;
}

// ================= 09 — Delivery history (sổ cái) =================
function HistoryScreen({ T, from, to, at }) {
  const p = ez(T, at, 0.6), rec = typed('received by Shipper Ahamove – Lê Văn Tâm', T, at + 1.0, 40);
  return <Screen T={T} from={from} to={to} nav="order">
    <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}><Tx s={15} w={700} c="#101828">…215736</Tx><Tx s={10} c="#667085" st={{ fontFamily: MONO, padding: '2px 6px', background: '#F2F4F7', borderRadius: 4 }}>JJDH-0004</Tx><Pill c="#175CD3" bg="#EFF8FF">● Confirmed</Pill></div>
    <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card st={{ gap: 10, opacity: .55 }}><span style={{ display: 'flex' }}><Tx s={15} w={700} c="#101828">Returns</Tx><Sp /><Btn>↺ Request return</Btn></span><Tx s={12} c="#667085">No returns — request one when delivered goods come back.</Tx></Card>
      <Card st={{ gap: 12, zoom: 1.25 }}>
        <span style={{ display: 'flex', gap: 8 }}><Tx s={15} w={700} c="#101828">Delivery history</Tx><Tx s={12} c="#667085">ledger · 1 event</Tx></span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr .6fr', gap: 12, padding: '4px 0', borderBottom: '1px solid #E7E9EF' }}>{['WHEN', 'EVENT', 'UNITS'].map((x, i) => <Lbl key={x} st={{ textAlign: i === 2 ? 'right' : 'left' }}>{x}</Lbl>)}</div>
        <Focus p={ez(T, at + 0.4, 0.5)} col={GREEN} pad={8} label="Ahamove · AHM-22092026-0847 · người nhận: Lê Văn Tâm" st={{ marginTop: 30 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr .6fr', gap: 12, alignItems: 'center', padding: '8px 0', opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}>
            <Tx s={13} c="#344054">Sep 22, 2026</Tx>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 16, height: 16, borderRadius: 4, background: '#ECFDF3', color: '#16A34A', display: 'grid', placeItems: 'center', font: `700 10px ${UI}` }}>✓</span><Tx s={14} w={700} c="#101828">Delivery 1</Tx></span><Tx s={12} c="#667085">⛟ Ahamove (Shipper nội thành) · AHM-22092026-0847</Tx><Tx s={12} c="#667085">{rec}<Caret on={rec.length > 0 && rec.length < 40} /></Tx><Tx s={12} w={500} c="#2563EB">Show 1 line ⌄</Tx></span>
            <Tx s={16} w={700} c="#101828" st={{ textAlign: 'right' }}>1</Tx>
          </div>
        </Focus>
      </Card>
    </div>
  </Screen>;
}

// ================= 10 / 12 — Collection progress (thiếu tiền / đã thu) =================
const COLS2 = [['ORDER VALUE', 'what the buyer committed to', '#101828'], ['INVOICED', 'nothing invoiced yet', '#2563EB'], ['COLLECTED', 'nothing has arrived yet', '#F0A23B'], ['APPLIED TO INVOICES', 'cash booked against a document', '#16A34A']];
function CollectionScreen({ T, from, to, at, paid }) {
  const shake = paid ? 0 : Math.sin(T * 26) * 3 * Math.max(0, 1 - Math.abs(T - at - 2.9) / 0.35);
  const colP = paid ? ez(T, at + 0.2, 1.0) : 0, redP = paid ? 0 : ez(T, at + 2.6, 0.5), fulP = paid ? 0 : ez(T, at, 0.5), rowP = paid ? ez(T, at + 2.6, 0.6) : 0;
  const vals = paid ? [1, 0, colP, 0] : [1, 0, 0, 0];
  return <Screen T={T} from={from} to={to} nav="order">
    <Head title="Đơn online Quốc Bảo - +84908215736" code="JJDH-0004" status={paid ? 'Completed' : 'Confirmed'} tone={paid ? 'green' : 'blue'} />
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ width: 250, flex: 'none', borderRight: '1px solid #E7E9EF', background: '#fff', padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Lbl>CREATED BY</Lbl><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#B2CCFF' }} /><Tx s={13} w={600} c="#101828">Phương Hà</Tx><Tx s={12} c="#98A2B3">· Sep 21, 2026</Tx></span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><Lbl>ORDER TOTAL</Lbl><span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Tx s={28} w={800} c="#101828" st={{ letterSpacing: -0.8 }}>₫4,900,000</Tx><Tx s={12} w={500} c="#667085">VND</Tx></span>{paid && <Tx s={12} w={600} c="#16A34A" st={{ opacity: colP }}>Paid in full</Tx>}</div>
        <Hr />
        {[['Overview', ''], ['Fulfillment', '100%', 0, 1], ['Billing', paid ? '1' : '', 1], ['Activity', paid ? '19' : '18']].map(([l, r, act, hiF]) => <Focus key={l} p={hiF ? fulP * (1 - redP) : 0} col={GREEN} pad={4} label={hiF ? 'Fulfillment 100%' : null}><span style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', margin: '-5px -10px', borderRadius: 6, background: act ? '#EEF4FF' : 'transparent' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: act ? '#2563EB' : '#D0D5DD' }} /><Tx s={13} w={act ? 600 : 400} c={act ? '#1D4ED8' : '#344054'}>{l}</Tx><Sp /><Tx s={12} w={hiF ? 700 : 400} c={hiF ? '#16A34A' : '#98A2B3'}>{r}</Tx></span></Focus>)}
      </div>
      <div style={{ flex: 1, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <Card st={{ gap: 12 }}>
          <CardHead t="Collection progress" sub="collected in one payment · due on receipt" act={<span style={{ display: 'flex', gap: 8 }}><Btn>⇗ Request payment…</Btn><Btn>⎙ Record payment</Btn></span>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, padding: '14px 16px', borderRadius: 8, background: '#FAFBFC', border: '1px solid #F2F4F7' }}>
            {COLS2.map(([lab, sub0, col], i) => { const v = vals[i]; const sub = i === 2 && paid && colP > 0.5 ? '1 payment received' : sub0; const isRed = !paid && i > 0 && i < 3; return (
              <Focus key={lab} p={isRed ? redP : (paid && i === 2 ? ez(T, at, 0.5) * (1 - rowP) : 0)} col={paid ? GREEN : RED} pad={6} label={i === 2 ? (paid ? 'Collected 100% · 1 payment received' : 'Đã thu ₫0 · còn 4.900.000đ chưa thu') : null}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, transform: isRed ? `translateX(${shake}px)` : 'none' }}>
                  <Lbl>{lab}</Lbl>
                  <Tx s={22} w={700} c={isRed && redP > 0 ? '#B42318' : '#101828'} st={{ letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>{v <= 0 ? '₫0' : fmt(4900000 * v)}</Tx>
                  <Tx s={11} c="#98A2B3">{sub}</Tx>
                  <span style={{ height: 4, borderRadius: 2, background: '#EAECF0', marginTop: 6, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${v * 100}%`, background: col, borderRadius: 2 }} /></span>
                  <span style={{ display: 'flex' }}><Tx s={11} w={500} c="#667085">{Math.round(v * 100).toFixed(v > 0 && v < 1 ? 0 : 0)}{v > 0 && v < 1 ? '' : (v === 0 ? '.0' : '')}% of order</Tx><Sp />{v <= 0 && i > 0 && i < 3 && <Tx s={11} w={600} c={isRed && redP > 0 ? '#B42318' : '#667085'}>−₫4,900,000 {i === 1 ? 'not invoiced' : 'outstanding'}</Tx>}{paid && i === 3 && <Tx s={11} w={600} c="#B54708">−₫4,900,000 unapplied</Tx>}</span>
                </div>
              </Focus>); })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, background: '#EFF4FF', borderLeft: '3px solid #2563EB' }}><Tx s={14} c="#2563EB">◌</Tx><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">{paid ? 'Money has arrived and nothing is billed' : 'Ask for the money, or record it'}</Tx><Tx s={12} c="#667085">{paid ? 'Cut the invoice it settles — cash applies to an issued invoice automatically, and until then it sits unbooked.' : 'The whole balance is collected in one payment. Requesting mints a pay link; recording books money that has already arrived.'}</Tx></span><Sp /><span style={{ padding: '6px 12px', borderRadius: 6, background: '#2563EB', font: `500 12px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>{paid ? 'New invoice' : 'Request payment…'}</span></div>
        </Card>
        <Card><CardHead t="Invoices" sub="nothing invoiced yet" act={<Btn>+ New invoice</Btn>} /><Tx s={12} c="#667085">▤ Nothing invoiced yet — until an invoice is issued the buyer owes nothing, however much has been delivered.</Tx></Card>
        {paid && <Card>
          <CardHead t="Payments & refunds" sub="1 received · 1 closed" act={<span style={{ display: 'flex', gap: 8 }}><Btn>↺ Record refund</Btn><Btn>⎙ Record payment</Btn></span>} />
          <Lbl>▣ RECEIVED  1</Lbl>
          <Focus p={rowP} col={GREEN} pad={4} label="JJPT-0006 · Cash · Paid"><div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', borderRadius: 8, border: '1px solid #E7E9EF', background: '#fff', opacity: rowP, transform: `translateX(${(1 - rowP) * -30}px)` }}>
            <span style={{ width: 28, height: 28, borderRadius: 6, background: '#FFFAEB', display: 'grid', placeItems: 'center', font: `600 12px ${UI}`, color: '#B54708' }}>▤</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 130 }}><Tx s={13} w={600} c="#101828">JJPT-0006</Tx><Tx s={11} c="#98A2B3">Sep 22, 2026</Tx></span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}><Tx s={12} c="#344054" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Cash · COD Ahamove thu hộ – đối soát chiều 22/09 · Ngân hàng TMCP Kỹ thương Việt Nam – Chi nhánh Hoàng Qu…</Tx><Tx s={11} c="#98A2B3">not booked against any invoice</Tx></span>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}><Tx s={14} w={700} c="#101828">₫4,900,000</Tx><Tx s={11} c="#B54708">₫4,900,000 unapplied</Tx></span>
            <Pill c="#027A48" bg="#ECFDF3">✓ Paid</Pill>
          </div></Focus>
        </Card>}
      </div>
    </div>
  </Screen>;
}

// ================= 11 — Record a payment =================
function RecordPaymentScreen({ T, from, to, at }) {
  const amt = typed('4,900,000', T, at - 0.6, 14), cashP = ez(T, at, 0.4), ref = typed('COD Ahamove thu hộ – đối soát chiều 22/09', T, at + 1.4, 30), refDone = ref.length >= 40, btn = ez(T, at + 4.2, 0.4);
  const Chip = ({ t, on }) => <span style={{ padding: '6px 12px', borderRadius: 6, border: `${on ? 2 : 1}px solid ${on ? '#2563EB' : '#D0D5DD'}`, background: on ? '#EFF4FF' : '#fff', font: `${on ? 600 : 500} 12px ${UI}`, color: on ? '#1D4ED8' : '#344054' }}>{t}</span>;
  return <Screen T={T} from={from} to={to} nav="order">
    <Head title="Đơn online Quốc Bảo - +84908215736" code="JJDH-0004" status="Confirmed" tone="blue" />
    <div style={{ flex: 1 }} />
    <Modal title="Record a payment" w={560} side={false}>
      <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tx s={12} c="#667085" st={{ whiteSpace: 'normal', lineHeight: 1.45 }}>Records money that has already arrived against this order — a bank transfer for a deposit or the balance, with no invoice involved. It writes a real payment, so the collected total moves with it.</Tx>
        <div style={{ borderRadius: 8, border: '1px solid #E7E9EF', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>{[['Outstanding balance', '₫4,900,000', '#101828'], ['Recording', '+₫' + (amt || '0'), '#101828'], ['Left after', amt.length >= 9 ? 'Settled in full' : '₫4,900,000', amt.length >= 9 ? '#16A34A' : '#101828']].map(([a, b, c], i) => <span key={a} style={{ display: 'flex', borderTop: i === 2 ? '1px solid #E7E9EF' : 'none', paddingTop: i === 2 ? 6 : 0 }}><Tx s={12} c="#667085">{a}</Tx><Sp /><Tx s={13} w={700} c={c}>{b}</Tx></span>)}</div>
        <Field l="Amount" hint="Leave it blank to settle the whole balance, or type a smaller figure for a partial payment."><span style={{ display: 'flex', alignItems: 'center', padding: '9px 12px', borderRadius: 6, border: '1px solid #D0D5DD' }}><Tx s={12} c="#98A2B3">₫  </Tx><Tx s={13} w={500} c="#101828">{amt}</Tx><Caret on={amt.length < 9} /><Sp /><Tx s={12} w={500} c="#2563EB">Full balance</Tx></span></Field>
        <Focus p={cashP * (1 - ez(T, at + 1.4, 0.4))} col={BLUE} pad={6} label="Method: Cash"><Field l="Method"><span style={{ display: 'flex', gap: 8 }}><Chip t="Bank transfer" /><Chip t="Cash" on={cashP > 0.5} /><Chip t="Cheque" /><Chip t="Offset / contra" /><Chip t="Other" /></span></Field></Focus>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14 }}>
          <Field l="Received on"><span style={{ padding: '9px 12px', borderRadius: 6, border: '1px solid #D0D5DD', font: `500 13px ${UI}`, color: '#101828' }}>▦ Sep 22, 2026</span></Field>
          <Focus p={ez(T, at + 1.4, 0.4) * (1 - btn)} col={BLUE} pad={6} right label="COD Ahamove thu hộ – đối soát chiều 22/09"><Field l="Reference" hint="Receipt number, or who took the cash in."><span style={{ padding: '9px 12px', borderRadius: 6, border: `${ref.length && !refDone ? 2 : 1}px solid ${ref.length && !refDone ? '#2563EB' : '#D0D5DD'}`, font: `500 13px ${UI}`, color: '#101828', minHeight: 36, whiteSpace: 'nowrap', overflow: 'hidden' }}>{ref}<Caret on={ref.length > 0 && !refDone} /></span></Field></Focus>
        </div>
        <Field l="Deposited into" hint="The only account this service collects into."><Sel>Ngân hàng TMCP Kỹ thương Việt Nam – Chi nhánh Hoàng Quốc Việt •••011</Sel></Field>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderTop: '1px solid #E7E9EF', background: '#FAFBFC' }}><Tx s={11} c="#98A2B3">⚿ Keyed once — a retry cannot record this twice.</Tx><Sp /><Tx s={13} w={500} c="#344054">Cancel</Tx><span style={{ padding: '8px 14px', borderRadius: 6, background: '#2563EB', font: `600 13px ${UI}`, color: '#fff', transform: `scale(${1 - 0.06 * Math.sin(Math.PI * clamp((T - at - 4.2) / 0.4, 0, 1))})`, boxShadow: `0 0 0 ${4 * btn}px rgba(37,99,235,.25)` }}>Record payment</span></div>
    </Modal>
  </Screen>;
}

// ================= 12a — New invoice =================
function NewInvoiceScreen({ T, from, to, at }) {
  const sel = ez(T, at, 0.4), tot = ez(T, at + 0.6, 0.8), apply = ez(T, at + 2.4, 0.6);
  const Opt = ({ t, s, on, p }) => <div style={{ padding: '12px 14px', borderRadius: 8, border: `${on ? 2 : 1}px solid ${on ? '#2563EB' : '#E7E9EF'}`, background: on ? '#EFF4FF' : '#fff', display: 'flex', alignItems: 'center' }}><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">{t}</Tx><Tx s={11} c="#98A2B3">{s}</Tx></span><Sp />{on && <Tx s={13} c="#2563EB">✓</Tx>}</div>;
  return <Screen T={T} from={from} to={to} nav="order">
    <Head title="Đơn online Quốc Bảo - +84908215736" code="JJDH-0004" status="Completed" />
    <div style={{ flex: 1 }} />
    <Modal title="New invoice" sub="JJDH-0004 · Trần Quốc Bảo · VND" w={880} side={false}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12, borderRight: '1px solid #E7E9EF' }}>
          <Lbl>WHAT TO BILL</Lbl>
          <Focus p={sel * (1 - tot)} col={BLUE} pad={6} label="Everything unbilled · 1 line"><Opt t="Everything unbilled" s="Every line at its remaining quantity — 1 line." on={sel > 0.5} /></Focus>
          <Opt t="Specific lines" s="One invoice per delivery tranche. Prefilled to what is delivered but not yet invoiced." /><Opt t="Progress billing" s="One progress line at a percentage of the order total. Taxes and fees ride along." /><Opt t="A fixed amount" s="One progress line at the exact figure you name — tax included." />
          <Lbl st={{ marginTop: 6 }}>ISSUE & TERMS</Lbl><Tx s={12} w={500} c="#344054">Invoice service</Tx>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{[['B2B', 'Falls back to Net 30 · applies the order\'s spare cash on issue', 0], ['Hóa đơn bán hàng Jasmine', 'Falls back to Net 15 · applies the order\'s spare cash on issue · chases it when overdue', 1]].map(([a, b, on]) => <div key={a} style={{ padding: '12px 14px', borderRadius: 8, border: `${on ? 2 : 1}px solid ${on ? '#2563EB' : '#E7E9EF'}`, background: on ? '#EFF4FF' : '#fff', display: 'flex', gap: 10 }}><span style={{ width: 22, height: 22, borderRadius: 5, background: '#ECFDF3', color: '#16A34A', display: 'grid', placeItems: 'center', flex: 'none', font: `700 11px ${UI}` }}>▤</span><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">{a}</Tx><Tx s={11} c="#98A2B3" st={{ whiteSpace: 'normal' }}>{b}</Tx></span></div>)}</div>
        </div>
        <div style={{ width: 260, flex: 'none', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFBFC' }}>
          <span style={{ display: 'flex' }}><Tx s={12} c="#667085">Order total</Tx><Sp /><Tx s={13} w={700} c="#101828">₫4,900,000</Tx></span>
          <span style={{ height: 4, borderRadius: 2, background: '#E7E9EF', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${tot * 100}%`, background: '#2563EB' }} /></span>
          <span style={{ display: 'flex' }}><Tx s={12} c="#667085">● Invoiced</Tx><Sp /><Tx s={12} c="#101828">₫0</Tx></span><span style={{ display: 'flex' }}><Tx s={12} c="#667085">● Still billable</Tx><Sp /><Tx s={12} c="#101828">₫4,900,000</Tx></span>
          <Focus p={apply} col={GREEN} pad={6} label="Tiền đã thu tự động đối trừ vào hoá đơn"><div style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #E7E9EF', background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}><Lbl>DRAFT WILL TOTAL</Lbl><Tx s={22} w={800} c="#101828">{fmt(4900000 * tot)}</Tx><span style={{ display: 'flex' }}><Tx s={11} c="#98A2B3">1 line</Tx><Sp /><Tx s={11} w={600} c={apply > 0 ? '#16A34A' : '#98A2B3'}>{apply > 0.5 ? '₫4,900,000 cash applies · ₫0 left after' : '₫0 left after'}</Tx></span></div></Focus>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', padding: '12px 22px', borderTop: '1px solid #E7E9EF' }}><Tx s={13} w={500} c="#344054">Cancel</Tx><span style={{ padding: '8px 14px', borderRadius: 6, background: '#2563EB', font: `600 13px ${UI}`, color: '#fff' }}>Create draft invoice</span></div>
    </Modal>
  </Screen>;
}

// ================= 12e — Hoá đơn điện tử =================
function InvoiceDocScreen({ T, from, to, at }) {
  const lc = i => ez(T, at + 0.2 + i * 0.5, 0.4), stamp = ez(T, at + 2.4, 0.5), outP = ez(T, at + 4.6, 0.5);
  const Row = ({ a, b, c = '#101828', bold }) => <span style={{ display: 'flex' }}><Tx s={12} c="#667085">{a}</Tx><Sp /><Tx s={12} w={bold ? 700 : 500} c={c}>{b}</Tx></span>;
  return <Screen T={T} from={from} to={to} nav="order">
    <Head title="Invoice for Đơn online Quốc Bảo - +84908215736" code="K24TMOCK · 0000004" right={<span style={{ display: 'flex', gap: 8 }}><Btn>⎙</Btn><span style={{ padding: '7px 12px', borderRadius: 6, background: '#2563EB', font: `500 13px ${UI}`, color: '#fff', whiteSpace: 'nowrap', flex: 'none' }}>➤ Send</span></span>}><Tx s={11} c="#667085">JJDH-0004 ⧉</Tx></Head>
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ width: 250, flex: 'none', borderRight: '1px solid #E7E9EF', background: '#fff', padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Focus p={outP} col={GREEN} pad={8} label="Còn phải thu 0đ · đã thu 100%" st={{ zIndex: 6 }}><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Lbl>OUTSTANDING</Lbl><span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Tx s={30} w={800} c="#101828">₫0</Tx><Tx s={12} c="#667085">VND</Tx></span><Tx s={11} c="#98A2B3">Due Sep 22, 2026 · On receipt from the order</Tx><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 1, height: 5, borderRadius: 3, background: '#E7E9EF', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${lc(2) * 100}%`, background: '#16A34A' }} /></span><Tx s={11} w={600} c="#16A34A">{Math.round(lc(2) * 100)}% collected</Tx></span></div></Focus>
        <Row a="Settled" b={fmt(4900000 * lc(2))} c="#16A34A" /><Row a="Invoice total" b="₫4,900,000" /><Hr />
        <Row a="◌ Status" b={lc(2) > 0.5 ? 'Paid' : lc(1) > 0.5 ? 'Issued' : 'Draft'} c="#16A34A" /><Row a="◌ Doc state" b="Draft" /><Row a="◌ Tax authority" b={stamp > 0.5 ? 'Accepted' : 'Pending'} c={stamp > 0.5 ? '#16A34A' : '#98A2B3'} /><Row a="◌ Payments" b="Settled" c="#16A34A" /><Hr />
        {[['Document', '', 1], ['Collection', '1'], ['Activity', '']].map(([l, r, act]) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', margin: '-4px -10px', borderRadius: 6, background: act ? '#EEF4FF' : 'transparent' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: act ? '#2563EB' : '#D0D5DD' }} /><Tx s={13} w={act ? 600 : 400} c={act ? '#1D4ED8' : '#344054'}>{l}</Tx><Sp /><Tx s={12} c="#98A2B3">{r}</Tx></span>)}
      </div>
      <div style={{ flex: 1, padding: '20px 40px', display: 'flex', justifyContent: 'center', minWidth: 0 }}>
        <div style={{ width: 560, background: '#fff', border: '1px solid #E7E9EF', boxShadow: '0 12px 40px rgba(0,0,0,.08)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Lbl>SELLER</Lbl><Tx s={13} w={700} c="#101828">Công ty TNHH Trang sức Jasmine</Tx><Tx s={11} c="#667085">68 Hàng Bạc, Hoàn Kiếm, Hà Nội</Tx><Tx s={11} c="#667085">Tax ID 0110245678 · +84 24 3828 6868</Tx></span><span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}><Tx s={10} c="#667085" st={{ fontFamily: MONO }}>JJHD-2026-0004</Tx><Tx s={22} w={800} c="#101828" st={{ whiteSpace: 'normal', textAlign: 'right', lineHeight: 1.1, maxWidth: 260 }}>Invoice for Đơn online Quốc Bảo - +84908215736</Tx><Tx s={10} c="#667085" st={{ fontFamily: MONO }}>Series K24TMOCK · No. 0000004 · Issued Sep 21, 2026</Tx></span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Lbl>BILL TO</Lbl><Tx s={13} w={700} c="#101828">Trần Quốc Bảo</Tx></span><span style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}><Tx s={11} c="#667085">Payment terms <b style={{ color: '#101828' }}>On receipt</b></Tx><Tx s={11} c="#667085">Payment due <b style={{ color: '#101828' }}>Sep 21, 2026</b></Tx></span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr .5fr 1fr 1fr', gap: 10, borderTop: '1px solid #101828', borderBottom: '1px solid #E7E9EF', padding: '8px 0' }}>{['DESCRIPTION', 'QTY', 'UNIT PRICE', 'AMOUNT'].map((x, i) => <Lbl key={x} st={{ textAlign: i ? 'right' : 'left' }}>{x}</Lbl>)}<span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12} w={600} c="#101828">Dây Chuyền Bạc Mặt Đá Lục Emerald Halo</Tx><Tx s={10} c="#98A2B3" st={{ fontFamily: MONO }}>JJ-DC-002</Tx></span><Tx s={12} c="#344054" st={{ textAlign: 'right' }}>1</Tx><Tx s={12} c="#344054" st={{ textAlign: 'right' }}>₫4,900,000</Tx><Tx s={12} w={600} c="#101828" st={{ textAlign: 'right' }}>₫4,900,000</Tx></div>
          <div style={{ alignSelf: 'flex-end', width: 260, display: 'flex', flexDirection: 'column', gap: 6 }}><Row a="Subtotal" b="₫4,900,000" /><span style={{ display: 'flex', borderTop: '1px solid #101828', paddingTop: 6 }}><Tx s={13} w={700} c="#101828">Total</Tx><Sp /><Tx s={14} w={800} c="#101828">₫4,900,000</Tx></span><Tx s={10} c="#667085" st={{ fontStyle: 'italic', whiteSpace: 'normal' }}>Amount in words: Four million nine hundred thousand Vietnam dong</Tx><Row a="Paid to date" b={fmt(4900000 * lc(2))} /><span style={{ display: 'flex' }}><Tx s={13} w={700} c="#101828">Balance due</Tx><Sp /><Tx s={13} w={800} c="#101828">{fmt(4900000 * (1 - lc(2)))}</Tx></span></div>
          {stamp > 0 && <div style={{ position: 'absolute', right: 40, bottom: 120, padding: '8px 16px', border: '3px solid #16A34A', borderRadius: 8, color: '#16A34A', font: `800 18px ${UI}`, letterSpacing: 2, transform: `rotate(-12deg) scale(${1.6 - 0.6 * stamp})`, opacity: stamp }}>E-INVOICE · ISSUED</div>}
        </div>
      </div>
      <div style={{ width: 270, flex: 'none', borderLeft: '1px solid #E7E9EF', background: '#fff', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Focus p={ez(T, at, 0.4) * (1 - stamp)} col={BLUE} pad={8} label="Draft → Issued → Paid"><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex' }}><Tx s={13} w={700} c="#101828">Lifecycle</Tx><Sp /><Pill c="#027A48" bg="#ECFDF3">{lc(2) > 0.5 ? 'Paid' : lc(1) > 0.5 ? 'Issued' : 'Draft'}</Pill></span><div style={{ display: 'flex', gap: 6 }}>{['Draft', 'Issued', 'Paid'].map((s, i) => <span key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ height: 4, borderRadius: 2, background: '#E7E9EF', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${lc(i) * 100}%`, background: '#16A34A' }} /></span><Tx s={11} w={600} c={lc(i) > 0.5 ? '#101828' : '#98A2B3'}>{s}</Tx><Tx s={10} c="#98A2B3">Sep 22, 2026</Tx></span>)}</div></div></Focus>
        <Hr />
        <Focus p={stamp * (1 - outP)} col={GREEN} pad={8} label="E-invoice · Issued to tax authority"><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex' }}><Tx s={13} w={700} c="#101828">E-invoice</Tx><Sp /><span style={{ opacity: stamp }}><Pill c="#027A48" bg="#ECFDF3">Issued to tax authority</Pill></span></span><Row a="Serial" b="K24TMOCK" /><Row a="Tax code" b="MCQT-BX5SWQLB" /></div></Focus>
        <Hr /><Tx s={13} w={700} c="#101828">Ownership</Tx><Row a="Issued by" b="Phương Hà" /><Row a="Owner" b="Phương Hà" /><Row a="Created" b="Phương Hà · Sep 22, 2026" />
        <Hr /><Tx s={13} w={700} c="#101828">Linked</Tx><span style={{ display: 'flex', gap: 8 }}><Tx s={12} c="#667085">▤</Tx><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12} w={600} c="#101828">Source order</Tx><Tx s={11} c="#98A2B3">JJDH-0004</Tx></span></span>
      </div>
    </div>
  </Screen>;
}

// ================= 12c — Completed (dùng lại body của Móc câu) =================
function CompletedScreen({ T, from, to, at }) { return <Screen T={T} from={from} to={to} nav="order"><CompletedBody T={T} at={at} /></Screen>; }

window.CODMocks = { Screen, Focus, Cursor, Toast, Lbl, Sp, Hr, Sel, Caret, typed, Head, StockScreen, StockAfterScreen, CopilotScreen, OrderOverview, ProductsStep, DeliveryScreen, SettingsScreen, DispatchScreen, StockEffectScreen, HistoryScreen, CollectionScreen, RecordPaymentScreen, NewInvoiceScreen, InvoiceDocScreen, CompletedScreen };
