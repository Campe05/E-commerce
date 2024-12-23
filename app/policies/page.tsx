'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { useLanguage } from '../contexts/LanguageContext'

export default function PoliciesPage() {
  const { language } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="h-12"/>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 pt-24 flex-grow"
      >
        <h1 className="text-4xl font-bold mb-8">
          {language === 'ES' ? 'Políticas de Privacidad y Cookies' : 'Privacy and Cookie Policies'}
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'ES' ? 'Política de Privacidad' : 'Privacy Policy'}
            </h2>
            <p>
              {language === 'ES'
                ? 'Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico y detalles de pago cuando realiza una compra. También recopilamos información automáticamente sobre su uso del sitio web.'
                : 'We collect personal information that you provide directly to us, such as your name, email address, and payment details when you make a purchase. We also automatically collect information about your use of the website.'}
            </p>
            <p className="mt-2">
              {language === 'ES'
                ? 'Utilizamos la información que recopilamos para procesar sus pedidos, personalizar su experiencia, mejorar nuestro sitio web y comunicarnos con usted sobre productos, servicios y promociones.'
                : 'We use the information we collect to process your orders, personalize your experience, improve our website, and communicate with you about products, services, and promotions.'}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'ES' ? 'Política de Cookies' : 'Cookie Policy'}
            </h2>
            <p>
              {language === 'ES'
                ? 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.'
                : 'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide information to the site owners.'}
            </p>
            <p className="mt-2">
              {language === 'ES'
                ? 'Utilizamos cookies para mejorar su experiencia en nuestro sitio web, recordar sus preferencias y mostrarle contenido relevante. También utilizamos cookies para analizar cómo se utiliza nuestro sitio web y para fines de marketing.'
                : 'We use cookies to enhance your experience on our website, remember your preferences, and show you relevant content. We also use cookies to analyze how our website is used and for marketing purposes.'}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'ES' ? 'Sus derechos y opciones' : 'Your rights and choices'}
            </h2>
            <p>
              {language === 'ES'
                ? 'Usted tiene derecho a acceder, corregir o eliminar su información personal. También puede oponerse al procesamiento de su información o solicitar que limitemos el procesamiento. Puede elegir aceptar o rechazar las cookies. La mayoría de los navegadores web aceptan cookies automáticamente, pero generalmente puede modificar la configuración de su navegador para rechazar cookies si lo prefiere.'
                : 'You have the right to access, correct, or delete your personal information. You can also object to the processing of your information or request that we limit the processing. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.'}
            </p>
          </section>
        </div>
      </motion.main>
    </div>
  )
}

