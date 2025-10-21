import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Configuration - Update these with your details
  const WHATSAPP_NUMBER = '9739998398'; 
  const UPI_ID = 'salt20293@okhdfcbank';

  useEffect(() => {
    // Get customer details from localStorage
    const details = localStorage.getItem('customerDetails');
    if (details) {
      setCustomerDetails(JSON.parse(details));
    } else {
      // Redirect to customer details if not available
      navigate('/customer-details');
    }
  }, [navigate]);

  const generateOrderMessage = () => {
    const orderItems = items.map(item => 
      `• ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    return `🍽️ *New Order Received*

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}

📅 *Delivery Date:* ${customerDetails.deliveryDate}
🕐 *Delivery Time:* ${customerDetails.deliveryTime}

📋 *Order Items:*
${orderItems}

💰 *Total Amount: ₹${getTotalPrice()}*

⏰ *Order Time:* ${new Date().toLocaleString()}

Payment: Done via GPay ✅

Please confirm the order and delivery time. Thank you!`;
  };

  const handlePayment = async () => {
    if (!customerDetails) return;

    setIsProcessing(true);

    try {
      // Store order details in localStorage for after payment
      const orderData = {
        customer: customerDetails,
        items: items,
        total: getTotalPrice(),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));

      // Log order to backend
      const API_URL = process.env.NODE_ENV === 'production' 
        ? 'https://farhanas-kitchen.onrender.com/api/order'
        : '/api/order';
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // Create UPI payment link
      const amount = getTotalPrice();
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=Cloud%20Kitchen&am=${amount}&cu=INR&tn=Food%20Order`;
      
      // Try to open UPI app, fallback to Google Pay
      try {
        window.location.href = upiUrl;
      } catch (error) {
        // Fallback to Google Pay
        const googlePayUrl = `https://pay.google.com/gp/v/save/${UPI_ID}`;
        window.location.href = googlePayUrl;
      }
      
      // Redirect to payment return page after a delay
      setTimeout(() => {
        window.location.href = '/payment-return';
      }, 3000);
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an error processing your order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!customerDetails) {
    return (
      <div className="payment-loading">
        <div className="spinner"></div>
        <p>Loading payment details...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="payment-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add some delicious food to your cart to proceed to payment.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary"
          onClick={() => navigate('/menu')}
        >
          Browse Menu
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="payment"
    >
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Complete Payment
        </motion.h1>

        <div className="payment-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="payment-summary-card"
          >
            <h2>Order Summary</h2>
            
            <div className="customer-info">
              <h3>Delivery Details:</h3>
              <p><strong>Name:</strong> {customerDetails.name}</p>
              <p><strong>Phone:</strong> {customerDetails.phone}</p>
              <p><strong>Address:</strong> {customerDetails.address}</p>
              <p><strong>Date:</strong> {customerDetails.deliveryDate}</p>
              <p><strong>Time:</strong> {customerDetails.deliveryTime}</p>
            </div>

            <div className="order-items">
              <h3>Your Order:</h3>
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <span>Total Amount:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="payment-methods-card"
          >
            <h2>Payment</h2>
            <p className="payment-description">
              Click the button below to pay securely with Google Pay
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="payment-btn"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="spinner"></div>
                  Processing...
                </>
              ) : (
                <>
                  💳 Pay ₹{getTotalPrice()} with Google Pay
                </>
              )}
            </motion.button>

            <div className="payment-security">
              <p>🔒 Your payment is secure and encrypted</p>
              <p>📱 You'll be redirected to Google Pay for payment</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;
