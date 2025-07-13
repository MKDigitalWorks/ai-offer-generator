import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { offerText } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Please rewrite the provided business offer to sound even more professional and convincing. Keep the structure, but improve the language.',
        },
        {
          role: 'user',
          content: offerText,
        },
      ],
      temperature: 0.7,
    });

    const rewrittenText = response.choices[0].message?.content ?? '';
    return NextResponse.json({ rewrittenText });
  } catch (error) {
    console.error('❌ ERROR in rewrite-offer:', error);
    return new Response('Failed to rewrite offer.', { status: 500 });
  }
}
