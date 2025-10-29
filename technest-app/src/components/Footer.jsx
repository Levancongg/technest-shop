export default function Footer() {
  return (
    <footer className="site-footer" style={{marginTop:40}}>
      <div className="container footer-inner" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:20,padding:'24px 0'}}>
        <div>
          <a className="logo" href="/">TechNest</a>
          <p>Premium tech shopping.</p>
        </div>
        <nav className="footer-nav" aria-label="Liên kết nhanh" style={{display:'grid',gap:8,color:'#6b7280'}}>
          <a href="/category/all">Catalog</a>
          <a href="/category/phone">Phone</a>
          <a href="/category/laptop">Laptop</a>
          <a href="/category/screen">Screen</a>
          <a href="/category/headphone">Headphone</a>
          <a href="/category/accessories">Accessories</a>
        </nav>
        <form className="newsletter" action="#" method="post" style={{display:'grid',gap:8}}>
          <label>Nhận tin khuyến mãi</label>
          <div className="newsletter-row" style={{display:'flex',gap:8}}>
            <input type="email" placeholder="Email của bạn" required style={{flex:1,padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:12}} />
            <button className="btn-primary" type="submit">Đăng ký</button>
          </div>
        </form>
      </div>
      <div className="container" style={{paddingBottom:16}}>© 2025 TechNest</div>
      <div className="contact-bar">
        <div className="container row">
          <strong>Nhận tin khuyến mãi</strong>
          <input className="input" type="email" placeholder="Email của bạn" style={{flex:1}} />
          <button className="btn-primary" type="button">Đăng ký</button>
        </div>
      </div>
    </footer>
  )
}
