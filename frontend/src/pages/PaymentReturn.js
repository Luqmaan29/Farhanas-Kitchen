import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PaymentReturn.css';

const PaymentReturn = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('processing'); // processing, success, failed

  // Configuration - Update these with your details
  const WHATSAPP_NUMBER = '9739998398';

  useEffect(() => {
    // Get order data from localStorage
    const pendingOrder = localStorage.getItem('pendingOrder');
    
    if (pendingOrder) {
      const order = JSON.parse(pendingOrder);
      setOrderData(order);
      
      // Simulate payment processing
      setTimeout(() => {
        // For demo purposes, we'll assume payment was successful
        // In real implementation, you'd verify with payment gateway
        setPaymentStatus('success');
        setIsProcessing(false);
        
        // Send order to WhatsApp
        sendOrderToWhatsApp(order);
        
        // Clear the pending order
        localStorage.removeItem('pendingOrder');
      }, 2000);
    } else {
      // No pending order found, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const generateOrderMessage = (order) => {
    const itemsList = order.items.map(item => 
      `• ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    return `🍽️ *New Order Received*

👤 *Customer Details:*
Name: ${order.customer.name}
Phone: ${order.customer.phone}
Address: ${order.customer.address}

📋 *Order Items:*
${itemsList}

💰 *Total Amount: ₹${order.total}*

⏰ *Order Time:* ${new Date(order.timestamp).toLocaleString()}

Payment: Done via Google Pay ✅

Please confirm the order and delivery time. Thank you!`;
  };

  const sendOrderToWhatsApp = (order) => {
    const message = generateOrderMessage(order);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleContinueShopping = () => {
    navigate('/menu');
  };

  const handleViewOrder = () => {
    if (orderData) {
      sendOrderToWhatsApp(orderData);
    }
  };

  if (isProcessing) {
    return (
      <div className="payment-return">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="processing-container"
          >
            <div className="processing-icon">
              <div className="spinner"></div>
            </div>
            <h2>Processing Payment...</h2>
            <p>Please wait while we verify your payment</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="payment-return">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="success-container"
          >
            <div className="success-icon">
              ✅
            </div>
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully</p>
            
            {orderData && (
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="order-details">
                  <p><strong>Customer:</strong> {orderData.customer.name}</p>
                  <p><strong>Phone:</strong> {orderData.customer.phone}</p>
                  <p><strong>Address:</strong> {orderData.customer.address}</p>
                  <p><strong>Total:</strong> ₹{orderData.total}</p>
                  <p><strong>Items:</strong> {orderData.items.length} items</p>
                </div>
              </div>
            )}

            <div className="action-buttons">
              <motion.button
                className="btn btn-secondary"
                onClick={handleViewOrder}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 View Order on WhatsApp
              </motion.button>
              
              <motion.button
                className="btn btn-primary"
                onClick={handleContinueShopping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🍽️ Continue Shopping
              </motion.button>
            </div>

            <div className="next-steps">
              <h4>What happens next?</h4>
              <ul>
                <li>✅ Your order has been sent to our WhatsApp</li>
                <li>📞 We'll call you to confirm the order</li>
                <li>🚚 Your food will be prepared and delivered</li>
                <li>⏰ Estimated delivery time: 30-45 minutes</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-return">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-container"
        >
          <div className="error-icon">
            ❌
          </div>
          <h2>Payment Failed</h2>
          <p>There was an issue processing your payment</p>
          
          <div className="action-buttons">
            <motion.button
              className="btn btn-primary"
              onClick={() => navigate('/checkout')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Try Again
            </motion.button>
            
            <motion.button
              className="btn btn-secondary"
              onClick={() => navigate('/menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🍽️ Back to Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentReturn;
