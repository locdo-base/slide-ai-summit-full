// Cycle Dài · mockup app Commerce: tạo báo giá (modal), chi tiết báo giá, đơn hàng
(function () {
  const B = window.DaiBase;
  const { AF, UI, MONO, PRI, OK, OKD, BLUE, AMBER, GREEN, RED, lerp, ez, io, rise, typed, vnd, clamp, Tx, P, Pill, Tag, Btn, Lbl, Sp, Hr, Ic, Av, Card, Caret, Focus, fw, Cursor, Toast, Drop, Screen } = B;
  const Check = ({ p = 1, c = OK, s = 18 }) => <span style={{ width: s, height: s, borderRadius: '50%', background: p > 0.5 ? c : '#fff', border: p > 0.5 ? 'none' : '1.5px solid #D0D5DD', color: '#fff', display: 'grid', placeItems: 'center', font: `700 ${s * 0.55}px ${UI}`, flex: 'none', transform: `scale(${1 + 0.25 * Math.sin(Math.PI * p)})` }}>{p > 0.5 ? '✓' : ''}</span>;

  // ================= New quote modal =================
  const QSTEPS = [['Details', 'VND'], ['Customer', 'Công ty CP Dược phẩm Việt Phúc · 1 contact'], ['Products & pricing', '1 item · ₫1,190,000,000'], ['Acceptance', 'Paper · Invoice'], ['Review', 'Internal approval required']];
  const CHECKS = [['Quote has a name', 'Việt Phúc – 200 bộ Lucky Clover quà Tết 2027'], ['Selling entity selected', 'The legal seller named on the offer.'], ['Customer account selected', 'Công ty CP Dược phẩm Việt Phúc · 1 contact'], ['At least one contact', '1 contact'], ['At least one line item', '1 line · ₫1,190,000,000'], ['Signature method', 'Paper — marked signed manually'], ['Payment collection', 'Send invoice · Net 30'], ['Validity', '30 days from publish (service default)']];
  function QuoteModalScreen({ T, from, to, C }) {
    const tQ = C.quote, tR = C.review, rv = T >= tR;
    const step = rv ? 4 : 2, stepP = (i) => i < step ? 1 : 0;
    const amt = lerp(0, 1700000000, ez(T, tQ + 0.9, 0.9)), adj = ez(T, tQ + 2.3, 0.5), pct = typed('30', T, tQ + 2.8, 6), disc = lerp(0, 510000000, ez(T, tQ + 3.1, 0.8)), total = amt - disc;
    const hdr = rv ? 1190000000 : total;
    const req = T >= tR + 5.0;
    return <Screen T={T} from={from} to={to} bg="#98A2B3">
      <div style={{ position: 'absolute', inset: 14, background: '#fff', borderRadius: 12, boxShadow: '0 24px 60px rgba(0,0,0,.3)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: 46, flex: 'none', display: 'flex', alignItems: 'center', padding: '0 18px', borderBottom: '1px solid #EAECF0' }}><Tx s={14.5} w={600} c="#101828">New quote</Tx><Sp /><Tx s={14} c="#667085">✕</Tx></div>
        <div style={{ height: 50, flex: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', borderBottom: '1px solid #EAECF0' }}><span style={{ width: 26, height: 26, borderRadius: 6, background: '#F2F4F7', display: 'grid', placeItems: 'center' }}><Tx s={12} c="#475467">‹</Tx></span><Tx s={16} w={700} c="#101828">Việt Phúc – 200 bộ Lucky Clover quà Tết 2027</Tx><Sp /><Tx s={17} w={800} c="#101828" st={{ fontVariantNumeric: 'tabular-nums' }}>{vnd(hdr)}</Tx><Tx s={14} c="#667085">···</Tx></div>
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <div style={{ width: 230, flex: 'none', borderRight: '1px solid #EAECF0', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Tx s={11.5} w={600} c="#475467">Step {step + 1} of 5</Tx><span style={{ height: 4, borderRadius: 2, background: '#EAECF0' }}><span style={{ display: 'block', height: '100%', borderRadius: 2, background: PRI, width: `${lerp(60, 100, rv ? ez(T, tR, 0.6) : 0)}%` }} /></span><Hr st={{ margin: '8px 0' }} />
            {QSTEPS.map(([n, s], i) => { const a = i === step, d = i < step; return <span key={n} style={{ display: 'flex', gap: 10, padding: '8px 8px', borderRadius: 8, background: a ? '#EFF8FF' : 'transparent' }}>{d ? <Check p={rv && i === 3 ? ez(T, tR + 0.2, 0.3) : 1} /> : <span style={{ width: 18, height: 18, borderRadius: '50%', border: `${a ? 5 : 1.5}px solid ${a ? PRI : '#D0D5DD'}`, flex: 'none', boxSizing: 'border-box' }} />}<span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}><Tx s={13} w={a ? 600 : 500} c={a ? PRI : '#101828'}>{n}</Tx><Tx s={11} c="#667085" st={{ whiteSpace: 'normal' }}>{i === 2 && !rv ? `1 item · ${vnd(total)}` : s}</Tx></span></span>; })}
          </div>
          <div style={{ flex: 1, minWidth: 0, background: '#FAFBFC', padding: '20px 30px', position: 'relative', overflow: 'hidden' }}>
            {!rv ? <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><Tx s={18} w={700} c="#101828">Products & pricing</Tx><Tx s={12.5} c="#667085">Add priced lines, then layer discounts, taxes and fees — totals update as you go.</Tx></span>
              <div style={{ background: '#fff', border: '1px solid #EAECF0', borderRadius: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 130px 150px', gap: 12, padding: '9px 16px', borderBottom: '1px solid #EAECF0' }}>{['ITEM', 'QTY', 'UNIT PRICE', 'AMOUNT'].map((c, i) => <Lbl key={c} st={{ textAlign: i > 1 ? 'right' : 'left' }}>{c}</Lbl>)}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 130px 150px', gap: 12, alignItems: 'center', padding: '12px 16px', ...rise(T, tQ + 0.3, 0.4, 8) }}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}><Tx s={13.5} w={500} c="#101828">Bộ Trang Sức Cỏ Bốn Lá Lucky Clover</Tx><Tx s={11} c="#667085" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>JJ-BO-001 · One-time · Bộ đôi dây chuyền và khuyên tai bạc 925 mặt cỏ bốn lá đính đá…</Tx></span>
                  <Tx s={13.5} c="#101828">{typed('200', T, tQ + 0.6, 10)}</Tx><Tx s={13} c="#475467" st={{ textAlign: 'right' }}>₫8,500,000</Tx><Tx s={14} w={700} c="#101828" st={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{vnd(amt)}</Tx>
                </div>
                <div style={{ padding: '9px 16px', borderTop: '1px solid #F2F4F7', display: 'flex', gap: 18 }}>{['+ Add product', '+ Add custom item', '≋ Add group'].map(l => <Tx key={l} s={12} w={500} c={PRI}>{l}</Tx>)}</div>
                <div style={{ padding: '9px 16px', borderTop: '1px solid #EAECF0', background: '#F9FAFB', display: 'flex' }}><Tx s={12} c="#475467">Subtotal · 1 line</Tx><Sp /><Tx s={13} w={700} c="#101828">{vnd(amt)}</Tx></div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ display: 'flex', gap: 8 }}><Tx s={13} w={700} c="#101828">Adjustments</Tx><Tx s={11.5} c="#667085">Subtotal − discounts + fees → taxable base + tax.</Tx><Sp /><Tx s={11.5} c="#475467">{adj > 0.5 ? '1 active' : ''}</Tx></span>
                  <div style={{ background: '#fff', border: '1px solid #EAECF0', borderRadius: 8 }}>
                    <Drop T={T} at={tQ + 2.3} h={52} gap={0}><Focus p={fw(T, tQ + 2.6, tQ + 5.0)} col={AMBER} pad={2} label="Bậc giảm 30% đã được duyệt ở bước thương thảo" below>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid #F2F4F7' }}><span style={{ width: 24, height: 24, borderRadius: 6, background: '#FEE4E2' }} /><span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}><Tx s={13} w={600} c="#101828">Bậc giảm 30% – đơn 200 bộ (đã duyệt nội bộ)</Tx><Tx s={11} c="#667085">Discount · applied to subtotal</Tx></span><span style={{ display: 'flex', borderRadius: 6, border: '1px solid #EAECF0' }}><Tx s={11} w={600} c="#101828" st={{ padding: '3px 8px', background: '#F2F4F7' }}>%</Tx><Tx s={11} c="#98A2B3" st={{ padding: '3px 8px' }}>Flat</Tx></span><span style={{ width: 44, padding: '4px 8px', border: '1px solid #D0D5DD', borderRadius: 6, textAlign: 'right' }}><Tx s={12.5} c="#101828">{pct}</Tx></span><Tx s={12} c="#667085">%</Tx><Tx s={13} w={700} c="#D92D20" st={{ fontVariantNumeric: 'tabular-nums', width: 116, textAlign: 'right' }}>−{vnd(disc)}</Tx></div>
                    </Focus></Drop>
                    <div style={{ padding: '9px 14px', display: 'flex', gap: 18 }}>{['◇ Discount', '⌁ Fee', '▤ Tax'].map(l => <Tx key={l} s={12} c="#344054">{l}</Tx>)}</div>
                  </div>
                </div>
                <Focus p={fw(T, tQ + 5.2)} col={GREEN} label="Tổng tự tính từ bảng giá và chiết khấu · không gõ tay" below right st={{ width: 330, flex: 'none' }}>
                  <Card st={{ padding: '16px 18px', gap: 10 }}><span style={{ display: 'flex' }}><Tx s={15} w={700} c="#101828">Customer pays ▤</Tx><Sp /><Tx s={10.5} c="#667085">VND</Tx></span>
                    <span style={{ display: 'flex' }}><Tx s={12} c="#475467">Subtotal</Tx><Sp /><Tx s={12.5} c="#101828">{vnd(amt)}</Tx></span>
                    {adj > 0 && <span style={{ display: 'flex', gap: 8, opacity: adj }}><Tx s={11.5} c="#475467" st={{ whiteSpace: 'normal' }}><span style={{ color: '#D92D20' }}>●</span> Bậc giảm 30% – đơn 200 bộ</Tx><Sp /><Tx s={12.5} c="#D92D20">−{vnd(disc)}</Tx></span>}<Hr />
                    <span style={{ display: 'flex', alignItems: 'baseline' }}><Tx s={13} w={600} c="#101828">Total</Tx><Sp /><Tx s={24} w={800} c="#101828" st={{ fontVariantNumeric: 'tabular-nums' }}>{vnd(total)}</Tx></span>
                    {disc > 0 && <Tx s={11.5} c={OK} st={{ textAlign: 'right' }}>You save {vnd(disc)}</Tx>}
                  </Card></Focus>
              </div>
            </div> : <div style={{ display: 'flex', gap: 22, ...rise(T, tR, 0.5, 12) }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><Tx s={18} w={700} c="#101828">Review & request approval</Tx><P s={12.5} c="#667085">This service sends every quote through internal approval — submit it here, then publish once approval is granted.</P></span>
                <span style={{ display: 'flex', alignItems: 'center' }}><Tx s={14} w={700} c="#101828">Readiness</Tx><Sp /><Pill>{Math.min(8, Math.floor(clamp((T - tR - 0.6) / 0.2, 0, 8)))} of 9 checks passed</Pill></span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <Focus p={fw(T, tR + 2.6, tR + 4.6)} col={RED} pad={3} label="Báo giá có chiết khấu lớn: bắt buộc có người duyệt">
                    <div style={{ padding: '10px 12px', borderRadius: 8, border: `1px solid ${req ? '#FEDF89' : '#FDA29B'}`, background: req ? '#FFFAEB' : '#FEF3F2', display: 'flex', gap: 10, height: 50 }}><span style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${req ? '#DC6803' : '#D92D20'}`, color: req ? '#DC6803' : '#D92D20', display: 'grid', placeItems: 'center', font: `700 10px ${UI}`, flex: 'none' }}>{req ? '◷' : '!'}</span><span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}><Tx s={12.5} w={600} c="#101828">{req ? 'Approval requested' : 'Internal approval required'}</Tx><Tx s={11} c="#667085" st={{ whiteSpace: 'normal' }}>{req ? 'Waiting for Nguyễn Thanh Tùng · Trưởng nhóm Sale' : 'This service sends every quote through approval before publish.'}</Tx></span></div>
                  </Focus>
                  {CHECKS.map(([n, s], i) => { const p = ez(T, tR + 0.6 + i * 0.2, 0.25); return <div key={n} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #EAECF0', background: '#fff', display: 'flex', gap: 10, height: 50 }}><Check p={p} s={16} c={i < 5 ? OK : '#667085'} /><span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}><Tx s={12.5} w={600} c="#101828">{n}</Tx><Tx s={11} c="#667085" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</Tx></span></div>; })}
                </div>
              </div>
              <div style={{ width: 290, flex: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Card st={{ padding: '14px 16px', gap: 9 }}><Lbl>QUOTE SUMMARY</Lbl>{[['Customer', 'Công ty CP Dược phẩm Việt Phúc'], ['Line items', '1'], ['Currency', 'VND'], ['Valid until', '30 days after publish'], ['Acceptance', 'Paper'], ['Payment', 'Send invoice · Net 30'], ['Status', req ? 'Pending approval' : 'Draft']].map(([k, v]) => <span key={k} style={{ display: 'flex', gap: 8 }}><Tx s={12} c="#667085">{k}</Tx><Sp /><Tx s={12} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 170 }}>{v}</Tx></span>)}<Hr /><span style={{ display: 'flex', alignItems: 'baseline' }}><Tx s={12.5} w={600} c="#101828">Total</Tx><Sp /><Tx s={20} w={800} c="#101828">₫1,190,000,000</Tx></span></Card>
                <Card st={{ padding: '14px 16px', gap: 6 }}><Lbl>INTERNAL APPROVAL</Lbl><P s={11.5} c="#667085">{req ? 'Requested · approver: Nguyễn Thanh Tùng (Trưởng nhóm Sale).' : 'Required — this service sends every quote through approval before publish.'}</P></Card>
              </div>
            </div>}
          </div>
        </div>
        <div style={{ height: 56, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', borderTop: '1px solid #EAECF0' }}><Btn>‹ Back</Btn><Sp /><Pill c={rv ? OKD : '#B54708'} bg={rv ? '#ECFDF3' : '#FFFAEB'}>{rv ? '✓ Autosaved · just now' : '● Unsaved changes'}</Pill><Sp />{rv ? <><Btn>Save as draft</Btn><Btn pri st={req ? { background: '#667085' } : null}>{req ? '◷ Pending approval' : '➤ Request approval'}</Btn></> : <><span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}><Lbl st={{ fontSize: 9 }}>UP NEXT</Lbl><Tx s={12.5} w={600} c="#344054">Acceptance</Tx></span><Btn pri>Save & continue</Btn></>}</div>
      </div>
      <Cursor T={T} at={tR + 4.1} a={[900, 400]} b={[1360, 690]} />
      <Toast T={T} at={tR + 5.1}>Approval requested · Nguyễn Thanh Tùng</Toast>
    </Screen>;
  }

  // ================= Chi tiết báo giá / đơn hàng =================
  const LeftStat = ({ k, v, c, bg }) => <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ic s={12} /><Tx s={12} c="#475467">{k}</Tx><Sp />{c ? <Pill c={c} bg={bg}>{v}</Pill> : <Tx s={12} w={600} c="#101828">{v}</Tx>}</span>;
  const Lines = ({ total = 'Total due' }) => <Card st={{ padding: '14px 18px' }}><span style={{ display: 'flex', gap: 8 }}><Tx s={14} w={700} c="#101828">Line items</Tx><Tx s={11.5} c="#667085">1 items</Tx></span>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 110px 130px', gap: 10 }}>{['PRODUCT', 'QTY', 'UNIT PRICE', 'AMOUNT'].map((c, i) => <Lbl key={c} st={{ textAlign: i ? 'right' : 'left' }}>{c}</Lbl>)}
      <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><Tx s={13} w={600} c="#101828">Bộ Trang Sức Cỏ Bốn Lá Lucky Clover</Tx><Tx s={11} c="#667085">JJ-BO-001 · ● One-time</Tx></span><Tx s={12.5} c="#101828" st={{ textAlign: 'right' }}>×200</Tx><Tx s={12.5} c="#475467" st={{ textAlign: 'right' }}>₫8,500,000</Tx><Tx s={13} w={700} c="#101828" st={{ textAlign: 'right' }}>₫1,700,000,000</Tx></div><Hr />
    <span style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}><Pill c={OKD} bg="#ECFDF3">DISCOUNT</Pill><Tx s={12} c="#475467">Bậc giảm 30% – đơn 200 bộ (đã duyệt nội bộ)</Tx><Tx s={12.5} c={OK}>−₫510,000,000</Tx></span>
    <span style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', alignItems: 'baseline' }}><Tx s={12.5} c="#475467">{total}</Tx><Tx s={22} w={800} c="#101828">₫1,190,000,000</Tx><Tx s={11} c="#667085">VND</Tx></span></Card>;
  const Cust = () => <><Lbl>CUSTOMER</Lbl><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 34, height: 34, borderRadius: 8, background: '#EFF8FF', color: PRI, display: 'grid', placeItems: 'center', font: `600 14px ${UI}` }}>C</span><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={14} w={600} c="#101828">Công ty CP Dược phẩm Việt Phúc</Tx><Tx s={11} c="#667085">vietphuc-pharma.com.vn</Tx></span></span><Lbl>CONTACTS</Lbl><Tx s={12} c="#344054">ĐT  <b>Đặng Thu Trang</b>  · Trưởng phòng Hành chính – Nhân sự</Tx><Lbl>SOLD BY</Lbl><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12.5} w={600} c="#101828">Công ty TNHH Trang sức Jasmine</Tx><Tx s={10.5} c="#667085">Tax ID 0110245678</Tx></span></>;

  function QuoteScreen({ T, from, to, C }) {
    const tP = C.pub, tS = C.sign;
    const appr = ez(T, tP + 0.8, 0.4), pub = ez(T, tP + 2.0, 0.4), acc = ez(T, tS + 0.6, 0.4), sig = ez(T, tS + 1.2, 0.4), conv = T >= tS + 1.8;
    const status = acc > 0.5 ? ['● Accepted', OKD, '#ECFDF3'] : pub > 0.5 ? ['● Published', '#175CD3', '#EFF8FF'] : ['● Draft', '#667085', '#F2F4F7'];
    return <Screen T={T} from={from} to={to} nav="quote">
      <div style={{ height: 46, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', background: '#fff', borderBottom: '1px solid #EAECF0' }}><span style={{ width: 22, height: 22, borderRadius: 6, background: '#F2F4F7', display: 'grid', placeItems: 'center' }}><Tx s={11} c="#475467">‹</Tx></span><Tx s={15} w={700} c="#101828">Việt Phúc – 200 bộ Lucky Clover quà Tết 2027</Tx><Tx s={10} c="#667085" st={{ fontFamily: MONO, padding: '2px 6px', background: '#F2F4F7', borderRadius: 4 }}>JJBG-0006</Tx><Sp />{!conv && <Tx s={12.5} c="#475467">✎ Edit</Tx>}
        <Focus p={fw(T, tS + 2.0)} col={GREEN} pad={3} label="Ký xong → một bấm thành đơn hàng" below right><Btn pri>{conv ? '⛟ Convert to order' : '➤ Send to customer'}</Btn></Focus><Tx s={14} c="#667085">···</Tx></div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ width: 240, flex: 'none', background: '#fff', borderRight: '1px solid #EAECF0', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Lbl>CREATED BY</Lbl><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#C68B59,#7A4B2A)' }} /><Tx s={12.5} w={600} c="#101828">Nguyễn Hoàng</Tx><Tx s={11.5} c="#98A2B3">· Sep 21, 2026</Tx></span>
          <Lbl>QUOTE VALUE</Lbl><span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}><Tx s={23} w={800} c="#101828">₫1,190,000,000</Tx><Tx s={10} c="#667085">VND</Tx></span>
          <span style={{ display: 'flex' }}><Tx s={11.5} c="#667085">Subtotal</Tx><Sp /><Tx s={11.5} c="#344054">₫1,700,000,000</Tx></span><span style={{ display: 'flex' }}><Tx s={11.5} c="#667085">Discounts</Tx><Sp /><Tx s={11.5} c={OK}>−₫510,000,000</Tx></span><Hr />
          <Focus p={fw(T, tP + 2.4, tP + 5.8) || fw(T, tS + 0.4, tS + 1.9)} col={BLUE} pad={5} label={T >= tS ? 'Khách chấp nhận và ký' : 'Đã duyệt → được phép gửi khách'} below><div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}><LeftStat k="Status" v={status[0]} c={status[1]} bg={status[2]} /><LeftStat k="Approval" v={appr > 0.5 ? '✓ Approved' : '◷ Pending'} c={appr > 0.5 ? OKD : '#B54708'} bg={appr > 0.5 ? '#ECFDF3' : '#FFFAEB'} /><LeftStat k="Signature" v={sig > 0.5 ? '● Signed' : 'Not signed'} c={sig > 0.5 ? OKD : '#475467'} bg={sig > 0.5 ? '#ECFDF3' : '#F2F4F7'} /><LeftStat k="Payment" v="● Awaiting" c="#B54708" bg="#FFFAEB" /><LeftStat k={acc > 0.5 ? 'Offer valid until' : 'Expires'} v="Oct 21, 2026" /></div></Focus>
          <Hr />{[['Quote overview', 1], ['Terms & conditions'], ['Billing'], ['Activity logs']].map(([l, a]) => <span key={l} style={{ display: 'flex', gap: 8, padding: '6px 8px', margin: '-4px -8px', borderRadius: 6, background: a ? '#EEF4FF' : 'transparent' }}><Ic s={12} c={a ? PRI : '#98A2B3'} /><Tx s={12} w={a ? 600 : 400} c={a ? '#101828' : '#475467'}>{l}</Tx></span>)}
          <span style={{ display: 'flex', marginTop: 6 }}><Lbl>VIEW LINK</Lbl><Sp />{pub > 0.5 && <Pill c={OKD} bg="#ECFDF3">● ACTIVE</Pill>}</span><span style={{ padding: '6px 9px', border: '1px solid #EAECF0', borderRadius: 6 }}><Tx s={10.5} c="#667085" st={{ fontFamily: MONO }}>commerce.base.com.vn/p/base…</Tx></span>
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card st={{ padding: '14px 18px' }}><Tx s={14} w={700} c="#101828">Commercial agreement</Tx>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Cust /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, borderLeft: '1px solid #EAECF0', paddingLeft: 18 }}>
                <span style={{ display: 'flex' }}><Lbl>PAYMENT</Lbl><Sp /><Pill c="#B54708" bg="#FFFAEB">● AWAITING</Pill></span>{[['Method', 'Invoice'], ['Terms', 'Net 30'], ['Currency', 'VND'], ['Status', 'Send invoice · Net 30']].map(([k, v]) => <span key={k} style={{ display: 'flex' }}><Tx s={11.5} c="#667085">{k}</Tx><Sp /><Tx s={11.5} c="#101828">{v}</Tx></span>)}
                <Lbl st={{ marginTop: 4 }}>PROJECTED SCHEDULE</Lbl>
                {[['Quote accepted', 'Billing starts here', 'Sep 21, 2026', acc], ['Invoice issued', 'Cut from the order', '₫1,190,000,000', 0], ['Payment due', '30 days after invoice', 'Oct 21, 2026', 0]].map(([a, b, v, p], i) => <span key={a} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 9, height: 9, borderRadius: '50%', border: `2px solid ${p > 0.5 ? OK : i === 1 ? PRI : '#D0D5DD'}`, background: p > 0.5 ? OK : i === 1 ? PRI : '#fff' }} /><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12} w={600} c="#101828">{a}</Tx><Tx s={10.5} c="#667085">{b}</Tx></span><Sp /><Tx s={12} w={600} c="#101828">{v}</Tx></span>)}
              </div>
            </div>
          </Card>
          <Lines />
        </div>
        <div style={{ width: 256, flex: 'none', background: '#fff', borderLeft: '1px solid #EAECF0', padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Focus p={fw(T, tP + 0.8, tP + 2.3)} col={GREEN} pad={5} label="Trưởng nhóm Sale đã duyệt" below><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ display: 'flex' }}><Tx s={12.5} w={600} c="#101828">Approval</Tx><Sp /><Pill c={appr > 0.5 ? OKD : '#B54708'} bg={appr > 0.5 ? '#ECFDF3' : '#FFFAEB'}>{appr > 0.5 ? '✓ Approved' : '◷ Pending'}</Pill></span><span style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#C68B59,#7A4B2A)' }} /><Tx s={11.5} c={PRI}>View approval timeline</Tx></div></Focus><Hr />
          {sig > 0 && <Drop T={T} at={tS + 1.2} h={52}><span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><Tx s={12.5} w={600} c="#101828">Document e-signatures</Tx><Tx s={12} w={600} c={OK}>Signed</Tx><Tx s={10.5} c="#667085">Sep 21, 2026, 9:33 AM</Tx></span></Drop>}
          <Tx s={12.5} w={600} c="#101828">Source</Tx><span style={{ display: 'flex', gap: 8 }}><Ic s={14} /><span style={{ display: 'flex', flexDirection: 'column' }}><P s={12} w={600} c="#101828">Việt Phúc – 200 bộ Lucky Clover quà Tết 2027 ↗</P><Tx s={10.5} c="#667085">Deal in Sales</Tx></span></span><Hr />
          <Tx s={12.5} w={600} c="#101828">Quote information</Tx>{[['Quote service', 'Báo giá quà tặng doanh nghiệp'], ['Owner', 'Nguyễn Hoàng'], ['Created', 'Sep 21, 2026'], ...(acc > 0.5 ? [['Accepted', 'Sep 21, 2026, 9:33 AM']] : [])].map(([k, v]) => <span key={k} style={{ display: 'flex', gap: 6 }}><Tx s={11} c="#667085">{k}</Tx><Sp /><Tx s={11} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{v}</Tx></span>)}
        </div>
      </div>
      <Cursor T={T} at={tS + 3.2} a={[900, 400]} b={[1300, 60]} />
      <Toast T={T} at={tS + 4.2}>Order JJDS-0006 created from JJBG-0006</Toast>
    </Screen>;
  }

  function OrderScreen({ T, from, to, C }) {
    const tO = C.order, st = ez(T, tO + 0.6, 0.6), s1 = lerp(0, 357000000, ez(T, tO + 1.6, 0.9)), s2 = lerp(0, 833000000, ez(T, tO + 2.0, 0.9));
    const PST = ['Draft', 'Confirmed', 'Preparing', 'Ready', 'Shipped', 'Delivered'];
    return <Screen T={T} from={from} to={to} nav="order">
      <div style={{ height: 46, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', background: '#fff', borderBottom: '1px solid #EAECF0' }}><span style={{ width: 22, height: 22, borderRadius: 6, background: '#F2F4F7', display: 'grid', placeItems: 'center' }}><Tx s={11} c="#475467">‹</Tx></span><Tx s={15} w={700} c="#101828">Việt Phúc – 200 bộ Lucky Clover quà Tết 2027</Tx><Tx s={10} c="#667085" st={{ fontFamily: MONO, padding: '2px 6px', background: '#F2F4F7', borderRadius: 4 }}>JJDS-0006</Tx><Pill c={st > 0.5 ? '#175CD3' : '#667085'} bg={st > 0.5 ? '#EFF8FF' : '#F2F4F7'}>● {st > 0.5 ? 'Confirmed' : 'Draft'}</Pill><Sp /><Btn pri>◎ Complete order</Btn><Tx s={14} c="#667085">···</Tx></div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ width: 240, flex: 'none', background: '#fff', borderRight: '1px solid #EAECF0', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Lbl>CREATED BY</Lbl><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#C68B59,#7A4B2A)' }} /><Tx s={12.5} w={600} c="#101828">Nguyễn Hoàng</Tx><Tx s={11.5} c="#98A2B3">· Sep 21, 2026</Tx></span>
          <Lbl>ORDER TOTAL</Lbl><span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}><Tx s={23} w={800} c="#101828">₫1,190,000,000</Tx><Tx s={10} c="#667085">VND</Tx></span>
          <span style={{ display: 'flex' }}><Tx s={11.5} c="#667085">Subtotal</Tx><Sp /><Tx s={11.5} c="#344054">₫1,700,000,000</Tx></span><span style={{ display: 'flex' }}><Tx s={11.5} c="#667085">Discounts</Tx><Sp /><Tx s={11.5} c={OK}>−₫510,000,000</Tx></span><Hr />
          {[['Overview', '', 1], ['Fulfillment', '0%'], ['Billing', ''], ['Activity', '4']].map(([l, r, a]) => <span key={l} style={{ display: 'flex', gap: 8, padding: '6px 8px', margin: '-4px -8px', borderRadius: 6, background: a ? '#EEF4FF' : 'transparent' }}><Ic s={12} c={a ? PRI : '#98A2B3'} /><Tx s={12} w={a ? 600 : 400} c={a ? '#101828' : '#475467'}>{l}</Tx><Sp /><Tx s={11} c="#98A2B3">{r}</Tx></span>)}
          <span style={{ display: 'flex', marginTop: 6 }}><Lbl>PUBLIC LINK</Lbl><Sp /><Pill c={OKD} bg="#ECFDF3">● ACTIVE</Pill></span><span style={{ padding: '6px 9px', border: '1px solid #EAECF0', borderRadius: 6 }}><Tx s={10.5} c="#667085" st={{ fontFamily: MONO }}>commerce.base.com.vn/p/base…</Tx></span>
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #B2DDFF', background: '#F5FAFF', display: 'flex', alignItems: 'center', gap: 12, borderLeft: `3px solid ${PRI}`, ...rise(T, tO + 0.8, 0.4, 8) }}><Ic s={18} c={PRI} r={5} /><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={13} w={600} c="#101828">Confirmed — awaiting execution</Tx><Tx s={11.5} c="#475467">Record a delivery, issue an invoice or collect a payment to start.</Tx></span><Sp /><Btn pri>Go to fulfillment</Btn></div>
          <Card st={{ padding: '14px 18px' }}><Tx s={14} w={700} c="#101828">Commercial agreement</Tx>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Cust /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, borderLeft: '1px solid #EAECF0', paddingLeft: 18 }}>
                <Lbl>PAYMENT TERMS</Lbl>{[['Collection', 'Send invoice'], ['Terms', 'Net 30'], ['Currency', 'VND']].map(([k, v]) => <span key={k} style={{ display: 'flex' }}><Tx s={11.5} c="#667085">{k}</Tx><Sp /><Tx s={11.5} c="#101828">{v}</Tx></span>)}
                <Focus p={fw(T, tO + 1.4)} col={GREEN} pad={5} label="Lịch thu 30/70 đi theo điều khoản đã ký" below>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex' }}><Lbl>SCHEDULE · 2 INSTALLMENTS</Lbl><Sp /><Tx s={10.5} c="#667085">Billing »</Tx></span>
                    {[['1', 'Cọc 30% sau ký HĐ', 'Sep 24, 2026', s1, '30%'], ['2', '70% sau nghiệm thu', 'Jan 19, 2027', s2, '70%']].map(([n, a, d, v, p]) => <span key={n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tx s={11} c="#98A2B3">{n}</Tx><span style={{ display: 'flex', flexDirection: 'column' }}><Tx s={12} w={600} c="#101828">{a}</Tx><Tx s={10.5} c="#667085">{d}</Tx></span><Sp /><Tx s={13} w={700} c="#101828" st={{ fontVariantNumeric: 'tabular-nums' }}>{vnd(v)}</Tx><Tx s={10.5} c="#667085">{p}</Tx></span>)}</div>
                </Focus>
              </div>
            </div>
          </Card>
          <Lines total="Order total" />
        </div>
        <div style={{ width: 256, flex: 'none', background: '#fff', borderLeft: '1px solid #EAECF0', padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ display: 'flex' }}><Tx s={12.5} w={600} c="#101828">Pipeline stage</Tx><Sp /><Pill>◷ 1m</Pill></span>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingTop: 12 }}><span style={{ position: 'absolute', left: 4, right: 4, top: 4, height: 2, background: '#EAECF0' }} /><span style={{ position: 'absolute', left: 4, top: 4, height: 2, width: `${st * 20}%`, background: PRI }} /><span style={{ position: 'absolute', top: 0, left: `calc(${st * 20}% - 1px)`, width: 10, height: 10, borderRadius: '50%', background: '#fff', border: `2px solid ${PRI}` }} />{PST.map((p, i) => <Tx key={p} s={9.5} w={i === 1 && st > 0.5 ? 700 : 400} c={i === 1 && st > 0.5 ? '#101828' : '#98A2B3'}>{p.slice(0, 6)}</Tx>)}</div>
          <Tx s={11} c="#667085">↻ Next  <b style={{ color: '#101828' }}>Preparing</b> · Fulfillment planned</Tx><Hr />
          <Tx s={12.5} w={600} c="#101828">Order information</Tx>{[['Order service', 'Đơn sỉ & cộng tác viên Jasmine'], ['Owner', 'Nguyễn Hoàng'], ['Created', 'Sep 21, 2026'], ['Confirmed', 'Sep 21, 2026, 9:34 AM']].map(([k, v]) => <span key={k} style={{ display: 'flex', gap: 6 }}><Tx s={11} c="#667085">{k}</Tx><Sp /><Tx s={11} c="#101828" st={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{v}</Tx></span>)}<Hr />
          <Tx s={12.5} w={600} c="#101828">Linked</Tx><Focus p={fw(T, tO + 3.4)} col={BLUE} pad={4} label="Nối ngược về báo giá đã ký" below right><Tx s={11.5} c="#344054">⤷ Việt Phúc – 200 bộ Lucky… <span style={{ fontFamily: MONO, color: '#667085' }}>JJBG-0006</span></Tx></Focus>
        </div>
      </div>
      <Toast T={T} at={tO + 0.7}>Order confirmed</Toast>
    </Screen>;
  }

  window.DaiCommerce = { QuoteModalScreen, QuoteScreen, OrderScreen };
})();
