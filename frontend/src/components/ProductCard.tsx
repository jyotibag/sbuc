import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import api from '../services/api'

interface ProductCardProps {
  product: {
    id: number
    name: string
    slug: string
    price: number
    discount_price?: number
    final_price: number
    discount_percentage: number
    primary_image?: string
    images?: Array<{ image_url: string }>
    in_wishlist?: boolean
    is_santiniketan?: boolean
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [inWishlist, setInWishlist] = useState(product.in_wishlist || false)
  const [addingToCart, setAddingToCart] = useState(false)
  const { user } = useAuth()
  const { addToCart } = useCart()

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      window.location.href = '/login'
      return
    }
    try {
      await api.post(`/wishlist/toggle/${product.id}`)
      setInWishlist(!inWishlist)
    } catch (error) {
      console.error('Failed to toggle wishlist:', error)
    }
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      window.location.href = '/login'
      return
    }
    setAddingToCart(true)
    try {
      await addToCart(product.id, 1)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setAddingToCart(false)
    }
  }

  const imageUrl = product.primary_image || product.images?.[0]?.image_url || '/placeholder.jpg'

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="card group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.discount_percentage > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{product.discount_percentage}%
            </span>
          )}
          {product.is_santiniketan && (
            <span className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Santiniketan
            </span>
          )}
          <button
            onClick={handleWishlistToggle}
            className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-teal-50"
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-teal-600">₹{product.final_price}</span>
              {product.discount_price && (
                <span className="text-sm text-gray-500 line-through ml-2">₹{product.price}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
