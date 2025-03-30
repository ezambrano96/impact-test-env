import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { fetchProducts } from '../utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
        console.error(err);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {products.map(product => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;