'use client';

import React, { useState } from 'react';

const OfferForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    duration: '',
    price: '',
    audience: '',
    description: '',
    language: 'de',
  });

  const [offerText, setOfferText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setOfferText('');
    try {
      const res = await fetch('/api/generate-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.generatedText) {
        setOfferText(data.generatedText);
      } else {
        setOfferText('❌ Kein Ergebnis vom Server.');
      }
    } catch (err) {
      console.error('❌ Fehler beim Generieren:', err);
      setOfferText('❌ Fehler beim Generieren.');
    }
    setLoading(false);
  };

  const handleRewrite = async () => {
    if (!offerText) return;
    try {
      const res = await fetch('/api/rewrite-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerText,
          language: formData.language,
        }),
      });
      const data = await res.json();
      if (data.rewrittenText) {
        setOfferText(data.rewrittenText);
      } else {
        setOfferText('❌ Kein Rewrite-Ergebnis.');
      }
    } catch (err) {
      console.error('❌ Fehler beim Umschreiben:', err);
      setOfferText('❌ Fehler beim Umschreiben.');
    }
  };

  const handleDownloadPDF = async () => {
    if (!offerText) return;

    const container = document.createElement('div');
    container.innerHTML = `
      <div style="font-family: 'Arial', sans-serif; padding: 24px; color: #111;">
        <h1 style="text-align: center;">Generated Offer</h1>
        ${offerText
          .split('\n\n')
          .map((para) => `<p style="margin-bottom: 16px;">${para.trim()}</p>`)
          .join('')}
      </div>
    `;

    // For now, just copy to clipboard since html2pdf was removed
    navigator.clipboard.writeText(offerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Offer Generator</h1>

      {['name', 'title', 'duration', 'price', 'audience'].map((field) => (
        <input
          key={field}
          style={styles.input}
          name={field}
          placeholder={field}
          value={(formData as any)[field]}
          onChange={handleChange}
        />
      ))}

      <textarea
        name="description"
        placeholder="Beschreibung"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        style={styles.textarea}
      />

      <select
        name="language"
        value={formData.language}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="de">Deutsch</option>
        <option value="en">English</option>
        <option value="fr">Französisch</option>
        <option value="es">Spanisch</option>
        <option value="ar">Arabisch</option>
        <option value="zh">Chinesisch (Mandarin)</option>
      </select>

      <button onClick={handleGenerate} style={styles.button}>
        {loading ? 'Generating...' : 'Generate Offer'}
      </button>

      {offerText && (
        <>
          <div style={styles.output}>
            {offerText.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div style={styles.buttonRow}>
            <button onClick={handleRewrite} style={styles.secondaryButton}>
              Rewrite with AI
            </button>
            <button onClick={handleDownloadPDF} style={styles.secondaryButton}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '700px',
    margin: '50px auto',
    padding: '32px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '24px',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '16px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    marginBottom: '16px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    marginTop: '16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  output: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
  secondaryButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default OfferForm;
