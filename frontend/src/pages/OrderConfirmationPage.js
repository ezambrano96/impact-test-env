import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderById } from '../utils/api';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderById(id);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load order details');
        setLoading(false);
        console.error(err);
      }
    };

    getOrder();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading order details...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!order) return <div className="text-center py-8">Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-green-100 p-4 rounded-lg text-green-700 text-center mb-6">
        <h1 className="text-2xl font-bold">Order Confirmed!</h1>
        <p>Thank you for your order.</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <p className="text-gray-600">Order ID: {order._id}</p>
          {order.email && <p className="text-gray-600">Email: {order.email}</p>}
          <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items</h3>
          <div className="border-t border-b">
            {order.items.map((item, index) => (
              <div key={index} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-bold">
            <span>Total:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        {order.trackingInfo && (
          <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
            <h3 className="font-semibold mb-2">Affiliate Tracking Information</h3>
            <p>Click ID: {order.trackingInfo.clickId}</p>
            <p>Affiliate ID: {order.trackingInfo.affiliateId}</p>
            <p>Landing Page: {order.trackingInfo.landingPage}</p>
            <p>Timestamp: {new Date(order.trackingInfo.timestamp).toLocaleString()}</p>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;