'use client';

import { useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker with legacy build for better compatibility
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function PDFDocument({ pdfUrl, pageNumber, scale, onLoadSuccess, onLoadError }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start',
      minHeight: '100%',
      padding: '20px'
    }}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={
          <div style={{ textAlign: 'center', padding: '20px' }}>
            📄 प्रेजेंटेशन लोड हो रहा है...
          </div>
        }
        error={
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            PDF लोड करने में त्रुटि। कृपया पुनः प्रयास करें।
          </div>
        }
        options={{
          cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }}
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          loading={
            <div style={{ 
              width: '100%', 
              height: '500px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: '#f5f5f5',
              border: '1px solid #ddd'
            }}>
              पेज लोड हो रहा है...
            </div>
          }
        />
      </Document>
    </div>
  );
}