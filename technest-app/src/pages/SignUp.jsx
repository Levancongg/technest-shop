import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export default function SignUp() {
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
      const res = await fetch(`${API_BASE ? API_BASE : ''}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fd.get('name'), email: fd.get('email'), password: fd.get('password') })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Đăng ký thất bại')
        setLoading(false)
        return
      }
      // Redirect to sign-in after successful registration
      navigate('/signin', { replace: true, state: { notice: 'Đăng ký thành công. Vui lòng đăng nhập.' } })
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
          <h1>Create an account</h1>
          <p className="muted">Let's create your account</p>
          {error && <div className="error-msg">{error}</div>}
          <form className="form" onSubmit={onSubmit}>
            <label className="form-label">Full name
              <input className="input" name="name" type="text" placeholder="Enter your full name" required disabled={loading} />
            </label>
            <label className="form-label">Email
              <input className="input" name="email" type="email" placeholder="Enter your email address" required disabled={loading} />
            </label>
            <label className="form-label">Password (min 6 characters)
              <div className="password-field">
                <input className="input" id="signup-pass" name="password" type="password" placeholder="Enter your password" required minLength={6} disabled={loading} />
                <button type="button" className="icon-btn" onClick={()=>{
                  const el = document.getElementById('signup-pass')
                  el.type = el.type==='password'?'text':'password'
                }}>👁️</button>
              </div>
            </label>
            <button className="btn-primary full" type="submit" disabled={loading}>{loading ? 'Đang tạo tài khoản...' : 'Sign Up'}</button>
          </form>
          <p className="muted center" style={{marginTop:16}}>Already a member? <Link to="/signin" className="link-primary">Sign in</Link></p>
        </section>
      </div>
    </main>
  )
}
