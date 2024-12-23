'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { SOCIAL_LINKS, CONTACT_INFO } from '../lib/constants'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '@/components/ui/button'

export function Footer() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <footer className="bg-gray-100 text-gray-900 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_99percent-uzPludLQQqzrh2i8Ezvjj9w2T9HD7N.png" 
                alt="99 Percent Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6" 
              />
              <span className="text-lg font-bold">99 Percent</span>
            </div>
            <p className="text-sm">{language === 'ES' ? 'Tu socio en fitness' : 'Your fitness partner'}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">
              {language === 'ES' ? 'Contacto' : 'Contact'}
            </h4>
            <ul className="space-y-1 text-sm">
              <li>Email: {CONTACT_INFO.email}</li>
              <li>{language === 'ES' ? 'Teléfono' : 'Phone'}: {CONTACT_INFO.phone}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">
              {language === 'ES' ? 'Síguenos' : 'Follow us'}
            </h4>
            <div className="flex space-x-4 mb-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FontAwesomeIcon icon={link.label === 'Instagram' ? faInstagram : faTiktok} size="lg" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">
              {language === 'ES' ? 'Enlaces Rápidos' : 'Quick Links'}
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/policies" className="hover:underline">
                  {language === 'ES' ? 'Políticas de privacidad y cookies' : 'Privacy and Cookie Policies'}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  {language === 'ES' ? 'Preguntas frecuentes' : 'FAQ'}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-start lg:justify-end items-start">
            <Button onClick={toggleLanguage} variant="outline" size="sm" className="text-xs">
              {language === 'ES' ? 'EN' : 'ES'}
            </Button>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} 99 Percent. {language === 'ES' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}

