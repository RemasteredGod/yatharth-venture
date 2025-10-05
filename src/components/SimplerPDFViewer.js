'use client';

import { useState, useEffect } from 'react';

export default function SimplerPDFViewer({ isOpen, onClose, pdfUrl, title }) {
  const [viewerType, setViewerType] = useState('iframe'); // 'iframe' or 'object'
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      console.log('SimplerPDFViewer opened with URL:', pdfUrl);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, pdfUrl]);

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Anandam City Presentation.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '1.8rem' }}>📄</div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '600' }}>{title}</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={openInNewTab}
              title="नई टैब में खोलें"
              className="pdf-header-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔗 <span>नई टैब</span>
            </button>
            <button
              onClick={downloadPDF}
              title="PDF डाउनलोड करें"
              className="pdf-header-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📥 <span>डाउनलोड</span>
            </button>
            <button 
              className="pdf-close-btn" 
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.5rem',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div className="pdf-viewer-container">
          {error ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: '20px',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem' }}>📄</div>
              <h3 style={{ color: '#1a2a6c', margin: 0 }}>PDF प्रदर्शन में समस्या</h3>
              <p style={{ color: '#666', margin: '10px 0' }}>
                कुछ ब्राउज़र में PDF सीधे नहीं दिख सकता
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={openInNewTab}
                  style={{
                    background: 'linear-gradient(45deg, #1a2a6c, #2a4a9c)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                  }}
                >
                  🔗 नई टैब में खोलें
                </button>
                <button
                  onClick={downloadPDF}
                  style={{
                    background: 'linear-gradient(45deg, #ff6600, #ff8533)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                  }}
                >
                  📥 डाउनलोड करें
                </button>
              </div>
            </div>
          ) : (
            <>
              {viewerType === 'iframe' ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <iframe
                    src={pdfUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: 'white',
                      borderRadius: '0 0 8px 8px',
                      transition: 'opacity 0.3s ease',
                    }}
                    title="PDF Viewer"
                    onLoad={() => {
                      console.log('PDF iframe loaded successfully');
                      setError(null);
                    }}
                    onError={(e) => {
                      console.error('PDF iframe failed to load:', e);
                      setError('PDF लोड नहीं हो सका');
                    }}
                  />
                </div>
              ) : (
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  aria-label="PDF Viewer"
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      gap: '20px',
                      padding: '40px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '3rem' }}>📄</div>
                    <h3 style={{ color: '#1a2a6c', margin: 0 }}>PDF प्रदर्शन समर्थित नहीं</h3>
                    <p style={{ color: '#666', margin: '10px 0' }}>
                      आपका ब्राउज़र PDF को सीधे नहीं दिखा सकता
                    </p>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button
                        onClick={openInNewTab}
                        style={{
                          background: 'linear-gradient(45deg, #1a2a6c, #2a4a9c)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '600',
                        }}
                      >
                        🔗 नई टैब में खोलें
                      </button>
                      <button
                        onClick={downloadPDF}
                        style={{
                          background: 'linear-gradient(45deg, #ff6600, #ff8533)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '600',
                        }}
                      >
                        📥 डाउनलोड करें
                      </button>
                    </div>
                  </div>
                </object>
              )}
            </>
          )}
        </div>

        <div className="pdf-controls" style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '20px',
          borderTop: '1px solid #dee2e6',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <button
              className="pdf-control-btn"
              onClick={() => setViewerType(viewerType === 'iframe' ? 'object' : 'iframe')}
              title="व्यूअर बदलें"
              style={{
                background: 'linear-gradient(135deg, #6c757d, #495057)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(108, 117, 125, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 18px rgba(108, 117, 125, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.3)';
              }}
            >
              🔄 <span>व्यूअर बदलें</span>
            </button>
            
            <button
              className="pdf-control-btn"
              onClick={openInNewTab}
              title="नई टैब में खोलें"
              style={{
                background: 'linear-gradient(135deg, #1a2a6c, #2d4aa7)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(26, 42, 108, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 18px rgba(26, 42, 108, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(26, 42, 108, 0.3)';
              }}
            >
              🔗 <span>नई टैब</span>
            </button>
            
            <button
              className="pdf-control-btn"
              onClick={downloadPDF}
              title="PDF डाउनलोड करें"
              style={{
                background: 'linear-gradient(135deg, #ff6600, #ff8533)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(255, 102, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 18px rgba(255, 102, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 102, 0, 0.3)';
              }}
            >
              📥 <span>डाउनलोड</span>
            </button>
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '15px',
            fontSize: '0.85rem',
            color: '#6c757d',
            fontStyle: 'italic'
          }}>
            💡 टिप: यदि PDF ठीक से नहीं दिख रहा है, तो "व्यूअर बदलें" बटन दबाएं
          </div>
        </div>
      </div>
    </div>
  );
}