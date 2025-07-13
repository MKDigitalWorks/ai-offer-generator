"use client";

import { useState } from "react";
import OfferForm from "./components/OfferForm";
import OfferResult from "./components/OfferResult";

export default function Home() {
  const [generatedOffer, setGeneratedOffer] = useState("");

  const handleResult = (text: string) => {
    setGeneratedOffer(text);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <img
        src="/logo.png"
        alt="Logo"
        width="120"
        height="120"
        style={{ margin: "20px auto" }}
      />
      <OfferForm onResult={handleResult} />
      {generatedOffer && <OfferResult offerText={generatedOffer} />}
    </div>
  );
}
