'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { CartDrawer } from './CartDrawer'
import { NAVIGATION } from '../lib/constants'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Navbar({ isHomePage }: { isHomePage: boolean }) {
  const { cart, openCart, closeCart, isCartOpen } = useCart()
  const { language, toggleLanguage } = useLanguage()
  const { isAuthenticated, logout } = useAuth()
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isHomePage) {
      setIsScrolled(latest > 100)
    }
  })

  const handleCartClick = () => {
    isCartOpen ? closeCart() : openCart()
  }

  const navbarHeight = isScrolled ? 'h-16' : 'h-20';
  const logoSize = isScrolled ? 'w-8 h-8' : 'w-10 h-10';

  const linkVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95, y: 0 }
  }

  const underlineVariants = {
    initial: { width: 0 },
    hover: { width: '100%' }
  }

  return (
    <motion.nav 
      className={`navbar fixed left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 w-full`}
      style={{ 
        top: isHomePage ? '32px' : '0',
        height: isScrolled && isHomePage ? '64px' : '80px',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <div className={`max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8`}>
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_99percent-uzPludLQQqzrh2i8Ezvjj9w2T9HD7N.png"
            alt="99 Percent Logo"
            width={40}
            height={40}
            className={`${logoSize} transition-all duration-300`}
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          {NAVIGATION.map((item) => (
            <motion.div
              key={item.href}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={linkVariants}
            >
              <Link
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'text-gray-800 font-semibold' : 'text-gray-600'} text-base hover:text-gray-800 transition-colors duration-200 relative`}
              >
                {language === 'ES' ? item.labelES : item.labelEN}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gray-800"
                  initial="initial"
                  whileHover="hover"
                  variants={underlineVariants}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <Link href="/account" className="mr-4">
                <User className="text-gray-600 hover:text-gray-800 transition-colors h-6 w-6" />
              </Link>
              <button onClick={logout} className="mr-4">
                <LogOut className="text-gray-600 hover:text-gray-800 transition-colors h-6 w-6" />
              </button>
            </>
          ) : (
            <Link href="/login" className="mr-4">
              <User className="text-gray-600 hover:text-gray-800 transition-colors h-6 w-6" />
            </Link>
          )}
          <motion.button 
            onClick={handleCartClick} 
            className="relative mr-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="text-gray-600 hover:text-gray-800 transition-colors h-6 w-6" />
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full flex items-center justify-center w-5 h-5 text-sm"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <Button onClick={toggleLanguage} variant="outline" size="sm" className="mr-4">
            {language === 'ES' ? 'EN' : 'ES'}
          </Button>
          <motion.button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden border-t border-gray-200 bg-white absolute left-0 right-0 top-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION.map((item) => (
                <motion.div
                  key={item.href}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-base ${pathname === item.href ? 'text-gray-800 font-semibold' : 'text-gray-600'} relative`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'ES' ? item.labelES : item.labelEN}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gray-800"
                      initial="initial"
                      whileHover="hover"
                      variants={underlineVariants}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CartDrawer />
    </motion.nav>
  )
}

