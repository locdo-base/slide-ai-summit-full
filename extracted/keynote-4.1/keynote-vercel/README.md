# Keynote 2 — "Xây dựng AI chuyên biệt cho doanh nghiệp"

Enterprise AI Summit 2026 · 10 slides · bản chạy offline, không cần mạng.

## Mở như thế nào

Double-click `index.html`. Hết.

Không cần cài gì, không cần internet, không cần server. Chữ, font, logo, biểu đồ
đều nằm trong thư mục này. Chrome hoặc Edge đều chạy đúng; nên dùng Chrome.

**Giữ nguyên cả thư mục.** `index.html` cần thư mục `assets/` nằm cạnh nó. Nếu
chỉ copy mỗi file HTML thì mất font, logo và toàn bộ định dạng.

Bản online: https://keynote2-2.summit.base.vn (có thể cũ hơn thư mục này).

## Trình chiếu

| phím | tác dụng |
|---|---|
| `→` `PageDown` `Space` · click nửa phải màn hình | bước tiếp |
| `←` `PageUp` · click nửa trái | lùi lại |
| `Home` / `End` | slide đầu / slide cuối |
| `N` | ghi chú cho người trình bày |
| `S` | chế độ tĩnh — hiện hết mọi thứ, tắt hiệu ứng |
| `B` | khung blueprint (chỉ để soát bố cục) |
| `F11` | toàn màn hình (chức năng của trình duyệt) |

Mỗi slide có thể gồm nhiều bước: `→` chạy hết các bước của slide rồi mới sang
slide sau. Slide 4, 5, 6, 8, 9 có 2 bước — các cột so sánh hiện trước, cột kết
quả của mình mọc lên ở bước sau.

Mở thẳng một slide: thêm `#5` vào cuối địa chỉ. Bỏ khung blueprint: thêm `?plain`.

## Nếu có sự cố lúc trình bày

1. Bấm `S` — hiện khung hình hoàn chỉnh, tắt mọi chuyển động.
2. Vẫn lỗi: mở `index.html` bằng trình duyệt khác (Edge có sẵn trên mọi máy Windows).
3. Cần bản in: `Ctrl+P` → xuất PDF. Bản in luôn hiện đầy đủ mọi cột.

## Cấu trúc thư mục

```
index.html              toàn bộ nội dung slide
assets/keynote.css      toàn bộ định dạng và hiệu ứng
assets/keynote.js       điều hướng, bước hiện nội dung, ghi chú
assets/fonts.css        khai báo font
assets/fonts/           Be Vietnam Pro + IBM Plex Mono (18 file woff2)
assets/logos/           logo ChatGPT, Gemini, Claude (slide 9)
```

Sửa nội dung chữ và số: trong `index.html`. Sửa màu, cỡ chữ, hiệu ứng: trong
`assets/keynote.css`. Sau khi sửa, lưu file rồi bấm F5 trên trình duyệt.

Mã nguồn: https://github.com/long-unicam/ai-keynote-2026
