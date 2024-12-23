'use client'

import { useEffect, useState } from 'react'
import { Navbar } from './Navbar'

export function PageLayout({ children, isHomePage = false }: { children: React.ReactNode, isHomePage?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar isHomePage={isHomePage} />
      <div className={`page-transition ${isLoaded ? 'loaded' : 'loading'}`} style={{ marginTop: '80px' }}>
        {children}
      </div>
    </div>
  )
}

