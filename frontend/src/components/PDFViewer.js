import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './PDFViewer.css';

const PDFViewer = ({ pdfPath, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    console.log('PDF loaded successfully:', pdfPath);
    setIsLoading(false);
  };

  const handleError = () => {
    console.error('PDF failed to load:', pdfPath);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pdf-viewer-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="pdf-viewer-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pdf-viewer-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="pdf-viewer-content">
          {isLoading && (
            <div className="pdf-loading">
              <div className="spinner"></div>
              <p>Loading PDF...</p>
            </div>
          )}
          
          <iframe
            src={`${pdfPath}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            className="pdf-iframe"
            onLoad={handleLoad}
            onError={handleError}
            title={title}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
          
          {/* Fallback button */}
          <div className="pdf-fallback">
            <button 
              className="fallback-btn"
              onClick={() => window.open(pdfPath, '_blank')}
            >
              📄 Open PDF in New Tab
            </button>
          </div>
        </div>
        
        <div className="pdf-viewer-footer">
          <p>💡 Tip: Use the controls above to zoom, download, or print the PDF</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PDFViewer;
