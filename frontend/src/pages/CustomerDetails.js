import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import './CustomerDetails.css';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
    deliveryTime: ''
  });
  const [errors, setErrors] = useState({});

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

  const handleContinueToPayment = () => {
    if (validateForm()) {
      // Store customer details in localStorage for payment page
      localStorage.setItem('customerDetails', JSON.stringify(formData));
      navigate('/payment');
    }
  };

  if (items.length === 0) {
    return (
      <div className="customer-details-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add some delicious food to your cart to proceed to checkout.</p>
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
      className="customer-details"
    >
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Delivery Details
        </motion.h1>

        <div className="customer-details-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="customer-details-card"
          >
            <h2>Please provide your delivery information</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
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
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="order-summary-card"
          >
            <h2>Order Summary</h2>
            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span>₹{getTotalPrice()}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="continue-btn"
              onClick={handleContinueToPayment}
            >
              Continue to Payment 💳
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerDetails;
