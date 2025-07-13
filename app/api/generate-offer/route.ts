import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, title, duration, price, audience, description, language } = data;

    const languageNameMap: any = {
      en: 'English',
      de: 'German',
      fr: 'French',
      es: 'Spanish',
      ar: 'Arabic',
      zh: 'Mandarin Chinese',
    };

    const langName = languageNameMap[language] || 'English';

    const prompt = `
Create a professional, persuasive business offer in ${langName} based on:

Name: ${name}
Offer Title: ${title}
Duration: ${duration}
Price: ${price}
Target Audience: ${audience}
Description: ${description}

Respond with a fluent offer letter in ${langName} (no bullet points, no JSON).
    `.trim();

    const chat = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const offerText = chat.choices[0].message?.content ?? '';
    return NextResponse.json({ generatedText: offerText });
  } catch (err) {
    console.error('❌ ERROR in generate-offer:', err);
    return new Response('Failed to generate offer.', { status: 500 });
  }
}
