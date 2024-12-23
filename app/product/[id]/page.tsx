'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCart } from '../../contexts/CartContext'
import { ProductCard } from '../../components/ProductCard'
import { useLanguage } from '../../contexts/LanguageContext'
import { ENDPOINTS } from '../../lib/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '../../components/PageLayout'
import { CartDrawer } from '../../components/CartDrawer'

interface Product {
  id: number
  nameES: string
  nameEN: string
  price: number
  image: string
  category: string
  colors?: string[]
  images?: string[]
  measurementsES?: string
  measurementsEN?: string
  materialsES?: string
  materialsEN?: string
  descriptionES?: string
  descriptionEN?: string
}

export default function ProductPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const { addToCart, isCartOpen, openCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [currentImage, setCurrentImage] = useState('')
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const { language } = useLanguage()
  const [isAdding, setIsAdding] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(ENDPOINTS.PRODUCT(productId))
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        setProduct(data)
        setCurrentImage(data.image)

        // Fetch related products
        const relatedResponse = await fetch(`${ENDPOINTS.PRODUCTS}?category=${data.category}&exclude=${data.id}`)
        if (!relatedResponse.ok) {
          throw new Error('Failed to fetch related products')
        }
        const relatedData = await relatedResponse.json()
        setRelatedProducts(relatedData)
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error || !product) {
    return <div className="text-center py-8 text-red-500">{error || 'Product not found'}</div>
  }

  const handleAddToCart = () => {
    if (size && color) {
      setIsAdding(true)
      addToCart({ ...product, quantity, size, color })
      setTimeout(() => {
        setIsAdding(false)
        openCart()
      }, 1000)
    } else {
      alert(language === 'ES' ? 'Por favor, selecciona una talla y un color' : 'Please select a size and color')
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      setZoomPosition({ x, y })
    }
  }

  return (
    <PageLayout>
      <motion.div 
        className="min-h-screen bg-white text-gray-900"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
      <main className="container mx-auto py-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentImage}
                className="relative h-96 cursor-zoom-in overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                ref={imageRef}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={currentImage}
                  alt={language === 'ES' ? product.nameES : product.nameEN}
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300"
                />
                {isZoomed && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${currentImage})`,
                      backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '250% 250%',
                      cursor: 'none',
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex overflow-x-auto bg-white">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 focus:outline-none transition-all duration-300 ${
                    currentImage === img ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImage(img)}
                >
                  <Image src={img} alt={`Product view ${index + 1}`} width={64} height={64} objectFit="cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{language === 'ES' ? product.nameES : product.nameEN}</h1>
            <Tabs defaultValue="description" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="description">{language === 'ES' ? 'Descripción' : 'Description'}</TabsTrigger>
                <TabsTrigger value="details">{language === 'ES' ? 'Detalles' : 'Details'}</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <p>{language === 'ES' ? product.descriptionES : product.descriptionEN}</p>
              </TabsContent>
              <TabsContent value="details">
                <div className="space-y-2">
                  <p><strong>{language === 'ES' ? 'Medidas:' : 'Measurements:'}</strong> {language === 'ES' ? product.measurementsES : product.measurementsEN}</p>
                  <p><strong>{language === 'ES' ? 'Materiales:' : 'Materials:'}</strong> {language === 'ES' ? product.materialsES : product.materialsEN}</p>
                </div>
              </TabsContent>
            </Tabs>
            <div className="mb-4">
              <Select onValueChange={setSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={language === 'ES' ? "Selecciona una talla" : "Select a size"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Select onValueChange={setColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={language === 'ES' ? "Selecciona un color" : "Select a color"} />
                </SelectTrigger>
                <SelectContent>
                  {product.colors?.map((color) => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="mx-4 text-xl">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            <p className="text-2xl mb-4">${product.price.toFixed(2)}</p>
            <motion.button 
              onClick={handleAddToCart} 
              className="w-full py-3 px-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-md relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAdding}
            >
              <AnimatePresence>
                {isAdding && (
                  <motion.div
                    className="absolute inset-0 bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">
                {isAdding 
                  ? (language === 'ES' ? 'Añadido!' : 'Added!') 
                  : (language === 'ES' ? 'Añadir al carrito' : 'Add to cart')}
              </span>
            </motion.button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ES' ? 'Productos relacionados' : 'Related products'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </main>
      </motion.div>
      <CartDrawer />
    </PageLayout>
  )
}

