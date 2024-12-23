import { API_URL } from './constants';
import { Product } from '../types/product';

// TODO: Reemplazar con tu URL de API real
const API_BASE_URL = API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const login = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

// TODO: Implementar más funciones de API según sea necesario
// Por ejemplo: registro de usuarios, actualización de perfil, etc.

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  // Implementar lógica de registro
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  // Implementar lógica de actualización de perfil
};

export const fetchOrders = async (userId: string) => {
  // Implementar lógica para obtener órdenes del usuario
};

// TODO: Añadir más funciones de API según las necesidades del proyecto

