// Cycle Dài · mockup app Lead: Campaign, hồ sơ Lead (hành trình + nhận Won), danh sách Lead + Push audience
(function () {
  const B = window.DaiBase;
  const { AF, UI, MONO, PRI, OK, OKD, BLUE, AMBER, GREEN, RED, lerp, ez, io, rise, typed, clamp, Tx, P, Pill, Tag, Btn, Lbl, Sp, Hr, Ic, Av, Card, Caret, Focus, fw, Cursor, Toast, Drop, Screen, FeedItem } = B;

  // ================= Campaign =================
  function CampaignScreen({ T, from, to, at }) {
    const lp = ez(T, at + 3.4, 0.5), leads = lp >= 1 ? 1 : 0, bar = ez(T, at + 3.8, 1.0);
    const kpi = [['LEADS', leads ? '1' : '0', leads ? '1 qualified' : 'chưa có lead', '#EEF4FF'], ['SPEND', '0 US$', 'no budget set', '#FEF6EE'], ['COST / LEAD', '0 US$', 'blended CPL', '#F4F3FF'], ['REVENUE', '—', 'set deal size to estimate', '#ECFDF3'], ['GOAL', '—', 'no goal set', '#ECFDF3']];
    return <Screen T={T} from={from} to={to} nav="lead" navP={{ active: 'Campaigns' }}>
      <div style={{ height: 50, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', background: '#fff', borderBottom: '1px solid #EAECF0' }}>
        <Tx s={14} c="#98A2B3">☰</Tx><span style={{ width: 24, height: 24, borderRadius: 6, background: '#12B76A' }} />
        <Focus p={fw(T, at + 0.6, at + 3.2)} col={BLUE} label="Một chiến dịch · một mục tiêu · một ngân sách" below>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tx s={15} w={700} c="#101828">Meta Ads – Quà Tết doanh nghiệp 2027</Tx><Pill c={OKD} bg="#ECFDF3">● Running</Pill><Tx s={11.5} c="#667085">Ad · Jun 20, 2026 → Oct 31, 2026 · 133 days</Tx></span>
        </Focus>
        <Sp /><Btn>✎ Edit</Btn><Btn>⏻ Deactivate</Btn><Btn>🗑 Delete</Btn>
      </div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ width: 180, flex: 'none', borderRight: '1px solid #EAECF0', background: '#fff', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Tx s={12} c="#475467" st={{ padding: '4px 8px 10px' }}>←  All campaigns</Tx>
          {[['Overview', 1], ['Planning'], ['Budget & Spend'], ['Leads', 0, leads], ['Intelligence'], ['Activity', 0, leads]].map(([l, a, n]) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, background: a ? '#EEF4FF' : 'transparent' }}><Ic s={11} c={a ? PRI : '#98A2B3'} /><Tx s={12.5} w={a ? 600 : 400} c={a ? PRI : '#344054'}>{l}</Tx><Sp />{n ? <Tx s={10} c="#667085">1</Tx> : null}</span>)}
        </div>
        <div style={{ flex: 1, padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Tx s={11.5} c="#475467">▣ Day 7 of 133</Tx><span style={{ flex: 1, height: 6, borderRadius: 3, background: '#EAECF0' }}><span style={{ display: 'block', width: '5%', height: '100%', borderRadius: 3, background: '#667085' }} /></span><Tx s={11.5} c="#667085">5% elapsed · 126 days left</Tx></span>
          <div style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #EAECF0', background: '#F9FAFB', display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={600} c="#101828">◎ Tracking</Tx><Tx s={12} c="#475467">On track.</Tx></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {kpi.map(([l, v, s, bg], i) => { const el = <Card st={{ padding: '14px 14px', flexDirection: 'row', gap: 12, height: 96, alignItems: 'flex-start' }}><span style={{ width: 30, height: 30, borderRadius: 8, background: bg, flex: 'none' }} /><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Lbl>{l}</Lbl><Tx s={20} w={800} c="#101828" st={i === 0 ? { display: 'inline-block', transform: `scale(${1 + 0.4 * Math.sin(Math.PI * lp)})`, transformOrigin: '0 50%', color: leads ? OK : '#101828' } : null}>{v}</Tx><Tx s={11} c="#667085" st={{ whiteSpace: 'normal' }}>{s}</Tx></span></Card>;
              return i === 0 ? <Focus key={l} p={fw(T, at + 3.5)} col={BLUE} label="26/06 · 21:47 · lead đầu tiên từ form Meta">{el}</Focus> : <div key={l}>{el}</div>; })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr 1.1fr', gap: 12 }}>
            <Card st={{ height: 200 }}><span style={{ display: 'flex' }}><Lbl>▽ LEAD FUNNEL</Lbl><Sp /><Tx s={11.5} w={600} c={PRI}>View leads</Tx></span><Tx s={11} c="#667085">{leads} captured → {leads} qualified · {leads ? '100%' : '0%'}</Tx>
              {['Captured', 'Contactable', 'In pipeline', 'Qualified'].map((l, i) => <span key={l} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><span style={{ display: 'flex' }}><Tx s={11.5} c="#344054">{l}</Tx><Sp /><Tx s={11.5} w={700} c="#101828">{leads}</Tx></span><span style={{ height: 3, borderRadius: 2, background: '#EAECF0' }}><span style={{ display: 'block', height: '100%', width: `${ez(T, at + 3.8 + i * 0.2, 0.7) * 100}%`, background: '#5B9BD5', borderRadius: 2 }} /></span></span>)}
            </Card>
            <Card st={{ height: 200 }}><span style={{ display: 'flex' }}><Lbl>◠ BUDGET PACING</Lbl><Sp /><Tx s={11.5} w={600} c={PRI}>Set budget</Tx></span><P s={11.5} c="#667085">No budget set — add one to track pacing and forecast spend.</P></Card>
            <Card st={{ height: 200 }}><span style={{ display: 'flex' }}><Lbl>⌥ TOP CHANNELS</Lbl><Sp /><Tx s={11.5} w={600} c={PRI}>Attribution</Tx></span><Tx s={11} c="#667085">Ranked by leads · bar = share of total</Tx>{leads ? <><span style={{ display: 'flex' }}><Tx s={12} c="#101828">Direct Traffic</Tx><Sp /><Tx s={11.5} c="#475467">1 leads · 0 US$/lead</Tx></span><span style={{ height: 3, background: '#5B9BD5', borderRadius: 2, width: `${bar * 100}%` }} /></> : <Tx s={11.5} c="#98A2B3">No leads yet.</Tx>}</Card>
          </div>
          <Card><span style={{ display: 'flex' }}><Lbl>▤ ABOUT THIS CAMPAIGN</Lbl><Sp /><Tx s={11.5} w={600} c={PRI}>Edit in Planning</Tx></span><Tx s={12.5} c="#475467">Objective · 60 lead doanh nghiệp, CPL dưới 500.000đ, tối thiểu 8 MQL</Tx></Card>
        </div>
      </div>
    </Screen>;
  }

  // ================= Hồ sơ Lead =================
  const STEPS = ['Mới từ Prospector', 'Đang liên hệ', 'Đã xác minh nhu cầu', 'Không liên lạc được', 'Marketing Qualified (MQL)', 'Loại – không phù hợp'];
  const FEED = [
    { k: 'email', title: 'RE: 3 gợi ý quà Tết theo ngân sách', tag: 'LOGGED', body: 'Chị Thu Trang phản hồi: Việt Phúc quan tâm Lucky Clover cho khoảng 200 người. Nhờ Jasmine báo giá sơ bộ và thời gian sản xuất nếu khắc logo.', meta: '16:20 Jul 8 2026', h: 118 },
    { k: 'call', title: 'Call', tag: 'CALL', sub: 'Outbound · 20 min', badge: 'Connected', body: 'Gọi chị Thu Trang (TP HCNS – người đề xuất). Xác nhận: 200 bộ, khắc logo, giao trước 10/01/2027. Ngân sách dự kiến 5–6 triệu/bộ, đang trình HĐQT.', meta: '10:00 Jul 10 2026', h: 124 },
    { k: 'note', body: 'HĐQT Việt Phúc đã duyệt ngân sách phúc lợi quà Tết 1,2 tỷ (chị Trang báo qua Zalo). Người duyệt chi cuối: chị Trần Bích Ngọc – Giám đốc Tài chính. Người ký HĐ: anh Hoàng Đức Thắng – TGĐ.', meta: '17:05 Jul 14 2026', h: 96 },
    { k: 'meeting', title: 'Online – Giới thiệu mẫu quà Tết cho Việt Phúc', tag: 'MEETING', sub: '14:00 16 thg 7 · 45 min · Google Meet', body: 'Trình bày 3 bộ mẫu; chị Trang nghiêng về Lucky Clover (bạc 925, cỏ 4 lá). Chốt nhu cầu: 200 bộ = 40 lãnh đạo/đối tác + 160 nhân viên xuất sắc.', meta: '14:00 Jul 16 2026', h: 124 },
  ];
  const RULES = [['Fit · 95', [['Doanh nghiệp mua quà tặng', 20], ['Quy mô từ 200 nhân sự', 20], ['Số lượng từ 100 sản phẩm', 25], ['Số lượng từ 30 sản phẩm', 10], ['Ngân sách từ 3 triệu / sản phẩm', 20]]], ['Intent · 51', [['Cần hàng trong 1 – 3 tháng', 15], ['Ngân sách đã được duyệt', 20], ['Mùa quà Tết', 15], ['Đã chốt yêu cầu khắc logo / tên', 10], ['Đã gọi điện kết nối', 20]]]];
  const INFO = [['Email', 'quynhanh.ngo@vietphuc-phar…'], ['Phone', '+84 912-468-235'], ['Title', 'Chuyên viên Hành chính – Nhân…'], ['Company', 'Công ty CP Dược phẩm Vi…'], ['Loại khách B2B', 'Doanh nghiệp mua …'], ['Quy mô doanh nghiệp', '200 – 1.000 n…'], ['Dịp tặng / mục đích', 'Quà Tết'], ['Số lượng dự kiến', '200'], ['Ngân sách mỗi sản phẩm', '3 – 6 triệu'], ['Khắc logo / tên', 'Có khắc logo / tên']];

  function LeadScreen({ T, from, to, C, won }) {
    const tW = C.warm, tF = C.feed, tM = C.mql, tY = C.why, tL = C.lwon;
    // điểm số
    let score, grade, hot, mql, sqlBadge = 0;
    if (!won) {
      const steps = [[tW + 0.8, 0, 56, 1.2], ...FEED.map((_, i) => [tF + 0.9 + i * 1.7, [56, 60, 65, 70][i], [60, 65, 70, 75][i], 0.6])];
      score = 0; steps.forEach(([t, a, b, d]) => { if (T >= t) score = lerp(a, b, ez(T, t, d)); });
      mql = ez(T, tM + 1.6, 0.4); hot = mql >= 1; grade = hot ? 'A2' : 'A4';
    } else { score = lerp(75, 88, ez(T, tL + 3.0, 1.0)); mql = 1; hot = true; grade = T >= tL + 3.4 ? 'A1' : 'A2'; sqlBadge = ez(T, tL + 0.6, 0.4); }
    const pulse = (() => { const ts = won ? [tL + 3.0] : [tW + 0.8, ...FEED.map((_, i) => tF + 0.9 + i * 1.7)]; let v = 0; ts.forEach(t => { v = Math.max(v, Math.sin(Math.PI * clamp((T - t - 0.1) / 0.5, 0, 1))); }); return 1 + 0.22 * v; })();
    const stepOn = (i) => won ? 1 : ez(T, tM + 0.3 + i * 0.25, 0.3);
    const scrollR = won ? 0 : io(T, tY + 0.2, 1.0);
    const rightCam = won ? null : [1085, 175, 345, 555, 1.25];
    const cam = [[tW, null], ...(won ? [] : [[tY, rightCam], [C.cardA + 0.2, null]])];
    const col = hot ? OK : '#DC6803';
    return <Screen T={T} from={from} to={to} nav="lead" navP={{}} cam={cam}>
      <div style={{ height: 40, flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: '#fff', borderBottom: '1px solid #EAECF0' }}><Tx s={12} c="#667085">←  Jasmine Jewelry – Quà tặng doanh nghiệp và Bán sỉ  /</Tx><Tx s={12} w={600} c="#101828">Ngô Thị Quỳnh Anh</Tx><Sp /><Btn st={{ padding: '4px 10px', fontSize: 11 }}>⌘K Search</Btn></div>
      <div style={{ flex: 'none', background: '#fff', padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px solid #EAECF0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <Av t="NT" s={40} bg="#079455" />
          <Focus p={won ? 0 : fw(T, tW + 0.5, tW + 3.2)} col={BLUE} label="Người điền form là chuyên viên, chưa phải người quyết định" below>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={18} w={700} c="#101828">Ngô Thị Quỳnh Anh</Tx>{mql > 0 && <Pill c={OKD} bg="#ECFDF3" st={{ opacity: mql }}>◎ MQL</Pill>}{sqlBadge > 0 && <Pill c="#344054" bg="#F2F4F7" b="#D0D5DD" st={{ opacity: sqlBadge }}>Đã chuyển Sales (SQL)</Pill>}</span>
              <Tx s={12.5} c="#475467">Chuyên viên Hành chính – Nhân sự · <b style={{ color: '#101828', fontWeight: 600 }}>Công ty CP Dược phẩm Việt Phúc</b></Tx>
              <Tx s={12} c="#475467">✉ quynhanh.ngo@vietphuc-pharma.com.vn    ✆ +84 912-468-235</Tx>
            </span>
          </Focus>
          <Sp />
          <Focus p={won ? fw(T, tL + 2.8) : fw(T, tW + 3.4, tF + 0.3) || (T >= tF && T < tM ? fw(T, tF + 0.6, tM) * 0.0001 : 0)} col={won ? GREEN : AMBER} label={won ? 'Lead có deal Won · điểm tăng lên 88' : 'Warm · 56/100 · chưa đủ để bàn giao Sales'} right below>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, padding: '0 6px' }}>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 3, transform: `scale(${pulse})`, transformOrigin: '100% 60%' }}><Tx s={24} w={800} c={col} st={{ fontVariantNumeric: 'tabular-nums' }}>{Math.round(score)}</Tx><Tx s={11} c="#98A2B3">/100</Tx></span>
              <span style={{ display: 'flex', gap: 5 }}><Pill c={col} bg={hot ? '#ECFDF3' : '#FFFAEB'}>● {hot ? 'Hot' : 'Warm'}</Pill><Pill c={col} bg="#fff" b={col}>{grade}</Pill></span>
            </span>
          </Focus>
          <Btn>Reassign</Btn><Btn pri>Convert  ⌄</Btn><Btn>···</Btn>
        </div>
        <Focus p={won ? 0 : fw(T, tM + 1.9, tY)} col={GREEN} label="Đủ luật MQL: Fit ≥ C và Intent ≥ 50 → tự chuyển giai đoạn" below pad={4}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 10 }}>
            {STEPS.map((s, i) => { const on = i < 4 ? stepOn(i) : 0, isM = i === 4; return <React.Fragment key={s}>{isM ? <span style={{ padding: '2px 10px', borderRadius: 999, background: mql > 0 ? `rgba(22,163,74,${mql})` : 'transparent', border: mql > 0 ? 'none' : '1px solid transparent' }}><Tx s={11.5} w={mql > 0 ? 600 : 400} c={mql > 0.5 ? '#fff' : '#667085'}>{mql > 0 ? '● ' : ''}{s}</Tx></span> : <Tx s={11.5} c={on > 0.5 && i < 4 ? '#344054' : '#667085'}>{on > 0.5 && i < 4 ? <span style={{ color: OK }}>✓ </span> : null}{s}</Tx>}{i < 5 && <Tx s={10} c="#D0D5DD">›</Tx>}</React.Fragment>; })}
            <Sp /><Tx s={11} c="#667085">{won ? '28m' : mql >= 1 ? '58s' : '6m'} in stage</Tx>
          </div>
        </Focus>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 14, padding: '12px 14px 0', minHeight: 0 }}>
        <div style={{ width: 226, flex: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Lbl>OWNERSHIP</Lbl>
          <Card st={{ padding: '10px 12px', gap: 8 }}><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Av t="PH" s={24} bg="#475467" /><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12} w={600} c="#101828">Phương Hà</Tx><Tx s={10} c="#98A2B3">Owner · Admin / Finance / Wework</Tx></span></span></Card>
          <span style={{ display: 'flex' }}><Lbl>LEAD INFO</Lbl><Sp /><Tx s={10.5} c="#667085">☰ Manage display fields</Tx></span>
          <Card st={{ padding: '4px 12px', gap: 0 }}>
            {[...INFO.slice(0, 4), ['Stage', mql > 0.5 ? 'MQL' : '—'], ['Status', won ? 'Đã chuyển Sales (SQL)' : '—'], ...INFO.slice(4)].map(([k, v]) => <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid #F2F4F7' }}><Tx s={11} c="#667085" st={{ flex: 'none', maxWidth: 96, overflow: 'hidden', textOverflow: 'ellipsis' }}>{k}</Tx><Sp />{v === 'MQL' ? <Pill c={OKD} bg="#ECFDF3">● Marketing Qualified (MQL)</Pill> : <Tx s={11.5} w={500} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 }}>{v}</Tx>}</span>)}
          </Card>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ display: 'flex', gap: 18, alignItems: 'center', padding: '2px 0 6px' }}>{[['Lead Feed', 1], ['Automation'], [`Journey  ${won ? 11 : mql >= 1 ? 7 : 2}`], ['Discussion'], ['Activity logs']].map(([l, a]) => <Tx key={l} s={12} w={a ? 600 : 400} c={a ? PRI : '#475467'} st={a ? { padding: '4px 8px', background: '#EEF4FF', borderRadius: 6 } : null}>{l}</Tx>)}</span>
          <Card st={{ padding: '10px 14px', gap: 8 }}><span style={{ display: 'flex', gap: 16 }}>{['Note', 'Email', 'Call', 'Meeting'].map(l => <Tx key={l} s={12} c="#344054">▢ {l}</Tx>)}</span><Hr /><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Av t="NH" s={20} bg="#D1E9FF" /><Tx s={12} c="#98A2B3">Add a note, send an email, log a call...</Tx></span></Card>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>{['All', `Note ${won ? 4 : 3}`, 'Email 3', 'Chat', 'Call 2', 'Meeting 1', 'Update'].map((l, i) => <Pill key={l} c={i === 0 ? PRI : '#344054'} bg={i === 0 ? '#EEF4FF' : '#fff'} b={i === 0 ? '#B2DDFF' : '#EAECF0'}>{l}</Pill>)}<Sp /><Tx s={11.5} c="#667085">Most recent ⌄</Tx></span>
          <Focus p={won ? 0 : fw(T, tF + 0.5, tM)} col={BLUE} label="Mỗi email, cuộc gọi, ghi chú đều cập nhật điểm lead" pad={4} st={{ flex: 1, minHeight: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
              {won && <Drop T={T} at={tL + 1.8} h={104}><Focus p={fw(T, tL + 2.2, tL + 5.4)} col={GREEN} label="Sales Won → ghi ngược về lead gốc" pad={3}><FeedItem k="note" body={'Ánh xạ ngược từ Sales: deal "Việt Phúc – 200 bộ Lucky Clover quà Tết 2027" WON 1.190.000.000đ (HĐ-JJ-VP-2026-018). Lead gốc: Meta Ads – Quà Tết doanh nghiệp 2027. Đưa lead vào tệp khách hàng chất lượng cao để Meta học ICP.'} meta="17:00 Sep 18 2026" /></Focus></Drop>}
              {(won || mql > 0) && <Drop T={T} at={won ? tL : tM + 1.7} h={won ? 106 : 74}><div style={{ display: 'flex', gap: 12 }}><span style={{ width: 26, flex: 'none' }} /><div style={{ flex: 1, background: '#F9FAFB', border: '1px solid #EAECF0', borderRadius: 8, padding: '4px 14px' }}>{[...(won ? ['Status changed to Đã chuyển Sales (SQL).'] : []), 'Moved to Marketing Qualified (MQL).', 'Moved to Đã xác minh nhu cầu.'].map((l, i) => <span key={l} style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid #F2F4F7' }}><Tx s={11.5} c="#344054">{l}</Tx><Sp /><Tx s={11} c="#667085">Nguyễn Hoàng  {won && i === 0 ? '09:41' : '09:13'} Sep 21 2026</Tx></span>)}</div></div></Drop>}
              {won ? FEED.slice().reverse().map((f, i) => <div key={i} style={{ paddingBottom: 10 }}><FeedItem {...f} /></div>)
                : FEED.map((f, i) => ({ f, i })).reverse().map(({ f, i }) => <Drop key={i} T={T} at={T < tF ? 1e9 : tF + 0.9 + i * 1.7} h={f.h}><FeedItem {...f} hl={T < tF + 0.9 + i * 1.7 + 1.4 ? `rgba(102,180,240,${1 - ez(T, tF + 0.9 + i * 1.7 + 0.6, 0.8)})` : null} /></Drop>)}
              {!won && <div style={{ display: 'flex', gap: 12 }}><span style={{ width: 26, flex: 'none' }} /><div style={{ flex: 1, background: '#F9FAFB', border: '1px solid #EAECF0', borderRadius: 8, padding: '4px 14px' }}>{['Owner assigned to Phương Hà.', 'Lead created via Meta Lead Form.'].map(l => <span key={l} style={{ display: 'flex', padding: '6px 0' }}><Tx s={11.5} c="#344054">{l}</Tx><Sp /><Tx s={11} c="#667085">Nguyễn Hoàng  21:47 Jun 26 2026</Tx></span>)}</div></div>}
            </div>
          </Focus>
        </div>
        <div style={{ width: 300, flex: 'none', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 10, transform: `translateY(${-scrollR * 258}px)` }}>
            <Lbl>SOURCE & ATTRIBUTION</Lbl>
            <Card st={{ padding: '10px 12px', gap: 7 }}><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ic s={18} c="#667085" r={5} /><span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={12} w={600} c="#101828">Meta Lead Form</Tx><Tag>ADMANAGER</Tag></span></span>
              <span style={{ display: 'flex' }}><Tx s={11} c="#667085">● First touch  <b style={{ color: '#101828', fontWeight: 500 }}>Meta Ads</b></Tx><Sp /><Tx s={10.5} c="#98A2B3">Jun 26</Tx></span>
              <span style={{ display: 'flex', gap: 6 }}><Tx s={11} c="#667085">Campaign</Tx><Tx s={11} w={500} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Meta Ads – Quà Tết doanh nghiệp 2…</Tx></span></Card>
            <span style={{ display: 'flex' }}><Lbl>FIRMOGRAPHICS</Lbl><Sp /><Tx s={10.5} w={600} c={PRI}>✧ Enrich</Tx></span>
            <Card st={{ padding: '8px 12px', gap: 6 }}>{[['Company (enriched)', 'Công ty CP Dược phẩm Việt Phúc'], ['Domain', 'vietphuc-pharma.com.vn'], ['Quy mô', '620 nhân sự']].map(([k, v]) => <span key={k} style={{ display: 'flex', gap: 8 }}><Tx s={11} c="#667085">{k}</Tx><Sp /><Tx s={11} w={500} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{v}</Tx><span style={{ color: OK, fontSize: 9 }}>●</span></span>)}</Card>
            {won ? <>
              <span style={{ display: 'flex' }}><Lbl>RELATED RECORDS</Lbl><Sp /><Tx s={12} c="#667085">+</Tx></span>
              <Drop T={T} at={tL + 4.2} h={66}><Focus p={fw(T, tL + 4.5)} col={GREEN} label="Linked deal · Won" pad={3} right><Card st={{ padding: '10px 12px', gap: 3 }}><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#EEF4FF', color: PRI, display: 'grid', placeItems: 'center', font: `700 11px ${UI}` }}>$</span><Tx s={12} w={600} c="#101828">Linked deal</Tx><Sp /><Pill c={OKD} bg="#ECFDF3">Won</Pill></span><Tx s={11} c="#475467" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Việt Phúc – 200 bộ Lucky Clover · ₫1,190,000,000</Tx></Card></Focus></Drop>
              <Card st={{ padding: '10px 12px', gap: 3 }}><Tx s={12} w={600} c="#101828">Matched profile</Tx><Tx s={10.5} c="#98A2B3">Returning visitor · 1 touches</Tx></Card>
            </> : <>
              <span style={{ display: 'flex' }}><Lbl>CLASSIFICATION</Lbl></span>
              <Card st={{ padding: '8px 12px', flexDirection: 'row', gap: 22 }}>{[['Segments', 0], ['Campaigns', 1], ['Collections', 0]].map(([k, v]) => <span key={k} style={{ display: 'flex', flexDirection: 'column' }}><Tx s={10} c="#667085">{k}</Tx><Tx s={12} w={600} c="#101828">{v}</Tx></span>)}</Card>
              <Card st={{ padding: '12px 14px', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center' }}><Tx s={12.5} w={700} c="#101828">⊙ Score Intelligence</Tx><Sp /><Pill c={col} bg="#fff" b={col}>{grade}</Pill></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, width: 70, height: 58 }}>{[0, 1, 2, 3].map(i => <span key={i} style={{ borderRadius: 3, background: i === 1 && hot ? '#D1FADF' : '#F2F4F7', border: i === 1 && hot ? `1.5px solid ${OK}` : '1px solid #EAECF0' }} />)}</span><span style={{ display: 'flex', flexDirection: 'column' }}><span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}><Tx s={24} w={800} c={col}>{Math.round(score)}</Tx><Tx s={10.5} c="#667085">/ 100 overall</Tx></span><Tx s={11} c={col}>● {hot ? 'Priority' : 'Nurture'}</Tx></span></span>
                <Focus p={fw(T, tY + 0.8, tY + 2.4)} col={GREEN} label="Hai trục chấm điểm" pad={4}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{[['Fit', 'Grade A', 95, tY + 0.8], ['Intent', 'Band 2', 51, tY + 1.3]].map(([k, g, v, t]) => { const p = T >= tY ? ez(T, t, 0.9) : (hot ? 1 : 0.4); return <span key={k} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><span style={{ display: 'flex' }}><Tx s={11} c="#667085">{k}</Tx><Sp /><Tx s={11} w={600} c="#101828">{g} <span style={{ fontWeight: 400, color: '#667085' }}>{Math.round(v * p)}/100</span></Tx></span><span style={{ height: 4, borderRadius: 2, background: '#EAECF0' }}><span style={{ display: 'block', height: '100%', borderRadius: 2, width: `${v * p}%`, background: '#3E8E6B' }} /></span></span>; })}</div>
                </Focus>
                <Tx s={11} w={600} c={PRI}>▾ Why this score · 10 rules</Tx>
                <Focus p={fw(T, tY + 2.6, C.cardA)} col={GREEN} label="10 luật do doanh nghiệp đặt" pad={4}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{RULES.map(([h, rs], g) => <React.Fragment key={h}><Tx s={10.5} c="#667085" st={{ marginTop: g ? 6 : 0 }}>{h}</Tx>{rs.map(([r, v], i) => <span key={r} style={{ display: 'flex', ...rise(T, T >= tY ? tY + 2.2 + (g * 5 + i) * 0.14 : -99, 0.35, 6) }}><Tx s={11} c="#344054">{r}</Tx><Sp /><Tx s={11} w={700} c={OK}>+{v}</Tx></span>)}</React.Fragment>)}</div>
                </Focus>
              </Card>
            </>}
          </div>
        </div>
      </div>
    </Screen>;
  }

  // ================= Danh sách Lead + Push custom audience =================
  function LeadListScreen({ T, from, to, at }) {
    const sel = T >= at + 1.3, modal = Math.min(ez(T, at + 2.4, 0.4), ez(at + 6.1, T, 0.3)), name = 'ICP Won – Quà Tết doanh nghiệp 2027 (seed Lookalike)';
    const nm = typed(name, T, at + 2.9, 28), cols = '32px 1.5fr 1.4fr 1fr 1fr 1.1fr 1.2fr 1.1fr 1fr';
    return <Screen T={T} from={from} to={to} nav="lead" navP={{ sub: true }}>
      <div style={{ height: 46, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', background: '#fff', borderBottom: '1px solid #EAECF0' }}><Ic s={13} /><Tx s={14} w={700} c="#101828">Jasmine Jewelry – Quà tặng doanh nghiệp và Bán sỉ</Tx><Tx s={11.5} c="#667085">2 leads ⌄</Tx><Sp /><span style={{ width: 200, padding: '6px 10px', borderRadius: 6, border: '1px solid #D0D5DD' }}><Tx s={11.5} c="#98A2B3">⌕ Search by name, email, phone...</Tx></span><Btn>Advanced filters ›</Btn><Btn pri>+ New lead ⌄</Btn></div>
      <div style={{ height: 38, flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: sel ? '#EFF4FF' : '#fff', borderBottom: '1px solid #EAECF0' }}>
        {sel ? <><Tx s={12} c="#344054"><b>1</b> lead selected</Tx>{['Assign', 'Edit field', 'Qualify', 'Enrich', 'Enroll in sequence', 'Trigger router'].map((l, i) => <Btn key={l} pri={i === 0} st={{ padding: '4px 10px', fontSize: 11.5 }}>{l}</Btn>)}<Focus p={fw(T, at + 1.6, at + 2.5)} col={AMBER} pad={3}><Btn st={{ padding: '4px 10px', fontSize: 11.5 }}>⚑ Create audience</Btn></Focus><Btn st={{ padding: '4px 10px', fontSize: 11.5 }}>More ⌄</Btn><Sp /><Tx s={12} c="#344054">✕ Clear</Tx></> : <Tx s={12} c="#667085">Showing 1–2 of 2</Tx>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '9px 16px', background: '#F9FAFB', borderBottom: '1px solid #EAECF0' }}>{['', 'LEAD', 'EMAIL', 'PHONE', 'JOB TITLE', 'SOURCE', 'STAGE', 'STATUS', 'SCORE'].map((c, i) => <Lbl key={i}>{c}</Lbl>)}</div>
      {[['NT', 'Ngô Thị Quỳnh Anh', 'quynhanh.ngo@…', '#079455', 'Meta Lead Form', 'A1', 88], ['LH', 'Lê Hoàng Mai', 'mai.le@saobac…', '#D92D20', 'Tư vấn khách hàng - Ja…', 'A2', 84]].map(([a, n, e, bg, src, g, s], i) => <div key={n} style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'center', padding: '10px 16px', background: i === 0 && sel ? '#EFF4FF' : '#fff', borderBottom: '1px solid #F2F4F7' }}>
        <span style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${i === 0 && sel ? PRI : '#D0D5DD'}`, background: i === 0 && sel ? PRI : '#fff', color: '#fff', font: `700 9px ${UI}`, display: 'grid', placeItems: 'center' }}>{i === 0 && sel ? '✓' : ''}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Av t={a} s={20} bg={bg} /><Tx s={12} w={600} c={PRI}>{n}</Tx></span><Tx s={11.5} c="#475467">✉ {e}</Tx><Tx s={11.5} c="#475467">+84 9…</Tx><Tx s={11.5} c="#475467">Chuyên viên…</Tx><Tx s={11.5} c="#475467" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{src}</Tx><span><Pill c={OKD} bg="#ECFDF3">● Marketing Quali…</Pill></span><Tx s={11.5} c="#344054">● Đã chuyển Sale…</Tx><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Pill c={OK} bg="#fff" b={OK}>{g}</Pill><span style={{ width: 30, height: 3, background: OK, borderRadius: 2 }} /><Tx s={12} w={700} c={OK}>{s}</Tx></span>
      </div>)}
      {modal > 0 && <div style={{ position: 'absolute', inset: 0, background: `rgba(16,24,40,${0.35 * modal})`, display: 'grid', placeItems: 'center', zIndex: 10 }}>
        <div style={{ width: 380, background: '#fff', borderRadius: 12, boxShadow: '0 24px 60px rgba(0,0,0,.3)', opacity: modal, transform: `translateY(${(1 - modal) * 16}px) scale(${lerp(0.97, 1, modal)})`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', borderBottom: '1px solid #EAECF0' }}><Tx s={15} w={700} c="#101828">⚑ Push to custom audience</Tx><Sp /><Tx s={14} c="#667085">✕</Tx></div>
          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: 3, borderRadius: 8, background: '#F2F4F7' }}><Tx s={12} w={600} c="#101828" st={{ textAlign: 'center', padding: '6px 0', background: '#fff', borderRadius: 6 }}>Create new</Tx><Tx s={12} c="#475467" st={{ textAlign: 'center', padding: '6px 0' }}>Add to existing</Tx></span>
            <Tx s={12} w={600} c="#344054">Ad account</Tx><span style={{ display: 'flex', padding: '8px 12px', border: '1px solid #D0D5DD', borderRadius: 6 }}><Tx s={12} c="#101828">Base Brand Educate</Tx><Sp /><Tx s={11} c="#98A2B3">⌄</Tx></span>
            <Tx s={12} w={600} c="#344054">Audience name</Tx>
            <Focus p={fw(T, at + 3.0, at + 5.0)} col={AMBER} pad={3} label="Tệp khách đã mua làm mẫu cho Meta tìm khách tương tự" below><span style={{ display: 'flex', padding: '8px 12px', border: `1.5px solid ${PRI}`, borderRadius: 6, boxShadow: '0 0 0 3px rgba(21,112,239,.15)', minHeight: 18 }}><Tx s={12} c="#101828">{nm}<Caret on={nm.length < name.length && T >= at + 2.9} /></Tx></span></Focus>
            <Tx s={12} w={600} c="#344054">Build from</Tx><Tx s={12} c="#101828">◉  1 selected lead</Tx><Tx s={12} c="#475467">○  All 2 leads matching filters</Tx>
            <P s={11} c="#667085">Leads without an email or phone are skipped. Contact details are matched against the ad platform — they aren't stored there in plain text.</P>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 18px', borderTop: '1px solid #EAECF0' }}><Btn>Cancel</Btn><Btn pri>Create audience</Btn></div>
        </div>
      </div>}
      <Cursor T={T} at={at + 0.4} a={[600, 300]} b={[26, 126]} />
      <Cursor T={T} at={at + 1.5} a={[26, 126]} b={[840, 84]} />
      <Cursor T={T} at={at + 5.0} a={[700, 420]} b={[852, 548]} />
      <Toast T={T} at={at + 6.2}>Custom audience created · Meta · 1 lead</Toast>
    </Screen>;
  }

  window.DaiLead = { CampaignScreen, LeadScreen, LeadListScreen };
})();
