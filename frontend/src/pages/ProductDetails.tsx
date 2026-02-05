import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft, BadgeCheck } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import ProductCard from '../components/ProductCard'
import PageHeader from '../components/PageHeader'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [inWishlist, setInWishlist] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { addToCart } = useCart()

  useEffect(() => {
    if (id) {
      fetchProduct()
      fetchRelatedProducts()
    }
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data.data)
      setInWishlist(response.data.data.in_wishlist || false)
      if (response.data.data.images?.length > 0) {
        setSelectedImage(0)
      }
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await api.get(`/products/${id}/related`)
      setRelatedProducts(response.data.data)
    } catch (error) {
      console.error('Failed to fetch related products:', error)
    }
  }

  const handleWishlistToggle = async () => {
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

  const handleAddToCart = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }
    try {
      await addToCart(product.id, quantity)
      alert('Product added to cart!')
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>
  }

  const images = product.images || []
  const currentImage = images[selectedImage]?.image_url || product.primary_image

  return (
    <div>
      <PageHeader
        title={product.name}
        subtitle="Artisan-crafted with Santiniketan inspiration."
      >
        <Link to="/shop" className="inline-flex items-center text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Shop
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden mb-4 shadow-lg">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 ${
                      selectedImage === index ? 'border-teal-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            {product.is_santiniketan && (
              <span className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <BadgeCheck className="w-4 h-4" /> Santiniketan Handmade
              </span>
            )}
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-teal-600">₹{product.final_price}</span>
                {product.discount_price && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">₹{product.price}</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{product.discount_percentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {product.handmade_description && (
                <div className="glass p-4 rounded-2xl mb-4">
                  <p className="text-teal-800">{product.handmade_description}</p>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border-2 border-teal-100 rounded-2xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 rounded-2xl border-2 ${
                    inWishlist
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-200 hover:border-teal-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${inWishlist ? 'fill-red-500' : ''}`} />
                </button>
              </div>
            </div>

            <div className="border-t border-teal-100 pt-6">
              <p className="text-sm text-gray-600">
                <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </p>
              {product.sku && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>SKU:</strong> {product.sku}
                </p>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="pb-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link to="/shop" className="text-teal-600 hover:text-teal-700">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
