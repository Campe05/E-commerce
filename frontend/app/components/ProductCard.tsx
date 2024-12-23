import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language } = useLanguage();

  const totalStock = product.stock.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 sm:h-64">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-xl font-bold">
            ${product.price.toFixed(2)} {language === 'ES' ? 'EUR' : 'USD'}
          </p>
          <p className={`text-sm ${totalStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalStock > 0 
              ? (language === 'ES' ? 'En stock' : 'In stock') 
              : (language === 'ES' ? 'Agotado' : 'Out of stock')}
          </p>
        </div>
      </div>
    </Link>
  );
};

