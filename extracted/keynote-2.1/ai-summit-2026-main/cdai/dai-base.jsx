// Cycle Dài · primitives dùng chung cho mockup DOM (nét trên LED). Khung demo 1720×880 tại x=720, nội dung zoom 1.2.
(function () {
  const { Easing, clamp } = window;
  const FW = 2560, FH = 1280, DEMO_X = 720, FRAME_TOP = 220, FRAME_W = 1720, FRAME_H = 880, Z = 1.2;
  const IW = Math.round(FRAME_W / Z), IH = Math.round(FRAME_H / Z);
  const AF = "'Afacad', Inter, system-ui, sans-serif", MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace", UI = 'Inter, system-ui, sans-serif';
  const BLUE = '#66B4F0', AMBER = '#F0A23B', GREEN = '#4ADE80', RED = '#F87171', INK2 = '#D5DEEA', INK3 = '#9FB4CF';
  const PRI = '#1570EF', OK = '#16A34A', OKD = '#027A48';
  const lerp = (a, b, p) => a + (b - a) * p;
  const ez = (T, s, d = 0.6) => Easing.easeOutCubic(clamp((T - s) / d, 0, 1));
  const io = (T, s, d = 0.9) => Easing.easeInOutCubic(clamp((T - s) / d, 0, 1));
  const rise = (T, s, d = 0.5, px = 24) => { const e = ez(T, s, d); return { opacity: e, transform: `translateY(${(1 - e) * px}px)` }; };
  const typed = (s, T, at, cps = 40) => T < at ? '' : s.slice(0, Math.floor((T - at) * cps));
  const vnd = (n) => '₫' + Math.round(n).toLocaleString('en-US');
  const dots = (n) => Math.round(n).toLocaleString('de-DE');
  const TONE = { blue: BLUE, red: RED, green: GREEN, amber: AMBER };

  const Tx = ({ s = 13, w = 400, c = '#344054', st, children }) => <span style={{ font: `${w} ${s}px/1.35 ${UI}`, color: c, whiteSpace: 'nowrap', ...st }}>{children}</span>;
  const P = ({ s = 13, w = 400, c = '#344054', st, children }) => <span style={{ font: `${w} ${s}px/1.5 ${UI}`, color: c, whiteSpace: 'normal', textWrap: 'pretty', ...st }}>{children}</span>;
  const Pill = ({ c = '#667085', bg = '#F2F4F7', b, st, children }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px', borderRadius: 999, background: bg, border: b ? `1px solid ${b}` : 'none', font: `500 11.5px/1.5 ${UI}`, color: c, whiteSpace: 'nowrap', ...st }}>{children}</span>;
  const Tag = ({ children, st }) => <span style={{ padding: '1px 6px', borderRadius: 4, border: '1px solid #D0D5DD', font: `600 9.5px/1.5 ${UI}`, letterSpacing: .5, color: '#475467', background: '#fff', ...st }}>{children}</span>;
  const Btn = ({ pri, c, children, st }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 6, border: pri || c ? 'none' : '1px solid #D0D5DD', background: c || (pri ? PRI : '#fff'), font: `600 13px ${UI}`, color: pri || c ? '#fff' : '#344054', whiteSpace: 'nowrap', ...st }}>{children}</span>;
  const Lbl = ({ children, st }) => <Tx s={10.5} w={600} c="#98A2B3" st={{ letterSpacing: .6, ...st }}>{children}</Tx>;
  const Sp = () => <span style={{ flex: 1 }} />;
  const Hr = ({ st }) => <div style={{ height: 1, background: '#EAECF0', flex: 'none', ...st }} />;
  const Ic = ({ s = 14, c = '#98A2B3', r = 3, st }) => <span style={{ width: s, height: s, borderRadius: r, border: `1.5px solid ${c}`, flex: 'none', display: 'inline-block', ...st }} />;
  const Av = ({ t, s = 22, bg = '#1E88E5' }) => <span style={{ width: s, height: s, borderRadius: '50%', background: bg, color: '#fff', display: 'grid', placeItems: 'center', font: `700 ${s * 0.4}px ${UI}`, flex: 'none' }}>{t}</span>;
  const Card = ({ st, children }) => <div style={{ background: '#fff', border: '1px solid #EAECF0', borderRadius: 10, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, ...st }}>{children}</div>;
  const Caret = ({ on }) => on ? <span style={{ display: 'inline-block', width: 1.5, height: '1.05em', background: PRI, verticalAlign: 'text-bottom', marginLeft: 1 }} /> : null;

  // Vùng nhấn: viền màu + làm tối phần còn lại
  const Focus = ({ p, col = BLUE, st, label, children, pad = 6, right, below, r = 10 }) => (
    <div style={{ position: 'relative', ...st }}>
      {children}
      {p > 0 && <div style={{ position: 'absolute', inset: -pad, borderRadius: r, border: `2.5px solid ${col}`, boxShadow: `0 0 0 6000px rgba(6,21,48,${0.45 * p}), 0 0 24px ${col}88`, opacity: p, pointerEvents: 'none', zIndex: 20 }}>
        {label && <span style={{ position: 'absolute', ...(right ? { right: -2 } : { left: -2 }), ...(below ? { bottom: -36 } : { top: -36 }), padding: '4px 12px', borderRadius: 999, background: 'rgba(6,21,48,.92)', border: `1.5px solid ${col}`, font: `500 16px ${AF}`, color: '#fff', whiteSpace: 'nowrap' }}>{label}</span>}
      </div>}
    </div>
  );
  // Nhấn trong khoảng [a, b)
  const fw = (T, a, b) => Math.min(ez(T, a, 0.5), b == null ? 1 : ez(b, T, 0.35));
  function Cursor({ T, at, a, b, dur = 0.8 }) {
    if (T < at || T > at + dur + 1.0) return null;
    const p = io(T, at, dur), x = lerp(a[0], b[0], p), y = lerp(a[1], b[1], p), cl = clamp((T - at - dur) / 0.45, 0, 1);
    return <div style={{ position: 'absolute', left: x, top: y, zIndex: 40, pointerEvents: 'none', opacity: 1 - clamp((T - at - dur - 0.6) / 0.4, 0, 1) }}>
      {cl > 0 && cl < 1 && <span style={{ position: 'absolute', left: -14, top: -14, width: 28, height: 28, borderRadius: '50%', border: `2px solid ${PRI}`, transform: `scale(${0.4 + cl * 1.4})`, opacity: 1 - cl }} />}
      <svg width="20" height="24" viewBox="0 0 22 26" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.4))' }}><path d="M2 2 L20 13 L11.5 14.5 L7 23 Z" fill="#101828" stroke="#fff" strokeWidth="1.5" /></svg>
    </div>;
  }
  const Toast = ({ T, at, until, children, col = OK }) => { const p = Math.min(ez(T, at, 0.4), until ? ez(until, T, 0.3) : 1); if (p <= 0) return null; return <div style={{ position: 'absolute', right: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, background: '#fff', border: '1px solid #D1FADF', boxShadow: '0 12px 30px rgba(0,0,0,.18)', opacity: p, transform: `translateY(${(1 - p) * 14}px)`, zIndex: 30 }}><span style={{ width: 18, height: 18, borderRadius: '50%', background: col, color: '#fff', display: 'grid', placeItems: 'center', font: `700 11px ${UI}` }}>✓</span><Tx s={13} w={500} c="#101828">{children}</Tx></div>; };
  // Dòng xuất hiện: trượt từ trên xuống + mở chiều cao
  const Drop = ({ T, at, h, children, gap = 10 }) => { const p = ez(T, at, 0.55); if (p <= 0) return null; return <div style={{ maxHeight: p < 1 ? p * (h + gap) : 'none', overflow: p < 1 ? 'hidden' : 'visible', flex: 'none' }}><div style={{ opacity: p, transform: `translateY(${(1 - p) * -12}px)`, paddingBottom: gap }}>{children}</div></div>; };

  // Thanh trên cùng của Base
  const TopBar = () => (
    <div style={{ height: 40, flex: 'none', display: 'flex', alignItems: 'center', padding: '0 14px', background: '#fff', borderBottom: '1px solid #EAECF0', gap: 10 }}>
      <img src="assets/logo-base-mark.png" alt="" style={{ width: 20, height: 20 }} /><Tx s={14} w={700} c="#101828">Base.vn</Tx><Sp />
      <span style={{ width: 300, display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px', borderRadius: 7, border: '1px solid #EAECF0', background: '#FAFBFC' }}><Tx s={12} c="#98A2B3">⌕  Search anything...</Tx><Sp /><Tx s={9.5} c="#98A2B3" st={{ padding: '0 5px', border: '1px solid #EAECF0', borderRadius: 4 }}>Ctrl+K</Tx></span>
      <Sp /><span style={{ display: 'flex', gap: 14 }}>{[0, 1, 2, 3].map(i => <Ic key={i} s={13} r={7} />)}</span>
      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#C68B59,#7A4B2A)', marginLeft: 6 }} />
    </div>
  );
  // Menu trái theo app — nhãn lấy từ ảnh thật
  const LEAD_SVC = [['K', 'Khách hàng công …', '#F04438'], ['C', 'Cơ hội thiết bị côn…', '#1570EF'], ['K', 'KH AI Summit 2026', '#F04438'], ['J', 'Jasmine Jewelry –…', '#12B76A'], ['T', 'Thiết bị y tế Health…', '#667085'], ['J', 'Jasmine Jewelry –…', '#D444F1']];
  function NavLead({ active, sub }) {
    const it = (l, a) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 9px', borderRadius: 6, background: a ? PRI : 'transparent' }}><Ic s={12} c={a ? '#fff' : '#667085'} /><Tx s={12.5} w={a ? 600 : 400} c={a ? '#fff' : '#344054'}>{l}</Tx></span>;
    return <div style={{ width: 176, flex: 'none', background: '#FAFBFC', borderRight: '1px solid #EAECF0', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 9px 12px' }}><Ic s={13} c="#475467" r={7} /><Tx s={13.5} w={600} c="#101828">Lead</Tx></span>
      {['All leads', 'Profiles', 'Campaigns', 'Sequences', 'Lead Flow'].map(l => it(l, l === active))}
      <Lbl st={{ padding: '14px 9px 6px', fontSize: 9.5 }}>LEAD SERVICES</Lbl>
      {LEAD_SVC.map(([k, l, c], i) => <React.Fragment key={i}><span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 9px' }}><span style={{ width: 14, height: 14, borderRadius: 3, border: `1px solid ${c}`, color: c, font: `600 8px ${UI}`, display: 'grid', placeItems: 'center' }}>{k}</span><Tx s={12} w={sub && i === 5 ? 600 : 400} c={sub && i === 5 ? '#6941C6' : '#344054'}>{l}</Tx><Sp /><Tx s={10} c="#98A2B3">›</Tx></span>
        {sub && i === 5 && <>{it('Leads', true)}<span style={{ padding: '5px 22px' }}><Tx s={12} c="#344054">• SLA & Routing</Tx></span></>}</React.Fragment>)}
      <Sp /><Hr />{['Lead Pools', 'Lead Prospecting', 'Insights', 'Settings'].map(l => it(l))}
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 6px 0' }}><Av t="C" s={20} bg={PRI} /><Tx s={12} w={600} c="#101828">Công ty Cổ phần B…</Tx></span>
    </div>;
  }
  const RAIL = { sales: ['Home', 'Pipelines', 'Accounts', 'Contacts', 'Inboxes', 'Forecast', 'Reports'], commerce: ['Product', 'Price', 'Quote', 'Order', 'Invoice', 'Subs', 'Payment', 'Shipping'] };
  function Rail({ kind, active }) {
    return <div style={{ width: 58, flex: 'none', background: '#fff', borderRight: '1px solid #EAECF0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 16 }}>
      {RAIL[kind].map(r => { const a = r === active; return <span key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><span style={{ width: 30, height: 30, borderRadius: '50%', background: a ? '#D1E9FF' : 'transparent', display: 'grid', placeItems: 'center' }}><Ic s={14} c={a ? PRI : '#667085'} /></span><Tx s={9.5} w={a ? 600 : 400} c={a ? PRI : '#475467'}>{r}</Tx></span>; })}
      <Sp /><Ic s={13} r={7} /><Av t="C" s={26} bg={PRI} />
    </div>;
  }
  function SubNav({ title, items, svc, active, bottom }) {
    return <div style={{ width: 176, flex: 'none', background: '#fff', borderRight: '1px solid #EAECF0', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px 12px' }}><Ic s={13} c="#475467" /><Tx s={14} w={700} c="#101828">{title}</Tx></span>
      {items.map(l => { const a = l === active; return <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 9px', borderRadius: 6, background: a ? PRI : 'transparent' }}><Ic s={12} c={a ? '#fff' : '#667085'} /><Tx s={12.5} w={a ? 600 : 400} c={a ? '#fff' : '#344054'}>{l}</Tx></span>; })}
      {svc && <><Lbl st={{ padding: '14px 9px 6px', fontSize: 9.5 }}>{svc[0]}</Lbl>{svc[1].map(l => { const a = l === active; return <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 9px', borderRadius: 6, background: a ? PRI : 'transparent' }}><Ic s={12} c={a ? '#fff' : '#667085'} /><Tx s={12.5} w={a ? 600 : 400} c={a ? '#fff' : '#344054'} st={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 124 }}>{l}</Tx></span>; })}</>}
      <Sp />{bottom && <><Hr />{bottom.map(l => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 9px' }}><Ic s={12} c="#667085" /><Tx s={12.5} c="#344054">{l}</Tx></span>)}</>}
    </div>;
  }
  const NAV = {
    lead: (p) => <NavLead {...p} />,
    salesBoard: () => <><Rail kind="sales" active="Pipelines" /><SubNav title="Jasmine — Bán sỉ …" items={['Pipeline', 'Deals', 'Forecast', 'Activity logs']} active="Pipeline" bottom={['SLAs', 'Duplications', 'Import & export history', 'Edit pipeline', 'Settings']} /></>,
    salesDeal: () => <><Rail kind="sales" active="Pipelines" /><div style={{ width: 44, flex: 'none', background: '#fff', borderRight: '1px solid #EAECF0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, paddingTop: 14 }}>{Array.from({ length: 14 }).map((_, i) => <Ic key={i} s={12} c={i === 0 ? '#344054' : '#98A2B3'} st={i === 0 ? { outline: '6px solid #F2F4F7', borderRadius: 4 } : null} />)}</div></>,
    quote: () => <><Rail kind="commerce" active="Quote" /><SubNav title="Quote" items={['All quotes', 'Approvals']} svc={['QUOTE SERVICES', ['Báo giá thiết bị & vật t…', 'Báo giá quà tặng doan…', 'Báo giá thiết kế riêng', 'Báo giá Philips Healthc…']]} active="Báo giá quà tặng doan…" bottom={['Service settings']} /></>,
    order: () => <><Rail kind="commerce" active="Order" /><SubNav title="Order" items={['All orders', 'Fulfillment']} svc={['ORDER SERVICES', ['Đơn hàng bán', 'Đơn hàng bán lẻ Jasmi…', 'Đơn sỉ & cộng tác viên…', 'Đơn hàng Philips Healt…']]} active="Đơn sỉ & cộng tác viên…" bottom={['Service settings']} /></>,
  };

  // Chrome trình duyệt
  function Chrome({ w, h, L, Tp, op, rp, children }) {
    const CH = 40;
    return <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h + CH, transform: `translate(${L}px, ${Tp + (1 - rp) * 28}px) scale(${lerp(0.985, 1, rp)})`, transformOrigin: '50% 0', opacity: op, borderRadius: 16, overflow: 'hidden', background: '#F7F8FA', boxShadow: '0 28px 64px rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.14)' }}>
      <div style={{ height: CH, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: '#0E1F44', borderBottom: '1px solid rgba(255,255,255,.10)' }}>
        {['#F87171', '#F0A23B', '#4ADE80'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: .7 }} />)}
        <span style={{ marginLeft: 16, padding: '3px 14px', borderRadius: 6, background: 'rgba(255,255,255,.06)', font: `400 15px ${MONO}`, color: INK3 }}>app.base.vn</span>
      </div>
      <div style={{ position: 'relative', width: w, height: h, overflow: 'hidden' }}>{children}</div>
    </div>;
  }
  // Camera: [[t, [x,y,w,h] | null], …] toạ độ trong khung nội dung IW×IH
  function camAt(T, cam, maxZ = 1.8) {
    if (!cam || !cam.length) return { s: 1, tx: 0, ty: 0 };
    const st = (r) => { if (!r) return { s: 1, tx: 0, ty: 0 }; const s = clamp(Math.min(0.82 * IW / r[2], 0.82 * IH / r[3]), 1, r[4] || maxZ); return { s, tx: IW / 2 - (r[0] + r[2] / 2) * s, ty: IH / 2 - (r[1] + r[3] / 2) * s }; };
    let idx = -1; cam.forEach((c, i) => { if (T >= c[0]) idx = i; });
    if (idx < 0) return st(null);
    const a = st(idx > 0 ? cam[idx - 1][1] : null), b = st(cam[idx][1]), p = io(T, cam[idx][0], 1.0);
    const s = lerp(a.s, b.s, p); let tx = lerp(a.tx, b.tx, p), ty = lerp(a.ty, b.ty, p);
    return { s, tx: clamp(tx, IW - IW * s, 0), ty: clamp(ty, IH - IH * s, 0) };
  }
  function Screen({ T, from, to, nav, navP, cam, children, bg = '#F7F8FA', overlay }) {
    if (T < from - 0.01 || T > to + 0.5) return null;
    const op = Math.min(ez(T, from, 0.5), ez(to + 0.5, T, 0.45));
    const c = camAt(T, cam);
    return <Chrome w={FRAME_W} h={FRAME_H} L={DEMO_X} Tp={FRAME_TOP} op={op} rp={ez(T, from, 0.8)}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: IW, height: IH, zoom: Z, fontFamily: UI, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, transform: `translate(${c.tx}px, ${c.ty}px) scale(${c.s})`, transformOrigin: '0 0', background: bg, display: 'flex', flexDirection: 'column' }}>
          <TopBar />
          <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
            {nav && NAV[nav](navP || {})}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>{children}</div>
          </div>
          {overlay}
        </div>
      </div>
    </Chrome>;
  }
  // Feed item (Lead feed / Work stream)
  const KIND = { note: ['Note', '#667085'], email: ['Email', '#1570EF'], call: ['Call', '#12B76A'], meeting: ['Meeting', '#F79009'], quote: ['Quote', '#F79009'], order: ['Order', '#1570EF'] };
  function FeedItem({ k, title, tag, sub, body, meta, badge, badgeC, hl, children }) {
    return <div style={{ display: 'flex', gap: 12 }}>
      <span style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid #EAECF0', background: '#fff', display: 'grid', placeItems: 'center', flex: 'none' }}><Ic s={10} c={KIND[k][1]} /></span>
      <div style={{ flex: 1, minWidth: 0, background: '#fff', border: '1px solid #EAECF0', borderRadius: 8, boxShadow: hl ? `0 0 0 2px ${hl}` : 'none' }}>
        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {title && <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tx s={13.5} w={700} c="#101828">{title}</Tx><Sp />{badge && <Pill c={badgeC || '#175CD3'} bg={badgeC ? '#F2F4F7' : '#EFF8FF'}>{badge}</Pill>}</span>}
          {(tag || sub) && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{tag && <Tag>{tag}</Tag>}<Tx s={11.5} c="#667085">{sub}</Tx></span>}
          {body && <P s={12.5} c={title ? '#475467' : '#101828'}>{body}</P>}{children}
        </div>
        <div style={{ borderTop: '1px solid #F2F4F7', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}><Ic s={10} /><Tx s={11} c="#667085">{KIND[k][0]} · {meta} · <b style={{ color: '#344054', fontWeight: 600 }}>Nguyễn Hoàng</b></Tx><Sp /><Tx s={11} c="#98A2B3">▢  ···</Tx></div>
      </div>
    </div>;
  }

  window.DaiBase = { FW, FH, DEMO_X, FRAME_TOP, FRAME_W, FRAME_H, IW, IH, AF, MONO, UI, BLUE, AMBER, GREEN, RED, INK2, INK3, PRI, OK, OKD, TONE, lerp, ez, io, rise, typed, vnd, dots, clamp, Tx, P, Pill, Tag, Btn, Lbl, Sp, Hr, Ic, Av, Card, Caret, Focus, fw, Cursor, Toast, Drop, Screen, FeedItem };
})();
