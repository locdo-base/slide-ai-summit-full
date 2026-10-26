// Cycle Dài · Playbook (todo tự sinh) + Copilot tóm tắt deal ngày 40 — dùng đúng khung DealScreen của mockup Sales
(function () {
  const B = window.DaiBase;
  const { UI, PRI, BLUE, ez, rise, typed, Tx, P, Pill, Sp, Card, Caret, Focus, fw, FeedItem } = B;
  const VIO = '#6941C6';
  const TODO = [
    { k: 'email', title: 'Gửi case study quà Tết 2026 cho chị Thu Trang', sub: 'Giao cho Phương Hà · Hạn 05/08/2026', body: 'Người đề xuất cần tài liệu để trình nội bộ: 3 case doanh nghiệp dược, ảnh bộ quà thực tế, phản hồi của khách.' },
    { k: 'meeting', title: 'Hẹn Phòng HC-NS xem mẫu khắc logo', sub: 'Giao cho Phương Hà · Hạn 07/08/2026', body: 'Mang 3 bộ mẫu Lucky Clover có khắc logo Việt Phúc, chốt kiểu hộp và thiệp.' },
    { k: 'call', title: 'Gọi anh Lý Văn Kiên làm rõ tiêu chí so sánh 3 NCC', sub: 'Giao cho Phương Hà · Hạn 10/08/2026', body: 'Mua hàng đang so giá. Hỏi rõ tiêu chí: giá, chất liệu, thời gian giao, bảo hành.' },
    { k: 'note', title: 'Chuẩn bị phương án giá và thanh toán trình CFO', sub: 'Giao cho Phương Hà · Hạn 13/08/2026', body: 'Chị Trần Bích Ngọc duyệt chi. Chuẩn bị 2 phương án: chiết khấu theo số lượng và thanh toán 30/70.' }
  ];
  function TodoList({ T, at, live }) {
    const n = live ? TODO.filter((_, i) => T >= at + 2.2 + i * 0.7).length : TODO.length;
    return <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Card st={{ padding: '10px 14px', gap: 6, ...(live ? rise(T, at + 0.6, 0.5, 10) : {}) }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={13} w={700} c="#101828">▶ Playbook: Deal B2B quà Tết giá trị lớn</Tx><Pill c={VIO} bg="#F4EBFF">{n} việc tự sinh</Pill><Sp /><Tx s={11.5} c="#667085">Áp dụng khi: ≥ 1 tỷ · Báo giá · 5 người quyết định</Tx></span>
      </Card>
      <Focus p={live ? fw(T, at + 2.4, at + 8.6) : 0} col={BLUE} pad={3} label="Todo tự sinh theo kịch bản, có người phụ trách và hạn">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TODO.map((t, i) => { const t0 = at + 2.2 + i * 0.7; if (live && T < t0) return null; return <div key={i} style={live ? rise(T, t0, 0.45, 12) : {}}><FeedItem k={t.k} title={t.title} tag="TODO" sub={t.sub} body={t.body} badge="Playbook" badgeC={VIO} meta={'Tự tạo 09:00 Aug 05 2026 · bước ' + (i + 1) + ' / 4'} /></div>; })}
        </div>
      </Focus>
    </div>;
  }
  function PlaybookScreen({ T, from, to, at, C }) {
    return <window.DaiSales.DealScreen T={T} from={from} to={to} C={C} phase="journey" work={<TodoList T={T} at={at} live />} />;
  }
  const Q = 'Tóm tắt deal Việt Phúc tới hôm nay: đang ở đâu, ai quyết định, việc gì cần làm tiếp?';
  const ANS = [['h', '1. Tóm tắt hành trình (40 ngày từ Meta Ads)'], ['b', 'Nhu cầu & Báo giá', 'Quà Tết doanh nghiệp 2027 – 200 bộ Lucky Clover. Báo giá lần 1: 1.700.000.000 VNĐ.'], ['b', '26/06/2026', 'Tiếp nhận thông tin từ Meta Lead Form.'], ['b', '21/07/2026', 'Khảo sát tại văn phòng Việt Phúc, xác định 5 người quyết định.'],
    ['h', '2. Người quyết định (Decision Maker)'], ['b', 'Đề xuất', 'Chị Đặng Thu Trang – Trưởng phòng Hành chính – Nhân sự.'], ['b', 'So giá', 'Anh Lý Văn Kiên – Mua hàng, đang so sánh 3 nhà cung cấp.'], ['b', 'Duyệt chi & Ký', 'Chị Trần Bích Ngọc (CFO) · Anh Hoàng Đức Thắng (TGĐ).'],
    ['h', '3. Việc tiếp theo theo playbook'], ['b', 'Gửi case study cho chị Thu Trang', 'Phương Hà – Hạn: 05/08/2026.'], ['b', 'Làm rõ tiêu chí so sánh 3 NCC', 'Phương Hà – Hạn: 10/08/2026.'], ['b', 'Phương án giá & thanh toán trình CFO', 'Phương Hà – Hạn: 13/08/2026.']];
  function Panel({ T, at }) {
    const cp = ez(T, at + 0.2, 0.6), qT = typed(Q, T, at + 0.7, 70), ansAt = at + 2.9;
    return <div style={{ position: 'absolute', right: 14, top: 8, bottom: 8, width: 470, background: '#fff', borderRadius: 12, border: '1px solid #EAECF0', boxShadow: '0 24px 60px rgba(0,0,0,.22)', display: 'flex', flexDirection: 'column', opacity: cp, transform: `translateX(${(1 - cp) * 60}px)`, zIndex: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid #F2F4F7' }}><span style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#7F56D9,#D444F1)' }} /><Tx s={14} w={700} c="#101828">Copilot</Tx><Pill c={VIO} bg="#F4EBFF">BETA</Pill><Sp /><Tx s={12} c="#98A2B3">ⓘ  ⟳  ···  ✕</Tx></div>
      <div style={{ flex: 1, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        <div style={{ alignSelf: 'flex-end', maxWidth: 360, padding: '10px 14px', borderRadius: 12, background: '#F2F4F7', minHeight: 20 }}><P s={13} c="#101828">{qT}<Caret on={qT.length > 0 && qT.length < Q.length} /></P></div>
        <span style={{ display: 'flex', gap: 18, borderBottom: '1px solid #EAECF0', opacity: ez(T, ansAt - 0.5, 0.3) }}><Tx s={13} w={600} c={VIO} st={{ paddingBottom: 6, borderBottom: '2px solid #7F56D9' }}>Answer</Tx><Tx s={13} c="#667085">Thinking</Tx></span>
        {T >= ansAt - 0.6 && T < ansAt && <Tx s={12.5} c="#98A2B3">Đang đọc 40 ngày hoạt động của deal…</Tx>}
        {ANS.map((l, i) => { const t = ansAt + i * 0.4; if (T < t) return null; const r = rise(T, t, 0.4, 8);
          return l[0] === 'h' ? <Tx key={i} s={13.5} w={700} c="#101828" st={{ whiteSpace: 'normal', marginTop: i ? 8 : 0, ...r }}>{l[1]}</Tx> : <P key={i} s={13} c="#344054" st={{ paddingLeft: 18, ...r }}><b style={{ color: '#101828' }}>{l[1]}</b>: {l[2]}</P>; })}
      </div>
    </div>;
  }
  function CopilotDealScreen({ T, from, to, at, C }) {
    return <window.DaiSales.DealScreen T={T} from={from} to={to} C={C} phase="journey" work={<TodoList T={T} at={at} />} panel={<Panel T={T} at={at} />} />;
  }
  window.DaiPlaybook = { PlaybookScreen, CopilotDealScreen };
})();
