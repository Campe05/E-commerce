'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { EXTERNAL_STORE_URL, SITE_DESCRIPTION } from './lib/constants'
import { useCart } from './contexts/CartContext'
import { useLanguage } from './contexts/LanguageContext'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from './components/PageLayout'
import { CookieConsent } from './components/CookieConsent'
import { PromotionalBar } from './components/PromotionalBar'

const GLBModel = dynamic(() => import('./components/GLBModel').then((mod) => mod.GLBModel), { ssr: false })

function CollectionsTitle({ language }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.h2 
      ref={ref}
      className="text-4xl md:text-6xl font-bold mb-8 md:mb-16 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {language === 'ES' ? 'Colecciones' : 'Collections'}
    </motion.h2>
  )
}

export default function Home() {
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const { isCartOpen } = useCart()
  const { language } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookieConsent(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PromotionalBar />
      <PageLayout isHomePage={true}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className={`${isCartOpen ? 'cart-open' : ''} pb-20`}
        >
          <main className="container mx-auto px-4 py-8 pt-24">
            <div className="flex flex-col md:flex-row items-center justify-between pt-4 md:pt-8 pb-16 md:space-x-12 min-h-[calc(100vh-112px)]">
              <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative mb-8 md:mb-0">
                <Canvas>
                  <GLBModel />
                </Canvas>
              </div>
              <motion.div 
                className="w-full md:w-1/2 text-center md:text-left md:pl-12"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  99 Percent
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl lg:text-3xl mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {SITE_DESCRIPTION[language]}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Button asChild className="btn-primary text-lg md:text-xl py-2 md:py-3 px-6 md:px-8">
                    <a href={EXTERNAL_STORE_URL} target="_blank" rel="noopener noreferrer">
                      {language === 'ES' ? 'Descúbrelo aquí' : 'Discover here'}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            <section className="pt-16 md:pt-24 pb-16 bg-white">
              <div className="container mx-auto">
                <CollectionsTitle language={language} />
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link href={`/products?category=camisetas`} className="group">
                    <div className="card relative overflow-hidden">
                      <div className="relative h-64 md:h-96">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_99percent-uzPludLQQqzrh2i8Ezvjj9w2T9HD7N.png"
                          alt={language === 'ES' ? 'Camisetas CrossFit' : 'CrossFit T-shirts'}
                          layout="fill"
                          objectFit="contain"
                          className="transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {language === 'ES' ? 'Camisetas' : 'T-shirts'}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href={`/products?category=sudaderas`} className="group">
                    <div className="card relative overflow-hidden">
                      <div className="relative h-64 md:h-96">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_99percent-uzPludLQQqzrh2i8Ezvjj9w2T9HD7N.png"
                          alt={language === 'ES' ? 'Sudaderas CrossFit' : 'CrossFit Hoodies'}
                          layout="fill"
                          objectFit="contain"
                          className="transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {language === 'ES' ? 'Sudaderas' : 'Hoodies'}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </section>
          </main>
        </motion.div>
        <CookieConsent show={showCookieConsent} />
      </PageLayout>
    </>
  )
}

