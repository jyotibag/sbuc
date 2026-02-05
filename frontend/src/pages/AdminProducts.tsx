import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, PlusCircle } from 'lucide-react'
import api from '../services/api'
import PageHeader from '../components/PageHeader'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    handmade_description: '',
    price: '',
    discount_price: '',
    stock: '',
    sku: '',
    category_id: '',
    is_santiniketan: true,
    is_featured: false,
    is_active: true,
    image_urls: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/admin/products'),
        api.get('/categories'),
      ])
      setProducts(productsRes.data.data)
      setCategories(categoriesRes.data.data)
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        discount_price: formData.discount_price ? Number(formData.discount_price) : null,
        stock: Number(formData.stock || 0),
        category_id: Number(formData.category_id),
        image_urls: formData.image_urls
          .split(',')
          .map((url) => url.trim())
          .filter(Boolean),
      }
      await api.post('/admin/products', payload)
      setFormData({
        name: '',
        slug: '',
        description: '',
        handmade_description: '',
        price: '',
        discount_price: '',
        stock: '',
        sku: '',
        category_id: '',
        is_santiniketan: true,
        is_featured: false,
        is_active: true,
        image_urls: '',
      })
      fetchData()
    } catch (error) {
      console.error('Failed to create product:', error)
      alert('Failed to create product. Please check fields.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/admin/products/${id}`)
      fetchData()
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  return (
    <div>
      <PageHeader
        title="Admin Product Studio"
        subtitle="Create and curate the SBUC collection. Only admins can access this page."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCreate} className="card p-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-teal-600" /> Create Product
            </h2>
            <input
              className="input-field"
              placeholder="Product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              className="input-field"
              placeholder="Slug (optional)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <textarea
              className="input-field"
              placeholder="Handmade description"
              rows={2}
              value={formData.handmade_description}
              onChange={(e) => setFormData({ ...formData, handmade_description: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="input-field"
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <input
                className="input-field"
                placeholder="Discount price"
                type="number"
                value={formData.discount_price}
                onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="input-field"
                placeholder="Stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
            <select
              className="input-field"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              className="input-field"
              placeholder="Image URLs (comma separated)"
              value={formData.image_urls}
              onChange={(e) => setFormData({ ...formData, image_urls: e.target.value })}
            />
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_santiniketan}
                  onChange={(e) => setFormData({ ...formData, is_santiniketan: e.target.checked })}
                />
                Santiniketan
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </label>
            </div>
            <button className="btn-primary w-full" type="submit">
              Save Product
            </button>
          </form>

          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">Current Products</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {products.map((product: any) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between border-b border-teal-100 pb-3"
                  >
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">₹{product.price}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
