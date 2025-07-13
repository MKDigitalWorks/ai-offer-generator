import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface OfferData {
  name: string;
  title: string;
  duration: string;
  price: string;
  targetAudience: string;
  description: string;
}

export async function generateOffer(data: OfferData): Promise<string> {
  try {
    const prompt = `Erstelle ein professionelles, höflich formuliertes Angebot für die folgende Dienstleistung:

Anbieter: ${data.name}
Titel: ${data.title}
Dauer: ${data.duration}
Preis: ${data.price}
Zielgruppe: ${data.targetAudience}
Beschreibung: ${data.description}

Gliedere das Angebot sinnvoll in folgende Abschnitte:
1. Einleitung
2. Leistungen
3. Preis
4. Ablauf
5. Abschluss

Das Angebot soll professionell und überzeugend formuliert sein, mit klarer Struktur und einem freundlichen, aber geschäftlichen Ton.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Du bist ein professioneller Business-Coach und Experte für Angebotserstellung. Deine Aufgabe ist es, überzeugende und professionelle Angebote zu erstellen."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content || 'Keine Antwort erhalten';
  } catch (error) {
    console.error('Error generating offer:', error);
    throw new Error('Failed to generate offer');
  }
} 