import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { API_URL } from '../../lib/constants'

interface Order {
  id: string
  createdAt: string
  total: number
  status: string
}

export function OrderHistory() {
  const { language } = useLanguage()
  const { token } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/history`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      }catch (error) {
        console.error('Error fetching order history:', error)
      }
    }
    fetchOrders()
  }, [token])

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'ES' ? 'Historial de Pedidos' : 'Order History'}
      </h2>
      {orders.length === 0 ? (
        <p>{language === 'ES' ? 'No hay pedidos para mostrar.' : 'No orders to display.'}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">{language === 'ES' ? 'ID Pedido' : 'Order ID'}</th>
                <th scope="col" className="px-6 py-3">{language === 'ES' ? 'Fecha' : 'Date'}</th>
                <th scope="col" className="px-6 py-3">{language === 'ES' ? 'Total' : 'Total'}</th>
                <th scope="col" className="px-6 py-3">{language === 'ES' ? 'Estado' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-white border-b">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

