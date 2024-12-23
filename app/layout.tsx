import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from './contexts/CartContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from './lib/constants'
import { Footer } from './components/Footer'
import './lib/fontawesome'
import { CookieConsent } from './components/CookieConsent'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION.ES,
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_99percent-uzPludLQQqzrh2i8Ezvjj9w2T9HD7N.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_99percent-uzPludLQQqzrh2i8Ezvjj9w2T9HD7N.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white`}>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
              <Footer />
              <CookieConsent />
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

