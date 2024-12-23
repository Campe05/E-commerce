'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export function PromotionalBar() {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const promoText = language === 'ES' 
    ? '¡Oferta especial! 20% de descuento en todos los productos. ¡No te lo pierdas!' 
    : 'Special offer! 20% off all products. Don\'t miss out!';

  useEffect(() => {
    const containerElement = containerRef.current
    const textElement = textRef.current
    if (containerElement && textElement) {
      const containerWidth = containerElement.offsetWidth
      const textWidth = textElement.offsetWidth

      const animate = () => {
        let start: number | null = null
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = timestamp - start
          const position = containerWidth - (progress / 10) % (containerWidth + textWidth)
          
          textElement.style.transform = `translateX(${position}px)`
          
          requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }

      animate()
    }
  }, [promoText])

  return (
    <div 
      className="bg-black text-white overflow-hidden w-full flex items-center" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0, 
        right: 0,
        zIndex: 55,
        height: '32px'
      }}
      ref={containerRef}
    >
      <div 
        ref={textRef}
        className="whitespace-nowrap inline-block"
        style={{
          position: 'absolute',
          willChange: 'transform'
        }}
      >
        {promoText}
      </div>
    </div>
  )
}

