import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { cart } = useContext(CartContext);
  
  // Calculate total items in cart
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Impact Test Store</Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center hover:underline">
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <span className="ml-2 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;