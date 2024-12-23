'use client'

import { useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { PageLayout } from '../components/PageLayout'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const { language } = useLanguage()
  const router = useRouter()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-2xl font-bold mb-6">
          {language === 'ES' ? 'Tu Carrito' : 'Your Cart'}
        </h1>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b">
              <div>
                <h3 className="font-semibold">{language === 'ES' ? item.nameES : item.nameEN}</h3>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                {item.size && <p className="text-sm text-gray-600">{language === 'ES' ? 'Talla' : 'Size'}: {item.size}</p>}
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="ml-2">
                  <X size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
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
    </PageLayout>
  )
}

