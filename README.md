# AI-Angebotsgenerator

Ein Next.js-basiertes Webtool zur automatischen Generierung professioneller Angebote mit KI-Unterstützung.

## Features

- Einfaches Formular zur Eingabe von Angebotsdetails
- KI-gestützte Generierung professioneller Angebote
- Kopieren des Angebots in die Zwischenablage
- Export als PDF
- Responsive Design mit TailwindCSS

## Technologien

- Next.js 14
- TypeScript
- TailwindCSS
- OpenAI API (GPT-4)
- React-to-PDF

## Installation

1. Repository klonen:
```bash
git clone [repository-url]
cd ai-angebotsgenerator
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Umgebungsvariablen konfigurieren:
Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis und fügen Sie Ihren OpenAI API-Key hinzu:
```
OPENAI_API_KEY=your-api-key-here
```

4. Entwicklungsserver starten:
```bash
npm run dev
```

Die Anwendung ist nun unter `http://localhost:3000` verfügbar.

## Verwendung

1. Öffnen Sie die Startseite
2. Füllen Sie das Formular mit Ihren Angebotsdetails aus
3. Klicken Sie auf "Angebot generieren"
4. Auf der Ergebnis-Seite können Sie das Angebot:
   - Kopieren
   - Als PDF exportieren

## Lizenz

MIT
