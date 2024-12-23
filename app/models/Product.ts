import pool from '../lib/db';

export interface Product {
  id: number;
  name_es: string;
  name_en: string;
  description_es: string;
  description_en: string;
  price: number;
  image_url: string;
  model_3d_url: string | null;
}

export async function getAllProducts(): Promise<Product[]> {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
}

export async function getProductById(id: number): Promise<Product | null> {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0] || null;
}

