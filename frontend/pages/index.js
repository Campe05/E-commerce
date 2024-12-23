import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import ProductList from '../components/ProductList'
import { fetchProducts } from '../utils/api'

export default function Home({ initialProducts }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return (
    <Layout>
      <Head>
        <title>99 Percent CrossFit E-commerce</title>
        <meta name="description" content="Compra el mejor equipo de CrossFit" />
      </Head>

      <main>
        <h1>Bienvenido a 99 Percent CrossFit E-commerce</h1>
        <ProductList initialProducts={initialProducts} />
      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  const initialProducts = await fetchProducts()
  return { props: { initialProducts } }
}

