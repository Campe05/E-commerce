'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API_URL } from '../../lib/constants'

interface User {
  id: string
  username: string
  email: string
  shippingAddress: string
}

interface LoyaltyProgram {
  points: number
  tier: string
}

export function ProfileInfo() {
  const { language } = useLanguage()
  const { token, user: authUser, login } = useAuth()
  const [user, setUser] = useState<User | null>(authUser)
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgram | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (authUser) {
      setUser(authUser)
    }
    fetchLoyaltyProgram()
  }, [authUser, token])

  const fetchLoyaltyProgram = async () => {
    try {
      const response = await fetch(`${API_URL}/loyalty`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setLoyaltyProgram(data)
      }
    } catch (error) {
      console.error('Error fetching loyalty program:', error)
    }
  }

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        login(token as string) // Update the user in the auth context
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'ES' ? 'Información del Perfil' : 'Profile Information'}
      </h2>
      {isEditing ? (
        <form onSubmit={updateProfile} className="space-y-4">
          <Input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder={language === 'ES' ? 'Nombre de usuario' : 'Username'}
          />
          <Input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder={language === 'ES' ? 'Correo electrónico' : 'Email'}
          />
          <Input
            type="text"
            value={user.shippingAddress}
            onChange={(e) => setUser({ ...user, shippingAddress: e.target.value })}
            placeholder={language === 'ES' ? 'Dirección de envío' : 'Shipping Address'}
          />
          <Button type="submit">
            {language === 'ES' ? 'Guardar cambios' : 'Save changes'}
          </Button>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>{language === 'ES' ? 'Nombre de usuario:' : 'Username:'}</strong> {user.username}</p>
          <p><strong>{language === 'ES' ? 'Correo electrónico:' : 'Email:'}</strong> {user.email}</p>
          <p><strong>{language === 'ES' ? 'Dirección de envío:' : 'Shipping Address:'}</strong> {user.shippingAddress}</p>
          {loyaltyProgram && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'ES' ? 'Programa de Fidelización' : 'Loyalty Program'}
              </h3>
              <p><strong>{language === 'ES' ? 'Puntos:' : 'Points:'}</strong> {loyaltyProgram.points}</p>
              <p><strong>{language === 'ES' ? 'Nivel:' : 'Tier:'}</strong> {loyaltyProgram.tier}</p>
            </div>
          )}
          <Button onClick={() => setIsEditing(true)}>
            {language === 'ES' ? 'Editar perfil' : 'Edit profile'}
          </Button>
        </div>
      )}
    </div>
  )
}

