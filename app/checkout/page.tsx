'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useLanguage } from '../contexts/LanguageContext'
import { PageLayout } from '../components/PageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { language } = useLanguage()
  const router = useRouter()
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expirationDate: '',
    cvv: '',
  })
  const [shippingInfo, setShippingInfo] = useState({ // Added shippingInfo state
    address: '',
    city: '',
    postalCode: '',
  }) // Added shippingInfo state

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Added handleShippingChange
    const { name, value } = e.target;
    setShippingInfo(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          cart,
          shippingInfo,
          paymentInfo,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const data = await response.json()
      clearCart()
      router.push(`/confirmation?orderId=${data.orderId}`)
    } catch (error) {
      console.error('Error creating order:', error)
      // Aquí deberías mostrar un mensaje de error al usuario
    }
  }

  return (
    <PageLayout>
      <motion.div
        className="container mx-auto px-4 py-8 pt-24 flex-grow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          {language === 'ES' ? 'Finalizar Compra' : 'Checkout'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {language === 'ES' ? 'Resumen del Pedido' : 'Order Summary'}
            </h2>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{language === 'ES' ? item.nameES : item.nameEN} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between items-center font-bold">
                <span>{language === 'ES' ? 'Total' : 'Total'}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {language === 'ES' ? 'Información de Pago' : 'Payment Information'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">
                  {language === 'ES' ? 'Número de Tarjeta' : 'Card Number'}
                </Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  required
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <Label htmlFor="cardName">
                  {language === 'ES' ? 'Nombre en la Tarjeta' : 'Name on Card'}
                </Label>
                <Input
                  id="cardName"
                  name="cardName"
                  type="text"
                  required
                  value={paymentInfo.cardName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expirationDate">
                    {language === 'ES' ? 'Fecha de Expiración' : 'Expiration Date'}
                  </Label>
                  <Input
                    id="expirationDate"
                    name="expirationDate"
                    type="text"
                    required
                    value={paymentInfo.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="text"
                    required
                    value={paymentInfo.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                  />
                </div>
              </div>
              {/* Added Shipping Information Inputs */}
              <div>
                <Label htmlFor="address">
                  {language === 'ES' ? 'Dirección' : 'Address'}
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  placeholder="Your Address"
                />
              </div>
              <div>
                <Label htmlFor="city">
                  {language === 'ES' ? 'Ciudad' : 'City'}
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  placeholder="Your City"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">
                  {language === 'ES' ? 'Código Postal' : 'Postal Code'}
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  value={shippingInfo.postalCode}
                  onChange={handleShippingChange}
                  placeholder="Your Postal Code"
                />
              </div>
              <Button type="submit" className="w-full">
                {language === 'ES' ? 'Pagar' : 'Pay'}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  )
}

