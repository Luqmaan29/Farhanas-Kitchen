import React, { useState } from 'react';
import PDFViewer from '../components/PDFViewer';

const PDFTest = () => {
  const [showPDF, setShowPDF] = useState(false);

  const handleOpenPDF = () => {
    console.log('Testing PDF viewer...');
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    setShowPDF(false);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>PDF Viewer Test</h1>
      <button 
        onClick={handleOpenPDF}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}
      >
        Test PDF Viewer
      </button>
      
      {showPDF && (
        <PDFViewer
          pdfPath="/pdfs/veg.pdf"
          title="Test Veg Menu PDF"
          onClose={handleClosePDF}
        />
      )}
    </div>
  );
};

export default PDFTest;
