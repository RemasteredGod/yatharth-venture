'use client';

import { useState, useEffect } from 'react';

export default function SimplePDFViewer({ isOpen, onClose, pdfUrl, title }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const openInNewTab = () => {
    window.open(pdfUrl, '_blank');
    onClose();
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Anandam City Presentation.pdf';
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <h2>{title}</h2>
          <button className="pdf-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div
          className="pdf-viewer-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(45deg, #1a2a6c, #ff6600)',
              color: 'white',
              padding: '40px',
              borderRadius: '15px',
              marginBottom: '30px',
              fontSize: '3rem',
            }}
          >
            📄
          </div>

          <h3
            style={{
              color: '#1a2a6c',
              marginBottom: '20px',
              fontSize: '1.5rem',
            }}
          >
            प्रोजेक्ट प्रेजेंटेशन देखें
          </h3>

          <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
            Anandam City की विस्तृत जानकारी के लिए PDF प्रेजेंटेशन देखें।
            <br />
            आप इसे नए टैब में खोल सकते हैं या डाउनलोड कर सकते हैं।
          </p>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={openInNewTab}
              style={{
                background: 'linear-gradient(45deg, #1a2a6c, #2a3a7c)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(26, 42, 108, 0.3)',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(26, 42, 108, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(26, 42, 108, 0.3)';
              }}
            >
              🔗 नए टैब में खोलें
            </button>

            <button
              onClick={downloadPDF}
              style={{
                background: 'linear-gradient(45deg, #ff6600, #ff8533)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 102, 0, 0.3)',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 102, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 102, 0, 0.3)';
              }}
            >
              📥 डाउनलोड करें
            </button>
          </div>

          <div
            style={{
              marginTop: '30px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
            }}
          >
            <h4 style={{ color: '#1a2a6c', marginBottom: '15px' }}>
              📋 प्रेजेंटेशन में शामिल:
            </h4>
            <ul
              style={{
                color: '#666',
                textAlign: 'left',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                🏠 प्रोजेक्ट का विस्तृत विवरण
              </li>
              <li style={{ marginBottom: '8px' }}>📍 लोकेशन मैप और सुविधाएं</li>
              <li style={{ marginBottom: '8px' }}>💰 प्राइसिंग और ऑफर्स</li>
              <li style={{ marginBottom: '8px' }}>📸 प्रोजेक्ट की तस्वीरें</li>
              <li style={{ marginBottom: '8px' }}>📞 संपर्क जानकारी</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
