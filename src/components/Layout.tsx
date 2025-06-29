import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, FileText, Palette, Search, Menu, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import WalletButton from './WalletButton'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const { isConnected } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Home, showWhenDisconnected: true },
    { name: 'Dashboard', href: '/dashboard', icon: Home, showWhenDisconnected: false },
    { name: 'Profile', href: '/profile', icon: User, showWhenDisconnected: false },
    { name: 'Credentials', href: '/credentials', icon: FileText, showWhenDisconnected: false },
    { name: 'NFT Identity', href: '/nft-identity', icon: Palette, showWhenDisconnected: false },
    { name: 'Verifier', href: '/verifier', icon: Search, showWhenDisconnected: false },
  ]

  const visibleNavigation = navigation.filter(item => 
    isConnected ? !item.showWhenDisconnected : item.showWhenDisconnected
  )

  const isHomePage = location.pathname === '/' || location.pathname === '/connect'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`${isHomePage ? 'bg-transparent absolute w-full z-50' : 'bg-white shadow-sm'} border-b ${isHomePage ? 'border-white/20' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${isHomePage ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} rounded-lg flex items-center justify-center`}>
                  <span className={`${isHomePage ? 'text-white' : 'text-white'} font-bold text-lg`}>D</span>
                </div>
                <span className={`text-2xl font-bold ${isHomePage ? 'text-white' : 'text-gray-900'}`}>
                  DeID
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {visibleNavigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? isHomePage 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-700'
                        : isHomePage
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <WalletButton />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-md ${isHomePage ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${isHomePage ? 'bg-blue-600/95 backdrop-blur-sm' : 'bg-white'} border-t ${isHomePage ? 'border-white/20' : 'border-gray-200'}`}>
            <div className="px-4 py-2 space-y-1">
              {visibleNavigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? isHomePage 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-700'
                        : isHomePage
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={isHomePage ? '' : 'pt-16'}>
        {children}
      </main>

      {/* Footer */}
      {isHomePage && (
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  <span className="text-2xl font-bold">DeID</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  Empowering individuals with secure, decentralized digital identity management. 
                  Take control of your credentials and personal data.
                </p>
                <div className="text-sm text-gray-500">
                  © 2024 DeID. All rights reserved.
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Features</div>
                  <div>Security</div>
                  <div>Documentation</div>
                  <div>API</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Help Center</div>
                  <div>Contact Us</div>
                  <div>Privacy Policy</div>
                  <div>Terms of Service</div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Layout