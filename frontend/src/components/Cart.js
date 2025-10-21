import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import './Cart.css';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (getTotalItems() === 0) {
    return null;
  }

  return (
    <>
      {/* Cart Toggle Button */}
      <motion.button
        className="cart-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{getTotalItems()}</span>
        <span className="cart-total">₹{getTotalPrice()}</span>
      </motion.button>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cart-overlay"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="cart-sidebar"
            >
              <div className="cart-header">
                <h3>Your Order</h3>
                <button 
                  className="close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="cart-items">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="cart-item"
                    >
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-category">{item.category}</p>
                        <p className="item-price">₹{item.price}</p>
                      </div>
                      
                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="qty-btn"
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="remove-btn"
                        >
                          🗑️
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Total Items:</span>
                    <span>{getTotalItems()}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button
                    onClick={clearCart}
                    className="btn btn-outline"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/customer-details"
                    className="btn btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
