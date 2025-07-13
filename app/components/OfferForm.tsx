"use client";

import { useState } from "react";

type OfferFormProps = {
  onResult: (text: string) => void;
};

const translations: Record<
  string,
  { name: string; title: string; duration: string; price: string; audience: string; description: string; button: string }
> = {
  en: {
    name: "Name",
    title: "Title",
    duration: "Duration",
    price: "Price",
    audience: "Audience",
    description: "Description",
    button: "Generate Offer",
  },
  de: {
    name: "Name",
    title: "Titel",
    duration: "Dauer",
    price: "Preis",
    audience: "Zielgruppe",
    description: "Beschreibung",
    button: "Angebot generieren",
  },
  fr: {
    name: "Nom",
    title: "Titre",
    duration: "Durée",
    price: "Prix",
    audience: "Public cible",
    description: "Description",
    button: "Générer l'offre",
  },
  es: {
    name: "Nombre",
    title: "Título",
    duration: "Duración",
    price: "Precio",
    audience: "Audiencia",
    description: "Descripción",
    button: "Generar oferta",
  },
  ar: {
    name: "الاسم",
    title: "العنوان",
    duration: "المدة",
    price: "السعر",
    audience: "الجمهور المستهدف",
    description: "الوصف",
    button: "توليد العرض",
  },
  zh: {
    name: "姓名",
    title: "标题",
    duration: "时长",
    price: "价格",
    audience: "目标受众",
    description: "描述",
    button: "生成报价",
  },
};

export default function OfferForm({ onResult }: OfferFormProps) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    duration: "",
    price: "",
    audience: "",
    description: "",
  });

  const [language, setLanguage] = useState("en");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/generate-offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, language }),
    });

    const data = await res.json();
    onResult(data.result);
  };

  const t = translations[language];

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <input type="text" name="name" placeholder={t.name} value={form.name} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: "10px" }} />
      <input type="text" name="title" placeholder={t.title} value={form.title} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: "10px" }} />
      <input type="text" name="duration" placeholder={t.duration} value={form.duration} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: "10px" }} />
      <input type="text" name="price" placeholder={t.price} value={form.price} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: "10px" }} />
      <input type="text" name="audience" placeholder={t.audience} value={form.audience} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: "10px" }} />
      <textarea name="description" placeholder={t.description} value={form.description} onChange={handleChange} rows={4} style={{ display: "block", width: "100%", marginBottom: "10px" }} />

      <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ display: "block", width: "100%", marginBottom: "10px" }}>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ar">العربية</option>
        <option value="zh">中文</option>
      </select>

      <button type="submit" style={{ backgroundColor: "black", color: "white", padding: "10px 20px", width: "100%", fontWeight: "bold", cursor: "pointer" }}>
        {t.button}
      </button>
    </form>
  );
}
