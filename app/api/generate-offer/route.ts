import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const { name, title, duration, price, audience, description, language } = body;

  const prompt = `Create a professional offer in ${language} based on:
- Name: ${name}
- Title: ${title}
- Duration: ${duration}
- Price: ${price}
- Audience: ${audience}
- Description: ${description}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({ result: completion.choices[0].message.content });
}
