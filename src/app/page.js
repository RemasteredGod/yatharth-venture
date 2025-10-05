'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SimplePDFViewer from '@/components/SimplePDFViewer';

export default function Home() {
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  useEffect(() => {
    // Add smooth entrance animations
    const elements = document.querySelectorAll('.center-box, .logo-container');
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'all 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  }, []);

  const openPDF = () => {
    setIsPDFOpen(true);
  };

  const closePDF = () => {
    setIsPDFOpen(false);
  };

  return (
    <>
      <div className="logo-container">
        <Image 
          src="/logo.jpg" 
          alt="Yatharth Ventures Logo" 
          width={300}
          height={150}
          className="logo"
          priority
        />
      </div>
      
      <div className="center-box">
        <div className="title">Anandam City</div>
        <div className="subtitle">Where Peace Meets Progress</div>
        <div className="desc">
          <strong>"हमें मानते हैं - शांति में समृद्धि छुपी है"</strong>
          <br /><br />
          यह सिर्फ एक प्लॉट नहीं, एक ऐसी जगह है जहाँ आपका कल मुस्कुराता है।
          <br />
          <em style={{ color: '#ff6600', fontWeight: 600 }}>"घर हो अपना"</em>
        </div>
        <button className="main-btn" onClick={openPDF}>
          प्रोजेक्ट की जानकारी देखें
        </button>
      </div>

      <SimplePDFViewer
        isOpen={isPDFOpen}
        onClose={closePDF}
        pdfUrl="/Presentation Anandam City.pdf"
        title="🏡 Anandam City - प्रोजेक्ट प्रेजेंटेशन"
      />
    </>
  );
}