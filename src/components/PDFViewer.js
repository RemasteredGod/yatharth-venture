'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

export default function PDFViewer({ isOpen, onClose, pdfUrl, title }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
    setError('PDF लोड करने में समस्या हुई');
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Anandam City Presentation.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <h2>{title}</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              className="pdf-download-btn"
              onClick={downloadPDF}
              title="PDF डाउनलोड करें"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              ⬇️
            </button>
            <button className="pdf-close-btn" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        <div className="pdf-viewer-container">
          {loading && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #ff6600',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
              <p style={{ fontSize: '1.2rem', color: '#1a2a6c', margin: 0 }}>
                📄 प्रेजेंटेशन लोड हो रहा है...
              </p>
            </div>
          )}

          {error && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: '20px',
                padding: '40px',
              }}
            >
              <div style={{ fontSize: '3rem' }}>❌</div>
              <h3 style={{ color: '#1a2a6c', margin: 0 }}>{error}</h3>
              <button
                onClick={() => window.open(pdfUrl, '_blank')}
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
                नई टैब में खोलें
              </button>
            </div>
          )}

          {!loading && !error && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '100%',
                padding: '20px',
                overflow: 'auto',
              }}
            >
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={
                    <div
                      style={{
                        width: '100%',
                        height: '500px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#f5f5f5',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '15px',
                        }}
                      >
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            border: '3px solid #f3f3f3',
                            borderTop: '3px solid #ff6600',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                          }}
                        ></div>
                        <p style={{ margin: 0, color: '#666' }}>
                          पेज लोड हो रहा है...
                        </p>
                      </div>
                    </div>
                  }
                />
              </Document>
            </div>
          )}
        </div>

        {!loading && !error && numPages && (
          <div className="pdf-controls">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                className="pdf-nav-btn"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                ← पिछला
              </button>

              <span className="pdf-page-info">
                पेज {pageNumber} / {numPages}
              </span>

              <button
                className="pdf-nav-btn"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                अगला →
              </button>
            </div>

            <div className="pdf-zoom-controls">
              <button className="pdf-zoom-btn" onClick={zoomOut}>
                ➖
              </button>
              <span className="pdf-zoom-level">{Math.round(scale * 100)}%</span>
              <button className="pdf-zoom-btn" onClick={zoomIn}>
                ➕
              </button>
              <button className="pdf-zoom-btn" onClick={resetZoom}>
                🔄
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
