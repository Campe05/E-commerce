'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { PageLayout } from '../components/PageLayout'
import { ReturnForm } from '../components/ReturnForm'

export default function ReturnsPage() {
  const { language } = useLanguage()

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {language === 'ES' ? 'Formulario de Devolución' : 'Return Form'}
        </h1>
        <div className="max-w-2xl mx-auto">
          <ReturnForm />
        </div>
      </div>
    </PageLayout>
  )
}

