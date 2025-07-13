'use client';

import { useState } from 'react';

export default function OfferForm() {
  const [form, setForm] = useState({
    name: '',
    title: '',
    duration: '',
    price: '',
    audience: '',
    description: '',
  });

  const [language, setLanguage] = useState<'en' | 'de' | 'fr' | 'es' | 'ar' | 'zh'>('en');

  const translations = {
    en: {
      name: 'Name',
      title: 'Title',
      duration: 'Duration',
      price: 'Price',
      audience: 'Audience',
      description: 'Description',
      generate: 'Generate Offer',
    },
    de: {
      name: 'Name',
      title: 'Titel',
      duration: 'Dauer',
      price: 'Preis',
      audience: 'Zielgruppe',
      description: 'Beschreibung',
      generate: 'Angebot generieren',
    },
    fr: {
      name: 'Nom',
      title: 'Titre',
      duration: 'Durée',
      price: 'Prix',
      audience: 'Public cible',
      description: 'Description',
      generate: 'Générer une offre',
    },
    es: {
      name: 'Nombre',
      title: 'Título',
      duration: 'Duración',
      price: 'Precio',
      audience: 'Audiencia',
      description: 'Descripción',
      generate: 'Generar oferta',
    },
    ar: {
      name: 'الاسم',
      title: 'العنوان',
      duration: 'المدة',
      price: 'السعر',
      audience: 'الجمهور المستهدف',
      description: 'الوصف',
      generate: 'إنشاء عرض',
    },
    zh: {
      name: '姓名',
      title: '标题',
      duration: '时长',
      price: '价格',
      audience: '目标用户',
      description: '描述',
      generate: '生成报价',
    },
  };

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  const isRTL = language === 'ar';

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '600px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
      }}
    >
      <input
        type="text"
        name="name"
        placeholder={t.name}
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder={t.title}
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="duration"
        placeholder={t.duration}
        value={form.duration}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder={t.price}
        value={form.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="audience"
        placeholder={t.audience}
        value={form.audience}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder={t.description}
        value={form.description}
        onChange={handleChange}
        rows={4}
      />

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value as 'en' | 'de' | 'fr' | 'es' | 'ar' | 'zh')
        }
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ar">العربية</option>
        <option value="zh">中文（简体）</option>
      </select>

      <button type="submit" style={{ backgroundColor: 'black', color: 'white', padding: '1rem' }}>
        {t.generate}
      </button>
    </form>
  );
}
