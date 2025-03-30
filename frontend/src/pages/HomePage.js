import React from 'react';
import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <div>
      <div className="bg-gray-100 py-8 px-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Impact Test Store</h1>
        <p className="text-gray-600">
          A test environment for Impact.com affiliate tracking integration.
          Browse our products and test the checkout process.
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
      <ProductList />
    </div>
  );
};

export default HomePage;