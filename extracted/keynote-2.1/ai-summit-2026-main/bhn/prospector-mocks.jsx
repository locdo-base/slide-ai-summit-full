// Mockup Prospector (P1–P9): khung chat khách hàng, Inbox nhân viên, cấu hình AI Agent
const B = window.CODBase, M = window.CODMocks;
const { ez, io, rise, lerp, clamp, AF, MONO, UI, GREEN, RED, AMBER, BLUE, INK2, FW, FRAME_W, FRAME_H, FRAME_TOP, DEMO_X, Tx, Pill, Btn } = B;
const { Screen, Focus, Lbl, Sp, Hr, Sel, Caret, typed } = M;
const PUR = '#6D28D9', PUR2 = '#8B5CF6';

// ---------- Nội dung hội thoại (lời thoại giữ nguyên từ bản chạy thật 22/09) ----------
const CHATS = {
  p1: [
    { who: 'ai', off: 0, text: 'Jasmine Jewelry xin chào bạn, chúng tôi có thể giúp được gì cho bạn?' },
    { who: 'me', off: 0.9, text: 'Shop ơi, mẫu dây chuyền Emerald Halo còn hàng không? Mai trưa giao Cầu Giấy kịp không shop?' },
    { who: 'ai', off: 2.3, text: 'Dạ Jasmine chào bạn! Mẫu dây chuyền Emerald Halo là một trong những thiết kế rất được yêu thích tại tiệm đó ạ.' },
    { who: 'ai', off: 3.3, text: 'Để Jasmine tiện kiểm tra nhanh tình trạng hàng và hỗ trợ giao gấp đến Cầu Giấy cho mình vào trưa mai, bạn cho Jasmine xin tên và số điện thoại liên hệ nhé ạ.' },
    { who: 'me', off: 4.9, text: 'Anh là Trần Quốc Bảo, số 0908215736. Anh muốn mua 1 sợi làm quà kỷ niệm ngày cưới.' },
    { who: 'ai', off: 6.2, text: 'Jasmine chuyển anh sang chuyên viên phụ trách để tư vấn chi tiết và hỗ trợ giao hàng kịp trưa mai cho mình nhé ạ.', hl: 'chuyển anh sang chuyên viên phụ trách', label: 'Biết lúc nào cần bàn giao', hlAt: 0.8, hlDur: 3 },
  ],
  p2: [
    { who: 'me', off: -5, text: 'Anh là Trần Quốc Bảo, số 0908215736. Anh muốn mua 1 sợi làm quà kỷ niệm ngày cưới.' },
    { who: 'ai', off: -4, text: 'Jasmine chuyển anh sang chuyên viên phụ trách để tư vấn chi tiết và hỗ trợ giao hàng kịp trưa mai cho mình nhé ạ.' },
    { who: 'ai', off: 0.2, agent: 'Jasmine Sales Specialist', text: 'Dạ anh Bảo, mẫu Dây Chuyền Bạc Mặt Đá Lục Emerald Halo — SKU JJ-DC-002 giá 4.900.000đ / chiếc. Hiện Kho Jasmine còn ít, đang có 2 chiếc ạ. Về giao trưa mai ở Cầu Giấy, Jasmine chưa hứa chính xác giờ giao được; nếu anh chốt, cửa hàng sẽ xác nhận và ưu tiên đóng gói/giao trong ngày làm việc nhé. Anh cho em xin địa chỉ giao cụ thể ở Cầu Giấy được không ạ?', hl: 'đang có 2 chiếc', hl2: 'giá 4.900.000đ', label: 'Giá và tồn kho đọc từ hệ thống thật', hlAt: 1.2, hlDur: 3.2 },
    { who: 'me', off: 4.6, text: 'Ok em, anh lấy 1 sợi, dây dài 45cm. Giao về văn phòng anh: Số 12 ngõ 90 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, trước 12h trưa mai. Gói hộp quà kèm thiệp giúp anh, không để giá trong hộp. Anh thanh toán khi nhận hàng (COD), shipper gọi trước 15 phút nhé.' },
  ],
  p3: [
    { who: 'ai', off: 0, agent: 'Jasmine Sales Specialist', text: 'Dạ anh Bảo, Jasmine tóm tắt đơn: Dây Chuyền Bạc Mặt Đá Lục Emerald Halo — SKU JJ-DC-002, số lượng 1, dây dài 45cm, đơn giá 4.900.000đ / chiếc, thành tiền 4.900.000đ.' },
    { who: 'ai', off: 1.0, text: 'Kho Jasmine hiện còn ít, đang có 2 chiếc. Ghi chú: gói hộp quà kèm thiệp, không để giá trong hộp, COD, shipper gọi trước 15 phút; giao về Số 12 ngõ 90 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy. Jasmine sẽ ưu tiên giao trước 12h trưa mai nhưng chưa hứa chính xác giờ giao được ạ.' },
    { who: 'ai', off: 2.2, text: 'Anh xác nhận để Jasmine lên đơn nhé?' },
    { who: 'me', off: 3.4, text: 'Đúng rồi em, anh xác nhận. Lên đơn giúp anh nhé.' },
    { who: 'ai', off: 4.6, text: 'Dạ anh Bảo, Jasmine đã nhận đơn Dây Chuyền Bạc Mặt Đá Lục Emerald Halo tổng 4.900.000đ ạ.' },
    { who: 'ai', off: 5.4, text: 'Đơn đang chờ cửa hàng xác nhận và cấp mã đơn; sau đó Jasmine sẽ đóng gói hộp quà, không để giá trong hộp và giao trong ngày làm việc.', hl: 'Đơn đang chờ cửa hàng xác nhận', label: 'AI không tự chốt đơn', hlAt: 0.7, hlDur: 3 },
  ],
  notify: [
    { who: 'me', off: -5, text: 'Đúng rồi em, anh xác nhận. Lên đơn giúp anh nhé.' },
    { who: 'ai', off: -4, text: 'Đơn đang chờ cửa hàng xác nhận và cấp mã đơn; sau đó Jasmine sẽ đóng gói hộp quà, không để giá trong hộp và giao trong ngày làm việc.' },
    { who: 'ai', off: 0.3, agent: 'Jasmine Jewelry · 08:45', text: 'Chào anh Bảo, đơn JJDH-0004 đã xuất kho và đang được Ahamove giao, dự kiến 09:30–10:15. Anh vui lòng chuẩn bị 4.900.000đ thanh toán khi nhận hàng. Nhân viên giao hàng sẽ gọi trước 15 phút ạ.', hl: 'dự kiến 09:30–10:15', hl2: '4.900.000đ', label: 'Order → Prospect → khách hàng', hlAt: 1.0, hlDur: 2.6 },
  ],
};
const Mark = ({ on, children }) => <span style={{ background: on ? 'rgba(240,162,59,.55)' : 'transparent', borderRadius: 6, padding: on ? '0 6px' : 0, margin: on ? '0 -2px' : 0, transition: 'background .3s, padding .3s', fontWeight: on ? 700 : 'inherit' }}>{children}</span>;
function richText(text, hls, on) {
  if (!hls.length) return text;
  const re = new RegExp('(' + hls.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'g');
  return text.split(re).map((s, i) => hls.includes(s) ? <Mark key={i} on={on}>{s}</Mark> : s);
}
function Bubble({ T, t0, m, top }) {
  const me = m.who === 'me', hls = [m.hl, m.hl2].filter(Boolean), hon = m.hlAt != null && T >= t0 + m.hlAt;
  const p = m.hlAt != null ? ez(T, t0 + m.hlAt, 0.5) * (1 - ez(T, t0 + m.hlAt + m.hlDur, 0.5)) : 0;
  return <Focus p={p} col={AMBER} pad={10} label={m.label} right={me} st={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '82%', ...rise(T, t0, 0.45, 18) }}>
    {m.agent && <span style={{ display: 'block', font: `500 17px ${MONO}`, letterSpacing: 1, color: '#6B7A99', marginBottom: 6 }}>{m.agent.toUpperCase()}</span>}
    <div style={{ padding: '18px 24px', borderRadius: me ? '20px 20px 6px 20px' : '20px 20px 20px 6px', background: me ? `linear-gradient(135deg, ${PUR2}, ${PUR})` : '#EEF2F9', color: me ? '#fff' : '#1F2A44', font: `400 25px/1.42 ${UI}`, boxShadow: me ? '0 8px 24px rgba(109,40,217,.28)' : 'none' }}>{richText(m.text, hls, hon)}</div>
  </Focus>;
}
const Typing = () => <div style={{ alignSelf: 'flex-start', padding: '16px 22px', borderRadius: '20px 20px 20px 6px', background: '#EEF2F9', display: 'flex', gap: 7 }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: '#9AA7C2', animation: `codDot 1s ${i * 0.18}s infinite` }} />)}</div>;

function ChatScreen({ T, from, to, at, part }) {
  if (T < from || T > to + 0.5) return null;
  const op = Math.min(ez(T, from, 0.5), ez(to + 0.5, T, 0.45)), rp = ez(T, from, 0.8);
  const msgs = CHATS[part], W = 1400, H = FRAME_H + 40, L = DEMO_X + (FRAME_W - W) / 2, Tp = FRAME_TOP - 20;
  const shown = msgs.filter(m => T >= at + m.off);
  const next = msgs.find(m => T < at + m.off);
  const typing = next && next.who === 'ai' && T >= at + next.off - 0.8;
  return <div style={{ position: 'absolute', left: L, top: Tp, width: W, height: H, borderRadius: 28, background: '#F7F8FC', boxShadow: '0 28px 64px rgba(0,0,0,.45)', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: UI, opacity: op, transform: `translateY(${(1 - rp) * 30}px)` }}>
    <style>{'@keyframes codDot{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}'}</style>
    <div style={{ height: 96, flex: 'none', display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px', background: '#fff', borderBottom: '1px solid #E7E9F2' }}>
      <span style={{ width: 60, height: 60, borderRadius: '50%', background: '#0F1024', border: '2px solid #2B2E45', display: 'grid', placeItems: 'center', color: '#E5C36A', font: `600 24px ${AF}` }}>J</span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tx s={27} w={700} c="#101828">Jasmine Jewelry</Tx><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22C55E' }} /></span><Tx s={19} c="#6B7A99">Tư vấn trang sức cá nhân 24/7</Tx></span>
      <Sp /><span style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid #E7E9F2', font: `500 16px ${UI}`, color: '#6B7A99' }}>Live chat · Zalo · Messenger</span>
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 16, padding: '24px 32px', overflow: 'hidden' }}>
      {shown.map((m, i) => <Bubble key={i} T={T} t0={at + m.off} m={m} />)}
      {typing && <Typing />}
    </div>
    <div style={{ height: 92, flex: 'none', display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px', background: '#fff', borderTop: '1px solid #E7E9F2' }}>
      <span style={{ width: 54, height: 54, borderRadius: 14, border: '1px solid #E7E9F2', display: 'grid', placeItems: 'center', color: '#9AA7C2', font: `400 22px ${UI}` }}>⊕</span>
      <span style={{ flex: 1, height: 54, borderRadius: 14, border: '1.5px solid #C4B5FD', display: 'flex', alignItems: 'center', padding: '0 20px', font: `400 21px ${UI}`, color: '#9AA7C2' }}>Nhập tin nhắn...</span>
      <span style={{ width: 54, height: 54, borderRadius: 14, background: '#C4B5FD', display: 'grid', placeItems: 'center', color: '#fff', font: `400 22px ${UI}` }}>➤</span>
    </div>
  </div>;
}

// ---------- Inbox nhân viên (P4 · P5 · P6 · P7) ----------
const Ev = ({ parts, p }) => <div style={{ alignSelf: 'center', maxWidth: 560, textAlign: 'center', font: `400 12px/1.45 ${UI}`, color: '#667085', ...(p ? { opacity: p, transform: `translateY(${(1 - p) * 8}px)` } : {}) }}>⚡ {parts.map((x, i) => Array.isArray(x) ? <b key={i} style={{ color: '#344054', fontWeight: 600 }}>{x[0]}</b> : x)}</div>;
const IB = ({ me, p, children }) => <div style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: 440, padding: '10px 14px', borderRadius: 10, background: me ? '#1D6FE5' : '#fff', color: me ? '#fff' : '#101828', border: me ? 'none' : '1px solid #E7E9EF', font: `400 13px/1.45 ${UI}`, boxShadow: '0 1px 2px rgba(0,0,0,.05)', opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>{children}</div>;
const INBOX_EVENTS = {
  p4: [
    ['ai', 'Jasmine Jewelry xin chào bạn, chúng tôi có thể giúp được gì cho bạn?'],
    ['me', 'Shop ơi, mẫu dây chuyền Emerald Halo còn hàng không? Mai trưa giao Cầu Giấy kịp không shop?'],
    ['ev', [['Jasmine Agent'], ' updated profile: ', ['Phân loại'], ' from — to ', ['Mua, giữ hàng, đặt lịch'], ', ', ['Nhu cầu mua hàng'], ' from — to ', ['dây chuyền Emerald Halo']], 'Hiểu nhu cầu ngay từ câu đầu'],
    ['ev', ['Searched knowledge: giao hàng hỏa tốc Hà Nội Cầu Giấy thời gian giao hàng']],
    ['ev', ['Searched knowledge: Emerald Halo']],
    ['ev', ['Searched knowledge: chính sách giao hàng']],
    ['ai', 'Dạ Jasmine chào bạn! Mẫu dây chuyền Emerald Halo là một trong những thiết kế rất được yêu thích tại tiệm đó ạ.'],
    ['ev', [['Jasmine Agent'], ' updated profile: ', ['Tên khách hàng'], ' → Trần Quốc Bảo, ', ['Số điện thoại'], ' → 0908215736, ', ['Phone'], ' → +84908215736']],
    ['ev', [['Jasmine Jewelry - Chốt đơn online'], ' started']],
    ['ev', [['Jasmine Jewelry - Chốt đơn online'], ' ended — Completed'], 'Agent điều phối → Flow → Agent chuyên trách'],
    ['ai', 'Jasmine chuyển anh sang chuyên viên phụ trách để tư vấn chi tiết và hỗ trợ giao hàng kịp trưa mai cho mình nhé ạ.'],
  ],
  p6: [
    ['ai', 'Anh xác nhận để Jasmine lên đơn nhé?'],
    ['me', 'Đúng rồi em, anh xác nhận. Lên đơn giúp anh nhé.'],
    ['ev', [['Jasmine Sales Specialist'], ' created a draft order — ', ['4.900.000 VND'], ' · customer Trần Quốc Bảo (matched) · confirmed by ', ['“Đúng rồi em, anh xác nhận. Lên đơn giúp anh nhé.”']], 'Hội thoại → đơn nháp có cấu trúc, có dấu vết ai xác nhận'],
    ['ai', 'Dạ anh Bảo, Jasmine đã nhận đơn Dây Chuyền Bạc Mặt Đá Lục Emerald Halo tổng 4.900.000đ ạ.'],
    ['ai', 'Đơn đang chờ cửa hàng xác nhận và cấp mã đơn; sau đó Jasmine sẽ đóng gói hộp quà, không để giá trong hộp và giao trong ngày làm việc.'],
  ],
};
const CFIELDS = [['Phân loại', 'Mua, giữ hàng, đặt lịch', 'pill'], ['Tên khách hàng', 'Trần Quốc Bảo'], ['Số điện thoại', '0908215736'], ['Nội dung khiếu nại', '—'], ['Ngân sách dự kiến', '—'], ['Nhu cầu mua hàng', 'dây chuyền Emerald Halo'], ['Mô tả ý tưởng', '—'], ['Loại trang sức', '—'], ['Dịp sử dụng', '—'], ['Số lượng', '1']];
const CONVOS = [['TQ', 'Trần Quốc Bảo', 'Đơn đang chờ cửa hàng xác nhận và…', ['Waiting', 'Referral'], 1], ['ĐV', 'Đoàn Võ', 'Cho mình thêm số lượng cần mua nữa…', ['Waiting']], ['H', 'H', 'Cảm ơn anh/chị đã quan tâm ạ.', ['Closed']], ['TH', 'Thanh', 'Tổng tiền: 3.800.000đ. Đơn đang ở tr…', ['Waiting']], ['NH', 'Ngọc Hà', 'Tổng tiền 4.500.000đ. Cửa hàng sẽ x…', ['Waiting']], ['NT', 'Ngọc Trương', 'Bạn có tên dòng/loại cụ thể hơn khôn…', ['Waiting']], ['PN', 'Phan Nguyên Hùng', 'Có thể catalogue bên em không có nh…', ['Waiting']]];
function InboxScreen({ T, from, to, at, part }) {
  const evs = INBOX_EVENTS[part], step = part === 'p4' ? 0.55 : 0.9, isP6 = part === 'p6';
  const tOf = i => at + i * step;
  const fieldOn = (name) => { if (isP6) return 1; const idx = ['Phân loại', 'Nhu cầu mua hàng'].includes(name) ? 2 : ['Tên khách hàng', 'Số điện thoại'].includes(name) ? 7 : name === 'Số lượng' ? 2 : -1; return idx < 0 ? 0 : ez(T, tOf(idx) + 0.3, 0.4); };
  const cfP = isP6 ? 0 : ez(T, tOf(2) + 0.4, 0.5) * (1 - ez(T, tOf(6), 0.4));
  const draftP = isP6 ? ez(T, tOf(2) + 0.6, 0.5) * (1 - ez(T, tOf(4), 0.5)) : 0;
  const pulse = isP6 ? 1 + 0.03 * Math.sin(T * 6) * draftP : 1;
  return <Screen T={T} from={from} to={to} nav={null}>
    <div style={{ height: 40, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}><img src="assets/logo-base-mark.png" alt="" style={{ width: 20, height: 20 }} /><Tx s={13} w={700} c="#101828">Base.vn</Tx><Sp /><span style={{ width: 300, padding: '5px 12px', borderRadius: 6, background: '#F2F4F7', font: `400 11px ${UI}`, color: '#98A2B3' }}>⌕ Search anything…</span><Sp /><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#D0D5DD' }} /></div>
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ width: 56, flex: 'none', borderRight: '1px solid #E7E9EF', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '14px 0' }}>{['Home', 'Inbox', 'Prospects', 'Broadcasts', 'Flows'].map(x => <span key={x} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}><span style={{ width: 20, height: 20, borderRadius: 6, background: x === 'Inbox' ? '#DBEAFE' : '#F2F4F7' }} /><Tx s={8.5} c={x === 'Inbox' ? '#2563EB' : '#667085'}>{x}</Tx></span>)}</div>
      <div style={{ width: 230, flex: 'none', borderRight: '1px solid #E7E9EF', background: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 14px 8px', display: 'flex', flexDirection: 'column', gap: 8 }}><Tx s={14} w={700} c="#101828">Conversations</Tx><div style={{ display: 'flex', gap: 12 }}>{['All', 'New', 'Unansw…', 'Waiting'].map((x, i) => <Tx key={x} s={11} w={i ? 400 : 600} c={i ? '#667085' : '#2563EB'} st={{ paddingBottom: 4, borderBottom: i ? 'none' : '2px solid #2563EB' }}>{x}</Tx>)}</div></div>
        {CONVOS.map(([ini, n, pv, tags, act]) => <div key={n} style={{ display: 'flex', gap: 8, padding: '9px 12px', background: act ? '#EEF4FF' : '#fff', borderBottom: '1px solid #F2F4F7' }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: '#7C3AED', color: '#fff', flex: 'none', display: 'grid', placeItems: 'center', font: `600 10px ${UI}` }}>{ini}</span><span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}><Tx s={11.5} w={600} c="#101828">{n}</Tx><Tx s={10} c="#667085" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{pv}</Tx><span style={{ display: 'flex', gap: 4 }}>{tags.map(t => <span key={t} style={{ padding: '1px 6px', borderRadius: 4, background: t === 'Closed' ? '#ECFDF3' : t === 'Referral' ? '#F2F4F7' : '#FFFAEB', font: `500 9px ${UI}`, color: t === 'Closed' ? '#027A48' : t === 'Referral' ? '#344054' : '#B54708' }}>{t}</span>)}</span></span></div>)}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, backgroundImage: 'radial-gradient(#E7E9EF 1px, transparent 1px)', backgroundSize: '18px 18px', backgroundColor: '#FAFBFD' }}>
        <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}><span style={{ width: 26, height: 26, borderRadius: '50%', background: '#7C3AED', color: '#fff', display: 'grid', placeItems: 'center', font: `600 9px ${UI}` }}>TQ</span><Tx s={14} w={700} c="#101828">Trần Quốc Bảo</Tx><Sp /><span style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #E7E9EF', font: `400 11px ${UI}`, color: '#667085' }}>● No stage</span></div>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, padding: '12px 24px', overflow: 'hidden' }}>
          {evs.map(([k, body, label], i) => { const t0 = tOf(i); if (T < t0) return null; const p = ez(T, t0, 0.4); if (k === 'ev') { const fp = label ? ez(T, t0 + 0.5, 0.5) * (1 - ez(T, t0 + (isP6 ? 3.2 : 2.2), 0.5)) : 0; return <Focus key={i} p={fp} col={isP6 ? GREEN : BLUE} pad={8} label={label} st={{ alignSelf: 'center' }}><Ev parts={body} p={p} /></Focus>; } return <IB key={i} me={k === 'ai'} p={p}>{body}</IB>; })}
        </div>
        <div style={{ flex: 'none', margin: '0 16px 12px', borderRadius: 8, border: '1px solid #E7E9EF', background: '#fff' }}><div style={{ display: 'flex', gap: 14, padding: '8px 14px', borderBottom: '1px solid #F2F4F7' }}><Tx s={11} w={600} c="#101828">Reply</Tx><Tx s={11} c="#667085">Note</Tx></div><div style={{ padding: '10px 14px' }}><Tx s={11} c="#98A2B3">Type a reply, or "/" for a canned response…</Tx></div></div>
      </div>
      <div style={{ width: 400, flex: 'none', borderLeft: '1px solid #E7E9EF', background: '#fff', display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><img src="assets/app-icons/prospector.svg" alt="" style={{ width: 26, height: 26, borderRadius: 6 }} /><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12.5} w={700} c="#101828">Base AI - Jasmine Support</Tx><Tx s={10} c="#667085">Live Chat — Sales</Tx></span></div>
        <Focus p={draftP} col={GREEN} pad={6} label="Đơn nháp 4.900.000đ · chờ cửa hàng xác nhận" st={{ transform: `scale(${pulse})` }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #E7E9EF', background: '#fff' }}><span style={{ width: 26, height: 26, borderRadius: 6, background: '#EFF4FF', color: '#2563EB', display: 'grid', placeItems: 'center' }}>▤</span><span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><Tx s={11.5} w={600} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Đơn online Trần Quốc Bảo - +84908215736</Tx><Tx s={10} c="#667085">Draft</Tx></span><Sp /><Tx s={12} c="#98A2B3">›</Tx></div></Focus>
        {['CONVERSATION', 'SOURCE', 'ASSIGNED TO', 'LABELS'].map(x => <span key={x} style={{ display: 'flex', padding: '4px 0', borderBottom: '1px solid #F2F4F7' }}><Lbl>{x}</Lbl><Sp /><Tx s={11} c="#98A2B3">›</Tx></span>)}
        {isP6 ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Lbl>PROSPECT</Lbl>{[['Name', 'Trần Quốc Bảo'], ['Phone numbers', '+84 908-215-736  ·  AI · Primary'], ['Email addresses', 'No email addresses'], ['Company', '—'], ['Mã khách hàng', '—'], ['Hạng thành viên', '—'], ['Tổng chi tiêu 12 tháng', '—']].map(([a, b]) => <span key={a} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 8 }}><Tx s={11} c="#667085">{a}</Tx><Tx s={11} w={b === '—' ? 400 : 600} c={b === '—' ? '#98A2B3' : '#101828'}>{b}</Tx></span>)}</div>
          : <Focus p={cfP} col={BLUE} pad={8} label="Dữ liệu có cấu trúc → đầu vào cho service sau"><div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}><Lbl>☰ CUSTOM FIELDS</Lbl>{CFIELDS.map(([a, b, kind]) => { const on = b === '—' ? 1 : fieldOn(a); return <span key={a} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 8, alignItems: 'center' }}><Tx s={11} c="#667085">{a}</Tx>{b === '—' ? <Tx s={11} c="#98A2B3">—</Tx> : <span style={{ opacity: on, transform: `translateX(${(1 - on) * 8}px)` }}>{kind === 'pill' ? <Pill c="#027A48" bg="#ECFDF3">{b}</Pill> : <Tx s={11} w={600} c="#101828">{b}</Tx>}</span>}</span>; })}</div></Focus>}
      </div>
    </div>
  </Screen>;
}

// ---------- Cấu hình AI Agent (P9) ----------
const STEPS = [['Shop', 'Đơn hàng bá…'], ['Catalogue', 'Jasmine Jew…'], ['Stock', 'Kho Jasmine …'], ['Ownership', 'The conversa…'], ['Customers', 'Người liên hệ…'], ['Order name', 'Đơn online {c…']];
function AgentConfigScreen({ T, from, to, at, split }) {
  const stepP = i => ez(T, at + 0.2 + i * 0.18, 0.3), whP = ez(T, at + 1.6, 0.5), tgP = ez(T, at + 3.4, 0.5), tg = io(T, at + 3.6, 0.4);
  const whF = whP * (1 - tgP), tgF = tgP * (1 - ez(T, at + 7.5, 0.5));
  return <Screen T={T} from={from} to={to} nav={null} split={split}>
    <div style={{ height: 40, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}><img src="assets/logo-base-mark.png" alt="" style={{ width: 20, height: 20 }} /><Tx s={13} w={700} c="#101828">Base.vn</Tx><Sp /><span style={{ width: 300, padding: '5px 12px', borderRadius: 6, background: '#F2F4F7', font: `400 11px ${UI}`, color: '#98A2B3' }}>⌕ Search anything…</span><Sp /><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#D0D5DD' }} /></div>
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ width: 200, flex: 'none', borderRight: '1px solid #E7E9EF', background: '#fff', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}><Tx s={14} w={700} c="#101828" st={{ marginBottom: 8 }}>Settings</Tx>{[['Services'], ['Channels'], ['Canned Responses'], ['Labels'], ['PROSPECTS', 's'], ['General'], ['Custom Fields'], ['Stages'], ['AI (BETA)', 's'], ['AI Agents', '', 1], ['AI Sources']].map(([l, s, act]) => s ? <Lbl key={l} st={{ margin: '10px 0 2px 8px' }}>{l}</Lbl> : <span key={l} style={{ padding: '5px 8px', borderRadius: 6, background: act ? '#EEF4FF' : 'transparent' }}><Tx s={12} w={act ? 600 : 400} c={act ? '#1D4ED8' : '#344054'}>{l}</Tx></span>)}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}><Tx s={13} c="#667085">‹</Tx><img src="assets/app-icons/prospector.svg" alt="" style={{ width: 22, height: 22, borderRadius: 6 }} /><Tx s={14} w={700} c="#101828">Jasmine Sales Specialist</Tx><Sp /><Tx s={12} c="#344054">Cancel</Tx><span style={{ padding: '6px 14px', borderRadius: 6, background: '#2563EB', font: `500 12px ${UI}`, color: '#fff' }}>Save</span></div>
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <div style={{ width: 190, flex: 'none', borderRight: '1px solid #E7E9EF', background: '#fff', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Lbl st={{ margin: '0 0 4px 8px' }}>AGENT</Lbl>{['General', 'Instructions', 'Advanced'].map(x => <span key={x} style={{ padding: '5px 8px' }}><Tx s={12} c="#344054">{x}</Tx></span>)}
            <Lbl st={{ margin: '10px 0 4px 8px' }}>DOMAINS</Lbl>{[['Commerce', 'ON', 1], ['Customer Suc…', 'SOON'], ['Sales', 'SOON'], ['Work', 'SOON'], ['Hiring', 'SOON']].map(([x, s, act]) => <span key={x} style={{ display: 'flex', alignItems: 'center', padding: '5px 8px', borderRadius: 6, background: act ? '#EEF4FF' : 'transparent' }}><Tx s={12} w={act ? 600 : 400} c={act ? '#1D4ED8' : '#344054'}>{x}</Tx><Sp /><span style={{ padding: '1px 6px', borderRadius: 4, background: act ? '#ECFDF3' : '#F2F4F7', font: `600 9px ${UI}`, color: act ? '#027A48' : '#98A2B3' }}>{s}</span></span>)}
            <Sp /><div style={{ padding: 12, borderRadius: 8, border: '1px solid #E7E9EF', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ display: 'flex' }}><Tx s={11} w={600} c="#101828">Readiness</Tx><Sp /><Tx s={11} w={700} c="#2563EB">100%</Tx></span><span style={{ height: 3, borderRadius: 2, background: '#2563EB' }} />{['Identity & model set', 'Instructions written', 'A domain enabled'].map(x => <Tx key={x} s={10} c="#16A34A">✓ {x}</Tx>)}</div>
          </div>
          <div style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><Tx s={22} w={700} c="#101828">Commerce</Tx><Tx s={12} c="#667085">Let this agent read the catalogue and raise orders from the inbox.</Tx></span>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>{STEPS.map(([a, b], i) => { const p = stepP(i), cur = i === 2; return <span key={a} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative' }}>{i < 5 && <span style={{ position: 'absolute', left: '50%', right: '-50%', top: 12, height: 2, background: p > 0.5 && i < 2 ? '#16A34A' : '#E7E9EF' }} />}<span style={{ width: 26, height: 26, borderRadius: '50%', background: cur ? '#fff' : p > 0.5 ? '#16A34A' : '#fff', border: cur ? '2px solid #2563EB' : p > 0.5 ? 'none' : '2px solid #D0D5DD', color: cur ? '#2563EB' : '#fff', display: 'grid', placeItems: 'center', font: `700 11px ${UI}`, position: 'relative', zIndex: 1, transform: `scale(${1 + 0.3 * Math.sin(Math.PI * clamp((T - at - 0.2 - i * 0.18) / 0.3, 0, 1))})` }}>{cur ? '3' : p > 0.5 ? '✓' : i + 1}</span><Tx s={11} w={cur ? 700 : 500} c="#101828">{a}</Tx><Tx s={10} c="#98A2B3">{b}</Tx></span>; })}</div>
            <Lbl>STEP 3 OF 6</Lbl>
            <Focus p={whF} col={BLUE} pad={8} label="Kho duy nhất agent được đọc: Kho Jasmine – 200 3/2"><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Tx s={12} w={500} c="#344054">Warehouses</Tx><Sel hi={whF}>Kho Jasmine – 200 3/2</Sel><Tx s={11} c="#98A2B3">The only warehouses this agent can check stock in.</Tx></div></Focus>
            <Focus p={tgF} col={AMBER} pad={8} label="Doanh nghiệp quyết định AI được nói số tồn chính xác"><div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}><span style={{ width: 40, height: 22, borderRadius: 11, background: tg > 0.5 ? '#2563EB' : '#D0D5DD', position: 'relative', flex: 'none', transition: 'background .2s' }}><span style={{ position: 'absolute', top: 2, left: 2 + 18 * tg, width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} /></span><span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><Tx s={13} w={600} c="#101828">Show exact stock counts to customers</Tx><Tx s={11} c="#98A2B3" st={{ whiteSpace: 'normal', lineHeight: 1.4 }}>Off by default: an exact figure tells a competitor how fast you sell. Left off, customers hear in stock, low stock or out of stock.</Tx></span></div></Focus>
            <div style={{ display: 'flex', marginTop: 8 }}><Tx s={12} w={500} c="#344054">Back</Tx><Sp /><span style={{ padding: '7px 16px', borderRadius: 6, background: '#2563EB', font: `500 12px ${UI}`, color: '#fff' }}>Next</span></div>
          </div>
          <div style={{ width: 330, flex: 'none', borderLeft: '1px solid #E7E9EF', background: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', borderRadius: 8, background: '#F2F4F7', padding: 3 }}><span style={{ flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 6, background: '#fff', font: `600 12px ${UI}`, color: '#101828' }}>✎ Build</span><span style={{ flex: 1, textAlign: 'center', padding: '6px 0', font: `500 12px ${UI}`, color: '#667085' }}>Test</span></div>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '18px 10px 6px', textAlign: 'center' }}><span style={{ width: 34, height: 34, borderRadius: 10, background: '#F4EBFF', display: 'grid', placeItems: 'center', color: '#6941C6' }}>✦</span><Tx s={14} w={700} c="#101828">Help build your AI Agent</Tx><Tx s={11} c="#667085" st={{ whiteSpace: 'normal', lineHeight: 1.45 }}>Tell me what this agent should handle. I'll draft the instructions, handover rules and tools for you to review.</Tx></span>
            {['Draft instructions from my business', 'Write handover rules', 'Suggest tools this agent needs', 'Review my current setup'].map(x => <span key={x} style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid #E7E9EF', font: `500 11.5px ${UI}`, color: '#344054' }}>{x}</span>)}
            <Sp /><div style={{ height: 70, borderRadius: 8, border: '1px solid #E7E9EF', padding: 10 }}><Tx s={11} c="#98A2B3">Describe what this agent needs to do…</Tx></div>
          </div>
        </div>
      </div>
    </div>
  </Screen>;
}

window.ProspectorMocks = { ChatScreen, InboxScreen, AgentConfigScreen };
