// ... (mantener las constantes existentes)

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const ENDPOINTS = {
  PRODUCTS: `${API_URL}/products`,
  PRODUCT: (id: number) => `${API_URL}/products/${id}`,
  MODEL_3D: `${API_URL}/model3d`,
}

// Eliminar el array PRODUCTS de aquí, ya que ahora lo cargaremos desde la API

