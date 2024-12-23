'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';
import { fetchProduct } from '../../lib/api';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const { language } = useLanguage();
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProduct(Number(id));
        setProduct(fetchedProduct);
        
        // Get unique sizes
        const sizes = [...new Set(fetchedProduct.stock.map(item => item.size))];
        if (sizes.length > 0) {
          setSelectedSize(sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product && selectedSize) {
      const colors = product.stock
        .filter(item => item.size === selectedSize && item.quantity > 0)
        .map(item => item.color);
      setAvailableColors(colors);
      setSelectedColor(colors.length > 0 ? colors[0] : '');
    }
  }, [product, selectedSize]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      const stockItem = product.stock.find(item => item.size === selectedSize && item.color === selectedColor);
      if (stockItem && stockItem.quantity > 0) {
        addToCart({
          ...product,
          selectedSize,
          selectedColor,
        });
      }
    }
  };

  const isOutOfStock = !product.stock.some(item => item.quantity > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">
            ${product.price.toFixed(2)} {language === 'ES' ? 'EUR' : 'USD'}
          </p>
          
          <div className="mb-4">
            <Select onValueChange={setSelectedSize} value={selectedSize}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ES' ? "Selecciona una talla" : "Select a size"} />
              </SelectTrigger>
              <SelectContent>
                {[...new Set(product.stock.map(item => item.size))].map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Select onValueChange={setSelectedColor} value={selectedColor}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ES' ? "Selecciona un color" : "Select a color"} />
              </SelectTrigger>
              <SelectContent>
                {availableColors.map(color => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleAddToCart} 
            disabled={isOutOfStock || !selectedSize || !selectedColor}
          >
            {isOutOfStock 
              ? (language === 'ES' ? 'Agotado' : 'Out of Stock')
              : (language === 'ES' ? 'Añadir al carrito' : 'Add to cart')}
          </Button>
        </div>
      </div>
    </div>
  );
}

