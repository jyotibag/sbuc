import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import api from '../services/api'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    shipping_name: '',
    shipping_email: '',
    shipping_mobile: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_pincode: '',
    shipping_country: 'India',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/orders', {
        ...formData,
        payment_method: paymentMethod,
      })
      clearCart()
      navigate(`/orders/${response.data.data.id}`)
    } catch (error) {
      console.error('Failed to create order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
        <a href="/shop" className="btn-primary">Start Shopping</a>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={formData.shipping_name}
                onChange={(e) => setFormData({ ...formData, shipping_name: e.target.value })}
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email *"
                required
                value={formData.shipping_email}
                onChange={(e) => setFormData({ ...formData, shipping_email: e.target.value })}
                className="input-field"
              />
              <input
                type="tel"
                placeholder="Mobile *"
                required
                value={formData.shipping_mobile}
                onChange={(e) => setFormData({ ...formData, shipping_mobile: e.target.value })}
                className="input-field"
              />
              <input
                type="text"
                placeholder="City *"
                required
                value={formData.shipping_city}
                onChange={(e) => setFormData({ ...formData, shipping_city: e.target.value })}
                className="input-field"
              />
              <input
                type="text"
                placeholder="State *"
                required
                value={formData.shipping_state}
                onChange={(e) => setFormData({ ...formData, shipping_state: e.target.value })}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Pincode *"
                required
                value={formData.shipping_pincode}
                onChange={(e) => setFormData({ ...formData, shipping_pincode: e.target.value })}
                className="input-field"
              />
            </div>
            <textarea
              placeholder="Address *"
              required
              value={formData.shipping_address}
              onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
              className="input-field mt-4"
              rows={3}
            />
            <textarea
              placeholder="Order Notes (Optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field mt-4"
              rows={2}
            />
          </div>

          {/* Payment Method */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mr-4"
                />
                <Truck className="w-6 h-6 mr-4" />
                <div>
                  <div className="font-semibold">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">Pay when you receive</div>
                </div>
              </label>
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                  className="mr-4"
                />
                <CreditCard className="w-6 h-6 mr-4" />
                <div>
                  <div className="font-semibold">Online Payment</div>
                  <div className="text-sm text-gray-600">Pay securely online</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>₹{item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹0.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-teal-600">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 disabled:opacity-50"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
