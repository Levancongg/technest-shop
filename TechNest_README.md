# 🛍️ TechNest – E-commerce UI Documentation

## 🔎 Tổng quan
**TechNest** là website thương mại điện tử bán thiết bị công nghệ: **điện thoại, laptop, màn hình, tai nghe, và phụ kiện**.  
Thiết kế hiện đại, tối giản, dễ mở rộng và responsive cho cả desktop & mobile.

---

## 🎨 Phong cách thiết kế

### 🅰️ Phông chữ
- **Loại:** Sans-serif (hiện đại, công nghệ, dễ đọc)  
- **Tiêu đề:** `Poppins` hoặc `Urbanist`, font đậm **600–700**, chữ lớn, mang phong cách “tech brand”.  
- **Thân bài:** `Inter`, `Roboto`, hoặc `Plus Jakarta Sans`, độ dày **400–500**, line-height 1.5–1.65.  
- **Khoảng cách chữ:** hơi nén với tiêu đề, chữ thân bài cân đối, không giãn.  
- **Cảm giác tổng thể:** tối giản, sáng sủa, hiện đại, thân thiện.

---

### 🎨 Bảng màu (Color Palette)
| Màu | Mô tả | Mã HEX |
|------|--------|---------|
| 🩶 Nền sáng | Background | `#F5F7FB` |
| ⚪ Bề mặt thẻ | Surface | `#FFFFFF` |
| 🖤 Văn bản chính | Text Primary | `#0F172A` |
| 🩳 Văn bản phụ | Muted / Secondary | `#6B7280` |
| 🔵 Màu nhấn chính (CTA) | Accent / Primary | `#2563EB` |
| 💙 Màu nhấn phụ | Accent secondary | `#22D3EE` |
| ⚫ Nút chính | Primary Button | `#0F172A` |
| ⚫ Hover nút | Primary Hover | `#1F2937` |
| ⚫ Viền nhẹ | Border | `#E5E7EB` |

- **Phối màu:** Tông **lạnh**, sáng, hiện đại, gợi cảm giác tin cậy.  
- **Mức tương phản cao** giữa nút CTA đen/navy và nền trắng giúp nổi bật hành động.  
- **Phong cách tổng thể:** Tươi sáng, thanh lịch, chuyên nghiệp.

---

### 🧭 Phong cách giao diện
- **Bo góc lớn (radius 16–20px)**, shadow nhẹ.  
- **Layout thoáng**, nhiều khoảng trắng.  
- **Icon và typography rõ ràng**, ưu tiên tính dễ dùng hơn trang trí.  
- **Tổng thể:** *Modern Tech Minimalism.*

---

## 🧱 Cấu trúc & Bố cục

### Bố cục tổng thể
```
<header>     → Logo | Nav | Search | CTA
  └─ Hero    → Tiêu đề, mô tả, nút CTA, hình ảnh sản phẩm nổi bật
<main>
  ├─ Catalog Section   → Danh mục chính (grid)
  ├─ Product Sections  → Smartphone, Laptop, Screen, Headphone, Accessories
  ├─ Contact Section   → Form liên hệ
<footer>     → Logo, liên kết nhanh, đăng ký nhận tin
```

### Giải thích vai trò các phần
| Thành phần | Mục đích |
|-------------|-----------|
| **Header** | Định hướng chính, truy cập nhanh danh mục & tìm kiếm |
| **Hero Section** | Gây ấn tượng đầu tiên, thể hiện sản phẩm nổi bật và CTA |
| **Catalogs** | Danh mục sản phẩm theo nhóm |
| **Product Rows** | Hiển thị sản phẩm có thể cuộn ngang (horizontal scroll) |
| **Contact Form** | Gửi tin nhắn đến đội ngũ hỗ trợ |
| **Footer** | Liên kết, logo, newsletter, bản quyền |

---

## 🧩 HTML Outline Gợi Ý

```html
<header class="site-header">
  <div class="header-bar">
    <a class="logo">TechNest</a>
    <nav class="main-nav">
      <ul>
        <li><a href="#catalog">Catalog</a></li>
        <li><a href="#phone">Phone</a></li>
        <li><a href="#laptop">Laptop</a></li>
        <li><a href="#screen">Screen</a></li>
        <li><a href="#headphone">Headphone</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      <input type="search" placeholder="Tìm sản phẩm...">
      <button>Đăng nhập</button>
      <button class="btn-primary">Giỏ hàng (0)</button>
    </div>
  </div>
</header>

<main>
  <section id="hero">...</section>
  <section id="catalog">...</section>
  <section id="phone">...</section>
  <section id="laptop">...</section>
  <section id="screen">...</section>
  <section id="headphone">...</section>
  <section id="accessories">...</section>
  <section id="contact">...</section>
</main>

<footer>...</footer>
```

---

## 🧠 Tổ chức CSS
- **Công nghệ:** CSS thuần, ưu tiên **Flexbox** và **CSS Grid**.  
- **Quy ước:**
  - `.section` cho từng phần.
  - `.container` giới hạn chiều rộng.
  - `.product-row` cuộn ngang bằng `overflow-x:auto`.
  - `.btn`, `.btn-primary`, `.btn-ghost` cho các kiểu nút.
- **Responsive:**
  - `@media (max-width: 1024px)` → 1 cột hero, 4 cột catalog.
  - `@media (max-width: 720px)` → menu dạng toggle, catalog 2 cột, ẩn bớt CTA.

---

## 🧑‍💻 Gợi ý mã CSS nền tảng

```css
:root {
  --bg: #f5f7fb;
  --surface: #fff;
  --text: #0f172a;
  --muted: #6b7280;
  --accent: #2563eb;
  --border: #e5e7eb;
  --radius: 16px;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Poppins", var(--font-sans);
}
body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
}
h1, h2 {
  font-family: var(--font-display);
  font-weight: 600;
}
.btn-primary {
  background: var(--text);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  padding: 10px 16px;
}
```

---

## ⚙️ JavaScript cơ bản
- **Menu Mobile:** toggle class `.show` khi click nút ☰.  
- **Dialog (Sign in):** dùng `<dialog>` mở/đóng bằng JS.  
- **Product scroll:** cuộn ngang hàng sản phẩm khi lăn chuột.

---

## 🗂️ Đề xuất Font & Màu thực tế
| Mục đích | Font | Ví dụ thay thế |
|-----------|-------|----------------|
| Tiêu đề | Poppins 600–700 | Urbanist, Outfit |
| Nội dung | Inter 400–500 | Roboto, Plus Jakarta Sans |
| Accent | Màu xanh lam | `#2563EB` |
| Hover / Focus | Đậm hơn | `#1F2937` |

---

## 📘 Tổng kết
- **Phong cách:** hiện đại, tối giản, lấy cảm hứng từ Apple Store & tech eCommerce.  
- **Ưu tiên UX:** nhiều khoảng trắng, hình sản phẩm lớn, hành động nổi bật.  
- **Dễ mở rộng:** có thể tích hợp React, Tailwind, hoặc CMS như Next.js về sau.  
- **Mục tiêu:** tạo cảm giác “premium tech shopping” – nhẹ, tinh tế, chuyên nghiệp.

---

👉 Lưu file này thành `README.md` trong thư mục dự án TechNest.
