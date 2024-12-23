'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { API_URL } from '../lib/constants'

export function ReturnForm() {
  const { language } = useLanguage()
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    orderNumber: '',
    productName: '',
    reason: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, reason: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/returns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setSubmitMessage(language === 'ES' ? 'Solicitud de devolución enviada con éxito' : 'Return request submitted successfully')
        setFormData({ orderNumber: '', productName: '', reason: '', description: '' })
      } else {
        setSubmitMessage(language === 'ES' ? 'Error al enviar la solicitud' : 'Error submitting request')
      }
    } catch (error) {
      console.error('Error submitting return request:', error)
      setSubmitMessage(language === 'ES' ? 'Error al enviar la solicitud' : 'Error submitting request')
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
          {language === 'ES' ? 'Número de Orden' : 'Order Number'}
        </label>
        <Input
          id="orderNumber"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          {language === 'ES' ? 'Nombre del Producto' : 'Product Name'}
        </label>
        <Input
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          {language === 'ES' ? 'Razón de la Devolución' : 'Reason for Return'}
        </label>
        <Select onValueChange={handleSelectChange} value={formData.reason}>
          <SelectTrigger>
            <SelectValue placeholder={language === 'ES' ? 'Seleccione una razón' : 'Select a reason'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wrong_size">{language === 'ES' ? 'Talla incorrecta' : 'Wrong size'}</SelectItem>
            <SelectItem value="defective">{language === 'ES' ? 'Producto defectuoso' : 'Defective product'}</SelectItem>
            <SelectItem value="not_as_described">{language === 'ES' ? 'No es como se describió' : 'Not as described'}</SelectItem>
            <SelectItem value="other">{language === 'ES' ? 'Otro' : 'Other'}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          {language === 'ES' ? 'Descripción' : 'Description'}
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting 
          ? (language === 'ES' ? 'Enviando...' : 'Submitting...') 
          : (language === 'ES' ? 'Enviar Solicitud' : 'Submit Request')}
      </Button>
      {submitMessage && <p className="mt-2 text-sm text-green-600">{submitMessage}</p>}
    </form>
  )
}

