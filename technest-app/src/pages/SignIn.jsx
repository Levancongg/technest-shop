import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const API = import.meta.env.VITE_API_URL || ''

export default function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Đăng nhập thất bại')
        setLoading(false)
        return
      }
      login(data)
      navigate('/')
    } catch (err) {
      setError('Lỗi kết nối, vui lòng thử lại')
      setLoading(false)
    }
  }

  return (
    <main className="section">
      <div className="container auth-grid">
        <div className="auth-brand">
          <div className="brand-logo">TechNest</div>
        </div>
        <section className="auth-card card-elevated animate-slide">
          <h1>Welcome Back</h1>
          <p className="muted">Login in to your account</p>
          {error && <div className="error-msg">{error}</div>}
          <form className="form" onSubmit={onSubmit}>
            <label className="form-label">Email
              <input className="input" name="email" type="email" placeholder="Enter your email address" required disabled={loading} />
            </label>
            <label className="form-label">Password
              <div className="password-field">
                <input className="input" id="signin-pass" name="password" type="password" placeholder="Enter your password" required disabled={loading} />
                <button type="button" className="icon-btn" onClick={()=>{
                  const el = document.getElementById('signin-pass')
                  el.type = el.type==='password'?'text':'password'
                }}>👁️</button>
              </div>
            </label>
            <button className="btn-primary full" type="submit" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Sign in'}</button>
          </form>
          <p className="muted center" style={{marginTop:16}}>First time here? <Link to="/signup" className="link-primary">Signup</Link></p>
        </section>
      </div>
    </main>
  )
}
