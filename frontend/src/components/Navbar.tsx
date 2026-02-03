import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import Logo from './Logo'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cartCount } = useCart()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className="h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Shop
            </Link>
            {user ? (
              <>
                <Link to="/wishlist" className="relative text-gray-700 hover:text-teal-600 transition-colors">
                  <Heart className="w-6 h-6" />
                </Link>
                <Link to="/cart" className="relative text-gray-700 hover:text-teal-600 transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
                    <User className="w-6 h-6" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-teal-50">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-teal-50">Orders</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50">Logout</button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-teal-600">Home</Link>
            <Link to="/shop" className="block text-gray-700 hover:text-teal-600">Shop</Link>
            {user ? (
              <>
                <Link to="/wishlist" className="block text-gray-700 hover:text-teal-600">Wishlist</Link>
                <Link to="/cart" className="block text-gray-700 hover:text-teal-600">
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                <Link to="/profile" className="block text-gray-700 hover:text-teal-600">Profile</Link>
                <Link to="/orders" className="block text-gray-700 hover:text-teal-600">Orders</Link>
                <button onClick={logout} className="block text-gray-700 hover:text-teal-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block btn-primary text-center">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
