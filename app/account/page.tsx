'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { PageLayout } from '../components/PageLayout'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import { Button } from '@/components/ui/button'

export default function AccountPage() {
  const { language } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/user')
    }
  }, [isAuthenticated, router])

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {isLogin 
            ? (language === 'ES' ? 'Iniciar Sesión' : 'Login')
            : (language === 'ES' ? 'Crear Cuenta' : 'Create Account')}
        </h1>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="mt-4 text-center">
            <Button variant="link" onClick={toggleForm}>
              {isLogin
                ? (language === 'ES' ? '¿No tienes una cuenta? Regístrate' : "Don't have an account? Sign up")
                : (language === 'ES' ? '¿Ya tienes una cuenta? Inicia sesión' : 'Already have an account? Log in')}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

