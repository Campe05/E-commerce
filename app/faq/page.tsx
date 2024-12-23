'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { PageLayout } from '../components/PageLayout'
import Link from 'next/link'

export default function FAQPage() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      questionES: '¿Cuánto tiempo tarda el envío?',
      questionEN: 'How long does shipping take?',
      answerES: 'Normalmente, nuestros envíos tardan entre 3-5 días hábiles en llegar a su destino dentro del país. Para envíos internacionales, el tiempo de entrega puede variar entre 7-14 días hábiles.',
      answerEN: 'Typically, our shipments take 3-5 business days to arrive at their destination within the country. For international shipments, delivery time can vary between 7-14 business days.'
    },
    {
      questionES: '¿Cuál es su política de devoluciones?',
      questionEN: 'What is your return policy?',
      answerES: 'Ofrecemos devoluciones gratuitas dentro de los 30 días posteriores a la compra. El producto debe estar sin usar y en su embalaje original. Consulte nuestra página de devoluciones para más detalles.',
      answerEN: 'We offer free returns within 30 days of purchase. The product must be unused and in its original packaging. Please check our returns page for more details.'
    },
    {
      questionES: '¿Sus productos son aptos para competiciones de CrossFit?',
      questionEN: 'Are your products suitable for CrossFit competitions?',
      answerES: 'Sí, todos nuestros productos están diseñados y fabricados siguiendo los estándares de calidad requeridos para competiciones de CrossFit. Sin embargo, te recomendamos verificar las reglas específicas de cada competición.',
      answerEN: 'Yes, all our products are designed and manufactured following the quality standards required for CrossFit competitions. However, we recommend checking the specific rules of each competition.'
    },
    {
      questionES: '¿Cómo puedo devolver un producto?',
      questionEN: 'How can I return a product?',
      answerES: 'Para devolver un producto, por favor complete nuestro formulario de devolución. Puede acceder al formulario haciendo clic en el enlace a continuación.',
      answerEN: 'To return a product, please complete our return form. You can access the form by clicking the link below.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <PageLayout>
      <div className="h-12"/>
      <motion.main
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 pt-24 flex-grow"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {language === 'ES' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
        </motion.h1>
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <FAQItem
                faq={faq}
                isOpen={openIndex === index}
                toggleFAQ={() => toggleFAQ(index)}
                language={language}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Link href="/returns" className="text-blue-600 hover:underline">
            {language === 'ES' ? 'Formulario de Devolución' : 'Return Form'}
          </Link>
        </div>
      </motion.main>
    </PageLayout>
  )
}

function FAQItem({ faq, isOpen, toggleFAQ, language }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
        onClick={toggleFAQ}
      >
        <h2 className="text-xl font-semibold">
          {language === 'ES' ? faq.questionES : faq.questionEN}
        </h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-4 pb-4">
              <p>{language === 'ES' ? faq.answerES : faq.answerEN}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

