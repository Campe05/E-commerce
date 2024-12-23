'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SITE_NAME } from '../lib/constants'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingAnimation({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onLoadingComplete()
    }, 2000) // Duración de 2 segundos

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <div className="relative w-32 h-32">
            <Image
              src="/logo_99percent.png"
              alt={SITE_NAME}
              layout="fill"
              objectFit="contain"
              className="invert"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

