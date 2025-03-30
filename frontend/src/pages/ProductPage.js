import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { fetchProductById } from '../utils/api';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
        console.error(err);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    // Reset the "Added to cart" message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="text-center py-8">Loading product details...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img 
            src={product.image || 'https://via.placeholder.com/500x500?text=Product+Image'} 
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-800 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>
          
          <div className="flex items-center mb-6">
            <button 
              className="bg-gray-200 px-3 py-1 rounded-l"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="bg-gray-100 px-4 py-1">{quantity}</span>
            <button 
              className="bg-gray-200 px-3 py-1 rounded-r"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          
          {addedToCart && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
              Added to cart!
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex-1"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition flex-1"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;