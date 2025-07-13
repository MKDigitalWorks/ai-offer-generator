'use client';

import React from 'react';

interface OfferResultProps {
  offerText: string;
}

const OfferResult: React.FC<OfferResultProps> = ({ offerText }) => {
  if (!offerText) return null;

  // Aufteilen in Absätze anhand von Doppelleerzeichen oder \n\n
  const paragraphs = offerText
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Generated Offer</h2>
      <div style={styles.textBlock}>
        {paragraphs.map((para, index) => (
          <p key={index} style={styles.paragraph}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '700px',
    margin: '40px auto',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  textBlock: {
    lineHeight: '1.6',
    fontSize: '16px',
    color: '#111',
  },
  paragraph: {
    marginBottom: '16px',
  },
};

export default OfferResult;
