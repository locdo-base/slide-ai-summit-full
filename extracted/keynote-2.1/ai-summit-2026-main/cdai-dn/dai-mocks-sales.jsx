// Cycle Dài · mockup app Sales: Pipeline board, Deal (hành trình → Copilot → Won)
(function () {
  const B = window.DaiBase;
  const { AF, UI, MONO, PRI, OK, OKD, BLUE, AMBER, GREEN, RED, lerp, ez, io, rise, typed, vnd, clamp, Tx, P, Pill, Tag, Btn, Lbl, Sp, Hr, Ic, Av, Card, Caret, Focus, fw, Cursor, Toast, Drop, Screen, FeedItem } = B;
  const SG = '#1FA24A';
  const STAGES = ['SQL – TIẾP NHẬN NHU CẦU', 'SAL – KHAI THÁC VÀ TƯ VẤN', 'BÁO GIÁ', 'KÝ HỢP ĐỒNG VÀ ĐẶT CỌC', 'NGHIỆM THU', 'THU TIỀN'];

  // ================= Pipeline board =================
  const COLS = [['SQL – Tiếp nhận nhu cầu', 2, '$1,155,000,000', '30%', '#1570EF', [[[], 'Lotus Bay Hạ Long – 60 đôi khuyên tai Crystal Drop cho lễ tân', 'Đỗ Quang Huy · Khách sạn Lotus Bay H…', '₫126,000,000'], [['Khách VIP', 'Khắc logo / tên'], 'NovaPay – 350 lắc tay khắc logo kỷ niệm 10 năm', 'Phạm Hải Yến · Công ty CP Công nghệ …', '₫1,029,000,000', '3d']]], ['SAL – Khai thác và tư vấn', 0, '$0', '0%', '#0E9384', []], ['Báo giá', 1, '$115,300,000', '3%', '#107569', [[['Cần gấp', 'Từ Prospector'], 'Linh Đan Accessories – sỉ 50 nhẫn cho đợt 11.11', 'Vũ Linh Đan · Linh Đan Accessories', '₫115,300,000', '2d']]], ['Ký hợp đồng và đặt cọc', 2, '$729,750,000', '19%', '#DC6803', [[['Từ Prospector', 'Khắc logo / tên', 'Cần gấp'], 'Sao Bắc Việt – 150 mặt dây chuyền khắc logo kỷ niệm 15 năm', 'Lê Hoàng Mai · Công ty CP Công nghệ …', '₫514,500,000', 'due today'], [['Cần gấp'], 'Minh Châu – nhập sỉ Q4: 40 nhẫn Comet + 30 dây chuyền Ruby Halo', 'Trần Bảo Châu · Đại lý Bạc Minh Châu', '₫215,250,000', '2d']]], ['Nghiệm thu', 1, '$…', '', '#7A5AF8', []]];
  const TAGC = { 'Khách VIP': ['#C01048', '#FFF1F3'], 'Khắc logo / tên': ['#6941C6', '#F4EBFF'], 'Cần gấp': ['#B54708', '#FFFAEB'], 'Từ Prospector': ['#175CD3', '#EFF8FF'] };
  function PipelineScreen({ T, from, to, at }) {
    return <Screen T={T} from={from} to={to} nav="salesBoard">
      <div style={{ height: 48, flex: 'none', display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', background: '#fff', borderBottom: '1px solid #EAECF0' }}>
        <Tx s={12.5} c="#475467">View: <b style={{ color: '#101828' }}>Visible deals</b> ⌄</Tx>
        <Focus p={fw(T, at + 3.6)} col={BLUE} pad={4} label="Giá trị dự kiến = giá trị deal × xác suất từng giai đoạn" below><Tx s={12.5} c="#475467"><b style={{ color: '#101828' }}>7</b> deals · Total: <b style={{ color: '#101828' }}>$3,869,550,000</b> · Projected: <b style={{ color: '#101828' }}>$2,699,425,000</b></Tx></Focus>
        <Sp /><span style={{ width: 170, padding: '6px 10px', borderRadius: 6, border: '1px solid #D0D5DD' }}><Tx s={11.5} c="#98A2B3">⌕ Quick filter deals</Tx></span><Btn>Filters ›</Btn><Btn pri>+ Add deal</Btn>
      </div>
      <Focus p={fw(T, at + 0.5, at + 3.4)} col={BLUE} pad={2} label="Mỗi giai đoạn có xác suất thắng và ngưỡng trễ riêng" below st={{ flex: 'none' }}>
        <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #EAECF0' }}>
          {COLS.map(([n, c, v, pct, col], i) => { const on = ez(T, at + 0.5 + i * 0.35, 0.4); return <div key={n} style={{ width: 290, flex: 'none', padding: '10px 16px', borderRight: '1px solid #EAECF0', display: 'flex', flexDirection: 'column', gap: 3, background: `rgba(21,112,239,${0.06 * on})` }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 3, height: 16, background: col, borderRadius: 2 }} /><Tx s={14} w={700} c={col}>{n}</Tx><Pill>{c}</Pill></span>
            <Tx s={11.5} c="#475467">∿ <b style={{ color: '#101828' }}>{v}</b>{pct && ` · ${pct} of pipeline`}</Tx>
          </div>; })}
        </div>
      </Focus>
      <div style={{ flex: 1, display: 'flex', padding: '10px 0', gap: 0 }}>
        {COLS.map(([n, , , , , cards], ci) => <div key={n} style={{ width: 290, flex: 'none', padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cards.length === 0 && ci === 1 && <Tx s={12} c="#98A2B3" st={{ textAlign: 'center', padding: '14px 0', borderBottom: '1px solid #EAECF0' }}>Nothing in this stage</Tx>}
          {cards.map(([tags, t, s, v, due], k) => <div key={k} style={{ background: tags.includes('Cần gấp') || tags.includes('Khách VIP') ? '#FFF6F5' : '#fff', border: '1px solid #EAECF0', borderRadius: 8, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6, ...rise(T, at - 0.2 + ci * 0.12 + k * 0.1, 0.45, 10) }}>
            {tags.length > 0 && <span style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{tags.map(g => <Pill key={g} c={TAGC[g][0]} bg={TAGC[g][1]}>{g}</Pill>)}</span>}
            <P s={12.5} w={600} c="#101828">{t}</P><Tx s={11} c="#667085" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</Tx><Hr />
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Av t="PH" s={18} bg="#1E88E5" /><Tx s={11} c="#475467">Phương</Tx>{due && <Pill c={due === 'due today' ? '#B54708' : '#B42318'} bg={due === 'due today' ? '#FFFAEB' : '#FEF3F2'}>{due === 'due today' ? '◷ due today' : `♨ ${due}`}</Pill>}<Sp /><Tx s={12.5} w={700} c="#101828">{v}</Tx></span>
          </div>)}
        </div>)}
      </div>
    </Screen>;
  }

  // ================= Deal =================
  const DM = ['Quỳnh Anh (điền form)', 'Thu Trang (đề xuất)', 'Lý Văn Kiên (Mua hàng, so sánh 3 NCC)', 'Trần Bích Ngọc (CFO, duyệt chi)', 'Hoàng Đức Thắng (TGĐ, ký HĐ)'];
  const F_DEAL = [
    { k: 'call', title: 'Call', tag: 'CALL', sub: 'Outbound · 12 min', badge: 'Connected', body: 'Gọi chị Thu Trang xác nhận SQL: đúng nhu cầu, đúng ngân sách, đúng thời điểm. Hẹn khảo sát trực tiếp tại văn phòng Việt Phúc sáng 21/07.', meta: '09:30 Jul 19 2026', h: 124 },
    { k: 'email', title: 'Xác nhận lịch khảo sát 21/07 – Jasmine × Việt Phúc', tag: 'MAIL', sub: 'thutrang.dang@vietphuc-pharma.com.vn', body: 'Em xác nhận lịch khảo sát 9:00 thứ Ba 21/07 tại 88 Hoàng Quốc Việt. Jasmine mang theo 3 bộ mẫu thật, bảng màu hộp và mẫu khắc logo.', meta: '10:05 Jul 19 2026', h: 124 },
  ];
  const F_DM = [{ k: 'meeting', title: 'Khảo sát tại văn phòng Việt Phúc', tag: 'MEETING', sub: '09:00 21 thg 7 · 90 min · VP Việt Phúc – 88 Hoàng Quốc Việt', badge: '◷ Done', badgeC: '#667085', body: 'Gặp chị Thu Trang + chị Quỳnh Anh. Chốt cơ cấu 2 tầng quà: 40 bộ lãnh đạo/đối tác (hộp gỗ, thiệp cá nhân hoá) + 160 bộ nhân viên (hộp nhung). Việt Phúc bắt buộc so sánh 3 nhà cung cấp qua phòng Mua hàng.', meta: '09:00 Jul 21 2026', h: 142 }];
  const F_55 = [
    { k: 'email', title: 'Báo giá lần 1 – 200 bộ Lucky Clover (1.700.000.000đ)', tag: 'MAIL', sub: 'kien.ly@vietphuc-pharma.com.vn', body: 'Báo giá lần 1 theo giá sỉ bậc 100+: 200 × 8.500.000đ = 1.700.000.000đ, gồm khắc logo, hộp và thiệp. Hiệu lực 15 ngày.', meta: '11:00 Aug 12 2026', h: 118 },
    { k: 'call', title: 'Call', tag: 'CALL', sub: 'Outbound · 20 min', badge: 'Connected', body: 'Anh Kiên phản hồi: báo giá Jasmine cao hơn 2 NCC còn lại khoảng 18%. Đề nghị xem lại chất liệu hộp và đơn giá trước 26/08.', meta: '15:30 Aug 14 2026', h: 118, hl: 1 },
    { k: 'note', body: 'Việt Phúc đã nhận đủ 3 báo giá. Jasmine đang cao nhất nhưng được đánh giá mẫu đẹp nhất. Cần phương án tối ưu giá mà không đổi mẫu.', meta: '09:00 Aug 19 2026', h: 90 },
  ];
  const F_CFO = [
    { k: 'meeting', title: 'Thương thảo giá với phòng Mua hàng', tag: 'MEETING', sub: '10:00 6 thg 9 · 60 min · Google Meet', badge: '◷ Done', badgeC: '#667085', body: 'Anh Kiên + chị Thu Trang. Việt Phúc chấp nhận chọn Jasmine nếu đơn giá ≤ 6 triệu/bộ, thanh toán 30/70. Jasmine đề xuất áp bậc giảm 30% cho đơn 200 bộ.', meta: '10:00 Sep 6 2026', h: 124 },
    { k: 'note', body: 'Duyệt nội bộ Jasmine: anh Nguyễn Thanh Tùng (Trưởng nhóm Sale) duyệt bậc giảm 30% → 5.950.000đ/bộ × 200 = 1.190.000.000đ. Cọc 30% = 357.000.000đ, 70% còn lại sau nghiệm thu.', meta: '16:00 Sep 6 2026', h: 90, hl: 1 },
    { k: 'meeting', title: 'Trình CFO duyệt điều khoản thanh toán', tag: 'MEETING', sub: '14:00 10 thg 9 · 45 min · VP Việt Phúc', badge: '◷ Done', badgeC: '#667085', body: 'Chị Trần Bích Ngọc (CFO) đồng ý tổng giá trị 1,19 tỷ, cọc 30% trong 3 ngày sau ký, 70% trong 15 ngày sau nghiệm thu. Yêu cầu hoá đơn VAT tách 2 đợt.', meta: '14:00 Sep 10 2026', h: 124 },
  ];
  const CF = [['Loại cơ hội', 'Quà tặng doanh nghiệp', 1], ['Nguồn cơ hội', 'Lead form quà tặng', 1], ['Dòng sản phẩm quan tâm', 'Bộ trang sức', 1], ['Số lượng', '200 bộ · 40 lãnh đạo + 160 nhân viên'], ['Yêu cầu khắc / đóng gói', 'Khắc logo Việt Phúc mặt sau mặt cỏ bốn lá'], ['Mã hội thoại Prospector', 'Meta Lead Form 26/06/2026 · Lead Ngô Thị Quỳnh Anh (aF7RY5EC)']];
  // Copilot: dòng [kiểu, text]; h = tiêu đề, b = nhãn đậm + nội dung
  const COP = [['h', '1. Tóm tắt hành trình deal (84 ngày từ Meta Ads đến Đặt cọc)'], ['b', 'Nhu cầu & Đơn hàng', 'Quà tặng doanh nghiệp Tết 2027 – 200 bộ Lucky Clover. Ngân sách 5.950.000đ/bộ, áp dụng chiết khấu 30%, tổng giá trị hợp đồng 1.190.000.000 VNĐ.'], ['b', 'Tồn kho & Gia công', 'Kho Jasmine hiện chỉ còn 6 bộ, phải đặt xưởng gia công (lead time 14 ngày).'], ['b', '26/06/2026', 'Tiếp nhận thông tin từ Meta Lead Form.'], ['b', '18/09/2026 (Ký hợp đồng & Đặt cọc)', 'Đã ký hợp đồng, nhận cọc 30%.'],
    ['h', '2. Người quyết định (Decision Maker)'], ['b', 'Người quyết định chính', 'Anh Hoàng Đức Thắng – Tổng Giám đốc, trực tiếp duyệt dự thảo và ký hợp đồng.'], ['b', 'Đầu mối liên hệ / Triển khai', 'Chị Đặng Thu Trang – Trưởng phòng Hành chính – Nhân sự.'],
    ['h', '3. Còn thiếu gì để chốt Won?'], ['b', 'Sản xuất & Khắc logo', 'Chuyển xưởng khắc logo, làm hộp nhung và thiệp cá nhân hoá cho 200 bộ.'], ['b', 'Thanh toán 70% còn lại & Nghiệm thu', 'Thu nốt 833.000.000 VNĐ, xuất đủ hoá đơn VAT.'],
    ['h', '4. 3 Hành động tiếp theo đề xuất'], ['b', 'Đặt xưởng sản xuất & khắc logo 200 bộ', 'Sales Admin / Quản lý xưởng – Hạn: 21/09/2026.'], ['b', 'Xuất & gửi hoá đơn VAT đợt cọc 357.000.000đ', 'Kế toán – Hạn: 22/09/2026.'], ['b', 'Theo dõi tiến độ xưởng & QC trước giao đợt 1', 'QC Team – Hạn QC: 20/12/2026.']];

  function StageBar({ T, cur, doneAll, at }) {
    return <div style={{ display: 'flex', height: 22, gap: 0 }}>
      {STAGES.map((s, i) => { const g = doneAll != null ? ez(T, doneAll + i * 0.2, 0.3) : (i < cur ? 1 : 0); const b = doneAll == null && i === cur; const bg = g > 0.5 ? SG : b ? PRI : '#E4E7EC';
        return <span key={s} style={{ flex: 1, display: 'grid', placeItems: 'center', background: bg, clipPath: i === 0 ? 'polygon(0 0, calc(100% - 9px) 0, 100% 50%, calc(100% - 9px) 100%, 0 100%)' : 'polygon(0 0, calc(100% - 9px) 0, 100% 50%, calc(100% - 9px) 100%, 0 100%, 9px 50%)', borderRadius: i === 0 ? '11px 0 0 11px' : i === 5 ? '0 11px 11px 0' : 0, marginLeft: i ? -6 : 0, transition: 'background .3s' }}><Tx s={9.5} w={700} c={g > 0.5 || b ? '#fff' : '#98A2B3'} st={{ letterSpacing: .3 }}>{s}</Tx></span>; })}
    </div>;
  }

  function DealScreen({ T, from, to, C, phase, work, panel }) {
    const hook = phase === 'hook', close = phase === 'close' || hook;
    const tD = C.deal, tDM = C.dm, t55 = C.d55, tCFO = C.cfo, tC1 = C.cop1, tC2 = C.cop2, tW = C.won;
    const wonT = hook ? -1e9 : tW + 4.0;
    const isWon = hook || T >= wonT;
    const cur = close ? 3 : 2, prob = isWon ? 100 : close ? 90 : 50;
    const red = !close && T >= t55 && T < tCFO;
    // Copilot
    const cp = close && !hook ? Math.min(ez(T, tC1 + 0.2, 0.6), ez(tW + 0.2, T, 0.4)) : 0;
    const q = 'Deal Việt Phúc đã đi 84 ngày từ form Meta Ads. Tóm tắt hành trình theo từng giai đoạn, ai là người quyết định, và còn thiếu gì để chốt Won?';
    const qT = typed(q, T, tC1 + 0.7, 70), ansAt = tC1 + 2.9;
    const lineAt = (i) => i < 5 ? ansAt + i * 0.8 : tC2 + 0.3 + (i - 5) * 0.45;
    const scroll = io(T, tC2, 1.4) * 330 + io(T, tC2 + 3.2, 1.2) * 260;
    // Close as won modal
    const md = !hook ? Math.min(ez(T, tW + 0.5, 0.4), ez(tW + 3.8, T, 0.3)) : 0;
    const note = 'Ký HĐ-JJ-VP-2026-018 ngày 18/09, cọc 30% (357.000.000đ). 84 ngày từ form Meta Ads – 5 người tham gia quyết định, 3 phiên bản báo giá trước khi chốt.';
    const nt = typed(note, T, tW + 1.0, 75);
    const cg = hook ? ez(T, C.hook + 0.9, 0.5) : ez(T, tW + 5.0, 0.5), cgV = lerp(0, 1190000000, hook ? ez(T, C.hook + 1.1, 1.4) : ez(T, tW + 5.2, 1.3));
    const cam = hook ? [] : [[tD, null], [tD + 2.8, [105, 300, 470, 430, 1.35]], [tDM, null]];
    const feedGroups = close ? null : [[tD + 0.4, F_DEAL], [tDM + 0.5, F_DM], [t55 + 0.5, F_55, t55 < 0 ? 1 : C.cfo], [tCFO + 0.5, F_CFO, C.quote]];
    return <Screen T={T} from={from} to={to} nav="salesDeal" cam={cam}>
      <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', background: '#fff', borderBottom: '1px solid #EAECF0' }}>
        <Tx s={14} c="#475467">☰</Tx><Tx s={12.5} c="#475467">▥ Jasmine — Bán sỉ và Quà tặng doan…  ›</Tx><Tx s={12.5} w={700} c="#101828">Việt Phúc – 200 bộ Lucky Clover quà Tết 2027</Tx><Sp />
        {isWon ? <Btn st={{ background: '#EFF8FF', border: 'none', color: PRI }}>↻ Reopen</Btn> : <><Btn c="#079455">Won</Btn><Btn c="#E31B54">Lost</Btn></>}<Tx s={14} c="#667085">···</Tx>
      </div>
      <div style={{ flex: 'none', background: '#fff', padding: '14px 22px 10px', display: 'flex', flexDirection: 'column', gap: 10, borderBottom: '1px solid #EAECF0' }}>
        <Focus p={!close ? fw(T, tD + 0.4, tD + 2.6) : 0} col={BLUE} label="Deal nhận từ Lead Service: cùng khách, cùng nhu cầu, cùng nguồn" below>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={19} w={700} c="#101828">Việt Phúc – 200 bộ Lucky Clover quà Tết 2027</Tx><Pill c="#C01048" bg="#FFF1F3">Khách VIP</Pill><Pill c="#6941C6" bg="#F4EBFF">Khắc logo / tên</Pill><Sp />
              {isWon ? <Pill c={OKD} bg="#ECFDF3" st={{ fontSize: 12, padding: '3px 12px' }}>Won</Pill> : <Pill c={red ? '#B42318' : '#475467'} bg={red ? '#FEF3F2' : '#F2F4F7'} st={{ fontSize: 11.5, padding: '3px 12px' }}>{red ? '♨ Đứng 21 ngày ở Báo giá · quá ngưỡng' : '◷ On track • 0 of 3 days'}</Pill>}
              <Av t="PH" s={28} bg="#1E88E5" /><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12.5} w={600} c="#101828">Phương Hà</Tx><Tx s={10.5} c="#667085">Deal owner</Tx></span></span>
            <Tx s={12.5} c="#475467">⊙ ₫1,190,000,000     ⚇ Đặng Thu Trang     ▦ Công ty CP Dược phẩm Việt Phúc</Tx>
          </div>
        </Focus>
        <StageBar T={T} cur={cur} doneAll={isWon ? wonT : null} />
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={12} c="#475467">▥ Jasmine — Bán sỉ và Quà tặng doanh nghiệp  ›  <span style={{ color: close ? '#DC6803' : '#107569' }}>●</span> <b style={{ color: '#101828', fontWeight: 500 }}>{close ? 'Ký hợp đồng và đặt cọc' : 'Báo giá'}</b></Tx><Sp /><Tx s={12} c="#475467">Probability: <b style={{ color: '#101828' }}>{prob}%</b></Tx><Tx s={12} c={PRI}>⚑ Exp. close Oct 15, 2026</Tx></span>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 16, padding: '14px 22px 0', minHeight: 0 }}>
        <div style={{ width: 400, flex: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card st={{ padding: '14px 16px' }}>
            <span style={{ display: 'flex' }}><Tx s={14} w={700} c="#101828">Overview</Tx><Sp /><Tx s={12} c="#667085">✎</Tx></span>
            <span style={{ display: 'flex', alignItems: 'center' }}><Tx s={12} c="#667085">Projected value</Tx><Sp /><Pill c={isWon ? OKD : '#175CD3'} bg={isWon ? '#ECFDF3' : '#EFF8FF'}>{isWon ? 'Won' : 'Active'}</Pill></span>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Tx s={12} w={600} c="#475467">VND</Tx><Tx s={27} w={800} c="#079455" st={{ letterSpacing: -.5 }}>1,190,000,000</Tx></span><Hr />
            <span style={{ display: 'flex', alignItems: 'center' }}><Tx s={12} c="#667085">Probability</Tx><Sp /><span style={{ width: 26, height: 26, borderRadius: '50%', background: '#079455', color: '#fff', display: 'grid', placeItems: 'center', font: `700 10px ${UI}` }}>{prob}</span></span><Hr />
            <span style={{ display: 'flex', gap: 8 }}><Tx s={12} c="#667085">▥ Pipeline</Tx><Sp /><span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}><Tx s={12} c="#101828">Jasmine — Bán sỉ và Quà tặng doanh nghiệp</Tx><Tx s={11.5} c="#475467">› {close ? 'Ký hợp đồng và đặt cọc' : 'Báo giá'}</Tx></span></span>
          </Card>
          {close ? <Card st={{ padding: '14px 16px' }}><Tx s={14} w={700} c="#101828">Forecasts</Tx><span style={{ display: 'flex' }}><Lbl>1 FORECAST ENTRY</Lbl><Sp /><Tx s={11.5} c={PRI}>+ Enroll in forecast</Tx></span><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={12.5} w={600} c="#101828">Oct 2026</Tx><Pill c={OKD} bg="#ECFDF3">Commit</Pill><Sp /><Tx s={12.5} w={600} c="#101828">₫595,000,000</Tx></span><Hr /><span style={{ display: 'flex' }}><Tx s={12} c="#667085">Weighted value</Tx><Sp /><Tx s={13} w={700} c="#101828">{isWon ? '₫1,190,000,000' : '₫1,071,000,000'} <span style={{ fontWeight: 400, color: '#667085' }}>({prob}%)</span></Tx></span></Card>
            : <Focus p={fw(T, tD + 3.0, tDM)} col={BLUE} label="Bàn giao từ Lead · Sales không phải hỏi lại" below pad={4}><Card st={{ padding: '14px 16px', gap: 9 }}>
              <span style={{ display: 'flex' }}><Tx s={14} w={700} c="#101828">Custom fields</Tx><Sp /><Tx s={12} c="#667085">✎</Tx></span><Tx s={12.5} c="#344054">⌄ General information</Tx>
              {CF.map(([k, v, chip], i) => { const t = tD + 3.3 + i * 0.45, s = typed(v, T, t, 90); return <span key={k} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 10, alignItems: 'start' }}><Tx s={12} c="#667085" st={{ whiteSpace: 'normal' }}>{i === 0 && <span style={{ color: '#F04438' }}>• </span>}{k}</Tx>{s ? (chip ? <span><span style={{ padding: '2px 7px', borderRadius: 4, background: '#F2F4F7', font: `400 12px ${UI}`, color: '#101828', boxShadow: `0 0 0 ${2 * (1 - ez(T, t + 0.8, 0.6))}px ${BLUE}` }}>{s}</span></span> : <P s={12} c="#101828">{s}<Caret on={s.length < v.length} /></P>) : <span style={{ height: 14, width: 90, borderRadius: 3, background: '#F2F4F7', marginTop: 2 }} />}</span>; })}
            </Card></Focus>}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Tx s={14} w={700} c="#101828">Work stream</Tx>
          <Card st={{ padding: '10px 14px', gap: 8 }}><span style={{ display: 'flex', gap: 18 }}>{['Note', 'Email', 'Call', 'Meeting', 'Quote', 'Order'].map(l => <Tx key={l} s={12.5} c="#344054">▢ {l}</Tx>)}</span><Hr /><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Av t="NH" s={22} bg="#D1E9FF" /><Tx s={12.5} c="#98A2B3">Add a note, send an email, log a call...</Tx></span></Card>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>{['All', 'Note 8', 'Email 9', 'Call 5', 'Meeting 6', 'More ⌄'].map((l, i) => <Pill key={l} c={i === 0 ? PRI : '#344054'} bg={i === 0 ? '#EEF4FF' : '#fff'} b={i === 0 ? '#B2DDFF' : '#EAECF0'}>{l}</Pill>)}<Sp /><Tx s={11.5} c="#667085">Most recent ⌄</Tx></span>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {work ? work : close ? <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 12 }}><span style={{ width: 26, flex: 'none' }} /><div style={{ flex: 1, background: '#F9FAFB', border: '1px solid #EAECF0', borderRadius: 8, padding: '8px 14px', display: 'flex' }}><Tx s={12} c="#344054">{isWon ? 'Ký hợp đồng và đặt cọc → Won' : 'Báo giá → Ký hợp đồng và đặt cọc'}</Tx><Sp /><Tx s={11} c="#667085">Nguyễn Hoàng  09:35 Sep 21 2026</Tx></div></div>
              <FeedItem k="order" title="Việt Phúc – 200 bộ Lucky Clover quà Tết 2027" tag="ORDER" sub="JJDS-0006 · Công ty CP Dược phẩm Việt Phúc · 1.190.000.000 ₫" badge="Confirmed" meta="09:33 Sep 21 2026 · via Đơn sỉ & cộng tác viên Jasmine" />
              <FeedItem k="quote" title="Việt Phúc – 200 bộ Lucky Clover quà Tết 2027" tag="QUOTE" sub="JJBG-0006 · Công ty CP Dược phẩm Việt Phúc · 1.190.000.000 ₫ · expires 21 thg 10, 2026" badge="Accepted" badgeC={OKD} meta="09:26 Sep 21 2026 · via Báo giá quà tặng doanh nghiệp"><span style={{ display: 'flex', gap: 6 }}><Pill>Approved</Pill><Pill c={OKD} bg="#ECFDF3">Signed</Pill></span></FeedItem>
            </div> : <FeedGroups T={T} tDM={tDM} groups={feedGroups} C={C} />}
          </div>
        </div>
      </div>
      {cp > 0 && <div style={{ position: 'absolute', right: 14, top: 8, bottom: 8, width: 470, background: '#fff', borderRadius: 12, border: '1px solid #EAECF0', boxShadow: '0 24px 60px rgba(0,0,0,.22)', display: 'flex', flexDirection: 'column', opacity: cp, transform: `translateX(${(1 - cp) * 60}px)`, zIndex: 12, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid #F2F4F7' }}><span style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#7F56D9,#D444F1)' }} /><Tx s={14} w={700} c="#101828">Copilot</Tx><Pill c="#6941C6" bg="#F4EBFF">BETA</Pill><Sp /><Tx s={12} c="#98A2B3">ⓘ  ⟳  ···  ✕</Tx></div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10, transform: `translateY(${-scroll}px)` }}>
            <div style={{ alignSelf: 'flex-end', maxWidth: 360, padding: '10px 14px', borderRadius: 12, background: '#F2F4F7', minHeight: 20 }}><P s={13} c="#101828">{qT}<Caret on={qT.length > 0 && qT.length < q.length} /></P></div>
            <span style={{ display: 'flex', gap: 18, borderBottom: '1px solid #EAECF0', opacity: ez(T, ansAt - 0.5, 0.3) }}><Tx s={13} w={600} c="#6941C6" st={{ paddingBottom: 6, borderBottom: '2px solid #7F56D9' }}>Answer</Tx><Tx s={13} c="#667085">Thinking</Tx></span>
            {T >= ansAt - 0.6 && T < ansAt && <Tx s={12.5} c="#98A2B3">Đang đọc 84 ngày hoạt động của deal…</Tx>}
            {COP.map((l, i) => { const t = lineAt(i); if (T < t) return null; const r = rise(T, t, 0.4, 8);
              const el = l[0] === 'h' ? <Tx s={13.5} w={700} c="#101828" st={{ whiteSpace: 'normal', marginTop: i ? 8 : 0, ...r }}>{l[1]}</Tx> : <P s={13} c="#344054" st={{ paddingLeft: 18, ...r }}><b style={{ color: '#101828' }}>{l[1]}</b>: {l[2]}</P>;
              return i === 6 ? <Focus key={i} p={fw(T, tC2 + 1.6, tC2 + 3.6)} col={BLUE} pad={4} label="Copilot đọc ra ai là người ký">{el}</Focus> : i === 11 ? <Focus key={i} p={fw(T, tC2 + 4.4)} col={BLUE} pad={4} label="Việc tiếp theo · người phụ trách · hạn">{<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{el}{COP.slice(12).map((m, j) => T >= lineAt(12 + j) && <P key={j} s={13} c="#344054" st={{ paddingLeft: 18, ...rise(T, lineAt(12 + j), 0.4, 8) }}><b style={{ color: '#101828' }}>{m[1]}</b> – {m[2]}</P>)}</div>}</Focus> : i > 11 ? null : <React.Fragment key={i}>{el}</React.Fragment>; })}
          </div>
        </div>
        <div style={{ padding: '10px 14px', borderTop: '1px solid #F2F4F7', display: 'flex', flexDirection: 'column', gap: 8, background: '#FCFAFF' }}>
          <span style={{ display: 'flex', gap: 6 }}><Pill>Deal: Việt Phúc – 200 bộ Lucky Clover quà…</Pill><Pill c="#B54708" bg="#FFFAEB">Rules 1</Pill></span>
          <span style={{ display: 'flex', padding: '8px 12px', borderRadius: 999, border: '1px solid #D0D5DD', background: '#fff' }}><Tx s={12.5} c="#98A2B3">Ask a question</Tx><Sp /><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#D0D5DD' }} /></span>
          <Tx s={10.5} c="#98A2B3" st={{ textAlign: 'center' }}>Powered by Rework AI. Results may be inaccurate.</Tx>
        </div>
      </div>}
      {md > 0 && <div style={{ position: 'absolute', inset: 0, background: `rgba(16,24,40,${0.35 * md})`, zIndex: 15, display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 480, background: '#fff', borderRadius: 12, boxShadow: '0 24px 60px rgba(0,0,0,.3)', opacity: md, transform: `translateY(${(1 - md) * 16}px)` }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EAECF0', display: 'flex' }}><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={16} w={700} c="#101828">Close as won</Tx><Tx s={12} c="#667085">Time to celebrate!</Tx></span><Sp /><Tx s={14} c="#667085">✕</Tx></div>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Tx s={12} w={500} c="#344054">Reason</Tx><span style={{ display: 'flex', padding: '9px 12px', border: '1px solid #D0D5DD', borderRadius: 6 }}><Tx s={12.5} c="#101828">Mẫu mã và chất lượng bạc 925 được duyệt</Tx><Sp /><Tx s={11} c="#98A2B3">⌄</Tx></span>
            <Tx s={12} w={500} c="#344054" st={{ marginTop: 6 }}>Note</Tx>
            <div style={{ minHeight: 76, padding: '9px 12px', border: `1.5px solid ${OK}`, borderRadius: 6, boxShadow: '0 0 0 3px rgba(22,163,74,.12)' }}><P s={12.5} c="#101828">{nt}<Caret on={nt.length < note.length && T >= tW + 1.0} /></P></div>
            <Tx s={11} c="#667085">Optional details for the deal history</Tx>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #EAECF0', display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Btn>Cancel</Btn><Btn c="#079455">Close as won</Btn></div>
        </div>
      </div>}
      {!hook && <Cursor T={T} at={tW + 2.5} a={[700, 520]} b={[906, 525]} />}
      {cg > 0 && <div style={{ position: 'absolute', left: '50%', top: 250, width: 400, marginLeft: -200, background: '#fff', borderRadius: 14, boxShadow: '0 30px 70px rgba(0,0,0,.28)', padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 16, opacity: cg, transform: `translateY(${(1 - cg) * 20}px) scale(${lerp(0.96, 1, cg)})` }}>
        <span style={{ width: 52, height: 52, borderRadius: '50%', background: '#D1FADF', display: 'grid', placeItems: 'center', font: `700 22px ${UI}`, color: OK }}>✓</span>
        <Tx s={17} w={700} c="#101828">Congratulations!</Tx>
        <Tx s={30} w={800} c="#079455" st={{ fontVariantNumeric: 'tabular-nums' }}>{vnd(cgV)}</Tx>
        <P s={13} c="#344054" st={{ textAlign: 'center' }}>Việt Phúc – 200 bộ Lucky Clover quà Tết 2027 is closed as won.</P><Hr st={{ alignSelf: 'stretch' }} /><Tx s={11.5} c="#667085">Nice work, Nguyễn Hoàng — keep the streak going.</Tx>
      </div>}
      {panel}
    </Screen>;
  }
  // Feed hành trình deal: mỗi slide thả thêm nhóm hoạt động mới lên đầu
  function FeedGroups({ T, groups, tDM }) {
    const all = []; groups.forEach(([at, items, until], g) => items.forEach((f, i) => all.push({ f, t: at + i * 0.9, until, g, key: g + '-' + i })));
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
      {all.slice().reverse().map(({ f, t, until, g, key }) => {
        let el = <FeedItem {...f} />;
        if (g === 1) el = <DecisionNote T={T} at={tDM} />;
        if (f.hl) el = <Focus p={fw(T, t + 0.7, until)} col={g === 2 ? RED : BLUE} pad={3} label={g === 2 ? 'Bị so giá: cao hơn 2 NCC ~18%' : f.k === 'note' ? '8.500.000 → 5.950.000đ/bộ · giảm 30% có người duyệt' : 'CFO đồng ý 1,19 tỷ · thanh toán 30/70'} right={f.k === 'meeting'}>{el}</Focus>;
        return <React.Fragment key={key}>{g === 1 && <Drop T={T} at={tDM + 0.4} h={96}><DecisionNote T={T} at={tDM} /></Drop>}<Drop T={T} at={g === 1 ? t + 0.9 : t} h={f.h}>{g === 1 ? <FeedItem {...f} /> : el}</Drop></React.Fragment>;
      })}
    </div>;
  }
  function DecisionNote({ T, at }) {
    return <Focus p={fw(T, at + 1.0, at + 6.8)} col={BLUE} pad={3} label="5 người · mỗi người một vai trong quyết định mua">
      <FeedItem k="note" meta="15:00 Jul 21 2026">
        <P s={12.5} c="#101828">Sơ đồ người quyết định (5 người): {DM.map((d, i) => { const p = ez(T, at + 1.4 + i * 0.55, 0.3); return <React.Fragment key={i}><span style={{ padding: '0 3px', borderRadius: 4, background: `rgba(21,112,239,${0.14 * p})`, boxShadow: `inset 0 -2px 0 rgba(21,112,239,${p})`, fontWeight: p > 0.5 ? 600 : 400 }}>{d}</span>{i < 4 ? ' → ' : '. '}</React.Fragment>; })}Rủi ro chính: vòng so sánh giá của phòng Mua hàng.</P>
      </FeedItem>
    </Focus>;
  }

  window.DaiSales = { PipelineScreen, DealScreen };
})();
