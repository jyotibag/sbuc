import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import api from '../services/api'
import { useAuth } from './AuthContext'

interface CartItem {
  id: number
  product: {
    id: number
    name: string
    price: number
    discount_price?: number
    images: Array<{ image_url: string }>
  }
  quantity: number
  subtotal: number
}

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (productId: number, quantity: number) => Promise<void>
  updateCart: (cartId: number, quantity: number) => Promise<void>
  removeFromCart: (cartId: number) => Promise<void>
  clearCart: () => Promise<void>
  fetchCart: () => Promise<void>
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCart([])
    }
  }, [user])

  const fetchCart = async () => {
    if (!user) return
    setLoading(true)
    try {
      const response = await api.get('/cart')
      setCart(response.data.data)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: number, quantity: number) => {
    try {
      await api.post('/cart', { product_id: productId, quantity })
      await fetchCart()
    } catch (error) {
      console.error('Failed to add to cart:', error)
      throw error
    }
  }

  const updateCart = async (cartId: number, quantity: number) => {
    try {
      await api.put(`/cart/${cartId}`, { quantity })
      await fetchCart()
    } catch (error) {
      console.error('Failed to update cart:', error)
      throw error
    }
  }

  const removeFromCart = async (cartId: number) => {
    try {
      await api.delete(`/cart/${cartId}`)
      await fetchCart()
    } catch (error) {
      console.error('Failed to remove from cart:', error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      await api.delete('/cart')
      setCart([])
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0)

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      cartTotal,
      addToCart,
      updateCart,
      removeFromCart,
      clearCart,
      fetchCart,
      loading,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
