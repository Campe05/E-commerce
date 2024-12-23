'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useLanguage } from '../contexts/LanguageContext'

interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentProps {
  show: boolean
}

export function CookieConsent({ show }: CookieConsentProps) {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    if (show) {
      const storedPreferences = localStorage.getItem('cookiePreferences')
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences))
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
  }, [show])

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Necessary cookies can't be toggled
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    setIsOpen(false)
    applyCookiePreferences(preferences)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    setIsOpen(false)
    applyCookiePreferences(allAccepted)
  }

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Aplicar las preferencias de cookies
    if (prefs.functional) {
      // Habilitar cookies funcionales
      document.cookie = "functional_cookies=enabled; max-age=31536000; path=/"
    } else {
      // Deshabilitar cookies funcionales
      document.cookie = "functional_cookies=disabled; max-age=0; path=/"
    }

    if (prefs.analytics) {
      // Habilitar cookies analíticas
      document.cookie = "analytics_cookies=enabled; max-age=31536000; path=/"
    } else {
      // Deshabilitar cookies analíticas
      document.cookie = "analytics_cookies=disabled; max-age=0; path=/"
    }

    if (prefs.marketing) {
      // Habilitar cookies de marketing
      document.cookie = "marketing_cookies=enabled; max-age=31536000; path=/"
    } else {
      // Deshabilitar cookies de marketing
      document.cookie = "marketing_cookies=disabled; max-age=0; path=/"
    }

    // Las cookies necesarias siempre están habilitadas
    document.cookie = "necessary_cookies=enabled; max-age=31536000; path=/"
  }

  return (
    <AnimatePresence>
      {isOpen && show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'ES' ? 'Preferencias de cookies' : 'Cookie Preferences'}
            </h2>
            <p className="mb-6">
              {language === 'ES'
                ? 'Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Por favor, seleccione qué tipos de cookies desea aceptar.'
                : 'We use cookies to improve your experience on our website. Please select which types of cookies you want to accept.'}
            </p>
            <div className="space-y-4 mb-6">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ES'
                        ? key === 'necessary'
                          ? 'Requerido para el funcionamiento del sitio'
                          : `Cookies ${key === 'functional' ? 'funcionales' : key === 'analytics' ? 'analíticas' : 'de marketing'}`
                        : key === 'necessary'
                        ? 'Required for site functionality'
                        : `${key.charAt(0).toUpperCase() + key.slice(1)} cookies`}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={() => handleToggle(key as keyof CookiePreferences)}
                    disabled={key === 'necessary'}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={savePreferences}>
                {language === 'ES' ? 'Guardar preferencias' : 'Save preferences'}
              </Button>
              <Button onClick={handleAcceptAll}>
                {language === 'ES' ? 'Aceptar todas' : 'Accept all'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

