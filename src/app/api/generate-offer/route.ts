import { NextResponse } from 'next/server';
import { generateOffer } from '@/lib/gptClient';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const offer = await generateOffer(data);
    
    return NextResponse.json({ offer });
  } catch (error) {
    console.error('Error in generate-offer API:', error);
    return NextResponse.json(
      { error: 'Failed to generate offer' },
      { status: 500 }
    );
  }
} 