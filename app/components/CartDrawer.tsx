'use client'

import { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, closeCart } = useCart()
  const { language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const isHomePage = pathname === '/'

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isCartOpen])

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  const drawerStyle = {
    top: isHomePage ? '32px' : '0', // Ajusta esto según la altura de tu barra promocional
    height: isHomePage ? 'calc(100vh - 32px)' : '100vh',
    maxHeight: isHomePage ? 'calc(100vh - 32px)' : '100vh',
    width: isMobile ? '100%' : '400px',
  }

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeCart}
        style={{ zIndex: 100 }}
      />
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="cart-drawer fixed right-0 bg-white shadow-lg flex flex-col"
            style={{ ...drawerStyle, zIndex: 101 }}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">
                    {language === 'ES' ? 'Tu Carrito' : 'Your Cart'}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={closeCart}>
                    <X size={24} />
                  </Button>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size || 'default'}`} className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h3 className="font-semibold">{language === 'ES' ? item.nameES : item.nameEN}</h3>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                      {item.size && <p className="text-sm text-gray-600">{language === 'ES' ? 'Talla' : 'Size'}: {item.size}</p>}
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, Math.max(1, item.quantity - 1));
                        }}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        +
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }} 
                        className="ml-2"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-bold">
                    {language === 'ES' ? 'Total:' : 'Total:'} 
                  </p>
                  <p className="text-xl font-bold">
                    ${total.toFixed(2)}
                  </p>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-black text-white hover:bg-gray-800 py-3"
                >
                  {language === 'ES' ? 'Realizar Pago' : 'Checkout'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

