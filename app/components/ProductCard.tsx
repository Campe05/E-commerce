import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

interface Product {
  id: number
  name_es: string
  name_en: string
  price: number
  image_url: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage()

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden group">
          <Image
            src={`/api/assets?path=${encodeURIComponent(product.image_url)}`}
            alt={language === 'ES' ? product.name_es : product.name_en}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 truncate">
            {language === 'ES' ? product.name_es : product.name_en}
          </h3>
          <p className="text-gray-600 font-medium">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}

