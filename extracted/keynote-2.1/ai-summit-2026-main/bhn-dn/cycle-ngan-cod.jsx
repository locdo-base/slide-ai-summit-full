// KN1 · Bài 2 · Bán hàng chu kỳ ngắn — bản COD (22/09/2026). Prospector → Order → Inventory → Payment → Invoice → Inventory.
const { useComposition, Easing, clamp, CompositionStage, useTweaks, TweaksPanel, TweakSection, TweakToggle } = window;
const FW = 3840, FH = 1280, LX0 = 180;
const AF = "'Afacad', Inter, system-ui, sans-serif", MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";
const BLUE = '#66B4F0', AMBER = '#F0A23B', GREEN = '#4ADE80', RED = '#F87171', INK2 = '#D5DEEA', INK3 = '#9FB4CF';
const lerp = (a, b, p) => a + (b - a) * p;
const ez = (T, s, d = 0.6) => Easing.easeOutCubic(clamp((T - s) / d, 0, 1));
const io = (T, s, d = 0.9) => Easing.easeInOutCubic(clamp((T - s) / d, 0, 1));
const rise = (T, s, d = 0.5, px = 24) => { const e = ez(T, s, d); return { opacity: e, transform: `translateY(${(1 - e) * px}px)` }; };
const win = (T, from, to, d = 0.5) => Math.min(ez(T, from, d), ez(to, T, 0.4));
const TONE = { blue: BLUE, red: RED, green: GREEN, amber: AMBER };
// Bố cục demo: cột trái 120..640 (caption) · vùng demo 720..2440 (timeline trên, khung dưới)
// Bản 3:1 — cột trái 180..1420 (caption + timeline dưới) · khung demo 1560..3660
const FRAME_H = 1040, FRAME_TOP = 110, FRAME_W = 2100, DEMO_X = 1560, SPLIT_W = 1240, SPLIT_TOP = 820;

// ---------- Browser chrome ----------
function Chrome({ w, h, L, Tp, k, op, rp, children }) {
  const CH = 40;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h + CH, transform: `translate(${L}px, ${Tp + (1 - rp) * 28}px) scale(${k * lerp(0.985, 1, rp)})`, transformOrigin: '0 0', opacity: op, borderRadius: 16, overflow: 'hidden', background: '#F7F8FA', boxShadow: '0 30px 80px rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.14)' }}>
      <div style={{ height: CH, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: '#0E1F44', borderBottom: '1px solid rgba(255,255,255,.10)' }}>
        {['#F87171', '#F0A23B', '#4ADE80'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: .7 }} />)}
        <span style={{ marginLeft: 16, padding: '3px 14px', borderRadius: 6, background: 'rgba(255,255,255,.06)', font: `400 15px ${MONO}`, color: INK3 }}>app.base.vn</span>
      </div>
      <div style={{ position: 'relative', width: w, height: h, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

// ---------- Mock left menu (giữ thanh menu bên trái cho ảnh đã cắt) — nhãn lấy từ menu thật của Base ----------
const NAVS = {
  order: { rail: ['Product', 'Price', 'Quote', 'Order', 'Invoice', 'Subs', 'Payment'], active: 'Order', title: 'Order', items: [['All orders'], ['Fulfillment'], ['ORDER SERVICES', 'sec'], ['Đơn hàng bán', 'svc'], ['Đơn hàng bán lẻ Jasm…', 'svc', 1], ['Đơn sỉ & cộng tác viên …', 'svc'], ['Đơn hàng Philips Healt…', 'svc']] },
  inventory: { rail: null, title: 'Kho Jasmine – 200 3/2', items: [['Stock items'], ['Transactions'], ['Location map'], ['OPERATIONS', 'sec'], ['Receiving'], ['Delivery', '', 1], ['Transfer'], ['Adjustment']] },
};
function NavMock({ kind, k, h }) {
  const n = NAVS[kind]; const f = (px) => px * k;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, height: h, display: 'flex', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {n.rail && <div style={{ width: f(56), height: h, background: '#fff', borderRight: '1px solid #E7E9EF', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: f(14), gap: f(22) }}>
        <img src="assets/logo-base-mark.png" alt="" style={{ width: f(22), height: f(22), marginBottom: f(6) }} />
        {n.rail.map(r => { const a = r === n.active; return <div key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: f(4) }}><span style={{ width: f(18), height: f(18), borderRadius: f(5), background: a ? '#2563EB' : '#D0D5DD', opacity: a ? 1 : .55 }} /><span style={{ font: `500 ${f(9.5)}px Inter, system-ui, sans-serif`, color: a ? '#2563EB' : '#667085' }}>{r}</span></div>; })}
      </div>}
      <div style={{ width: f(180), height: h, background: '#fff', borderRight: '1px solid #E7E9EF', padding: `${f(14)}px ${f(12)}px`, display: 'flex', flexDirection: 'column', gap: f(4) }}>
        <div style={{ font: `600 ${f(14)}px Inter, system-ui, sans-serif`, color: '#101828', marginBottom: f(14) }}>{n.title}</div>
        {n.items.map(([label, t, act]) => t === 'sec'
          ? <div key={label} style={{ font: `600 ${f(9.5)}px Inter, system-ui, sans-serif`, letterSpacing: .6, color: '#98A2B3', margin: `${f(10)}px 0 ${f(4)}px ${f(8)}px` }}>{label}</div>
          : <div key={label} style={{ display: 'flex', alignItems: 'center', gap: f(8), padding: `${f(6)}px ${f(8)}px`, borderRadius: f(6), background: act ? '#2563EB' : 'transparent', font: `${act ? 600 : 400} ${f(12.5)}px Inter, system-ui, sans-serif`, color: act ? '#fff' : '#344054', whiteSpace: 'nowrap', overflow: 'hidden' }}><span style={{ width: f(12), height: f(12), borderRadius: f(3), background: act ? 'rgba(255,255,255,.55)' : '#D0D5DD', flex: 'none' }} />{label}</div>)}
      </div>
    </div>
  );
}

// ---------- Screenshot frame: giữ độ nét (không phóng quá 1.15× ảnh gốc), spotlight + Ken Burns nhẹ ----------
function Shot({ T, from, to, src, iw, ih, spots, tone = 'blue', split = 0, nav, maxZoom = 1.5, dim = 0.6, scale, left, top, frameH }) {
  if (T < from || T > to + 0.5) return null;
  const navW0 = nav ? (NAVS[nav].rail ? 236 : 180) : 0;
  const k0 = scale ?? Math.min(FRAME_W / (navW0 + iw), (frameH ?? FRAME_H) / ih, 1.15);
  const navW = navW0 * k0, w0 = iw * k0, h0 = ih * k0;
  const w = navW + w0, h = nav ? Math.max(h0, Math.min(FRAME_H, h0 + 60)) : h0;
  const left0 = left ?? DEMO_X + (FRAME_W - w) / 2, top0 = top ?? (FRAME_TOP + (FRAME_H - h) / 2);
  const op = Math.min(ez(T, from, 0.5), ez(to + 0.5, T, 0.45));
  const st = (r) => { if (!r) return { s: 1, tx: 0, ty: 0 }; const rx = r[0] * w0, ry = r[1] * h0, rw = r[2] * w0, rh = r[3] * h0; const s = clamp(Math.min(0.62 * w0 / rw, 0.68 * h0 / rh), 1.08, maxZoom); return { s, tx: w0 / 2 - (rx + rw / 2) * s, ty: h0 / 2 - (ry + rh / 2) * s }; };
  let idx = -1; spots.forEach((sp, i) => { if (T >= sp[0]) idx = i; });
  const cur = idx >= 0 ? spots[idx] : null, prev = idx > 0 ? spots[idx - 1] : null;
  const a = st(prev && prev[1]), b = st(cur && cur[1]), p = cur ? io(T, cur[0], 1.0) : 0;
  const s = lerp(a.s, b.s, p); let tx = lerp(a.tx, b.tx, p), ty = lerp(a.ty, b.ty, p);
  tx = clamp(tx, w0 - w0 * s, 0); ty = clamp(ty, h0 - h0 * s, 0);
  const k = lerp(1, SPLIT_W / w, split), L = lerp(left0, LX0, split), Tp = lerp(top0, SPLIT_TOP, split);
  const col = TONE[tone];
  return (
    <Chrome w={w} h={h} L={L} Tp={Tp} k={k} op={op} rp={ez(T, from, 0.8)}>
      {nav && <NavMock kind={nav} k={k0} h={h} />}
      <div style={{ position: 'absolute', left: navW, top: 0, width: w0, height: h0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: w0, height: h0, transform: `translate(${tx}px, ${ty}px) scale(${s})`, transformOrigin: '0 0' }}>
          <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: w0, height: h0, display: 'block' }} />
          {spots.map((sp, i) => { const r = sp[1]; if (!r) return null; const on = i === idx ? p : 0; if (on <= 0) return null; const bw = Math.max(2, 3 / s); return (
            <div key={i} style={{ position: 'absolute', left: r[0] * w0 - 8, top: r[1] * h0 - 8, width: r[2] * w0 + 16, height: r[3] * h0 + 16, borderRadius: 10 / s + 4, border: `${bw}px solid ${col}`, boxShadow: `0 0 0 6000px rgba(6,21,48,${dim * on}), 0 0 ${40 / s}px ${col}66`, opacity: on }}>
              {sp[2] && <span style={{ position: 'absolute', left: -bw, top: -(30 / s) - 14, transform: `scale(${1 / s})`, transformOrigin: '0 100%', padding: '6px 16px', borderRadius: 999, background: 'rgba(6,21,48,.85)', border: `1.5px solid ${col}`, font: `500 22px ${AF}`, color: '#fff', whiteSpace: 'nowrap' }}>{sp[2]}</span>}
            </div>); })}
        </div>
      </div>
    </Chrome>
  );
}

// ---------- Hook: vẽ lại dải 4 cột + số tiền bằng DOM (không phóng ảnh để giữ nét) ----------
const fmt = (n) => '₫' + Math.round(n).toLocaleString('en-US');
const HOOK_COLS = [['ORDER VALUE', 'what the buyer committed to', '#101828'], ['INVOICED', '1 invoice · 1 settled', '#2563EB'], ['COLLECTED', '1 payment received', '#F0A23B'], ['APPLIED TO INVOICES', 'cash booked against a document', '#16A34A']];
const UI = 'Inter, system-ui, sans-serif';
const Tx = ({ s: sz = 13, w = 400, c = '#344054', st, children }) => <span style={{ font: `${w} ${sz}px ${UI}`, color: c, whiteSpace: 'nowrap', ...st }}>{children}</span>;
const Pill = ({ c, bg, children }) => <span style={{ padding: '3px 10px', borderRadius: 999, background: bg, font: `500 12px ${UI}`, color: c, whiteSpace: 'nowrap' }}>{children}</span>;
const Btn = ({ children }) => <span style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #D0D5DD', background: '#fff', font: `500 13px ${UI}`, color: '#344054', whiteSpace: 'nowrap' }}>{children}</span>;
const Card = ({ st, children }) => <div style={{ background: '#fff', border: '1px solid #E7E9EF', borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, ...st }}>{children}</div>;
const CardHead = ({ t, sub, act }) => <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={15} w={700} c="#101828">{t}</Tx><Tx s={12} c="#667085">{sub}</Tx><span style={{ flex: 1 }} />{act}</div>;
// Dựng lại màn hình Order · Completed bằng DOM để nét trên LED; số tiền đếm lên, 4 cột chạy lần lượt
function CompletedBody({ T, at }) {
  const total = ez(T, at, 1.1), pop = 1 + 0.12 * Math.sin(Math.PI * clamp((T - at - 0.9) / 0.5, 0, 1));
  const paid = ez(T, at + 1.3, 0.4), pill = rise(T, at + 0.6, 0.5, 10);
  const money = (p) => p <= 0 ? '₫ —' : fmt(4900000 * p);
  return (
    <React.Fragment>
      <div style={{ flex: 'none', fontFamily: UI, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', background: '#fff', borderBottom: '1px solid #E7E9EF' }}>
          <span style={{ width: 24, height: 24, borderRadius: 6, background: '#F2F4F7', display: 'grid', placeItems: 'center', font: `600 13px ${UI}`, color: '#667085' }}>‹</span>
          <Tx s={16} w={700} c="#101828">Đơn online Quốc Bảo - +84908215736</Tx>
          <Tx s={10} c="#667085" st={{ fontFamily: MONO, padding: '2px 6px', background: '#F2F4F7', borderRadius: 4 }}>JJDH-0004</Tx>
          <Pill c="#027A48" bg="#ECFDF3">● Completed</Pill>
          <span style={{ flex: 1 }} /><Tx s={16} c="#667085">···</Tx>
        </div>
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <div style={{ width: 260, borderRight: '1px solid #E7E9EF', background: '#fff', padding: '22px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Tx s={11} w={600} c="#98A2B3" st={{ letterSpacing: .6 }}>CREATED BY</Tx><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#B2CCFF' }} /><Tx s={13} w={600} c="#101828">Phương Hà</Tx><Tx s={12} c="#98A2B3">· Sep 21, 2026</Tx></span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 12px', margin: '0 -12px', borderRadius: 10, background: `rgba(74,222,128,${0.14 * paid})`, boxShadow: `0 0 0 ${2 * paid}px rgba(74,222,128,${0.6 * paid})` }}>
              <Tx s={11} w={600} c="#98A2B3" st={{ letterSpacing: .6 }}>ORDER TOTAL</Tx>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, transform: `scale(${pop})`, transformOrigin: '0 60%' }}><Tx s={30} w={800} c="#101828" st={{ letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>{money(total)}</Tx><Tx s={12} w={500} c="#667085">VND</Tx></span>
              <Tx s={12} w={600} c="#16A34A" st={{ opacity: paid }}>Paid in full</Tx>
            </div>
            <div style={{ height: 1, background: '#E7E9EF' }} />
            {[['Overview', ''], ['Fulfillment', '100%'], ['Billing', '2', 1], ['Activity', '19']].map(([l, r, act]) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', margin: '-6px -10px', borderRadius: 6, background: act ? '#EEF4FF' : 'transparent' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: act ? '#2563EB' : '#D0D5DD' }} /><Tx s={13} w={act ? 600 : 400} c={act ? '#1D4ED8' : '#344054'}>{l}</Tx><span style={{ flex: 1 }} /><Tx s={12} c="#98A2B3">{r}</Tx></span>)}
            <div style={{ height: 1, background: '#E7E9EF' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', alignItems: 'center' }}><Tx s={11} w={600} c="#98A2B3" st={{ letterSpacing: .6 }}>PUBLIC LINK</Tx><span style={{ flex: 1 }} /><Pill c="#027A48" bg="#ECFDF3">● ACTIVE</Pill></span><span style={{ padding: '7px 10px', borderRadius: 6, border: '1px solid #E7E9EF', font: `400 11px ${MONO}`, color: '#667085', whiteSpace: 'nowrap', overflow: 'hidden' }}>commerce.base.com.vn/p/base…</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', alignItems: 'center' }}><Tx s={11} w={600} c="#98A2B3" st={{ letterSpacing: .6 }}>CUSTOMER DOCUMENT</Tx><span style={{ flex: 1 }} /><Pill c="#667085" bg="#F2F4F7">Not composed</Pill></span><div style={{ height: 150, borderRadius: 6, border: '1px solid #E7E9EF', background: '#FAFBFC', padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ width: '70%', height: 6, background: '#D0D5DD', borderRadius: 2 }} />{[55, 80, 60, 75].map((x, i) => <span key={i} style={{ width: `${x}%`, height: 4, background: '#E7E9EF', borderRadius: 2 }} />)}</div></div>
          </div>
          <div style={{ flex: 1, padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card st={{ position: 'relative', border: `${1 + 2 * paid}px solid ${paid > 0 ? `rgba(74,222,128,${paid})` : '#E7E9EF'}`, boxShadow: `0 0 ${48 * paid}px rgba(74,222,128,${0.35 * paid})` }}>
              <span style={{ position: 'absolute', left: 16, top: -20, zIndex: 2, padding: '5px 16px', borderRadius: 999, background: 'rgba(6,21,48,.92)', border: `1.5px solid ${GREEN}`, font: `500 20px ${AF}`, color: '#fff', whiteSpace: 'nowrap', ...pill }}>Đặt hàng → Hoá đơn → Thu tiền → Khớp chứng từ · 100%</span>
              <CardHead t="Collection progress" sub="collected in one payment · due on receipt" act={<Btn>⎙ Record payment</Btn>} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, padding: '14px 16px', borderRadius: 8, background: '#FAFBFC', border: '1px solid #F2F4F7' }}>
                {HOOK_COLS.map(([lab, sub, col], i) => { const p = ez(T, at + 0.5 + i * 0.45, 0.9); return (
                  <div key={lab} style={{ display: 'flex', flexDirection: 'column', gap: 4, opacity: 0.4 + 0.6 * ez(T, at + 0.3 + i * 0.45, 0.4) }}>
                    <Tx s={10.5} w={600} c="#98A2B3" st={{ letterSpacing: .6 }}>{lab}</Tx>
                    <Tx s={22} w={700} c="#101828" st={{ letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>{money(p)}</Tx>
                    <Tx s={11} c="#98A2B3">{sub}</Tx>
                    <span style={{ height: 4, borderRadius: 2, background: '#EAECF0', marginTop: 6, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${p * 100}%`, background: col, borderRadius: 2 }} /></span>
                    <Tx s={11} w={500} c={p >= 1 ? '#16A34A' : '#667085'}>{Math.round(p * 100)}% of order</Tx>
                  </div>); })}
              </div>
              <Tx s={12} c="#98A2B3" st={{ whiteSpace: 'normal', lineHeight: 1.4 }}>No installments anywhere on this order — the whole balance is collected in one payment: requesting mints a pay link; recording books money that has already arrived.</Tx>
            </Card>
            <Card>
              <CardHead t="Invoices" sub="1 document · 1 issued" act={<Btn>+ New invoice</Btn>} />
              <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr .7fr 1fr 1fr .7fr .8fr', gap: 12, alignItems: 'center' }}>
                {['INVOICE', 'ISSUED · DUE', 'AGE', 'AMOUNT', 'SETTLED', 'STILL OPEN', 'STATUS'].map(x => <Tx key={x} s={10} w={600} c="#98A2B3" st={{ letterSpacing: .5, textAlign: ['AMOUNT', 'SETTLED'].includes(x) ? 'right' : 'left' }}>{x}</Tx>)}
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={13} w={500} c="#101828">› Invoice for Đơn online Quốc Bảo - +84908215736</Tx><Tx s={11} c="#98A2B3" st={{ fontFamily: MONO }}>JJHD-2026-0004</Tx></span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Tx s={12} c="#344054">Sep 22, 2026</Tx><Tx s={11} c="#98A2B3">due Sep 22, 2026</Tx></span>
                <Tx s={12} c="#667085">settled</Tx>
                <Tx s={13} w={600} c="#101828" st={{ textAlign: 'right' }}>{money(total)}</Tx>
                <Tx s={13} w={600} c="#16A34A" st={{ textAlign: 'right' }}>{money(total)}</Tx>
                <Tx s={12} c="#16A34A">paid</Tx>
                <span><Pill c="#175CD3" bg="#EFF8FF">● Issued</Pill></span>
              </div>
            </Card>
            <Card>
              <CardHead t="Payments & refunds" sub="1 received · 1 closed" act={<span style={{ display: 'flex', gap: 8 }}><Btn>↺ Record refund</Btn><Btn>⎙ Record payment</Btn></span>} />
              <Tx s={10} w={600} c="#98A2B3" st={{ letterSpacing: .5 }}>▣ RECEIVED <Pill c="#667085" bg="#F2F4F7">1</Pill></Tx>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', borderRadius: 8, border: '1px solid #E7E9EF' }}>
                <span style={{ width: 28, height: 28, borderRadius: 6, background: '#ECFDF3', display: 'grid', placeItems: 'center', font: `600 12px ${UI}`, color: '#16A34A' }}>₫</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 130 }}><Tx s={13} w={600} c="#101828">JJPT-0006</Tx><Tx s={11} c="#98A2B3">Sep 22, 2026</Tx></span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}><Tx s={12} c="#344054" st={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Cash · COD Ahamove thu hộ – đối soát chiều 22/09 · Ngân hàng TMCP Kỹ thương Việt Nam – Chi nhánh Hoàng Qu…</Tx><Tx s={11} c="#98A2B3">booked against JJHD-2026-0004</Tx></span>
                <Tx s={14} w={700} c="#101828">{money(total)}</Tx>
                <Pill c="#027A48" bg="#ECFDF3">✓ Paid</Pill>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
function HookMock({ T, from, to, at }) {
  if (T < from || T > to + 0.5) return null;
  const w = 1599, h = 653, navW = 236;
  const op = Math.min(ez(T, from, 0.5), ez(to + 0.5, T, 0.45));
  return (
    <Chrome w={w} h={h} L={DEMO_X + (FRAME_W - w * 1.3) / 2} Tp={(FH - (h + 40) * 1.3) / 2} k={1.3} op={op} rp={ez(T, from, 0.8)}>
      <div style={{ position: 'absolute', inset: 0, background: '#F7F8FA' }} />
      <NavMock kind="order" k={1.02} h={h} />
      <div style={{ position: 'absolute', left: navW, top: 0, right: 0, height: h, display: 'flex', flexDirection: 'column' }}><CompletedBody T={T} at={at} /></div>
    </Chrome>
  );
}


// ---------- Prospector placeholder (asset chờ bổ sung) ----------
function Pending({ T, from, to, code, title, quote, who, tone = 'blue' }) {
  if (T < from || T > to + 0.5) return null;
  const w = FRAME_W, h = FRAME_H, col = TONE[tone];
  const op = Math.min(ez(T, from, 0.5), ez(to + 0.5, T, 0.45));
  return (
    <Chrome w={w} h={h} L={(FW - w) / 2} Tp={FRAME_TOP} k={1} op={op} rp={ez(T, from, 0.8)}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0F2A5C 0%,#0B1A3A 100%)' }} />
      <div style={{ position: 'absolute', inset: 36, borderRadius: 16, border: '2px dashed rgba(255,255,255,.22)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, padding: '0 120px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 16, font: `500 22px ${MONO}`, letterSpacing: 2, color: INK3, ...rise(T, from + 0.3, 0.5, 12) }}><img src="assets/app-icons/prospector.svg" alt="" style={{ width: 36, height: 36, borderRadius: 8 }} />PROSPECT · {code} · ẢNH CHỜ BỔ SUNG</span>
        <span style={{ font: `600 34px ${AF}`, color: INK2, ...rise(T, from + 0.5, 0.5, 14) }}>{title}</span>
        <span style={{ font: `700 56px/1.2 ${AF}`, color: '#fff', textWrap: 'pretty', maxWidth: 1300, ...rise(T, from + 0.7, 0.6, 18) }}>“{quote}”</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12, font: `500 26px ${AF}`, color: col, ...rise(T, from + 1.0, 0.5, 12) }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: col }} />{who}</span>
      </div>
    </Chrome>
  );
}

// ---------- Caption ----------
function Caption({ T, from, to, eyebrow, title, tone = 'blue', big, wide, top }) {
  if (T < from || T > to) return null;
  const col = TONE[tone];
  const box = wide ? { left: LX0, top: top ?? 250, width: 2700 } : { left: LX0, top: 230, height: FRAME_TOP + FRAME_H - 230, width: SPLIT_W, justifyContent: 'center' };
  return (
    <div style={{ position: 'absolute', ...box, display: 'flex', flexDirection: 'column', gap: wide ? 10 : 20, opacity: win(T, from, to), transform: `translateY(${(1 - ez(T, from, 0.5)) * 20}px)` }}>
      {eyebrow && <span style={{ display: 'flex', alignItems: 'flex-start', gap: 14, font: `500 ${wide ? 32 : 30}px/1.3 ${MONO}`, letterSpacing: 2, textTransform: 'uppercase', color: col }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: col, flex: 'none', marginTop: wide ? 15 : 12 }} />{eyebrow}</span>}
      <span style={{ font: `700 ${wide ? (big ? 104 : 74) : (big ? 110 : 78)}px/1.12 ${AF}`, color: '#fff', letterSpacing: -0.5, textWrap: 'pretty' }}>{title}</span>
      {!wide && <span style={{ width: 72, height: 3, background: col, borderRadius: 2, marginTop: 8 }} />}
    </div>
  );
}

// ---------- Timeline: chỉ hiện hai đầu; mốc nào đi tới mới ghi lại; mốc quan trọng tô xanh/đỏ ----------
// [x, giờ, nhãn, trên?, màu nhấn]
const MILES = [[100, '22:05', 'Tin nhắn', 0], [170, '22:07', 'Phân loại', 1], [250, '22:10', 'Còn 2 sản phẩm', 0], [340, '22:18', 'Khách xác nhận', 1], [440, '22:22', 'Đã xác nhận', 0], [600, '22:30', 'Giữ hàng', 1], [815, '08:45', 'Xuất kho · Ahamove', 0], [1082, '10:30', 'Giao đủ · chưa thu tiền', 1, 'red'], [1770, '15:00', 'Đối soát COD', 0], [1847, '15:30', 'Hoá đơn khớp thanh toán · Hoàn tất', 1, 'green'], [1923, '16:00', 'Tồn kho còn 1', 0, null, 'low']];
function Timeline({ posF, pos, show, tone }) {
  if (show <= 0) return null;
  // Timeline nằm ở cột trái, dưới heading. Mốc 0..2000 được giãn theo đoạn để buổi tối (nhiều mốc) rộng hơn.
  const KN = [[0, 0], [100, 60], [170, 230], [250, 400], [340, 570], [440, 740], [600, 910], [700, 1050], [815, 1250], [1082, 1450], [1770, 1640], [1847, 1860], [1923, 1970], [2000, 2000]];
  const M = v => { for (let i = 1; i < KN.length; i++) { const [a0, b0] = KN[i - 1], [a1, b1] = KN[i]; if (v <= a1) return b0 + (b1 - b0) * (v - a0) / (a1 - a0); } return 2000; };
  const W = 1320, x0 = LX0, y = 70, LY = 66, H = 150, LX = 190, LW = W - LX - 200, SC = LW / 2000, X = v => LX + M(v) * SC;
  const col = TONE[tone] || BLUE;
  const seg = (a, b) => <div style={{ position: 'absolute', left: X(a), width: X(b) - X(a), top: LY, height: 3, background: 'rgba(255,255,255,.16)', borderRadius: 2 }} />;
  return (
    <div style={{ position: 'absolute', left: x0, top: y, width: W, height: H, opacity: show, transform: `translateY(${(1 - show) * -16}px)` }}>
      {seg(0, 600)}{seg(700, 2000)}
      <div style={{ position: 'absolute', left: X(600), width: X(700) - X(600), top: LY + 1.5, borderTop: '3px dotted rgba(255,255,255,.28)' }} />
      <span style={{ position: 'absolute', left: X(650), top: LY + 22, transform: 'translateX(-50%)', font: `500 18px ${MONO}`, letterSpacing: 1.5, color: INK3, whiteSpace: 'nowrap', opacity: posF > 620 ? 1 : .5 }}>QUA ĐÊM</span>
      <span style={{ position: 'absolute', left: X(0) - 2, top: LY - 2, width: 7, height: 7, borderRadius: '50%', background: INK3 }} />
      <span style={{ position: 'absolute', left: X(2000) - 5, top: LY - 2, width: 7, height: 7, borderRadius: '50%', background: INK3 }} />
      <span style={{ position: 'absolute', right: W - X(0) + 22, top: LY - 12, font: `500 20px ${MONO}`, letterSpacing: 1.5, color: INK3, whiteSpace: 'nowrap' }}>22:00 · 21/09</span>
      <span style={{ position: 'absolute', left: X(2000) + 22, top: LY - 12, font: `500 20px ${MONO}`, letterSpacing: 1.5, color: INK3, whiteSpace: 'nowrap' }}>16:30 · 22/09</span>
      <div style={{ position: 'absolute', left: X(0), top: LY, height: 3, width: X(Math.min(posF, 600)) - X(0), background: `linear-gradient(90deg, ${BLUE}, ${posF > 600 ? BLUE : col})`, borderRadius: 2, boxShadow: `0 0 18px ${col}66` }} />
      {posF > 700 && <div style={{ position: 'absolute', left: X(700), top: LY, height: 3, width: X(posF) - X(700), background: `linear-gradient(90deg, ${BLUE}, ${col})`, borderRadius: 2, boxShadow: `0 0 18px ${col}66` }} />}
      {MILES.map(([px, time, label, up, hi, al]) => { const on = px <= posF + 0.5; if (!on) return null; const cur = px === pos, above = up === 1; const c = hi ? TONE[hi] : cur ? col : BLUE; const big = cur || !!hi; const tx = al === 'r' ? 'translateX(-100%)' : 'translateX(-50%)'; return (
        <div key={px} style={{ position: 'absolute', left: X(px), top: 0, width: 0, height: H }}>
          <span style={{ position: 'absolute', left: big ? -11 : -7, top: LY + 1.5 - (big ? 11 : 7), width: big ? 22 : 14, height: big ? 22 : 14, borderRadius: '50%', background: c, boxShadow: cur ? `0 0 0 6px ${c}33, 0 0 24px ${c}` : hi ? `0 0 0 4px ${c}22` : 'none', transition: 'all .3s' }} />
          <div style={{ position: 'absolute', left: 0, transform: tx, ...(above ? { bottom: H - LY + 18 } : { top: LY + (al === 'low' ? 74 : 22) }), display: 'flex', flexDirection: 'column', alignItems: al === 'r' ? 'flex-end' : 'center', textAlign: 'center', width: big ? 210 : 160, opacity: cur ? 1 : hi ? .95 : .6, transition: 'opacity .3s' }}>
            <span style={{ font: `500 20px ${MONO}`, letterSpacing: 1.5, color: c }}>{time}</span>
            <span style={{ font: `${big ? 600 : 400} ${big ? 25 : 20}px/1.15 ${AF}`, color: big ? '#fff' : INK2, textWrap: 'balance' }}>{label}</span>
          </div>
        </div>); })}
    </div>
  );
}

// ---------- Service Card: cột trái, cấu trúc một service (5 lớp, mỗi lớp một dòng) ----------
const LAYERS = ['Tạo Service', 'Input / Output', 'Thuộc tính', 'AI Agent', 'Tích hợp'];
const CARD = { app: 'commerce', name: 'Order Service', sub: 'Đơn hàng bán lẻ Jasmine', rows: ['Bán lẻ · Sỉ & CTV · Đơn hàng bán', 'Đơn nháp → phiếu xuất · phiếu thu · hoá đơn', 'Kênh · độ dài dây · gói quà · ngày nhận', 'Copilot đọc tồn kho, đề xuất bổ sung', 'Inventory giữ 48h · Payment · Invoice'] };
const CARD_P = { app: 'prospector', name: 'Prospect Service', sub: 'Base AI – Jasmine Support', rows: ['Fanpage · Zalo · Live chat', 'Hội thoại → đơn nháp đúng SKU', 'Phân loại · Tên · SĐT · Nhu cầu · Số lượng', 'Điều phối → Flow → Sales Specialist', 'Catalogue · Kho Jasmine – 200 3/2'] };
function ServiceCard({ T, at, to, emph, tone = 'blue', card }) {
  if (T < at || T > to) return null;
  const c = card || CARD, col = TONE[tone];
  return (
    <div style={{ position: 'absolute', left: LX0, top: 300, width: 1000, display: 'flex', flexDirection: 'column', gap: 26, opacity: Math.min(ez(T, at, 0.5), ez(to, T, 0.4)), transform: `translateY(${(1 - ez(T, at, 0.5)) * 20}px)` }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 14, font: `500 26px ${MONO}`, letterSpacing: 2, textTransform: 'uppercase', color: col }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: col }} />Service card</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src={`assets/app-icons/${c.app}.svg`} alt="" style={{ width: 62, height: 62, borderRadius: 12 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ font: `700 60px/1.05 ${AF}`, color: '#fff' }}>{c.name}</span><span style={{ font: `400 29px ${AF}`, color: INK2 }}>{c.sub}</span></div>
      </div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 34, marginTop: 8 }}>
        <span style={{ position: 'absolute', left: 5, top: 20, bottom: 20, width: 2, background: 'rgba(255,255,255,.14)' }} />
        {c.rows.map((r, i) => { const t0 = at + 0.4 + i * 0.14; const hi = emph === i && T >= t0 + 2.2; return (
          <div key={i} style={{ position: 'relative', display: 'grid', gridTemplateColumns: '48px 1fr', columnGap: 12, alignItems: 'center', padding: '14px 19px', borderRadius: 14, background: hi ? `${col}1F` : 'rgba(255,255,255,.06)', border: `1px solid ${hi ? col : 'rgba(255,255,255,.14)'}`, boxShadow: hi ? `0 0 38px ${col}44` : 'none', transition: 'background .3s, border-color .3s, box-shadow .3s', ...rise(T, t0, 0.5, 14) }}>
            <span style={{ position: 'absolute', left: -34, top: '50%', width: 12, height: 12, borderRadius: '50%', background: hi ? col : BLUE, transform: 'translateY(-50%)', boxShadow: hi ? `0 0 0 6px ${col}33` : 'none' }} />
            <span style={{ font: `500 26px ${MONO}`, color: col, alignSelf: 'start', marginTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}><span style={{ font: `600 32px/1.15 ${AF}`, color: '#fff' }}>{LAYERS[i]}</span><span style={{ font: `400 26px/1.3 ${AF}`, color: INK2, textWrap: 'pretty' }}>{r}</span></span>
          </div>); })}
      </div>
    </div>
  );
}
// ---------- Service Map (5 nodes + 2 vòng khép kín) ----------
const NODES = [['prospector', 'Prospect', 'Fanpage Jasmine'], ['commerce', 'Order', 'Đơn hàng bán lẻ Jasmine'], ['inventory', 'Inventory', 'Kho Jasmine – 200 3/2'], ['commerce', 'Payment', 'Thu tiền khách hàng Jasmine'], ['invoice', 'Invoice', 'Hoá đơn bán hàng Jasmine']];
const EDGES = ['đơn hàng từ hội thoại', 'giữ hàng · xuất kho', 'COD đã đối soát', 'hoá đơn khớp thanh toán'];
const PLATFORM = ['Service registry', 'Custom fields', 'Reservation 48h', 'Payment ledger', 'Delivery ledger', 'E-invoice', 'Copilot mỗi service'];
function ServiceMap({ T, at, full, out }) {
  if (T < at) return null;
  const NW = 525, NH = full ? 160 : 240, GAP = 225, X0 = (FW - 5 * NW - 4 * GAP) / 2, Y = full ? 400 : 480, cx = i => X0 + i * (NW + GAP);
  const SY = 590, svcP = full ? ez(T, at + 1.0, 0.6) : 0;
  const W0 = at + 2.0, WS = 1.1, NE = EDGES.length;
  const step = full ? Math.floor((T - W0) / WS) : -1; // cạnh đang focus (0..NE-1)
  const walking = full && T >= W0 && step < NE, done = full && step >= NE;
  const appDim = full ? 1 - 0.55 * ez(T, at + 1.4, 0.6) : 1;
  const op = out ? ez(out, T, 0.5) : 1;
  const loopP = 0, platP = full ? ez(T, at + 3.4, 0.8) : 0, tagP = full ? ez(T, at + 4.6, 0.6) : 0;
  const mid = i => cx(i) + NW / 2, yb = Y + NH, yl = full ? Y - 64 : yb + 140, yt = full ? Y - 64 : Y - 84;
  const loop = full ? `M ${mid(1)} ${Y} L ${mid(1)} ${yl} L ${mid(0)} ${yl} L ${mid(0)} ${Y}` : `M ${mid(1)} ${yb} L ${mid(1)} ${yl} L ${mid(0)} ${yl} L ${mid(0)} ${yb}`;
  const loop2 = `M ${mid(4)} ${Y} L ${mid(4)} ${yt} L ${mid(2)} ${yt} L ${mid(2)} ${Y}`;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <svg style={{ position: 'absolute', inset: 0, opacity: appDim }} width={FW} height={FH}>
        {EDGES.map((e, i) => { const t0 = full ? at + 0.2 + i * 0.12 : at + 0.9 + i * 0.7, p = ez(T, t0, 0.6); if (p <= 0) return null; const x1 = cx(i) + NW, x2 = cx(i + 1), y = Y + NH / 2, xm = (x1 + x2) / 2; return (
          <g key={i}><line x1={x1} y1={y} x2={x1 + (x2 - x1) * p} y2={y} stroke="rgba(255,255,255,.35)" strokeWidth="3" />{p >= 1 && <polygon points={`${x2 - 14},${y - 9} ${x2},${y} ${x2 - 14},${y + 9}`} fill={BLUE} />}
            <g opacity={full ? 0 : ez(T, t0 + 0.4, 0.4)}><rect x={xm - 130} y={Y + NH + (full ? 14 : 24)} width="260" height="46" rx="23" fill="rgba(6,21,48,.85)" stroke="rgba(255,255,255,.30)" /><text x={xm} y={Y + NH + (full ? 45 : 55)} textAnchor="middle" fill="#fff" style={{ font: `500 22px ${AF}` }}>{e}</text></g></g>); })}
        {loopP > 0 && <g>
          <path d={loop} fill="none" stroke={AMBER} strokeWidth="3.5" pathLength="1" style={{ strokeDasharray: `${loopP} 1` }} />
          {loopP >= 1 && (full ? <polygon points={`${mid(0) - 9},${Y - 14} ${mid(0)},${Y} ${mid(0) + 9},${Y - 14}`} fill={AMBER} /> : <polygon points={`${mid(0) - 9},${yb + 14} ${mid(0)},${yb} ${mid(0) + 9},${yb + 14}`} fill={AMBER} />)}
          <g opacity={ez(T, at + 1.9, 0.4)}><rect x={(mid(0) + mid(1)) / 2 - 160} y={yl - 20} width="320" height="40" rx="20" fill="rgba(6,21,48,.9)" stroke={AMBER} /><text x={(mid(0) + mid(1)) / 2} y={yl + 7} textAnchor="middle" fill={AMBER} style={{ font: `600 24px ${AF}` }}>tiến độ giao hàng → thông báo cho khách</text></g>
          <path d={loop2} fill="none" stroke={AMBER} strokeWidth="3.5" pathLength="1" style={{ strokeDasharray: `${ez(T, at + 2.4, 1.4)} 1` }} />
          {ez(T, at + 2.4, 1.4) >= 1 && <polygon points={`${mid(2) - 9},${Y - 14} ${mid(2)},${Y} ${mid(2) + 9},${Y - 14}`} fill={AMBER} />}
          <g opacity={ez(T, at + 3.2, 0.4)}><rect x={(mid(2) + mid(4)) / 2 - 170} y={yt - 20} width="340" height="40" rx="20" fill="rgba(6,21,48,.9)" stroke={AMBER} /><text x={(mid(2) + mid(4)) / 2} y={yt + 7} textAnchor="middle" fill={AMBER} style={{ font: `600 24px ${AF}` }}>tồn kho tự cập nhật → Copilot đề xuất bổ sung</text></g>
        </g>}
      </svg>
      {NODES.map(([ic, n, s], i) => { const t0 = full ? at + 0.1 + i * 0.08 : at + 0.5 + i * 0.7; return (
        full ? <div key={n} style={{ position: 'absolute', left: cx(i), top: Y, width: NW, height: NH, opacity: appDim, borderRadius: 24, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 20px 50px rgba(0,0,0,.35)', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 18, ...rise(T, t0, 0.5, 24) }}>
          <img src={`assets/app-icons/${ic}.svg`} alt="" style={{ width: 62, height: 62, borderRadius: 12, flex: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}><span style={{ font: `700 41px/1.1 ${AF}`, color: '#fff' }}>{n}</span><span style={{ font: `400 24px/1.25 ${AF}`, color: INK2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</span></div>
        </div> :
        <div key={n} style={{ position: 'absolute', left: cx(i), top: Y, width: NW, height: NH, borderRadius: 24, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 20px 50px rgba(0,0,0,.35)', padding: '26px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, ...rise(T, t0, 0.5, 24) }}>
          <img src={`assets/app-icons/${ic}.svg`} alt="" style={{ width: 66, height: 66, borderRadius: 12 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ font: `700 46px/1.1 ${AF}`, color: '#fff' }}>{n}</span><span style={{ font: `400 26px/1.25 ${AF}`, color: INK2 }}>{s}</span></div>
        </div>); })}
      {full && <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width={FW} height={FH}>
        {NODES.map((_, i) => { const p = ez(T, at + 1.0 + i * 0.1, 0.5); return <line key={i} x1={mid(i)} y1={Y + NH} x2={mid(i)} y2={Y + NH + (SY - Y - NH) * p} stroke="rgba(255,255,255,.22)" strokeWidth="2" strokeDasharray="4 8" opacity={appDim} />; })}
        {EDGES.map((_, i) => { const p = ez(T, W0 + i * WS, 0.6); if (p <= 0) return null; const x1 = cx(i) + NW + 6, x2 = cx(i + 1) - 6, y = SY + 190, cur = walking && step === i; return <g key={i}>
          <line x1={x1} y1={y} x2={x1 + (x2 - x1) * p} y2={y} stroke={cur ? '#fff' : BLUE} strokeWidth={cur ? 5 : 4} />
          {p >= 1 && <polygon points={`${x2 - 16},${y - 11} ${x2},${y} ${x2 - 16},${y + 11}`} fill={cur ? '#fff' : BLUE} />}
          {done && <circle r="7" fill="#fff" cy={y} cx={x1 + (x2 - x1) * (((T - W0 - NE * WS) * 0.6 + i * 0.25) % 1)} opacity=".9" />}
        </g>; })}
      </svg>}
      {full && NODES.map(([ic, n], i) => { const t0 = at + 1.1 + i * 0.1;
        const lit = done || (walking && (step === i || step + 1 === i)) || (!walking && !done);
        const on = done || (walking && step >= i - 1);
        return (
        <div key={'s' + n} style={{ position: 'absolute', left: cx(i), top: SY, width: NW, borderRadius: 24, background: on ? 'rgba(169,214,255,.10)' : 'rgba(255,255,255,.05)', border: `1.5px solid ${lit && on ? BLUE : 'rgba(255,255,255,.18)'}`, boxShadow: lit && on ? '0 20px 50px rgba(0,0,0,.35), 0 0 48px rgba(169,214,255,.30)' : '0 20px 50px rgba(0,0,0,.35)', opacity: lit ? 1 : 0.45, transition: 'opacity .3s, border-color .3s, box-shadow .3s, background .3s', padding: '22px 26px 24px', display: 'flex', flexDirection: 'column', gap: 14, ...rise(T, t0, 0.5, 20) }}>
          <span style={{ font: `700 43px/1.1 ${AF}`, color: '#fff' }}>{n} Service</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{LAYERS.map((l, j) => <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 14px', borderRadius: 12, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', ...rise(T, t0 + 0.2 + j * 0.06, 0.4, 10) }}><span style={{ font: `500 22px ${MONO}`, color: BLUE }}>{String(j + 1).padStart(2, '0')}</span><span style={{ font: `500 26px ${AF}`, color: INK2 }}>{l}</span></div>)}</div>
        </div>); })}
      {full && T >= W0 && <div style={{ position: 'absolute', left: 0, right: 0, top: SY + 470, display: 'flex', justifyContent: 'center' }}>
        {EDGES.map((e, i) => { const show = walking && step === i; return <div key={i} style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 18, padding: '14px 32px', borderRadius: 999, background: 'rgba(6,17,48,.75)', border: '1px solid rgba(169,214,255,.45)', opacity: show ? 1 : 0, transform: `translateY(${show ? 0 : 10}px)`, transition: 'opacity .3s, transform .3s', whiteSpace: 'nowrap' }}>
          <span style={{ font: `700 36px ${AF}`, color: '#fff' }}>{NODES[i][1]}</span><span style={{ font: `500 36px ${AF}`, color: BLUE }}>→</span><span style={{ font: `700 36px ${AF}`, color: '#fff' }}>{NODES[i + 1][1]}</span>
          <span style={{ width: 2, height: 28, background: 'rgba(255,255,255,.25)' }} /><span style={{ font: `400 34px ${AF}`, color: INK2 }}>{e}</span></div>; })}
        <div style={{ font: `600 36px ${AF}`, color: '#fff', opacity: done ? 1 : 0, transition: 'opacity .4s' }}>Output của service trước là input của service sau</div>
      </div>}
      {false && <div style={{ position: 'absolute', left: 120, right: 120, top: 910, opacity: platP, transform: `translateY(${(1 - platP) * 20}px)` }}>
        <div style={{ font: `500 29px ${MONO}`, letterSpacing: 2, color: INK3, marginBottom: 18 }}>TẦNG NỀN TẢNG · CÁC MÔ HÌNH THỐNG NHẤT</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{PLATFORM.map((p, i) => <span key={p} style={{ padding: '12px 26px', borderRadius: 999, border: '1px solid rgba(255,255,255,.30)', background: 'rgba(6,21,48,.5)', font: `500 31px ${AF}`, color: INK2, whiteSpace: 'nowrap', ...rise(T, at + 3.5 + i * 0.08, 0.4, 12) }}>{p}</span>)}</div>
      </div>}
      {false && <div style={{ position: 'absolute', left: 120, right: 120, top: 1100, whiteSpace: 'nowrap', font: `700 62px/1.15 ${AF}`, color: '#fff', opacity: tagP, transform: `translateY(${(1 - tagP) * 20}px)` }}>Năm service, một dòng dữ liệu. <span style={{ color: AMBER }}>Không nhập liệu lại.</span></div>}
    </div>
  );
}

// ---------- Piece ----------
function Piece({ tweaks }) {
  const { T, CUES } = useComposition();
  const c = (n) => CUES[n] ?? 0;
  const C = { hook: c('Móc câu · Completed'), rew: c('Tua ngược 17 giờ'), map1: CUES['Service Map · mở'] ?? c('22:05 · Tin nhắn khách hàng'), msg: c('22:05 · Tin nhắn khách hàng'), agent: c('Agent phân loại · bàn giao'), stock: c('Kho còn 2 · Critical'), quote: c('Báo giá · tồn kho thật'), pcard: c('Service card · Prospector'), confirm: c('Tóm tắt · khách xác nhận'), draftEv: c('Đơn nháp · dấu vết xác nhận'), draft: c('Cửa hàng xác nhận · bổ sung'), conf: c('22:22 · Confirmed'), hold: c('Kiểm tồn · giữ hàng'), card: c('Service card · Order'), ship: c('08:45 · Xuất kho'), destock: c('Phiếu xuất trừ 1'), notify: c('Báo tiến độ cho khách'), deliv: c('Delivered · lịch sử'), gap: c('Giao đủ · thu 0đ'), cod: c('Đối soát COD'), paid: c('Phiếu thu · Paid in full'), inv: c('Tạo hoá đơn từ đơn'), einv: c('Hoá đơn điện tử khớp tiền'), full: c('Đủ 4 cột · Completed'), copilot: c('Kho còn 1 · Copilot'), map2: c('Service Map · đầy đủ'), end: c('Câu chốt') };
  const S = 'assets/shots/cod/';
  const sp = (at, r, l) => [at, r, l];
  const P = window.ProspectorMocks || {};
  const FULL = { iw: 1568, ih: 772 };
  const M = window.CODMocks || {};
  const mocks = M.StockScreen && P.ChatScreen ? [
    [P.ChatScreen, { from: C.msg, to: C.agent, at: C.msg + 0.5, part: 'p1' }],
    [P.InboxScreen, { from: C.agent, to: C.stock, at: C.agent + 0.6, part: 'p4' }],
    [M.StockScreen, { from: C.stock, to: C.quote, at: C.stock + 0.6 }],
    [P.AgentConfigScreen, { from: C.quote, to: C.pcard, at: C.quote + 0.4, split: 0 }],
    [P.ChatScreen, { from: C.pcard, to: C.confirm, at: C.pcard + 0.4, part: 'p2' }],
    [P.ChatScreen, { from: C.confirm, to: C.draftEv, at: C.confirm + 0.4, part: 'p3' }],
    [P.InboxScreen, { from: C.draftEv, to: C.draft, at: C.draftEv + 0.6, part: 'p6' }],
    [M.OrderOverview, { from: C.draft, to: C.conf, at: C.draft + 0.5 }],
    [M.OrderOverview, { from: C.conf, to: C.hold, at: C.conf + 0.5, confirmed: true }],
    [M.DeliveryScreen, { from: C.hold, to: C.card, at: C.hold + 0.5, reserveAt: C.hold + 3.6 }],
    [M.SettingsScreen, { from: C.card, to: C.ship, at: C.card + 0.3, tab: 'Fulfillment' }],
    [M.DispatchScreen, { from: C.ship, to: C.destock, at: C.ship + 0.5 }],
    [M.StockEffectScreen, { from: C.destock, to: C.notify, at: C.destock + 0.4 }],
    [P.ChatScreen, { from: C.notify, to: C.deliv, at: C.notify + 0.3, part: 'notify' }],
    [M.DeliveryScreen, { from: C.deliv, to: C.deliv + 3.5, at: C.deliv + 0.4, delivered: true }],
    [M.HistoryScreen, { from: C.deliv + 3.5, to: C.gap, at: C.deliv + 3.9 }],
    [M.CollectionScreen, { from: C.gap, to: C.cod, at: C.gap + 0.5 }],
    [M.RecordPaymentScreen, { from: C.cod, to: C.paid, at: C.cod + 0.8 }],
    [M.CollectionScreen, { from: C.paid, to: C.inv, at: C.paid + 0.4, paid: true }],
    [M.NewInvoiceScreen, { from: C.inv, to: C.einv, at: C.inv + 0.4 }],
    [M.InvoiceDocScreen, { from: C.einv, to: C.full, at: C.einv + 0.4 }],
    [M.CompletedScreen, { from: C.full, to: C.copilot, at: C.full + 0.6 }],
  ] : [];
  const caps = [
    { from: C.map1, to: C.msg, eyebrow: '5 service · một dòng dữ liệu', title: 'Từ tin nhắn đến hoá đơn điện tử, không nhập liệu lại', wide: true },
    { from: C.msg, to: C.agent, eyebrow: 'Prospect', title: '22:05 · Khách hàng nhắn tin sau giờ đóng cửa. AI trả lời ngay' },
    { from: C.agent, to: C.stock, eyebrow: 'Prospect · Multi-Agent', title: 'Hiểu nhu cầu từ câu đầu, cập nhật hồ sơ, bàn giao đúng agent' },
    { from: C.stock, to: C.quote, eyebrow: 'Inventory', title: 'Tồn kho thực tế trước khi tạo đơn: còn 2 sản phẩm' },
    { from: C.quote, to: C.pcard, eyebrow: 'Prospect · Cấu hình AI Agent', title: 'Doanh nghiệp quyết định AI được đọc kho nào và có được nói số tồn chính xác' },
    { from: C.pcard, to: C.pcard + 6.9, eyebrow: 'Prospect · Sales Specialist', title: 'Giá và tồn kho đọc từ hệ thống thật, không theo ước đoán' },
    { from: C.confirm, to: C.draftEv, eyebrow: 'Prospect', title: 'AI tóm tắt đơn, khách hàng xác nhận. AI không tự chốt đơn' },
    { from: C.draftEv, to: C.draft, eyebrow: 'Prospect → Order', title: 'Hội thoại thành đơn nháp đúng SKU, có dấu vết ai xác nhận' },
    { from: C.draft, to: C.conf, eyebrow: 'Order Service', title: 'Cửa hàng xác nhận và bổ sung thông tin giao hàng' },
    { from: C.conf, to: C.hold, eyebrow: 'Order Service', title: '22:22 · 17 phút từ tin nhắn đến đơn hàng đã xác nhận. Chưa thu tiền' },
    { from: C.hold, to: C.card, eyebrow: 'Order → Inventory', title: 'Kiểm tra tồn kho và giữ hàng ngay trong đơn' },
    { from: C.ship, to: C.destock, eyebrow: 'Inventory', title: '08:45 · Xuất kho, giao qua Ahamove thu hộ' },
    { from: C.destock, to: C.notify, eyebrow: 'Inventory', title: 'Phiếu xuất kho trừ 1 sản phẩm. Đơn hàng và kho là một nghiệp vụ' },
    { from: C.notify, to: C.deliv, eyebrow: 'Order → Prospect', title: 'Khách hàng nhận thông báo giờ giao và số tiền cần thanh toán' },
    { from: C.deliv, to: C.gap, eyebrow: 'Order Service · Fulfillment', title: 'Giao đủ: có đơn vị vận chuyển, mã vận đơn, người nhận', tone: 'green' },
    { from: C.gap, to: C.cod, eyebrow: 'Order Service · Billing', title: 'Giao đủ 100%. Đã thu: 0đ. Đơn hàng chưa hoàn tất', tone: 'red' },
    { from: C.cod, to: C.paid, eyebrow: 'Payment Service', title: 'Chiều 22/09 · Kế toán ghi nhận tiền COD sau đối soát' },
    { from: C.paid, to: C.inv, eyebrow: 'Payment Service', title: 'Phiếu thu JJPT-0006 · Đã thanh toán đủ', tone: 'green' },
    { from: C.inv, to: C.einv, eyebrow: 'Invoice Service', title: 'Hoá đơn tạo từ đơn hàng, tiền đã thu tự động đối trừ' },
    { from: C.einv, to: C.full, eyebrow: 'Invoice Service', title: 'Hoá đơn điện tử đã phát hành, đã khớp thanh toán' },
    { from: C.full, to: C.copilot, eyebrow: 'Đủ hàng · đủ tiền · đủ chứng từ', title: 'Hoàn tất', tone: 'green', big: true },
    { from: C.map2, to: C.end, eyebrow: 'Service Map', title: 'Năm service nối tiếp nhau, một dòng dữ liệu', wide: true, top: 90 },
  ];
  const posMap = [[C.msg, 100], [C.agent, 170], [C.quote, 250], [C.confirm, 340], [C.conf, 440], [C.hold, 600], [C.ship, 815], [C.deliv, 1082], [C.cod, 1770], [C.full, 1847]];
  let pos = 0, posF = 0, prevP = 0; posMap.forEach(([t, p]) => { if (T >= t) { pos = p; posF = lerp(prevP, p, ez(T, t, 1.1)); prevP = p; } });
  const showTL = Math.min(ez(T, C.msg + 0.3, 0.7), ez(C.map2, T, 0.5));
  const tone = (T >= C.deliv && T < C.gap) || (T >= C.paid && T < C.inv) || (T >= C.full && T < C.copilot) ? 'green' : T >= C.gap && T < C.cod ? 'red' : T >= C.copilot && T < C.map2 ? 'amber' : 'blue';
  const rewP = T >= C.rew && T < C.map1 ? Easing.easeInOutCubic(clamp((T - C.rew - 0.3) / 3.6, 0, 1)) : 0;
  const rewMin = Math.round(lerp(1020, 5, rewP)); const hh = (22 + Math.floor(rewMin / 60)) % 24, mm = rewMin % 60;
  const inHook = T < C.map1;
  return (
    <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: AF, color: '#fff', background: '#061530' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'linear-gradient(135deg,#123A78 0%,#0A1F44 55%,#061530 100%)' }}>
        <div style={{ position: 'absolute', left: `${20 + Math.sin(T / 9) * 12}%`, top: `${10 + Math.cos(T / 11) * 10}%`, width: 1600, height: 1000, transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse, rgba(102,180,240,.16) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.08) 1.5px, transparent 1.5px)', backgroundSize: '48px 48px', opacity: .5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(74,222,128,.20) 0%, transparent 60%)', opacity: tone === 'green' || inHook ? 1 : 0, transition: 'opacity .8s' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(240,162,59,.18) 0%, transparent 60%)', opacity: tone === 'amber' ? 1 : 0, transition: 'opacity .8s' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(248,113,113,.16) 0%, transparent 60%)', opacity: tone === 'red' ? 1 : 0, transition: 'opacity .8s' }} />

        <div style={{ position: 'absolute', inset: 0, filter: rewP > 0 ? `blur(${rewP * 18}px)` : 'none', opacity: inHook ? 1 - rewP * 0.75 : 1 }}>
          {mocks.map(([Cmp, p], i) => <Cmp key={i} T={T} {...p} />)}
          <HookMock T={T} from={C.hook} to={C.rew + 1.2} at={C.hook + 1.4} />
        </div>
        {T < C.map1 && <div style={{ position: 'absolute', left: LX0, top: 0, height: FH, width: 1300, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 40, opacity: ez(C.rew + 0.6, T, 0.5) }}>
          <span style={{ font: `500 31px ${MONO}`, letterSpacing: 3, color: INK3, marginBottom: 32, ...rise(T, C.hook + 0.6, 0.7, 24) }}>BÁN HÀNG CHU KỲ NGẮN · COD</span>
          <span style={{ font: `800 200px/0.95 ${AF}`, color: '#fff', letterSpacing: -5, ...rise(T, C.hook + 1.0, 0.7, 40) }}>17 giờ.</span>
          <span style={{ font: `800 200px/0.95 ${AF}`, color: GREEN, letterSpacing: -5, ...rise(T, C.hook + 1.6, 0.7, 40) }}>4,9 triệu.</span>
          <span style={{ width: 96, height: 3, background: GREEN, borderRadius: 2, margin: '40px 0 24px', ...rise(T, C.hook + 2.3, 0.6, 12) }} />
          <span style={{ font: `400 36px/1.35 ${AF}`, color: INK2, maxWidth: 1250, ...rise(T, C.hook + 2.5, 0.6, 16) }}>Trần Quốc Bảo × Jasmine Jewelry<br />Một dây chuyền Emerald Halo · nhắn lúc 22:05 ngày 21/09, đơn xác nhận 22:22, tiền về chiều 22/09</span>
        </div>}
        {T >= C.rew && T < C.map1 && <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, paddingBottom: 160, opacity: Math.min(ez(T, C.rew + 0.2, 0.5), ez(C.map1, T, 0.5)) }}>
          <span style={{ font: `500 28px ${MONO}`, letterSpacing: 3, color: INK3 }}>{rewMin > 720 ? 'CHIỀU 22/09' : rewMin > 120 ? 'SÁNG 22/09' : 'TỐI 21/09'}</span>
          <span style={{ font: `500 300px/1 ${MONO}`, color: '#fff', letterSpacing: -8, fontVariantNumeric: 'tabular-nums' }}>{String(hh).padStart(2, '0')}:{String(mm).padStart(2, '0')}</span>
          <span style={{ font: `700 62px ${AF}`, color: '#fff', opacity: ez(T, C.rew + 3.4, 0.5) }}>Tua lại từ tin nhắn đầu tiên</span>
        </div>}

        <ServiceMap T={T} at={C.map1} out={C.msg} />
        <ServiceMap T={T} at={C.map2} full out={C.end} />
        <ServiceCard T={T} at={C.card + 0.4} to={C.ship} emph={4} />
        <ServiceCard T={T} at={C.pcard + 6.9} to={C.confirm} emph={3} card={CARD_P} />

        {tweaks.showCaptions !== false && caps.map((g, i) => <Caption key={i} T={T} {...g} />)}
        <Timeline posF={posF} pos={pos} show={showTL} tone={tone} />

        {T >= C.end && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 160, background: '#061530', opacity: ez(T, C.end, 0.8) }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'center', maxWidth: 3300 }}>
            <span style={{ font: `800 140px/1.1 ${AF}`, color: '#fff', letterSpacing: -2, ...rise(T, C.end + 0.6, 0.7, 24) }}>Giao hàng xong chưa phải là hoàn tất.</span>
            <span style={{ font: `800 140px/1.1 ${AF}`, color: GREEN, letterSpacing: -2, textWrap: 'balance', ...rise(T, C.end + 1.8, 0.7, 24) }}>Thu đủ tiền, khớp hoá đơn, đơn hàng mới hoàn tất.</span>
          </div>
        </div>}
      </div>
    </div>
  );
}
function CycleNganCodApp() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, showCaptions: true });
  return (
    <React.Fragment>
      <CompositionStage width={3840} height={1280} bg="#061530" scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}><Piece tweaks={t} /></CompositionStage>
      <TweaksPanel><TweakSection label="Nội dung" /><TweakToggle label="Caption trên màn hình" value={t.showCaptions !== false} onChange={(v) => setTweak('showCaptions', v)} /><TweakSection label="Trình chỉnh sửa" /><TweakToggle label="Motion editor" value={t.motionEditor !== false} onChange={(v) => setTweak('motionEditor', v)} /></TweaksPanel>
    </React.Fragment>
  );
}
window.CycleNganCodApp = CycleNganCodApp;
window.CycleNganCodPiece = Piece;
window.CODBase = { Chrome, NavMock, NAVS, ez, io, rise, lerp, clamp, fmt, AF, MONO, UI, GREEN, RED, AMBER, BLUE, INK2, FW, FRAME_W, FRAME_H, FRAME_TOP, DEMO_X, SPLIT_W, SPLIT_TOP, Tx, Pill, Btn, Card, CardHead, HOOK_COLS, CompletedBody };
