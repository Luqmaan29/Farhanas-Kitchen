import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
    deliveryTime: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuration - Update these with your details
  const WHATSAPP_NUMBER = '9739998398'; 
  const UPI_ID = 'salt20293@okhdfcbank'; // e.g., 'yourname@paytm'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    if (!formData.deliveryDate.trim()) {
      newErrors.deliveryDate = 'Delivery date is required';
    } else {
      const selectedDate = new Date(formData.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.deliveryDate = 'Delivery date cannot be in the past';
      }
    }

    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = 'Delivery time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderMessage = () => {
    const orderItems = items.map(item => 
      `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`
    ).join('\n');

    return `New Cloud Kitchen Order 🍱

Name: ${formData.name}
Phone: +91${formData.phone}
Address: ${formData.address}

📅 Delivery Date: ${formData.deliveryDate}
🕐 Delivery Time: ${formData.deliveryTime}

Order Details:
${orderItems}

Total: ₹${getTotalPrice()}
Payment: Done via GPay ✅

Please confirm the order and delivery time. Thank you!`;
  };

  const handlePaymentConfirmation = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Store order details in localStorage for after payment
      const orderData = {
        customer: formData,
        items: items,
        total: getTotalPrice(),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));

      // Log order to backend
      await fetch('/api/order', {
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
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious items to your cart first!</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/menu')}
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="checkout-content"
        >
          <div className="checkout-header">
            <h1>Complete Your Order</h1>
            <p>Fill in your details and proceed to payment</p>
          </div>

          <div className="checkout-grid">
            {/* Customer Details Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="customer-form"
            >
              <h2>Customer Details</h2>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your 10-digit phone number"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="Enter your complete delivery address"
                  rows="4"
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="deliveryDate">Delivery Date *</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  className={errors.deliveryDate ? 'error' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.deliveryDate && <span className="error-text">{errors.deliveryDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="deliveryTime">Delivery Time *</label>
                <select
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className={errors.deliveryTime ? 'error' : ''}
                >
                  <option value="">Select delivery time</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                  <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                  <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                  <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                  <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                  <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                  <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                  <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                  <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</option>
                  <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
                </select>
                {errors.deliveryTime && <span className="error-text">{errors.deliveryTime}</span>}
              </div>
            </motion.div>

            {/* Order Summary & Payment */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-summary"
            >
              <h2>Order Summary</h2>
              
              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.category} • Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <div className="total-row">
                  <span>Total Amount:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
              </div>

              {/* Payment Section */}
              <div className="payment-section">
                <h3>Payment</h3>
                <div className="payment-info">
                  <div className="qr-code">
                    <div className="qr-placeholder">
                      <div className="qr-icon">📱</div>
                      <p>Scan QR Code</p>
                      <p className="qr-upi">UPI ID: {UPI_ID}</p>
                    </div>
                  </div>
                  
                  <div className="payment-steps">
                    <div className="step">
                      <span className="step-number">1</span>
                      <span>Fill in your delivery details</span>
                    </div>
                    <div className="step">
                      <span className="step-number">2</span>
                      <span>Click "Pay with Google Pay" to open payment app</span>
                    </div>
                    <div className="step">
                      <span className="step-number">3</span>
                      <span>Complete payment and return to confirm order</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="payment-btn"
                  onClick={handlePaymentConfirmation}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Redirecting to Google Pay...
                    </>
                  ) : (
                    'Pay with Google Pay 💳'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
