import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Category() {
  const { cat } = useParams()
  const { add } = useCart()
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${API}/api/products?cat=${cat}`)
      .then(r => r.json()).then(setItems)
  }, [cat])

  return (
    <main className="section">
      <div className="container">
        <h1>{cat === 'all' ? 'Tất cả sản phẩm' : cat}</h1>
        <div className="grid">
          {items.map(p => (
            <article className="product-card" key={p.id}>
              <Link className="card-link" to={`/product/${p.id}`}>
                <div className="product-media"><img src={p.image} alt={p.name} /></div>
                <h3>{p.name}</h3>
                <p>{p.specs}</p>
                <div className="price">{(p.price).toLocaleString('vi-VN')}₫</div>
              </Link>
              <button className="btn-primary" onClick={() => add(p.id, 1)}>Thêm vào giỏ</button>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
