import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import api from '../services/api'
import Logo from '../components/Logo'
import PageHeader from '../components/PageHeader'

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchOrder = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/orders/${id}`)
      setOrder(response.data.data)
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!order) {
    return <div className="text-center py-12">Order not found</div>
  }

  return (
    <div>
      <PageHeader
        title={`Order #${order.order_number}`}
        subtitle="Your Santiniketan treasures are being prepared with care."
      >
        <Link to="/orders" className="inline-flex items-center text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Orders
        </Link>
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="card p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <Logo className="h-12 w-auto" />
            <button
              onClick={() => window.print()}
              className="btn-secondary inline-flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" /> Print Invoice
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
              <p className="text-gray-700">{order.shipping_name}</p>
              <p className="text-gray-700">{order.shipping_email}</p>
              <p className="text-gray-700">{order.shipping_mobile}</p>
              <p className="text-gray-700 mt-2">
                {order.shipping_address}, {order.shipping_city}
              </p>
              <p className="text-gray-700">
                {order.shipping_state} - {order.shipping_pincode}, {order.shipping_country}
              </p>
            </div>
            <div className="text-left md:text-right">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <p className="text-gray-700">Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <p className="text-gray-700">Payment: {order.payment_method.toUpperCase()}</p>
              <p className="text-gray-700">Status: {order.status}</p>
            </div>
          </div>

          <div className="border-t border-teal-100 pt-6">
            <h3 className="text-lg font-semibold mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product_image || '/placeholder.jpg'}
                      alt={item.product_name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.product_name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">₹{item.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-teal-100 mt-6 pt-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-teal-600">₹{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
