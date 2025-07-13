'use client';

import { useSearchParams } from 'next/navigation';
import OfferPreview from '@/components/OfferPreview';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const offer = searchParams.get('offer');

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Kein Angebot gefunden
          </h1>
          <p className="text-gray-600">
            Bitte generieren Sie zuerst ein Angebot auf der Startseite.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ihr generiertes Angebot
          </h1>
          <p className="text-xl text-gray-600">
            Sie können das Angebot kopieren oder als PDF speichern
          </p>
        </div>
        <OfferPreview offer={offer} />
      </div>
    </main>
  );
} 