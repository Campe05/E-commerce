'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '../components/ProductCard'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import { ENDPOINTS } from '../lib/constants'
import { motion } from 'framer-motion'
import { PageLayout } from '../components/PageLayout'
import { useRouter } from 'next/navigation'

interface Product {
  id: number
  nameES: string
  nameEN: string
  price: number
  image: string
  category: string
}

export default function ProductsPage() {
  const router = useRouter()
  const [category, setCategory] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category')
    setCategory(categoryParam)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const url = category 
          ? `${ENDPOINTS.PRODUCTS}?category=${category}`
          : ENDPOINTS.PRODUCTS
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  const handleCategoryChange = (newCategory: string | null) => {
    setCategory(newCategory)
    if (newCategory) {
      router.push(`/products?category=${newCategory}`, { scroll: false })
    } else {
      router.push('/products', { scroll: false })
    }
  }

  return (
    <PageLayout>
      <motion.main
        className="container mx-auto py-8 pt-24 flex-grow px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {language === 'ES' ? 'Nuestros Productos' : 'Our Products'}
        </motion.h1>
        <motion.div 
          className="mb-8 flex flex-wrap justify-center space-x-2 md:space-x-4 mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            variant={!category ? "default" : "outline"}
            onClick={() => handleCategoryChange(null)}
            className="mb-2 md:mb-0"
          >
            {language === 'ES' ? 'Todos' : 'All'}
          </Button>
          <Button
            variant={category === 'camisetas' ? "default" : "outline"}
            onClick={() => handleCategoryChange('camisetas')}
            className="mb-2 md:mb-0"
          >
            {language === 'ES' ? 'Camisetas' : 'T-shirts'}
          </Button>
          <Button
            variant={category === 'sudaderas' ? "default" : "outline"}
            onClick={() => handleCategoryChange('sudaderas')}
            className="mb-2 md:mb-0"
          >
            {language === 'ES' ? 'Sudaderas' : 'Hoodies'}
          </Button>
        </motion.div>
        {isLoading ? (
          <div className="text-center">
            <p>{language === 'ES' ? 'Cargando productos...' : 'Loading products...'}</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.main>
    </PageLayout>
  )
}

