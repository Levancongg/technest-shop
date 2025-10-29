import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const USER_KEY = 'tn_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null') } catch { return null }
  })

  useEffect(() => { localStorage.setItem(USER_KEY, JSON.stringify(user)) }, [user])

  const value = useMemo(() => ({
    user,
    login(userData) { setUser(userData) },
    logout() { setUser(null) }
  }), [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
