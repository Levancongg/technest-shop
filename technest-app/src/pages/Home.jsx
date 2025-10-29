import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Home() {
  const { add } = useCart()
  const [products, setProducts] = useState({})

  useEffect(() => {
    const cats = ['phone', 'laptop', 'screen', 'headphone', 'accessories']
    cats.forEach(cat => {
      fetch(`${API}/api/products?cat=${cat}`)
        .then(r => r.json())
        .then(list => setProducts(prev => ({ ...prev, [cat]: list.slice(0, 4) })))
    })
  }, [])

  const sections = [
    { id: 'phone', title: 'Phone', cat: 'phone' },
    { id: 'laptop', title: 'Laptop', cat: 'laptop' },
    { id: 'screen', title: 'Screen', cat: 'screen' },
    { id: 'headphone', title: 'Headphones', cat: 'headphone' },
    { id: 'accessories', title: 'Accessories', cat: 'accessories' }
  ]

  return (
    <main>
      <section className="section hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>Thiết bị công nghệ mới nhất</h1>
            <p>Khám phá smartphone, laptop, màn hình, tai nghe và phụ kiện chính hãng.</p>
            <div className="hero-actions">
              <Link className="btn-primary" to="/category/all">Mua ngay</Link>
            </div>
          </div>
          <div className="hero-media" aria-hidden="true"><div className="hero-card" /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Featured Categories</h2>
          <div className="catalog-grid">
            <Link className="catalog-card" to="/category/phone">Smartphones</Link>
            <Link className="catalog-card" to="/category/laptop">Laptops</Link>
            <Link className="catalog-card" to="/category/screen">Screens</Link>
            <Link className="catalog-card" to="/category/headphone">Headphones</Link>
            <Link className="catalog-card" to="/category/accessories">Accessories</Link>
          </div>
        </div>
      </section>

      {sections.map(({ id, title, cat }) => (
        products[cat]?.length > 0 && (
          <section key={id} className="section product-section">
            <div className="container">
              <div className="section-head">
                <h2>{title}</h2>
                <Link className="btn-ghost" to={`/category/${cat}`}>View all →</Link>
              </div>
              <div className="product-row">
                {products[cat].map(p => (
                  <article className="product-card" key={p.id}>
                    <Link className="card-link" to={`/product/${p.id}`}>
                      <div className="product-media">
                        <img src={p.image} alt={p.name} />
                      </div>
                      <h3>{p.name}</h3>
                      <p>{p.specs}</p>
                      <div className="price">{(p.price).toLocaleString('vi-VN')}₫</div>
                    </Link>
                    <button className="btn-primary" onClick={() => add(p.id, 1)}>Add to cart</button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )
      ))}
    </main>
  )
}
