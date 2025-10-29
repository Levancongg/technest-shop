import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <header className="site-header">
      <div className="header-bar container">
        <Link className="logo" to="/">TechNest</Link>
        <nav className="main-nav" aria-label="Chính">
          <ul>
            <li><NavLink to="/category/all" className={({isActive})=>isActive?'active':''}>Catalog</NavLink></li>
            <li><NavLink to="/category/phone" className={({isActive})=>isActive?'active':''}>Phone</NavLink></li>
            <li><NavLink to="/category/laptop" className={({isActive})=>isActive?'active':''}>Laptop</NavLink></li>
            <li><NavLink to="/category/screen" className={({isActive})=>isActive?'active':''}>Screen</NavLink></li>
            <li><NavLink to="/category/headphone" className={({isActive})=>isActive?'active':''}>Headphones</NavLink></li>
            <li><NavLink to="/category/accessories" className={({isActive})=>isActive?'active':''}>Accessories</NavLink></li>
          </ul>
        </nav>
        <div className="header-actions">
          {!user && <Link className="btn-ghost" to="/signin">Đăng nhập</Link>}
          {user && (
            <>
              <span style={{color:'var(--muted)',fontSize:14}}>{user.name}</span>
              <button className="btn-ghost" onClick={()=>{ logout(); navigate('/') }}>Đăng xuất</button>
            </>
          )}
          <Link className="btn-primary" to="/cart">Giỏ hàng ({count})</Link>
        </div>
      </div>
    </header>
  )
}
