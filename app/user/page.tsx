'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { PageLayout } from '../components/PageLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { ProfileInfo } from '../components/user/ProfileInfo'
import { OrderHistory } from '../components/user/OrderHistory'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserPage() {
  const { language } = useLanguage()
  const { isAuthenticated } = useAuth()

  return (
    <ProtectedRoute>
      <PageLayout>
        <div className="container mx-auto px-4 py-8 pt-24">
          <h1 className="text-3xl font-bold mb-8">
            {language === 'ES' ? 'Mi Cuenta' : 'My Account'}
          </h1>
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">
                {language === 'ES' ? 'Perfil' : 'Profile'}
              </TabsTrigger>
              <TabsTrigger value="orders">
                {language === 'ES' ? 'Pedidos' : 'Orders'}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileInfo />
            </TabsContent>
            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </ProtectedRoute>
  )
}

