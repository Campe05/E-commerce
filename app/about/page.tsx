import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/images/about-us.jpg"
              alt="Equipo de CrossFit Gear"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <p className="mb-4">
              En CrossFit Gear, nuestra misión es proporcionar a los atletas de CrossFit el mejor equipo posible para ayudarles a alcanzar sus metas de fitness. Creemos que con el equipo adecuado, cualquier persona puede superar sus límites y lograr resultados extraordinarios.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
            <p className="mb-4">
              Fundada en 2015 por un grupo de entusiastas del CrossFit, nuestra empresa comenzó con una simple idea: crear ropa y equipo que realmente entienda las necesidades de los atletas de CrossFit. Desde entonces, hemos crecido para convertirnos en una de las marcas más respetadas en la comunidad de CrossFit.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Nuestro Compromiso</h2>
            <p>
              Nos comprometemos a utilizar materiales de la más alta calidad y las últimas tecnologías en nuestros productos. Cada pieza de ropa y equipo que vendemos ha sido probada y aprobada por atletas de CrossFit reales para garantizar su rendimiento y durabilidad.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

