import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [trackingInfo, setTrackingInfo] = useState(null);
  
  // Initialize tracking information from URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const trackingId = queryParams.get('clickId');
    const affiliateId = queryParams.get('affiliateId');
    
    if (trackingId || affiliateId) {
      const trackingData = {
        clickId: trackingId,
        affiliateId: affiliateId,
        timestamp: new Date().toISOString(),
        landingPage: window.location.pathname
      };
      
      setTrackingInfo(trackingData);
      
      // Store in sessionStorage to persist across page refreshes
      sessionStorage.setItem('trackingInfo', JSON.stringify(trackingData));
    } else {
      // Check if we have tracking info in sessionStorage
      const storedTrackingInfo = sessionStorage.getItem('trackingInfo');
      if (storedTrackingInfo) {
        setTrackingInfo(JSON.parse(storedTrackingInfo));
      }
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.product._id === product._id);
    
    if (existingItem) {
      setCart(
        cart.map(item => 
          item.product._id === product._id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(
      cart.map(item => 
        item.product._id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      trackingInfo,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};