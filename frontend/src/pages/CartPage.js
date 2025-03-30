import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {cart.map(item => (
          <CartItem key={item.product._id} item={item} />
        ))}
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <div className="text-gray-600">
            <div className="text-sm">
              {cart.reduce((total, item) => total + item.quantity, 0)} items
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold">
              Total: ${getCartTotal().toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link 
          to="/" 
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          Continue Shopping
        </Link>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;