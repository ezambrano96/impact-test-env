import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={product.image || 'https://via.placeholder.com/300x300?text=Product+Image'} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">SKU: {product.sku}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;