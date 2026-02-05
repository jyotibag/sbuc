import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Leaf, Gem, Palette, BadgeCheck } from 'lucide-react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

interface Banner {
  id: number
  title: string
  description: string
  image: string
  link: string
}

interface Category {
  id: number
  name: string
  slug: string
  image: string
}

const Home = () => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, categoriesRes, productsRes] = await Promise.all([
          api.get('/banners'),
          api.get('/categories'),
          api.get('/products/featured'),
        ])
        setBanners(bannersRes.data.data)
        setCategories(categoriesRes.data.data)
        setFeaturedProducts(productsRes.data.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {banners.length > 0 ? (
            <>
              <img
                src={banners[0].image}
                alt={banners[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#073b3a]/90 via-[#0b5d5b]/70 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500" />
          )}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-teal-300/30 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-mint/40 blur-3xl animate-float-slow" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.4em] text-teal-100/90">
                Santiniketan Atelier
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
                A Funky, Feminine
                <span className="block gradient-text">Teal Dream</span>
                of Handcrafted Luxury
              </h1>
              <p className="text-lg md:text-xl text-teal-100/90 max-w-xl">
                Curated artwear, jewelry, and heritage weaves inspired by the soulful rhythms of Santiniketan.
                Each piece is a story of hands, looms, and luminous color.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary">
                  Shop the Collection <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Our Story
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-teal-100/80">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" /> Authentic artisan-made
                </span>
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" /> Limited, curated drops
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="card p-6 glass">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <img
                    src={banners[0]?.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200'}
                    alt="SBUC featured"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-teal-600">Signature Piece</p>
                  <h3 className="text-2xl font-semibold text-gray-900">Santiniketan Loom Necklace</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Hand-beaten silver with teal enamel, inspired by Bengali folk motifs.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 card px-4 py-3 glass">
                <p className="text-xs uppercase tracking-[0.35em] text-teal-600">New Drop</p>
                <p className="text-sm font-semibold text-gray-900">Teal Festival Edit</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-teal-600">Curated Categories</p>
              <h2 className="text-4xl font-bold text-gray-900">Shop the Story</h2>
            </div>
            <p className="text-gray-600 max-w-xl">
              From heirloom jewelry to artful sarees, each category carries Santiniketan's feminine, artistic spirit.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="card group block overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-teal-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Santiniketan Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="card p-10"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-teal-600">Heritage & Heart</p>
              <h3 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
                Santiniketan, woven into every thread
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We collaborate with artisans who keep Bengal's folk artistry alive through kantha stitches, loom-woven
                cottons, and hand-hammered jewelry. Each piece honors slow craft, feminine elegance, and playful color.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass rounded-2xl p-4">
                  <Leaf className="w-6 h-6 text-teal-600" />
                  <p className="mt-2 text-sm font-semibold text-gray-900">Natural Materials</p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <Gem className="w-6 h-6 text-teal-600" />
                  <p className="mt-2 text-sm font-semibold text-gray-900">Handcrafted Details</p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <Palette className="w-6 h-6 text-teal-600" />
                  <p className="mt-2 text-sm font-semibold text-gray-900">Artistic Color</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="card p-6">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200"
                  alt="Artisan craft"
                  className="rounded-3xl w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 card px-4 py-3 glass">
                <p className="text-xs uppercase tracking-[0.3em] text-teal-600">Limited Batch</p>
                <p className="text-sm font-semibold text-gray-900">Made in Santiniketan</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-teal-600">Featured Edit</p>
              <h2 className="text-4xl font-bold text-gray-900">Our Premium Picks</h2>
            </div>
            <Link to="/shop" className="btn-secondary">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Premium Packaging',
                description: 'Soft satin wraps and hand-written notes, ready to gift.',
              },
              {
                title: 'Razorpay + COD',
                description: 'Pay securely online or choose Cash on Delivery.',
              },
              {
                title: 'Wishlist Magic',
                description: 'Save your favorites and return to them anytime.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8"
              >
                <h4 className="text-2xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="card p-10 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 text-white">
            <h2 className="text-3xl font-bold mb-4">Stay in the Teal Glow</h2>
            <p className="text-teal-100 mb-8">Get early access to drops, artisan stories, and festival edits.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-teal-700 px-6 py-3 rounded-full font-semibold hover:bg-teal-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
