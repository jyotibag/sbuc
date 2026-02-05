import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="bg-gradient-to-br from-[#063c3a] via-[#0c5a57] to-[#128f88] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1">
              <Logo className="h-16 w-auto mb-4" />
              <p className="text-teal-100 text-sm">
                Santiniketan-crafted fashion, jewelry, and artwear with soulful Bengali elegance.
              </p>
              <div className="mt-4 text-xs uppercase tracking-[0.3em] text-teal-200">
                Teal - Aqua - Mint
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-teal-100 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/shop" className="text-teal-100 hover:text-white transition-colors">Shop</Link></li>
                <li><Link to="/about" className="text-teal-100 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-teal-100 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Care</h3>
              <ul className="space-y-2">
                <li className="text-teal-100">Shipping & Returns</li>
                <li className="text-teal-100">Size Guide</li>
                <li className="text-teal-100">Handmade Promise</li>
                <li className="text-teal-100">Payments: Razorpay + COD</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="mailto:info@sbuc.com" className="text-teal-100 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <p className="text-teal-100 text-sm">
                (c) 2026 SBUC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
