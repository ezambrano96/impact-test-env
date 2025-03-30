import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../utils/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, trackingInfo } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    const orderData = {
      email,
      items: cart.map(item => ({
        productId: item.product._id,
        sku: item.product.sku,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      totalAmount: getCartTotal(),
      trackingInfo: trackingInfo || null
    };
    
    try {
      setSubmitting(true);
      const response = await createOrder(orderData);
      
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate(`/confirmation/${response._id}`);
    } catch (err) {
      setError('Failed to create order. Please try again.');
      setSubmitting(false);
      console.error(err);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Your cart is empty. Please add some products before checkout.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
      
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <div className="bg-gray-50 p-4 rounded">
          {cart.map(item => (
            <div key={item.product._id} className="flex justify-between mb-2">
              <span>{item.quantity} x {item.product.name}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-2 font-bold flex justify-between">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {trackingInfo && (
        <div className="mb-6 p-3 bg-blue-50 text-sm rounded">
          <h3 className="font-semibold">Affiliate Tracking Information</h3>
          <p>Click ID: {trackingInfo.clickId}</p>
          <p>Affiliate ID: {trackingInfo.affiliateId}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email (optional)</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="your@email.com"
          />
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;