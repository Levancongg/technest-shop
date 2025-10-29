# TechNest React + API

[Legacy] Thư mục `technest/` chứa bản HTML/CSS thuần để tham khảo UI. Bản chạy chính thức là React trong `technest-app/`.

## Cấu trúc
- technest-app/ — Frontend React (Vite + React Router)
- technest-api/ — Backend Node/Express (REST API)

## Chạy backend
```bash
cd "PBL - Dự án công nghệ phần mềm /technest-api"
npm install
npm run dev # http://localhost:4000
```

API chính:
- GET /api/products?cat=phone|laptop|...|all
- GET /api/products/:id
- POST /api/orders { items:[{id,qty}], address:[...], payment }
- GET /api/orders/:id

## Chạy frontend
```bash
cd "PBL - Dự án công nghệ phần mềm /technest-app"
npm install
# API URL (mặc định http://localhost:4000)
echo 'VITE_API_URL=http://localhost:4000' > .env.local
npm run dev # http://localhost:5173
```

## Ghi chú
- Giỏ hàng lưu localStorage, đặt hàng gọi POST /api/orders, chuyển đến /order-success/:id.
- Style được port từ phiên bản HTML gốc.
