import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'technest_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '{}') } catch { return {} }
  })

  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(items)) }, [items])

  const actions = useMemo(() => ({
    add(id, qty = 1) { setItems(prev => ({ ...prev, [id]: (prev[id] || 0) + qty })) },
    set(id, qty) { setItems(prev => { const p = { ...prev }; if (qty <= 0) delete p[id]; else p[id] = qty; return p }) },
    remove(id) { setItems(prev => { const p = { ...prev }; delete p[id]; return p }) },
    clear() { setItems({}) }
  }), [])

  const count = Object.values(items).reduce((a,b)=>a+Number(b),0)

  return (
    <CartContext.Provider value={{ items, count, ...actions }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }
