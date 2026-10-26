# Base AI Summit 2026 — Keynote Design System

Bộ thiết kế dùng thống nhất cho các bài thuyết trình tại **Base AI Summit 2026**: kiến trúc Base 2.0, hệ sinh thái ứng dụng Rework, và cách AI tham gia vào vận hành doanh nghiệp. Đây là **hệ thiết kế cho phần trình diễn keynote**, rút ra từ keynote tham chiếu; nó không tự nhận là bộ nhận diện thương hiệu chính thức hay design system giao diện sản phẩm của Base.

Ngôn ngữ trình bày: **tiếng Việt**, với tên sản phẩm và tên lớp kiến trúc giữ nguyên tiếng Anh.

## Nguồn đã dùng

| Nguồn | Đường dẫn / link | Đã đọc được? |
| --- | --- | --- |
| Brief thiết kế (ground truth) | `uploads/Base_AI_Summit_2026_Design_System_for_Claude.md` | Có — token, sân khấu, thang chữ, 10 component, 8 mẫu slide, quy tắc motion đều lấy từ đây |
| Keynote tham chiếu "Universe of Work" | https://keynote4-universe-of-work.vercel.app/#slide-1 | Không — trang render bằng JS, chỉ đọc được phần khung. Giá trị thị giác lấy từ brief |
| Codebase đính kèm | `AI Summit 2026/` (File System Access) | Một phần — `Keynote 4/` và `Keynote 1/2. Leads/` là thư mục **rỗng**; không có mã nguồn keynote nào |
| Logo & asset thương hiệu | `AI Summit 2026/Design System/` | Có — đã copy vào `assets/` |
| Logomark ứng dụng Rework | `AI Summit 2026/Keynote 1/0. Tổng quan kiến trúc các app/*.svg` | Có — 25 file SVG đã copy vào `assets/app-icons/` |
| Keynote 3 — Amber Note (ảnh slide) | `AI Summit 2026/Keynote 3 - AMBER NOTE/*.png` | Có (ảnh) — đây là deck **nền sáng** cho một sản phẩm phần cứng, hệ thị giác khác. Chỉ dùng để đối chiếu phần chrome trình chiếu (rail trên, pill điều khiển dưới) |
| `Base Prospector — Từ một tin nhắn đến một việc đã được giao.docx` | `AI Summit 2026/Keynote 1/1. Prospector/` | Có — đọc trọn văn bản; toàn bộ nội dung template Prospector lấy từ đây |
| `Kiến trúc Base 2.0.docx`, `Danh mục ứng dụng.pdf`, `Rework_Ban_do_app_va_luong_ket_noi.docx` | `AI Summit 2026/Keynote 1/0. …/` | Chưa đọc trực tiếp — ngữ nghĩa kiến trúc và số liệu catalog lấy qua mục 7 của brief |

## Ý tưởng chủ đạo

Một hệ điều hành vận hành được nhìn thấy như một **vũ trụ thống nhất**. Màn hình tối, sâu và tĩnh tạo cảm giác quy mô; typography lớn tạo điểm tập trung; điểm sáng, đường nối và lớp kính cho thấy quan hệ giữa ứng dụng, Service, dữ liệu và Agent.

Trật tự thị giác: **một luận điểm chính → một mô hình trực quan → một bằng chứng → chi tiết theo tương tác**. Mỗi slide chỉ một câu diễn giả nói trọn trong vài giây.

Ba tầng phải luôn phân biệt rõ:

- **Năng lực nền tảng** — Operation/Service, Output, Knowledge, Agent, Universal of Work. Vẽ thành lớp có thứ bậc.
- **Sản phẩm/ứng dụng** — các app trong danh mục Rework. Card có tên, nhóm, công việc nó giải quyết.
- **Hành trình người dùng** — một đối tượng vận hành đi qua nhiều chặng, có trạng thái và output.

App là **bề mặt sản phẩm**; Service là **đơn vị vận hành có đối tượng và output**. Không lẫn hai khái niệm.

---

## CONTENT FUNDAMENTALS

**Giọng:** khẳng định, điềm tĩnh, kỹ thuật nhưng không hàn lâm. Câu ngắn, chủ động, không cường điệu. Không dùng "chúng tôi tự hào", "đột phá", "cách mạng".

**Ngôi:** gần như không dùng ngôi. Slide nói về *đối tượng vận hành*, không nói về người xem. Khi cần chỉ người dùng thì gọi vai: "người vận hành", "CS", "Sales", "diễn giả". Tránh "bạn".

**Casing:**
- Eyebrow: **VIẾT HOA TOÀN BỘ**, tracking rộng — `OPERATION INTELLIGENCE`, `KIẾN TRÚC BASE 2.0`.
- Tiêu đề: chữ thường có dấu, chỉ hoa đầu câu và danh từ riêng — "Một hệ điều hành vận hành", không phải "Một Hệ Điều Hành Vận Hành".
- Tên lớp kiến trúc và tên app giữ nguyên tiếng Anh, giữ nguyên casing gốc: `Output Intelligence`, `Agent Architect`, `Atlas`, `Canvas`, `Gateway`, `Service`.

**Song ngữ:** nhãn tiếng Anh cho tên sản phẩm và lớp kiến trúc, lời giải thích tiếng Việt. Không dịch `Output Intelligence` thành "Trí tuệ đầu ra".

**Độ dài:** tối đa 40–50 từ hiển thị trên một slide thường. Tiêu đề tối đa 2 dòng. Body card một đến hai câu. Văn bản dài chuyển sang presenter notes hoặc slide kế tiếp.

**Số liệu:** chỉ đưa số có nguồn, và ghi nguồn. Ví dụ đúng: "87 ứng dụng · 9 nhóm — Danh mục ứng dụng, 18/08/2026". Con số `~100 ứng dụng` trên website là cách trình bày xấp xỉ khác nguồn; không tự đồng nhất hai con số.

**Emoji:** không dùng. Không trong sơ đồ kiến trúc, không cho các mốc thành tựu, không trong card.

**Ví dụ copy đúng:**
- Eyebrow + title: `KIẾN TRÚC BASE 2.0` → "Bốn lớp năng lực, một dòng chảy học hỏi"
- Card: nhãn `LỚP 01` → "Operation Intelligence" → "Service có đối tượng vận hành, người vận hành, trạng thái và đầu ra rõ ràng."
- Journey: "Chặng 03 · Bán hàng — Sales chốt phương án cùng khách hàng · Trạng thái: đang thương lượng · Output: báo giá được chấp thuận"
- Thiếu asset: ghi thẳng `asset cần bổ sung` trên slide, không dựng ảnh giả.

---

## VISUAL FOUNDATIONS

**Sân khấu.** 2560 × 1280 px, **tỷ lệ 2:1**, padding `70px 140px`. Đây là tỷ lệ của keynote tham chiếu — không đổi thành 16:9 rồi gọi là bản sao. Nếu cần 16:9, đặt nội dung 2:1 trong khung 16:9 có khoảng đệm có chủ ý, hoặc thiết kế lại bố cục; tuyệt đối không kéo giãn. Scale bằng **một transform** trên `.stage`: `scale = min(vw/2560, vh/1280)`.

**Màu.** Nền chuyển từ xanh sáng `#2E6BC2` góc trên trái sang navy sâu `#0F145C` góc dưới phải, trên nền tối nhất `#061130`. Tiêu đề trắng; thuyết minh `#D5DEEA`; chú thích `#8E9EB5` rất ít dùng. Cyan `#A9D6FF` là màu nhấn chính. Xanh lá / cam / đỏ **chỉ** dùng khi có diễn giải (output, cần chú ý, rủi ro) — không tô mỗi card một màu. Tối đa **một** màu nhấn chính và **một** màu trạng thái trên một slide.

**Chữ.** Afacad cho toàn bộ keynote, fallback Inter/system. Cover 220px/800/LS −7.7px; statement 88–150px/800; eyebrow 32px/600/LS 4.5px; heading card 38–44px/700; body card 26–32px, line-height 1.4–1.45; số liệu 104px/800. Các cỡ này là **pixel thiết kế trên sân khấu gốc**, không phải font-size CSS cho layout 1366px.

**Khoảng trắng & lưới.** Lưới gợi ý 12 cột; slide kiến trúc hoặc hành trình dùng tỷ lệ 4/8 hoặc 5/7 để nhường diện tích cho sơ đồ. Grid 4 cột gap 36px cho bốn trụ cột cùng cấp. Giữ **tối thiểu 120px** khoảng trắng giữa các nhóm lớn. Tránh xếp thẻ đều khi quan hệ thực sự là chuỗi hay mạng.

**Nền & texture.** Không dùng ảnh full-bleed, không illustration vẽ tay, không pattern trang trí. Ba lớp duy nhất: gradient 135°, radial mesh mềm, và **lưới chấm** `radial-gradient(rgba(255,255,255,.08) 1.5px, transparent 1.5px)` bước `48px`, opacity .5. Lưới luôn nằm sau nội dung, không cắt qua chữ. Glow trung tâm thêm bằng radial gradient mềm opacity thấp.

**Card.** Glass card: fill `rgba(255,255,255,.06)`, viền 1px `rgba(255,255,255,.14)`, radius **24px**, shadow `0 20px 50px rgba(0,0,0,.35)`, padding `40px 36px`, gap nội dung 24px. Card kính chỉ tạo **tầng thứ hai** — không chồng ba hoặc bốn lớp kính. Node 20px, frame ảnh 32px, pill 999px.

**Trong suốt & blur.** Chỉ trên glass card, khung sản phẩm và thanh presenter (`backdrop-filter: blur(12px)` trên `rgba(6,17,48,.72)`). Không blur chữ, không blur toàn slide.

**Hover / focus.** Fill `.06 → .12`, viền `.14 → .30`, thêm glow nhẹ `0 0 48px rgba(169,214,255,.28)`. Không đổi màu chữ, không scale card, không nhấc bóng lên cao. **Press:** không có trạng thái nhấn riêng — đây là sân khấu, không phải UI cảm ứng.

**Focus khi kể chuyện.** Node/card được chọn tăng viền và glow; các node khác **giảm opacity xuống .45 nhưng vẫn đọc được tên**. Không ẩn hoàn toàn.

**Đường nối & sơ đồ.** Đường nối `rgba(255,255,255,.18)`, đường đã hoàn thành chuyển `#4ADE80`. Mọi node và edge cần nhãn: mũi tên phải nói rõ *dữ liệu gì*, *đầu ra gì*, hoặc *ai bàn giao cho ai*. Dùng SVG khi cần sơ đồ chính xác; DOM/CSS cho node/card. Không dùng một ảnh AI tạo ra để thay sơ đồ.

**Bóng.** Chỉ đổ bóng ngoài, chỉ một mức: `0 20px 50px rgba(0,0,0,.35)` cho card, `0 28px 64px rgba(0,0,0,.45)` cho khung sản phẩm. Không inner shadow. Không bevel.

**Protection.** Chữ trên ảnh dùng **scrim gradient** `linear-gradient(to top, rgba(6,17,48,.85), transparent)`, không dùng capsule mờ. Nhãn nhỏ trên nền phức tạp dùng pill `rgba(6,17,48,.75)` + viền `.30`.

**Phần tử cố định.** Rail trên (logo Base.vn + chip tên deck bên trái, counter bên phải) ở `top/left/right: padding`. Thanh presenter là pill căn giữa, cách đáy 40px, không cản vùng nội dung chính. Không có sidebar, không có footer.

**Ảnh & màu ảnh.** Chỉ dùng ảnh chụp sản phẩm hoặc video thật, tông **lạnh** để hòa với nền navy. Không grain, không duotone, không b&w. Không giả ảnh UI thành dữ liệu đã chạy thật — có nhãn `Demo mô phỏng` nếu mô phỏng.

**Animation.** Vào slide: fade + `translateY(24px)`, **500ms**, easing `cubic-bezier(.16,1,.3,1)`. Reveal theo click: **300ms**. Focus card/node: **200ms**. Không xoay toàn màn hình, không bounce, không hạt bay, không orbital line, không đường mạng chỉ để trông "AI". Data flow chỉ khi nó chỉ rõ nguồn và đích, và không chạy vô hạn. Nếu có background motion: rất chậm, tương phản thấp, tạm dừng khi cần đọc. Luôn tôn trọng `prefers-reduced-motion: reduce` và luôn có cách xem trạng thái cuối không cần animation.

**Đã thực thi ở đâu.** `base/stage.css` giữ `@keyframes rise-in` và khối `prefers-reduced-motion`. `SlideShell` có prop `animate` (mặc định bật) áp `.slide-enter` 500ms — đổi React key để phát lại khi sang slide. `GlassCard` có `reveal` + `delay`, stagger **80ms** mỗi card, tối đa bốn card. `GlassCard`, `AppCard`, `ServiceNode` chuyển state trong 200ms; `JourneyStep` chuyển opacity trong 200ms. Nhóm card **Motion** trong tab Design System chạy đúng ba mốc thời lượng để đối chiếu bằng mắt.

**Mỗi tương tác phải làm rõ một sự thật:** đối tượng thay đổi trạng thái, Service tạo Output, Output trở thành tín hiệu quản trị, Knowledge được tích lũy, hoặc Agent phối hợp với người dùng.

**Điều khiển.** `←/→` đổi slide (hoặc đổi **bước trong slide** nếu UI nói rõ, rồi mới sang slide); `Esc` thoát overlay/fullscreen; lưới slide để nhảy nhanh; notes riêng cho diễn giả; progress `hiện tại / tổng`; hash `#slide-n` để chia sẻ và reload đúng trang.

---

## ICONOGRAPHY

**Logomark ứng dụng Rework — dùng asset thật.** `assets/app-icons/` chứa **25 file SVG gốc** copy từ codebase: `admanager, automation, call, commerce, contract, customer, dispatch, dms, ebooking, event, fieldwork, flashsales, foundry, inventory, invoice, lead, live, mail, partner, prospector, radar, sales, social, store, success`. Đặc điểm: `viewBox="0 0 16 16"`, hình học đặc (không stroke), tô bằng linear-gradient chéo 45° giữa các cặp `#06B6D4 → #3B82F6 → #A855F7 → #F97316`. Dùng như `<img>`, bo góc 8–12px, kích thước 38–52px trên sân khấu. **Không tô lại màu, không vẽ lại.**

**Logo Base.vn.** `assets/logo-base-horizontal.png` (ngang, dùng cho rail và slide mở/kết), `logo-base-horizontal-lg.png` (bản lớn), `logo-base-mark.png` (chỉ mark hexagon), `logo-base-lockup-stacked.png` (mark + chữ xếp dọc), `assets/favicon.ico`. Đều là asset gốc do khách hàng cấp — dùng nguyên vẹn. **Không vẽ lại logo Base từ ký ức.**

**Icon giao diện (mũi tên, đồng hồ, micro, fullscreen).** Bộ icon nguồn **không có** trong tài liệu được cấp: không icon font, không sprite, không thư viện SVG giao diện. Hiện tại `PresenterControls` dùng ký tự unicode `←`, `→`, `⤢` cho các nút — đủ rõ trên sân khấu và không phải logo giả. **Nếu cần bộ icon giao diện đầy đủ**, đề xuất Lucide qua CDN (đơn nét, stroke 1.5–2px, hình học đồng nhất — khớp yêu cầu "đơn nét hoặc hình học đồng nhất" của brief). **Đây sẽ là một thay thế, không phải asset gốc** — cần khách hàng xác nhận.

**Emoji:** không dùng, ở bất kỳ đâu.

**Unicode làm icon:** chỉ cho mũi tên điều hướng và fullscreen trong thanh presenter. Không dùng unicode thay cho logomark hay cho node sơ đồ.

---

## Components

Đúng theo mục 4 của brief — đây là toàn bộ inventory, không thêm primitive nào mà nguồn không định nghĩa.

| Component | Nhóm | Vai trò |
| --- | --- | --- |
| `StageBackground` | `components/stage/` | Gradient + radial mesh + dot grid, luôn nằm sau nội dung |
| `SlideShell` | `components/stage/` | Sân khấu 2560×1280 có padding, nền và rail thương hiệu |
| `SectionEyebrow` | `components/typography/` | Nhãn viết hoa tracking rộng, dẫn vào một luận điểm |
| `StatementTitle` | `components/typography/` | Tiêu đề trắng đậm, một cụm tô cyan khi cần |
| `GlassCard` | `components/surfaces/` | Nhãn → tiêu đề → một câu; state default/active/dim |
| `Metric` | `components/surfaces/` | Số lớn → nhãn → nguồn dưới hairline |
| `AppCard` | `components/surfaces/` | App trong catalog: tên, appkey, nhóm, vai trò, logomark thật |
| `EvidenceFrame` | `components/surfaces/` | Ảnh/video sản phẩm thật trong khung, callout, nhãn demo |
| `ServiceNode` | `components/diagram/` | Một Service = một công việc có đầu ra |
| `JourneyStep` | `components/diagram/` | Bước, hành động, trạng thái, kết quả |
| `PresenterControls` | `components/presenter/` | Trước/sau, counter, lưới slide, tự chạy, notes, fullscreen |

**Intentional additions:** `SlideShell` — brief mục 8 yêu cầu tách `SlideShell` thành component tái sử dụng nhưng không mô tả nó ở bảng mục 4; đã dựng theo mô tả ở mục 8 (sân khấu + padding + rail).

Mỗi thư mục có `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md` và một card HTML hiển thị các state.

## Index

| Đường dẫn | Nội dung |
| --- | --- |
| `styles.css` | Entry point — chỉ gồm `@import` |
| `tokens/colors.css` | Nền, ink, accent, glass, alias ngữ nghĩa |
| `tokens/typography.css` | Afacad, thang chữ pixel sân khấu, weight, tracking |
| `tokens/spacing.css` | Sân khấu, thang khoảng cách, gap, lưới |
| `tokens/effects.css` | Radius, shadow, glow, blur, dot grid, scrim |
| `tokens/motion.css` | Easing và bốn mốc thời lượng |
| `tokens/fonts.css` | Nạp Afacad (xem CAVEAT về font file) |
| `base/stage.css` | `.stage`, `.slide`, `.grid-four`, `rise-in`, reduced-motion |
| `guidelines/*.card.html` | 23 specimen card cho tab Design System, gồm nhóm **Motion** chạy thật |
| `components/*/` | 11 component, xem bảng trên |
| `slides/` | Keynote mẫu 9 slide — `index.html` là bản click-through, xem `slides/README.md` |
| `templates/keynote/` | Template Design Component — khung keynote 4 slide để bắt đầu một bài mới |
| `templates/prospector-story/` | Template 7 slide: Prospector — từ một tin nhắn đến một việc đã được giao |
| `assets/` | Logo Base.vn, favicon, 25 logomark app Rework |
| `SKILL.md` | Bản Agent Skill để dùng ngoài project này |

## CAVEATS

- **Font file chưa có.** Afacad được nạp từ Google Fonts trong `tokens/fonts.css` (Afacad có bộ Việt hoá). Không có file `.woff2`/`.ttf` nào trong nguồn được cấp, nên trình biên dịch báo `Fonts: none`. Nếu có file được cấp phép, thay `@import` bằng `@font-face` trỏ tới binary trong `assets/fonts/`.
- **Keynote tham chiếu không đọc được bằng mã.** Mọi giá trị thị giác lấy từ brief, không phải từ CSS thật của trang.
- **Ảnh chụp Prospector đã có** (9 file trong `assets/shots/`, copy từ `Keynote 1/1. Prospector`). Các app khác vẫn chưa có ảnh — `EvidenceFrame` render placeholder `asset cần bổ sung` khi thiếu.
- **Bộ icon giao diện là chỗ trống có chủ ý** — xem mục ICONOGRAPHY.
