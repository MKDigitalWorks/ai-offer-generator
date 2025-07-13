import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Offer Generator',
  description: 'Generate custom offers with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-neutral-100">{children}</body>
    </html>
  );
}
