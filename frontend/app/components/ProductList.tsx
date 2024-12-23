import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// TODO: Considerar añadir funcionalidades adicionales como:
// - Paginación
// - Filtrado por categoría
// - Ordenamiento (por precio, popularidad, etc.)
// Ejemplo:
// const [currentPage, setCurrentPage] = useState(1);
// const [category, setCategory] = useState('all');
// const [sortBy, setSortBy] = useState('price');

