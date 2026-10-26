/* @ds-bundle: {"format":4,"namespace":"BaseAISummit2026KeynoteSystem_d06cd2","components":[{"name":"JourneyStep","sourcePath":"components/diagram/JourneyStep.jsx"},{"name":"ServiceNode","sourcePath":"components/diagram/ServiceNode.jsx"},{"name":"PresenterControls","sourcePath":"components/presenter/PresenterControls.jsx"},{"name":"SlideShell","sourcePath":"components/stage/SlideShell.jsx"},{"name":"StageBackground","sourcePath":"components/stage/StageBackground.jsx"},{"name":"AppCard","sourcePath":"components/surfaces/AppCard.jsx"},{"name":"EvidenceFrame","sourcePath":"components/surfaces/EvidenceFrame.jsx"},{"name":"GlassCard","sourcePath":"components/surfaces/GlassCard.jsx"},{"name":"Metric","sourcePath":"components/surfaces/Metric.jsx"},{"name":"SectionEyebrow","sourcePath":"components/typography/SectionEyebrow.jsx"},{"name":"StatementTitle","sourcePath":"components/typography/StatementTitle.jsx"}],"sourceHashes":{"components/diagram/JourneyStep.jsx":"66961484ee48","components/diagram/ServiceNode.jsx":"7afaca531535","components/presenter/PresenterControls.jsx":"c30c34f60787","components/stage/SlideShell.jsx":"8486997c6fe9","components/stage/StageBackground.jsx":"ccfcdbdd6504","components/surfaces/AppCard.jsx":"2fe6452865f2","components/surfaces/EvidenceFrame.jsx":"19b8ca0aa673","components/surfaces/GlassCard.jsx":"73fe456302b9","components/surfaces/Metric.jsx":"7100dfef5b3f","components/typography/SectionEyebrow.jsx":"6d01a3d0315d","components/typography/StatementTitle.jsx":"d6f64f55ab42","slides/slides.jsx":"009d817507c7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BaseAISummit2026KeynoteSystem_d06cd2 = window.BaseAISummit2026KeynoteSystem_d06cd2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/diagram/JourneyStep.jsx
try { (() => {
/** One stage of a journey: step, action, state, result. Upcoming steps dim but stay readable. */
function JourneyStep({
  index,
  title,
  action,
  state,
  result,
  status = 'upcoming',
  last = false,
  onClick,
  style
}) {
  const tone = status === 'done' ? 'var(--accent-green)' : status === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)';
  const Tag = onClick ? 'button' : 'div';
  return /*#__PURE__*/React.createElement(Tag, {
    onClick: onClick,
    style: {
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      padding: '28px 28px 28px 0',
      textAlign: 'left',
      font: 'inherit',
      background: 'none',
      border: 'none',
      color: 'var(--text-title)',
      opacity: status === 'upcoming' ? .55 : 1,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'opacity var(--dur-focus) var(--ease-stage)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      flex: 'none',
      background: status === 'upcoming' ? 'transparent' : tone,
      border: '2px solid ' + tone,
      boxShadow: status === 'active' ? 'var(--glow-node)' : 'none'
    }
  }), !last && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 2,
      background: status === 'done' ? 'var(--accent-green)' : 'var(--edge-line)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 20px/1 var(--font-display)',
      letterSpacing: 2.5,
      textTransform: 'uppercase',
      color: tone
    }
  }, "Ch\u1EB7ng ", String(index).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) 36px/1.15 var(--font-display)'
    }
  }, title), action && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-regular) 24px/1.4 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, action), state && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) 22px/1.3 var(--font-display)',
      color: 'var(--text-meta)'
    }
  }, "Tr\u1EA1ng th\xE1i \xB7 ", state), result && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 'auto',
      paddingTop: 14,
      borderTop: '1px solid var(--edge-line)',
      font: 'var(--fw-semibold) 23px/1.3 var(--font-display)',
      color: 'var(--accent-green)'
    }
  }, result));
}
Object.assign(__ds_scope, { JourneyStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/JourneyStep.jsx", error: String((e && e.message) || e) }); }

// components/diagram/ServiceNode.jsx
try { (() => {
/** One Service = one unit of work with an output. Object, operator, state, output. */
function ServiceNode({
  name,
  object,
  operator,
  state,
  output,
  status = 'default',
  onClick,
  style
}) {
  const active = status === 'active';
  const Tag = onClick ? 'button' : 'div';
  const row = (k, v) => v ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 148,
      font: 'var(--fw-semibold) 19px/1.3 var(--font-display)',
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) 24px/1.35 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, v)) : null;
  return /*#__PURE__*/React.createElement(Tag, {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '30px 32px',
      borderRadius: 'var(--radius-node)',
      textAlign: 'left',
      font: 'inherit',
      color: 'var(--text-title)',
      background: active ? 'rgba(169,214,255,.10)' : 'var(--surface-card)',
      border: '1px solid ' + (active ? 'var(--edge-line-active)' : 'var(--border-card)'),
      boxShadow: active ? 'var(--glow-node)' : 'none',
      opacity: status === 'dim' ? .45 : 1,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all var(--dur-focus) var(--ease-stage)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) 36px/1.1 var(--font-display)'
    }
  }, name), state && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,.08)',
      border: '1px solid var(--glass-border)',
      font: 'var(--fw-semibold) 20px/1 var(--font-display)',
      color: 'var(--accent-cyan)',
      whiteSpace: 'nowrap'
    }
  }, state)), row('Đối tượng', object), row('Người vận hành', operator), output && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      paddingTop: 16,
      borderTop: '1px solid var(--edge-line)',
      display: 'flex',
      gap: 12,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 19px/1.3 var(--font-display)',
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--accent-green)'
    }
  }, "Output"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) 24px/1.35 var(--font-display)',
      color: 'var(--text-title)'
    }
  }, output)));
}
Object.assign(__ds_scope, { ServiceNode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/ServiceNode.jsx", error: String((e && e.message) || e) }); }

// components/presenter/PresenterControls.jsx
try { (() => {
/** Bottom pill bar: prev/next, counter, overview, autoplay, notes, fullscreen, shortcuts. */
function PresenterControls({
  current,
  total,
  onPrev,
  onNext,
  onOverview,
  onAutoplay,
  onNotes,
  onFullscreen,
  style
}) {
  const btn = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 18px',
    borderRadius: 'var(--radius-pill)',
    background: 'none',
    border: 'none',
    font: 'var(--fw-medium) 22px/1 var(--font-display)',
    color: 'var(--text-sub)',
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  };
  const div = /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 28,
      background: 'var(--edge-line)'
    }
  });
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "\u0110i\u1EC1u khi\u1EC3n tr\xECnh chi\u1EBFu",
    style: {
      position: 'absolute',
      bottom: 40,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 18px',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(6,17,48,.72)',
      border: '1px solid var(--glass-border)',
      boxShadow: 'var(--shadow-card)',
      backdropFilter: 'var(--blur-glass)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: onPrev,
    "aria-label": "Slide tr\u01B0\u1EDBc"
  }, "\u2190"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 24px/1 var(--font-display)',
      color: 'var(--text-white)',
      minWidth: 96,
      textAlign: 'center'
    }
  }, String(current).padStart(2, '0'), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "/ ", String(total).padStart(2, '0'))), /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: onNext,
    "aria-label": "Slide sau"
  }, "\u2192"), div, onOverview && /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: onOverview
  }, "L\u01B0\u1EDBi slide"), onAutoplay && /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: onAutoplay
  }, "T\u1EF1 ch\u1EA1y"), onNotes && /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: onNotes
  }, "Notes"), onFullscreen && /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: onFullscreen,
    "aria-label": "To\xE0n m\xE0n h\xECnh"
  }, "\u2922"));
}
Object.assign(__ds_scope, { PresenterControls });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/presenter/PresenterControls.jsx", error: String((e && e.message) || e) }); }

// components/stage/StageBackground.jsx
try { (() => {
/** Gradient + radial mesh + dot grid. Always sits behind slide content. */
function StageBackground({
  glow = 'center',
  dots = true,
  children,
  style
}) {
  const glowMap = {
    center: 'radial-gradient(circle at 50% 55%, rgba(169,214,255,.18) 0%, transparent 55%)',
    left: 'radial-gradient(circle at 22% 50%, rgba(169,214,255,.16) 0%, transparent 55%)',
    right: 'radial-gradient(circle at 78% 50%, rgba(169,214,255,.16) 0%, transparent 55%)',
    none: 'none'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: 'var(--bg-radial-mesh), var(--bg-gradient)',
      ...style
    }
  }, glow !== 'none' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: glowMap[glow]
    }
  }), dots && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: 'var(--dot-grid)',
      backgroundSize: 'var(--dot-grid-step) var(--dot-grid-step)',
      opacity: 'var(--dot-grid-opacity)'
    }
  }), children);
}
Object.assign(__ds_scope, { StageBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stage/StageBackground.jsx", error: String((e && e.message) || e) }); }

// components/stage/SlideShell.jsx
try { (() => {
/** 2560x1280 stage with padding, background and an optional brand/deck rail. */
function SlideShell({
  deck,
  slideNo,
  total,
  glow = 'center',
  dots = true,
  align = 'start',
  animate = true,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stage",
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StageBackground, {
    glow: glow,
    dots: dots
  }), /*#__PURE__*/React.createElement("div", {
    className: animate ? 'slide slide-enter' : 'slide',
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, (deck || slideNo) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'var(--stage-pad-y)',
      left: 'var(--stage-pad-x)',
      right: 'var(--stage-pad-x)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-base-horizontal.png",
    alt: "Base.vn",
    style: {
      height: 44
    }
  }), deck && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 24px/1 var(--font-display)',
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      padding: '10px 18px',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--radius-pill)'
    }
  }, deck)), slideNo && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 24px/1 var(--font-display)',
      letterSpacing: 3,
      color: 'var(--text-muted)'
    }
  }, String(slideNo).padStart(2, '0'), total ? ' / ' + String(total).padStart(2, '0') : '')), /*#__PURE__*/React.createElement("div", {
    className: "slide-content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      paddingTop: deck || slideNo ? 120 : 0
    }
  }, children)));
}
Object.assign(__ds_scope, { SlideShell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stage/SlideShell.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/AppCard.jsx
try { (() => {
/** One app from the Rework catalogue: real logomark if available, else typographic tile. */
function AppCard({
  name,
  appkey,
  group,
  role,
  icon,
  state = 'default',
  onClick,
  style
}) {
  const active = state === 'active';
  const Tag = onClick ? 'button' : 'div';
  return /*#__PURE__*/React.createElement(Tag, {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      padding: '28px 26px',
      borderRadius: 'var(--radius-node)',
      textAlign: 'left',
      font: 'inherit',
      color: 'var(--text-title)',
      background: active ? 'var(--surface-card-hover)' : 'var(--surface-card)',
      border: '1px solid ' + (active ? 'var(--border-card-active)' : 'var(--border-card)'),
      boxShadow: active ? 'var(--glow-focus)' : 'none',
      opacity: state === 'dim' ? .4 : 1,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all var(--dur-focus) var(--ease-stage)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, icon ? /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    style: {
      width: 52,
      height: 52,
      borderRadius: 12,
      flex: 'none'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 12,
      flex: 'none',
      display: 'grid',
      placeItems: 'center',
      background: 'rgba(255,255,255,.10)',
      border: '1px solid var(--glass-border)',
      font: 'var(--fw-bold) 26px/1 var(--font-display)',
      color: 'var(--accent-cyan)'
    }
  }, String(name || '?').slice(0, 1).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) 34px/1.1 var(--font-display)'
    }
  }, name), appkey && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) 20px/1 var(--font-display)',
      letterSpacing: 1.5,
      color: 'var(--text-meta)'
    }
  }, appkey))), role && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--fw-regular) 24px/1.4 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, role), group && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 'auto',
      font: 'var(--fw-semibold) 19px/1 var(--font-display)',
      letterSpacing: 2.5,
      textTransform: 'uppercase',
      color: 'var(--text-highlight)'
    }
  }, group));
}
Object.assign(__ds_scope, { AppCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/AppCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/EvidenceFrame.jsx
try { (() => {
/** Real product screenshot or video in a frame, with callouts. Label simulations as demo. */
function EvidenceFrame({
  src,
  alt,
  poster,
  video,
  demo = false,
  caption,
  callouts = [],
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-frame)',
      overflow: 'hidden',
      border: '1px solid var(--glass-border)',
      background: 'rgba(255,255,255,.04)',
      boxShadow: 'var(--shadow-lift)'
    }
  }, video ? /*#__PURE__*/React.createElement("video", {
    src: video,
    poster: poster,
    controls: true,
    playsInline: true,
    style: {
      display: 'block',
      width: '100%'
    }
  }) : src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      display: 'block',
      width: '100%'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16 / 10',
      display: 'grid',
      placeItems: 'center',
      font: 'var(--fw-semibold) 30px/1.4 var(--font-display)',
      color: 'var(--text-meta)',
      textAlign: 'center',
      padding: 40
    }
  }, "asset c\u1EA7n b\u1ED5 sung", /*#__PURE__*/React.createElement("br", null), alt), demo && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 24,
      left: 24,
      padding: '10px 18px',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(6,17,48,.75)',
      border: '1px solid var(--glass-border-bright)',
      font: 'var(--fw-semibold) 20px/1 var(--font-display)',
      letterSpacing: 2.5,
      textTransform: 'uppercase',
      color: 'var(--accent-orange)'
    }
  }, "Demo m\xF4 ph\u1ECFng")), callouts.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--gap-grid)'
    }
  }, callouts.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) 22px/1.4 var(--font-display)',
      color: 'var(--accent-cyan)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-regular) 24px/1.4 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, c)))), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      font: 'var(--fw-regular) 22px/1.4 var(--font-display)',
      color: 'var(--text-meta)'
    }
  }, caption));
}
Object.assign(__ds_scope, { EvidenceFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/EvidenceFrame.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassCard.jsx
try { (() => {
/** Second-layer glass surface: label -> title -> one sentence. Never stack three deep. */
function GlassCard({
  label,
  title,
  children,
  footer,
  state = 'default',
  as = 'div',
  reveal = false,
  delay = 0,
  onClick,
  style
}) {
  const Tag = onClick ? 'button' : as;
  const active = state === 'active';
  const dim = state === 'dim';
  return /*#__PURE__*/React.createElement(Tag, {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--gap-card)',
      padding: 'var(--card-pad)',
      borderRadius: 'var(--radius-card)',
      textAlign: 'left',
      font: 'inherit',
      color: 'var(--text-title)',
      background: active ? 'var(--surface-card-hover)' : 'var(--surface-card)',
      border: '1px solid ' + (active ? 'var(--border-card-active)' : 'var(--border-card)'),
      boxShadow: active ? 'var(--glow-focus), var(--shadow-card)' : 'var(--shadow-card)',
      backdropFilter: 'var(--blur-glass)',
      opacity: dim ? .45 : 1,
      cursor: onClick ? 'pointer' : 'default',
      animation: reveal ? 'rise-in var(--dur-reveal) var(--ease-stage) ' + delay + 'ms both' : undefined,
      transition: 'background var(--dur-focus) var(--ease-stage), border-color var(--dur-focus) var(--ease-stage), opacity var(--dur-focus) var(--ease-stage)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--fs-label)/1 var(--font-display)',
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: 'var(--text-highlight)'
    }
  }, label), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--text-card-title)',
      letterSpacing: '-.5px'
    }
  }, title), children && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-card-body)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--edge-line)',
      font: 'var(--fw-medium) var(--fs-label)/1.3 var(--font-display)',
      color: 'var(--text-meta)'
    }
  }, footer));
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Metric.jsx
try { (() => {
/** Verified number, big; label small. Never animate the digits without a reason. */
function Metric({
  value,
  unit,
  label,
  source,
  tone = 'white',
  align = 'left',
  style
}) {
  const colors = {
    white: 'var(--text-title)',
    cyan: 'var(--accent-cyan)',
    green: 'var(--accent-green)',
    orange: 'var(--accent-orange)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      color: colors[tone]
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-black) var(--fs-metric)/1 var(--font-display)',
      letterSpacing: '-3px'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 40px/1 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, unit)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--fs-card-body)/1.3 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, label), source && /*#__PURE__*/React.createElement("span", {
    style: {
      paddingTop: 12,
      borderTop: '1px solid var(--edge-line)',
      width: '100%',
      font: 'var(--fw-regular) 22px/1.3 var(--font-display)',
      color: 'var(--text-meta)'
    }
  }, source));
}
Object.assign(__ds_scope, { Metric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Metric.jsx", error: String((e && e.message) || e) }); }

// components/typography/SectionEyebrow.jsx
try { (() => {
/** Uppercase wide-tracked label that introduces a statement. One line only. */
function SectionEyebrow({
  tone = 'cyan',
  dot = false,
  children,
  style
}) {
  const colors = {
    cyan: 'var(--accent-cyan)',
    sub: 'var(--text-sub)',
    muted: 'var(--text-muted)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      font: 'var(--fw-semibold) var(--fs-eyebrow)/1.1 var(--font-display)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: colors[tone],
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: 'currentColor',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { SectionEyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/SectionEyebrow.jsx", error: String((e && e.message) || e) }); }

// components/typography/StatementTitle.jsx
try { (() => {
/** Large white statement. Pass an array to break lines deliberately; {h:"…"} highlights cyan. */
function StatementTitle({
  children,
  lines,
  size = 'statement',
  align = 'left',
  style
}) {
  const sizes = {
    cover: {
      fontSize: 'var(--fs-h1-cover)',
      lineHeight: 'var(--lh-cover)',
      letterSpacing: 'var(--ls-cover)'
    },
    statement: {
      fontSize: 'var(--fs-h2-statement)',
      lineHeight: 'var(--lh-statement)',
      letterSpacing: 'var(--ls-statement)'
    },
    section: {
      fontSize: 'var(--fs-h3-section)',
      lineHeight: 'var(--lh-heading)',
      letterSpacing: '-1.5px'
    }
  };
  const render = (part, i) => typeof part === 'string' || typeof part === 'number' ? /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, part) : part && part.h ? /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: 'var(--text-highlight)'
    }
  }, part.h) : /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, part);
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-black)',
      color: 'var(--text-title)',
      textAlign: align,
      textWrap: 'pretty',
      ...sizes[size],
      ...style
    }
  }, lines ? lines.map((line, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'block'
    }
  }, Array.isArray(line) ? line.map(render) : render(line, i))) : children);
}
Object.assign(__ds_scope, { StatementTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/StatementTitle.jsx", error: String((e && e.message) || e) }); }

// slides/slides.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SlideShell,
  StageBackground,
  SectionEyebrow,
  StatementTitle,
  GlassCard,
  Metric,
  AppCard,
  EvidenceFrame,
  ServiceNode,
  JourneyStep,
  PresenterControls
} = window.BaseAISummit2026KeynoteSystem_d06cd2;

/* Scales the 2560x1280 stage into whatever box it is given. */
function StageFit({
  children
}) {
  const ref = React.useRef(null);
  const [s, setS] = React.useState(0.5);
  React.useEffect(() => {
    const fit = () => {
      const el = ref.current;
      if (!el) return;
      setS(Math.min(el.clientWidth / 2560, el.clientHeight / 1280));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "stage-viewport"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 2560,
      height: 1280,
      transform: 'translate(-50%,-50%) scale(' + s + ')'
    }
  }, children));
}

/* 1 — Opening / big idea */
function OpeningSlide() {
  return /*#__PURE__*/React.createElement(SlideShell, {
    glow: "center",
    align: "center",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-base-horizontal.png",
    alt: "Base.vn",
    style: {
      height: 56,
      alignSelf: 'flex-start',
      marginBottom: 120
    }
  }), /*#__PURE__*/React.createElement(SectionEyebrow, {
    dot: true
  }, "Base AI Summit 2026"), /*#__PURE__*/React.createElement(StatementTitle, {
    size: "cover",
    style: {
      marginTop: 48
    },
    lines: [['Universe of ', {
      h: 'Work'
    }]]
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '56px 0 0',
      maxWidth: 1500,
      font: 'var(--fw-regular) 40px/1.45 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, "M\u1ED9t h\u1EC7 \u0111i\u1EC1u h\xE0nh v\u1EADn h\xE0nh, nh\xECn th\u1EA5y \u0111\u01B0\u1EE3c nh\u01B0 m\u1ED9t v\u0169 tr\u1EE5 th\u1ED1ng nh\u1EA5t."));
}

/* 2 — Tension / problem */
function TensionSlide() {
  return /*#__PURE__*/React.createElement(SlideShell, {
    deck: "Universe of Work",
    slideNo: 2,
    total: 8,
    glow: "left"
  }, /*#__PURE__*/React.createElement(SectionEyebrow, null, "V\u1EA5n \u0111\u1EC1"), /*#__PURE__*/React.createElement(StatementTitle, {
    style: {
      marginTop: 36,
      maxWidth: 1900
    },
    lines: ['Doanh nghiệp có rất nhiều', ['tính năng, nhưng ', {
      h: 'ít đầu ra'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-four",
    style: {
      marginTop: 120
    }
  }, /*#__PURE__*/React.createElement(GlassCard, {
    reveal: true,
    delay: 0,
    label: "D\u1EA5u hi\u1EC7u 01",
    title: "C\xF4ng vi\u1EC7c kh\xF4ng c\xF3 ch\u1EE7"
  }, "Kh\xF4ng r\xF5 ai v\u1EADn h\xE0nh, \u0111\u1ED1i t\u01B0\u1EE3ng n\xE0o \u0111ang \u0111\u01B0\u1EE3c x\u1EED l\xFD."), /*#__PURE__*/React.createElement(GlassCard, {
    reveal: true,
    delay: 80,
    label: "D\u1EA5u hi\u1EC7u 02",
    title: "D\u1EEF li\u1EC7u r\u1EDDi r\u1EA1c"
  }, "M\u1ED7i app m\u1ED9t b\u1EA3ng s\u1ED1, kh\xF4ng gh\xE9p th\xE0nh t\xEDn hi\u1EC7u qu\u1EA3n tr\u1ECB."), /*#__PURE__*/React.createElement(GlassCard, {
    reveal: true,
    delay: 160,
    label: "D\u1EA5u hi\u1EC7u 03",
    title: "Tri th\u1EE9c bay h\u01A1i"
  }, "C\xE1ch l\xE0m \u0111\xFAng n\u1EB1m trong \u0111\u1EA7u ng\u01B0\u1EDDi, kh\xF4ng t\xEDch l\u0169y l\u1EA1i."), /*#__PURE__*/React.createElement(GlassCard, {
    reveal: true,
    delay: 240,
    state: "active",
    label: "K\u1EBFt lu\u1EADn",
    title: "Thi\u1EBFu m\u1ED9t \u0111\u01A1n v\u1ECB v\u1EADn h\xE0nh"
  }, "C\u1EA7n m\u1ED9t Service c\xF3 \u0111\u1ED1i t\u01B0\u1EE3ng, tr\u1EA1ng th\xE1i v\xE0 \u0111\u1EA7u ra r\xF5 r\xE0ng.")));
}

/* 3 — Comparison / before–after */
function ComparisonSlide() {
  const col = (label, title, items, active) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(SectionEyebrow, {
    tone: active ? 'cyan' : 'muted'
  }, label), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--fw-black) 72px/1.1 var(--font-display)',
      letterSpacing: '-2px',
      color: active ? 'var(--text-white)' : 'var(--text-sub)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'baseline',
      padding: '24px 28px',
      borderRadius: 'var(--radius-node)',
      background: active ? 'var(--surface-card-hover)' : 'var(--surface-card)',
      border: '1px solid ' + (active ? 'var(--border-card-active)' : 'var(--border-card)')
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 22px/1 var(--font-display)',
      color: active ? 'var(--accent-green)' : 'var(--text-muted)',
      letterSpacing: 2
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) 30px/1.35 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, t)))));
  return /*#__PURE__*/React.createElement(SlideShell, {
    deck: "Universe of Work",
    slideNo: 3,
    total: 8,
    glow: "none",
    dots: false
  }, /*#__PURE__*/React.createElement(StatementTitle, {
    size: "section"
  }, "T\u1EEB t\xEDnh n\u0103ng r\u1EDDi r\u1EA1c sang Service c\xF3 \u0111\u1EA7u ra"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 96,
      marginTop: 96
    }
  }, col('Trước', 'Tính năng', ['Người dùng mở app để làm một việc', 'Kết quả nằm trong từng màn hình', 'Báo cáo dựng lại thủ công'], false), col('Sau', 'Service', ['Service có đối tượng và người vận hành', 'Mỗi lần chạy tạo ra một Output', 'Output ghép thành tín hiệu quản trị'], true)));
}

/* 4 — Architecture map */
function ArchitectureSlide({
  step = 0,
  onStep
}) {
  const layers = [{
    label: 'Lớp 01',
    title: 'Operation Intelligence',
    body: 'Service Architecture: đối tượng vận hành, người vận hành, mục tiêu, SOP/kế hoạch, đầu vào, trạng thái, đầu ra.'
  }, {
    label: 'Lớp 02',
    title: 'Output Intelligence',
    body: 'Kết nối output từ nhiều Service. Atlas hỗ trợ semantic model, dashboard và truy vấn theo ngữ cảnh.'
  }, {
    label: 'Lớp 03',
    title: 'Knowledge Intelligence',
    body: 'Workrules cùng Case Studies & Learnings được tích lũy quanh Service.'
  }, {
    label: 'Lớp 04',
    title: 'Agent Architect',
    body: '1-shot Agent → Digital Employees → Agent Teams. Service Intelligence điều phối ở cấp nhiều Service.'
  }];
  return /*#__PURE__*/React.createElement(SlideShell, {
    deck: "Universe of Work",
    slideNo: 4,
    total: 8,
    glow: "center"
  }, /*#__PURE__*/React.createElement(SectionEyebrow, {
    dot: true
  }, "Ki\u1EBFn tr\xFAc Base 2.0"), /*#__PURE__*/React.createElement(StatementTitle, {
    size: "section",
    style: {
      marginTop: 28
    }
  }, "B\u1ED1n l\u1EDBp n\u0103ng l\u1EF1c, m\u1ED9t d\xF2ng ch\u1EA3y h\u1ECDc h\u1ECFi"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      marginTop: 72
    }
  }, layers.map((l, i) => /*#__PURE__*/React.createElement(GlassCard, {
    key: i,
    reveal: true,
    delay: i * 80,
    label: l.label,
    title: l.title,
    onClick: onStep ? () => onStep(i + 1) : undefined,
    state: step === 0 ? 'default' : step === i + 1 ? 'active' : 'dim',
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 56,
      padding: '32px 40px',
      marginLeft: i * 60
    }
  }, l.body))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: 'flex',
      gap: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) 24px/1 var(--font-display)',
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "L\u1EDBp m\u1EDF r\u1ED9ng \xB7 Universal of Work"), ['Vibe Studio', 'Co-work', 'Canvas', 'Gateway'].map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      padding: '12px 22px',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,.07)',
      border: '1px solid var(--glass-border)',
      font: 'var(--fw-medium) 26px/1 var(--font-display)',
      color: 'var(--text-body)'
    }
  }, n))));
}

/* 5 — Ecosystem / app landscape */
function EcosystemSlide() {
  const groups = [['AI & Agent Ops', 6, 'foundry'], ['Sales & Customer Operations', 11, 'lead'], ['GTM Operations', 10, 'admanager'], ['Work Operations', 10, 'automation'], ['People Operations', 8, 'success'], ['Finance Operations', 5, 'invoice'], ['Workforce intelligence', 10, 'radar'], ['Workplace communications', 11, 'mail'], ['Platform & Core services', 16, 'store']];
  return /*#__PURE__*/React.createElement(SlideShell, {
    deck: "Universe of Work",
    slideNo: 5,
    total: 8,
    glow: "right"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 96
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionEyebrow, null, "H\u1EC7 sinh th\xE1i Rework"), /*#__PURE__*/React.createElement(StatementTitle, {
    size: "section",
    style: {
      marginTop: 28
    }
  }, "Nh\xF3m theo c\xF4ng vi\u1EC7c, kh\xF4ng ph\u1EA3i t\u01B0\u1EDDng logo"), /*#__PURE__*/React.createElement(Metric, {
    style: {
      marginTop: 72
    },
    value: "87",
    unit: "\u1EE9ng d\u1EE5ng",
    label: "9 nh\xF3m nghi\u1EC7p v\u1EE5",
    source: "Danh m\u1EE5c \u1EE9ng d\u1EE5ng \xB7 18/08/2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, groups.map(([name, n, icon]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '26px 24px',
      borderRadius: 'var(--radius-node)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: '../assets/app-icons/' + icon + '.svg',
    alt: "",
    style: {
      width: 44,
      height: 44,
      borderRadius: 10
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) 28px/1.2 var(--font-display)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 'auto',
      font: 'var(--fw-semibold) 24px/1 var(--font-display)',
      color: 'var(--accent-cyan)'
    }
  }, n, " app"))))));
}

/* 6 — Journey / service flow */
function JourneySlide({
  step = 2,
  onStep
}) {
  const steps = [{
    title: 'Tiếp cận',
    action: 'Prospector nhận hội thoại từ kênh chat',
    state: 'Đã xác định nhu cầu',
    result: 'Lead có ngữ cảnh'
  }, {
    title: 'Tạo nhu cầu',
    action: 'Lead được chấm điểm và phân nhiệm',
    state: 'Đang nuôi dưỡng',
    result: 'Cơ hội có chủ'
  }, {
    title: 'Bán hàng',
    action: 'Sales chốt phương án cùng khách hàng',
    state: 'Đang thương lượng',
    result: 'Báo giá được chấp thuận'
  }, {
    title: 'Hợp đồng & thu tiền',
    action: 'Contract phát hành, Invoice ghi nhận',
    state: 'Chờ đối soát',
    result: 'Dòng tiền đã ghi nhận'
  }, {
    title: 'Thành công sau bán',
    action: 'Success theo dõi cam kết đã hứa',
    state: 'Đang vận hành',
    result: 'Workrule được cập nhật'
  }];
  return /*#__PURE__*/React.createElement(SlideShell, {
    deck: "Universe of Work",
    slideNo: 6,
    total: 8,
    glow: "none"
  }, /*#__PURE__*/React.createElement(SectionEyebrow, null, "Revenue Engine"), /*#__PURE__*/React.createElement(StatementTitle, {
    size: "section",
    style: {
      marginTop: 28
    }
  }, "M\u1ED9t kh\xE1ch h\xE0ng \u0111i qua n\u0103m ch\u1EB7ng, m\u1ED7i ch\u1EB7ng \u0111\u1EC3 l\u1EA1i m\u1ED9t \u0111\u1EA7u ra"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginTop: 96
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(JourneyStep, _extends({
    key: i,
    index: i + 1
  }, s, {
    last: i === steps.length - 1,
    onClick: onStep ? () => onStep(i + 1) : undefined,
    status: i + 1 < step ? 'done' : i + 1 === step ? 'active' : 'upcoming'
  })))));
}

/* 7 — Product demo / evidence */
function EvidenceSlide() {
  return /*#__PURE__*/React.createElement(SlideShell, {
    deck: "Universe of Work",
    slideNo: 7,
    total: 8,
    glow: "none",
    dots: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '7fr 5fr',
      gap: 96,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(EvidenceFrame, {
    alt: "Prospector \xB7 thi\u1EBFt k\u1EBF multi-agent flow",
    demo: true,
    callouts: ['Agent cập nhật field trên hồ sơ', 'Gửi form mẫu cho khách xác nhận', 'Metric được đo tự động']
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionEyebrow, null, "B\u1EB1ng ch\u1EE9ng"), /*#__PURE__*/React.createElement(StatementTitle, {
    size: "section",
    style: {
      marginTop: 28
    }
  }, "Agent l\xE0m vi\u1EC7c trong c\xF9ng m\u1ED9t d\xF2ng h\u1ED9i tho\u1EA1i"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(ServiceNode, {
    name: "Ti\u1EBFp nh\u1EADn khi\u1EBFu n\u1EA1i",
    object: "H\u1ED9i tho\u1EA1i kh\xE1ch h\xE0ng",
    operator: "CS + Agent",
    state: "\u0110ang x\u1EED l\xFD",
    output: "Ticket c\xF3 ng\u1EEF c\u1EA3nh",
    status: "active"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '32px 0 0',
      font: 'var(--fw-regular) 26px/1.45 var(--font-display)',
      color: 'var(--text-meta)'
    }
  }, "\u1EA2nh ch\u1EE5p s\u1EA3n ph\u1EA9m c\u1EA7n b\u1ED5 sung t\u1EEB th\u01B0 m\u1EE5c Keynote 1 / Prospector tr\u01B0\u1EDBc khi tr\xECnh chi\u1EBFu."))));
}

/* 8 — Resolution / closing */
function ClosingSlide() {
  return /*#__PURE__*/React.createElement(SlideShell, {
    glow: "center",
    align: "center",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionEyebrow, {
    dot: true
  }, "K\u1EBFt"), /*#__PURE__*/React.createElement(StatementTitle, {
    align: "center",
    style: {
      marginTop: 48,
      maxWidth: 2000
    },
    lines: [['Sản phẩm, dữ liệu, con người và ', {
      h: 'AI'
    }], 'trong cùng một vũ trụ vận hành']
  }), /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-base-horizontal.png",
    alt: "Base.vn",
    style: {
      height: 52,
      marginTop: 120,
      opacity: .9
    }
  })));
}

/* 9 — Product demo / evidence · Prospector (ảnh chụp thật) */
function ProspectorSlide() {
  return /*#__PURE__*/React.createElement(SlideShell, {
    deck: "Prospector",
    slideNo: 9,
    total: 9,
    glow: "none",
    dots: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '7fr 5fr',
      gap: 96,
      alignItems: 'center',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(EvidenceFrame, {
    src: "../assets/shots/prospector-4b-multi-agent-flow.png",
    alt: "Prospector \u2014 canvas thi\u1EBFt k\u1EBF lu\u1ED3ng ph\u1ED1i h\u1EE3p gi\u1EEFa c\xE1c Agent",
    caption: "Thi\u1EBFt k\u1EBF lu\u1ED3ng ph\u1ED1i h\u1EE3p gi\u1EEFa c\xE1c Agent, k\xE8m nh\xE1nh tr\u1EA3 v\u1EC1 nh\xE2n s\u1EF1.",
    callouts: ['Agent tiếp nhận phân loại nhu cầu', 'Khối điều kiện rẽ theo giá trị vừa có', 'Nhánh “còn lại” giao cho người thật']
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionEyebrow, null, "Base CRM \xB7 Prospector"), /*#__PURE__*/React.createElement(StatementTitle, {
    size: "section",
    style: {
      marginTop: 28
    }
  }, "Kh\xF4ng ph\u1EA3i m\u1ED9t tr\u1EE3 l\xFD bi\u1EBFt m\u1ECDi th\u1EE9, m\xE0 m\u1ED9t \u0111\u1ED9i c\xF3 ph\xE2n c\xF4ng"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(ServiceNode, {
    name: "Ti\u1EBFp nh\u1EADn khi\u1EBFu n\u1EA1i",
    object: "H\u1ED9i tho\u1EA1i c\u1EE7a ch\u1ECB Thanh Xu\xE2n",
    operator: "Jasmine Claims Specialist",
    state: "\u0110\xE3 ph\xE2n lo\u1EA1i",
    output: "Phi\u1EBFu ti\u1EBFp nh\u1EADn \u0111\xE3 x\xE1c nh\u1EADn",
    status: "active"
  })), /*#__PURE__*/React.createElement(GlassCard, {
    reveal: true,
    delay: 80,
    style: {
      marginTop: 24
    },
    label: "B\u1ED9 c\xF4ng c\u1EE5 c\u1EA5p cho Agent",
    title: null,
    footer: "Ngu\u1ED3n: Base Prospector \u2014 T\u1EEB m\u1ED9t tin nh\u1EAFn \u0111\u1EBFn m\u1ED9t vi\u1EC7c \u0111\xE3 \u0111\u01B0\u1EE3c giao"
  }, "B\xE0n giao \xB7 Kh\u1EDFi ch\u1EA1y Flow \xB7 Tra c\u1EE9u tri th\u1EE9c \xB7 G\u1EEDi tr\u1EA3 l\u1EDDi m\u1EABu \xB7 C\u1EADp nh\u1EADt h\u1ED3 s\u01A1"))));
}
const SLIDES = [{
  id: 'opening',
  title: 'Universe of Work',
  type: 'Opening / big idea',
  Comp: OpeningSlide
}, {
  id: 'tension',
  title: 'Nhiều tính năng, ít đầu ra',
  type: 'Tension / problem',
  Comp: TensionSlide
}, {
  id: 'comparison',
  title: 'Tính năng → Service',
  type: 'Comparison / before–after',
  Comp: ComparisonSlide
}, {
  id: 'architecture',
  title: 'Bốn lớp năng lực',
  type: 'Architecture map',
  Comp: ArchitectureSlide,
  steps: 4
}, {
  id: 'ecosystem',
  title: 'Hệ sinh thái Rework',
  type: 'Ecosystem / app landscape',
  Comp: EcosystemSlide
}, {
  id: 'journey',
  title: 'Revenue Engine',
  type: 'Journey / service flow',
  Comp: JourneySlide,
  steps: 5
}, {
  id: 'evidence',
  title: 'Agent trong hội thoại',
  type: 'Product demo / evidence',
  Comp: EvidenceSlide
}, {
  id: 'closing',
  title: 'Một vũ trụ vận hành',
  type: 'Resolution / closing',
  Comp: ClosingSlide
}, {
  id: 'prospector',
  title: 'Prospector — một đội có phân công',
  type: 'Product demo / evidence',
  Comp: ProspectorSlide
}];
Object.assign(window, {
  StageFit,
  OpeningSlide,
  TensionSlide,
  ComparisonSlide,
  ArchitectureSlide,
  EcosystemSlide,
  JourneySlide,
  EvidenceSlide,
  ClosingSlide,
  ProspectorSlide,
  SLIDES,
  PresenterControls
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/slides.jsx", error: String((e && e.message) || e) }); }

__ds_ns.JourneyStep = __ds_scope.JourneyStep;

__ds_ns.ServiceNode = __ds_scope.ServiceNode;

__ds_ns.PresenterControls = __ds_scope.PresenterControls;

__ds_ns.SlideShell = __ds_scope.SlideShell;

__ds_ns.StageBackground = __ds_scope.StageBackground;

__ds_ns.AppCard = __ds_scope.AppCard;

__ds_ns.EvidenceFrame = __ds_scope.EvidenceFrame;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.Metric = __ds_scope.Metric;

__ds_ns.SectionEyebrow = __ds_scope.SectionEyebrow;

__ds_ns.StatementTitle = __ds_scope.StatementTitle;

})();
