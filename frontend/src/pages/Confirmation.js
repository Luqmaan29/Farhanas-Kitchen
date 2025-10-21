import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Confirmation.css';

const Confirmation = () => {
  return (
    <div className="confirmation">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="confirmation-content"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="success-icon"
          >
            ✅
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="confirmation-title"
          >
            Order Sent Successfully!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="confirmation-message"
          >
            Your order has been sent to WhatsApp! We'll contact you soon to confirm 
            your order and provide delivery updates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="next-steps"
          >
            <h3>What happens next?</h3>
            <div className="steps">
              <div className="step">
                <div className="step-icon">📱</div>
                <div className="step-content">
                  <h4>Order Confirmation</h4>
                  <p>We'll confirm your order details via WhatsApp within 5-10 minutes</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">🍳</div>
                <div className="step-content">
                  <h4>Food Preparation</h4>
                  <p>Our chefs will start preparing your delicious meal</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">🚚</div>
                <div className="step-content">
                  <h4>Delivery Updates</h4>
                  <p>We'll keep you updated on delivery status via WhatsApp</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="confirmation-actions"
          >
            <Link to="/menu" className="btn btn-primary">
              Order More Food 🍽️
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home 🏠
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="contact-info"
          >
            <p>
              <strong>Need help?</strong> Contact us directly on WhatsApp for any questions or changes to your order.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
