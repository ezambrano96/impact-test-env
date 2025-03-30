import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const { product, quantity } = item;

  return (
    <div className="flex flex-col md:flex-row border-b py-4">
      <div className="md:w-1/4 mb-4 md:mb-0">
        <img
          src={product.image || 'https://via.placeholder.com/150x150?text=Product'}
          alt={product.name}
          className="w-24 h-24 object-cover rounded"
        />
      </div>
      <div className="md:w-2/4 pr-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
        <p className="text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
      </div>
      <div className="md:w-1/4 flex flex-col justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => updateQuantity(product._id, quantity - 1)}
            className="bg-gray-200 px-2 py-1 rounded-l"
          >
            -
          </button>
          <span className="bg-gray-100 px-3 py-1">{quantity}</span>
          <button 
            onClick={() => updateQuantity(product._id, quantity + 1)}
            className="bg-gray-200 px-2 py-1 rounded-r"
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeFromCart(product._id)}
          className="text-red-500 text-sm mt-2"
        >
          Remove
        </button>
        <div className="font-semibold text-right mt-2">
          ${(product.price * quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;