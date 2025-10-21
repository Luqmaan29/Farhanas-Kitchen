import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PDFViewer from '../components/PDFViewer';
import './Home.css';

const Home = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [currentPDF, setCurrentPDF] = useState(null);

  const handleViewPDF = (pdfType) => {
    const pdfPath = pdfType === 'veg' ? '/pdfs/veg.pdf' : '/pdfs/nonveg.pdf';
    const title = pdfType === 'veg' ? 'Veg Menu PDF' : 'Non-Veg Menu PDF';
    console.log('Opening PDF:', pdfPath, 'Title:', title);
    setCurrentPDF({ path: pdfPath, title });
    setShowPDFViewer(true);
  };

  const handleClosePDF = () => {
    setShowPDFViewer(false);
    setCurrentPDF(null);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text"
            >
              <h1 className="hero-title">
                Delicious Food
                <span className="highlight"> Delivered Fresh</span>
              </h1>
              <p className="hero-subtitle">
                Experience the finest flavors from our cloud kitchen. 
                Fresh ingredients, authentic recipes, and lightning-fast delivery.
              </p>
              <div className="hero-buttons">
                <Link to="/menu" className="btn btn-primary btn-large">
                  Order Now 🍽️
                </Link>
                <Link to="/menu" className="btn btn-secondary btn-large">
                  View Menu 📋
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-image"
            >
              <div className="food-illustration">
                🍱
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="features-header"
          >
            <h2>Why Choose Cloud Kitchen?</h2>
            <p>We're committed to delivering exceptional food experiences</p>
          </motion.div>

          <div className="features-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Get your food delivered in 30-45 minutes with our efficient delivery system.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-icon">🥘</div>
              <h3>Fresh Ingredients</h3>
              <p>We use only the freshest ingredients sourced daily for the best taste.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-icon">💳</div>
              <h3>Easy Payment</h3>
              <p>Pay securely with UPI, Google Pay, or other digital payment methods.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-icon">📱</div>
              <h3>WhatsApp Support</h3>
              <p>Get instant support and order updates directly through WhatsApp.</p>
            </motion.div>
          </div>
          
          {/* PDF Menu Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="pdf-menu-section"
          >
            <h3>View Our Complete Menu</h3>
            <p>Browse our full menu in PDF format</p>
            <div className="pdf-menu-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pdf-menu-btn veg-pdf-btn"
                onClick={() => handleViewPDF('veg')}
              >
                📄 Veg Menu PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pdf-menu-btn nonveg-pdf-btn"
                onClick={() => handleViewPDF('nonveg')}
              >
                📄 Non-Veg Menu PDF
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Order?</h2>
            <p>Browse our delicious menu and place your order in just a few clicks!</p>
            <Link to="/menu" className="btn btn-primary btn-large">
              Start Ordering Now 🍽️
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer */}
      <AnimatePresence>
        {showPDFViewer && currentPDF && (
          <PDFViewer
            pdfPath={currentPDF.path}
            title={currentPDF.title}
            onClose={handleClosePDF}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
