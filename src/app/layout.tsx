import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pogotowie informatyczne 24/7 – szybka pomoc IT z dojazdem | Cała Polska",
  description: "Mobilne pogotowie informatyczne 24/7. Szybka naprawa komputerów, odzyskiwanie danych, instalacja systemów, konfiguracja internetu. Dojazd do klienta na terenie całej Polski.",
  icons: {
    icon: [
      { rel: 'icon', url: '/faicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/faicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/faicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/android-chrome-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/faicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/faicon-16x16.png" />
        <link rel="icon" href="/faicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <title>Pogotowie informatyczne 24/7 – szybka pomoc IT z dojazdem | Cała Polska</title>
        <meta name="description" content="Mobilne pogotowie informatyczne 24/7. Szybka naprawa komputerów, odzyskiwanie danych, instalacja systemów, konfiguracja internetu. Dojazd do klienta na terenie całej Polski." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="pogotowie komputerowe, naprawa komputerów, serwis laptopów, odzyskiwanie danych, informatyk, Bydgoszcz, Toruń, cała Polska, dojazd do klienta, pomoc IT, usługi informatyczne" />
        <link rel="canonical" href="https://pogotowie-informatyczne.com/" />
        <meta property="og:title" content="Pogotowie informatyczne 24/7 – szybka pomoc IT z dojazdem | Cała Polska" />
        <meta property="og:description" content="Mobilne pogotowie informatyczne 24/7. Szybka naprawa komputerów, odzyskiwanie danych, instalacja systemów, konfiguracja internetu. Dojazd do klienta na terenie całej Polski." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pogotowie-informatyczne.com/" />
        <meta property="og:image" content="https://pogotowie-informatyczne.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pogotowie informatyczne 24/7 – szybka pomoc IT z dojazdem | Cała Polska" />
        <meta name="twitter:description" content="Mobilne pogotowie informatyczne 24/7. Szybka naprawa komputerów, odzyskiwanie danych, instalacja systemów, konfiguracja internetu. Dojazd do klienta na terenie całej Polski." />
        <meta name="twitter:image" content="https://pogotowie-informatyczne.com/og-image.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Stopka z linkami do regulaminu i polityki prywatności */}
        <footer className="w-full mt-12 flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-t from-blue-100/60 via-white/60 to-red-100/60 backdrop-blur-lg border-t border-white/30">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-center text-sm text-gray-700">
            <a href="/regulamin" className="hover:underline hover:text-blue-700 transition-colors">Regulamin</a>
            <span className="hidden sm:inline">|</span>
            <a href="/polityka-prywatnosci" className="hover:underline hover:text-blue-700 transition-colors">Polityka prywatności</a>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">&copy; {new Date().getFullYear()} pogotowie-informatyczne.com</div>
        </footer>
      </body>
    </html>
  );
}
