import { Mail, Phone, MapPin } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const Contact = () => {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="We're here to help with orders, custom requests, and styling advice."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card p-8">
            <h2 className="text-2xl font-bold mb-6">Send a message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-field" placeholder="Your name" />
                <input className="input-field" placeholder="Email address" type="email" />
              </div>
              <input className="input-field" placeholder="Subject" />
              <textarea className="input-field" rows={5} placeholder="Tell us about your request" />
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">hello@sbuc.com</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-semibold">Studio</p>
                  <p className="text-gray-600">Santiniketan, West Bengal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
