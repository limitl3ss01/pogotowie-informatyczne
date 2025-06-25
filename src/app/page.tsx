'use client';

import { useEffect, useRef, useState } from "react";
import { Bungee } from 'next/font/google';
import { Particles } from "@tsparticles/react";
import { motion } from "framer-motion";
import { Howl } from 'howler';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bungee = Bungee({ subsets: ['latin'], weight: '400' });

// Dźwięk kliknięcia do przycisku 'Zadzwoń'
const clickSound = new Howl({ src: ['/click.mp3'], volume: 0.3 });

// Dźwięk przewijania slidera opinii
const slideSound = new Howl({ src: ['/slide.mp3'], volume: 0.2 });

// Komponent animowanego licznika
const AnimatedCounter = ({ value, label, plus }: { value: number, label: string, plus?: boolean }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const start = 0;
    const end = value;
    if (start === end) return;
    const incrementTime = 18;
    let current = start;
    const step = () => {
      current += Math.ceil((end - start) / 60);
      if (current > end) current = end;
      setCount(current);
      if (current < end) setTimeout(step, incrementTime);
      else setDone(true);
    };
    step();
  }, [value]);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg" style={{textShadow:'0 2px 8px #0a2540'}}>
        {count}{plus && done && '+'}
      </span>
      <span className="text-lg text-blue-100 mt-2 font-bold drop-shadow text-center">{label}</span>
    </div>
  );
};

// Komponent animujący tekst literka po literce
const AnimatedText = ({ text, className, style }: { text: string, className?: string, style?: React.CSSProperties }) => (
  <span className={className} style={style}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 * i, duration: 0.4 }}
        style={{ display: 'inline-block' }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

export default function Home() {
  // Animacja grupy karetek
  const ambulanceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf: number;
    let pos = -240;
    function animate() {
      if (ambulanceRef.current) {
        ambulanceRef.current.style.left = `${pos}px`;
        ambulanceRef.current.style.top = '32vh';
      }
      pos += 2.2;
      if (pos > window.innerWidth) pos = -240;
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  // Dodaj funkcje SVG ikon
  const icons = [
    // Komputer
    (<svg key="pc" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" fill="none" viewBox="0 0 40 40"><rect x="5" y="10" width="30" height="16" rx="2" fill="#1e90ff" stroke="#0a2540" strokeWidth="2"/><rect x="10" y="28" width="20" height="4" rx="1" fill="#e52d27"/><rect x="18" y="32" width="4" height="2" rx="1" fill="#0a2540"/></svg>),
    // Dysk
    (<svg key="disk" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" rx="4" fill="#e52d27" stroke="#0a2540" strokeWidth="2"/><circle cx="20" cy="20" r="6" fill="#fff" stroke="#0a2540" strokeWidth="2"/><circle cx="20" cy="20" r="2" fill="#1e90ff"/></svg>),
    // Wi-Fi
    (<svg key="wifi" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" viewBox="0 0 40 40"><path d="M10 22c5-5 15-5 20 0" stroke="#1e90ff" strokeWidth="2"/><path d="M15 27c2.5-2.5 7.5-2.5 10 0" stroke="#e52d27" strokeWidth="2"/><circle cx="20" cy="32" r="2" fill="#0a2540"/></svg>),
    // Drukarka
    (<svg key="printer" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" fill="none" viewBox="0 0 40 40"><rect x="8" y="18" width="24" height="10" rx="2" fill="#fff" stroke="#0a2540" strokeWidth="2"/><rect x="12" y="10" width="16" height="8" rx="1" fill="#1e90ff"/><rect x="14" y="28" width="12" height="4" rx="1" fill="#e52d27"/></svg>),
    // Narzędzia
    (<svg key="tools" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" fill="none" viewBox="0 0 40 40"><rect x="18" y="8" width="4" height="16" rx="2" fill="#e52d27"/><rect x="10" y="24" width="20" height="4" rx="2" fill="#1e90ff"/><rect x="18" y="28" width="4" height="8" rx="2" fill="#0a2540"/></svg>),
    // Headset
    (<svg key="headset" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" viewBox="0 0 40 40"><rect x="10" y="18" width="20" height="8" rx="4" fill="#1e90ff"/><rect x="8" y="26" width="4" height="6" rx="2" fill="#e52d27"/><rect x="28" y="26" width="4" height="6" rx="2" fill="#e52d27"/></svg>),
    // Lupa
    (<svg key="lupa" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" viewBox="0 0 40 40"><circle cx="18" cy="18" r="8" fill="#fff" stroke="#0a2540" strokeWidth="2"/><rect x="24" y="24" width="8" height="3" rx="1.5" fill="#e52d27" transform="rotate(45 24 24)"/></svg>),
    // Pendrive
    (<svg key="pendrive" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" fill="none" viewBox="0 0 40 40"><rect x="14" y="10" width="12" height="20" rx="3" fill="#e52d27" stroke="#0a2540" strokeWidth="2"/><rect x="17" y="6" width="6" height="8" rx="2" fill="#fff" stroke="#0a2540" strokeWidth="1"/></svg>),
  ];

  // Ikony do sekcji 'Dlaczego warto wybrać nas?'
  const whyIcons = [
    // Szybki dojazd - karetka
    (<svg key="ambulance" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="none" viewBox="0 0 40 40"><rect x="6" y="18" width="20" height="10" rx="3" fill="#fff" stroke="#0a2540" strokeWidth="2"/><rect x="26" y="22" width="8" height="6" rx="2" fill="#e52d27" stroke="#0a2540" strokeWidth="2"/><rect x="12" y="12" width="8" height="8" rx="2" fill="#e52d27" stroke="#0a2540" strokeWidth="2"/><circle cx="12" cy="30" r="3" fill="#0a2540" stroke="#fff" strokeWidth="2"/><circle cx="28" cy="30" r="3" fill="#0a2540" stroke="#fff" strokeWidth="2"/></svg>),
    // Przystępne ceny - moneta
    (<svg key="coin" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill="#fff" stroke="#e52d27" strokeWidth="3"/><text x="20" y="26" textAnchor="middle" fontSize="16" fill="#e52d27" fontWeight="bold">zł</text></svg>),
    // Doświadczenie - gwiazda
    (<svg key="star" className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" fill="#1e90ff" viewBox="0 0 40 40"><polygon points="20,6 24,16 35,16 26,23 29,34 20,27 11,34 14,23 5,16 16,16" stroke="#0a2540" strokeWidth="2"/></svg>),
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center text-gray-900 overflow-x-hidden" style={{position: 'relative', minHeight: '100vh', overflowX: 'hidden'}}>
      {/* ANIMOWANE TŁO: tsParticles + animowany gradient */}
      <div className="fixed inset-0 -z-10 animate-gradient-move pointer-events-none" style={{background: 'linear-gradient(135deg, #0a2540, #e52d27, #1e90ff, #e52d27, #0a2540)', minHeight: '100vh'}} />
      <Particles
        id="tsparticles"
        className="fixed inset-0 -z-10 pointer-events-none"
        options={{
          fullScreen: false,
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 30, density: { enable: true } },
            color: { value: ["#fff", "#e52d27", "#1e90ff"] },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: 3 },
            move: { enable: true, speed: 1, direction: "none", outModes: { default: "out" } },
            links: { enable: true, color: "#fff", opacity: 0.1, distance: 120, width: 1 },
          },
          detectRetina: true,
        }}
      />
      <style jsx global>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 400% 400%;
          animation: gradient-move 18s ease-in-out infinite;
        }
      `}</style>
      {/* ANIMACJA PENDRIVE NA SYGNALE + DYM (wersja premium, bardzo szczegółowa) */}
      <div
        ref={ambulanceRef}
        className="pointer-events-none fixed z-0"
        style={{ top: '30vh', width: 400 }}
      >
        <div className="mb-4 ml-32 flex justify-center">
          <div className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg border-2 border-blue-300 text-lg animate-bounce">Pędzimy uratować Twój sprzęt!</div>
        </div>
        <svg width="400" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradienty */}
            <linearGradient id="pendriveRed" x1="80" y1="60" x2="320" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e52d27" />
              <stop offset="0.5" stopColor="#ff5f5f" />
              <stop offset="1" stopColor="#b71c1c" />
            </linearGradient>
            <linearGradient id="metal" x1="320" y1="60" x2="370" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e0e0e0" />
              <stop offset="0.3" stopColor="#b0b0b0" />
              <stop offset="0.7" stopColor="#d0d0d0" />
              <stop offset="1" stopColor="#f4f4f4" />
            </linearGradient>
            <radialGradient id="shine" cx="0.5" cy="0.2" r="0.7">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="blueRedSplit" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0af" />
              <stop offset="50%" stopColor="#0af" />
              <stop offset="50%" stopColor="#e52d27" />
              <stop offset="100%" stopColor="#e52d27" />
            </linearGradient>
            <radialGradient id="glowBlue" cx="0.3" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="#0af" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0af" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glowRed" cx="0.7" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="#e52d27" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#e52d27" stopOpacity="0" />
            </radialGradient>
            {/* Tekstura szczotkowanego aluminium */}
            <pattern id="brushed" patternUnits="userSpaceOnUse" width="6" height="6">
              <rect x="0" y="0" width="6" height="6" fill="#e0e0e0" />
              <line x1="0" y1="0" x2="6" y2="6" stroke="#b0b0b0" strokeWidth="0.5" />
              <line x1="6" y1="0" x2="0" y2="6" stroke="#d0d0d0" strokeWidth="0.5" />
            </pattern>
            {/* Gradient cienia pod pendrivem */}
            <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#0a2540" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0a2540" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Cień pod pendrivem z gradientem */}
          <ellipse cx="200" cy="110" rx="110" ry="14" fill="url(#shadow)"/>
          {/* Korpus pendrive z gradientem, połyskiem i przetłoczeniami */}
          <rect x="80" y="40" width="240" height="40" rx="16" fill="url(#pendriveRed)" stroke="#a31515" strokeWidth="4"/>
          {/* Przetłoczenia na korpusie */}
          <rect x="100" y="48" width="200" height="4" rx="2" fill="#fff" opacity="0.12"/>
          <rect x="100" y="88" width="200" height="2" rx="1" fill="#fff" opacity="0.10"/>
          <rect x="120" y="60" width="160" height="2" rx="1" fill="#fff" opacity="0.08"/>
          {/* Dodatkowy połysk na korpusie */}
          <path d="M90,45 Q200,30 310,45 Q250,60 90,45" fill="#fff" opacity="0.10"/>
          {/* Logo/napis na korpusie */}
          <text x="200" y="80" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff" opacity="0.25" style={{letterSpacing:'2px'}}>IT 24/7</text>
          {/* Błyskawica na środku pendrive z cieniem */}
          <filter id="shadowFilter" x="-10" y="-10" width="40" height="40">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0a2540" floodOpacity="0.3"/>
          </filter>
          <polygon points="200,52 215,62 205,62 220,78 190,66 205,66 190,52" fill="#fff" opacity="0.85" stroke="#fff" strokeWidth="1.5" filter="url(#shadowFilter)"/>
          {/* Dziurka na smycz z metalową ramką i połyskiem */}
          <ellipse cx="95" cy="60" rx="8" ry="8" fill="#fff" stroke="#0a2540" strokeWidth="2"/>
          <ellipse cx="95" cy="60" rx="6" ry="6" fill="none" stroke="#b0b0b0" strokeWidth="1.5"/>
          <ellipse cx="95" cy="60" rx="3" ry="3" fill="#e52d27"/>
          <ellipse cx="95" cy="57" rx="4" ry="2" fill="#fff" opacity="0.5"/>
          {/* Metalowa końcówka z gradientem, teksturą, linią i nitami */}
          <rect x="320" y="48" width="50" height="24" rx="6" fill="url(#metal)" stroke="#888" strokeWidth="3"/>
          <rect x="320" y="48" width="50" height="24" rx="6" fill="url(#brushed)" opacity="0.25"/>
          <rect x="318" y="46" width="4" height="28" rx="2" fill="#bbb"/>
          {/* Nity/śrubki */}
          <circle cx="330" cy="54" r="2" fill="#888"/>
          <circle cx="330" cy="74" r="2" fill="#888"/>
          <circle cx="355" cy="54" r="2" fill="#bbb"/>
          <circle cx="355" cy="74" r="2" fill="#bbb"/>
          {/* Styki USB */}
          <rect x="340" y="56" width="6" height="12" rx="2" fill="#1e90ff" stroke="#0a2540" strokeWidth="1"/>
          <rect x="352" y="56" width="6" height="12" rx="2" fill="#ffd700" stroke="#0a2540" strokeWidth="1"/>
          {/* Połysk na końcówce */}
          <ellipse cx="345" cy="52" rx="10" ry="3" fill="#fff" opacity="0.3"/>
          {/* Nieregularne refleksy światła na korpusie */}
          <path d="M120,60 Q180,50 240,60 Q220,70 120,60" fill="#fff" opacity="0.07"/>
          <path d="M150,80 Q200,90 250,80 Q230,85 150,80" fill="#fff" opacity="0.05"/>
          {/* SYGNAŁ POLICYJNY – przesunięty na górę pendrive */}
          <g>
            {/* Glow wokół lampy */}
            <ellipse cx="200" cy="40" rx="32" ry="12" fill="url(#glowBlue)" opacity="0.5"/>
            <ellipse cx="200" cy="40" rx="32" ry="12" fill="url(#glowRed)" opacity="0.5"/>
            {/* Podstawa lampy */}
            <rect x="180" y="36" width="40" height="12" rx="6" fill="#222" stroke="#0a2540" strokeWidth="2"/>
            {/* Kopuła lampy: pół na pół niebieska i czerwona, z połyskiem */}
            <ellipse cx="200" cy="36" rx="20" ry="14" fill="url(#blueRedSplit)" stroke="#0a2540" strokeWidth="2"/>
            <ellipse cx="200" cy="32" rx="16" ry="6" fill="#fff" opacity="0.18"/>
            {/* Dynamiczne, obracające się łuki (niebieski i czerwony) */}
            <motion.path
              d="M200 18 a 22 22 0 0 1 22 22"
              fill="none"
              stroke="#0af"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ rotate: 0, opacity: 0.8 }}
              animate={{ rotate: [0, 360], opacity: [0.8, 0.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              style={{ originX: '200px', originY: '36px' }}
            />
            <motion.path
              d="M200 18 a 22 22 0 0 0 -22 22"
              fill="none"
              stroke="#e52d27"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ rotate: 180, opacity: 0.8 }}
              animate={{ rotate: [180, 540], opacity: [0.8, 0.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              style={{ originX: '200px', originY: '36px' }}
            />
            {/* Promienie światła (błyski) */}
            <motion.line
              x1="200" y1="16" x2="200" y2="-8"
              stroke="#0af"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.1, 0.3, 1], delay: 0 }}
            />
            <motion.line
              x1="200" y1="16" x2="220" y2="0"
              stroke="#e52d27"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.2, 0.4, 1], delay: 0.2 }}
            />
            <motion.line
              x1="200" y1="16" x2="180" y2="0"
              stroke="#0af"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.3, 0.5, 1], delay: 0.4 }}
            />
            <motion.line
              x1="200" y1="16" x2="200" y2="-16"
              stroke="#e52d27"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.4, 0.6, 1], delay: 0.6 }}
            />
          </g>
        </svg>
      </div>
      {/* LOGO */}
      <div className="w-full flex justify-center items-center pt-8 pb-4">
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl px-6 py-3 flex items-center justify-center border-2 border-white/40" style={{maxWidth:'420px'}}>
          <img
            src="/79a8410d-e74f-400b-a01a-85111992c764-removebg-preview (1).png"
            alt="Pogotowie Informatyczne logo"
            className="h-20 sm:h-28 max-h-28 w-auto drop-shadow-xl"
            style={{maxHeight:'120px'}}
          />
        </div>
      </div>
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full flex flex-col items-center justify-center py-12 px-4 text-center text-white relative z-10"
      >
        <h1
          className={`text-4xl sm:text-6xl mb-4 tracking-tight animate-bounce ${bungee.className}`}
          style={{
            textShadow: '0 4px 16px #000, 0 1px 0 #fff, 2px 2px 0 #e52d27, -2px -2px 0 #0a2540',
            letterSpacing: '2px',
          }}
        >
          <AnimatedText text="Pogotowie informatyczne 24/7 – zadzwoń teraz" />
        </h1>
        <p className="text-xl sm:text-2xl mb-4 font-medium text-blue-100 max-w-2xl mx-auto">Mobilna pomoc IT na terenie całego województwa Kujawsko-Pomorskiego i okolic – szybko, profesjonalnie, z dojazdem do klienta. Obsługujemy osoby prywatne i firmy, 24 godziny na dobę!</p>
        <a href="tel:573021012" className="inline-block mt-4 px-10 py-4 bg-gradient-to-r from-red-600 via-blue-700 to-blue-900 text-white font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-2xl">573 021 012</a>
      </motion.section>

      {/* USŁUGI */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="w-full flex flex-col items-center justify-center py-12 px-4 text-center text-white relative z-10"
      >
        <div className="max-w-5xl w-full mx-auto">
          <h2
            className={`text-3xl sm:text-5xl mb-8 text-center animate-fade-in-up ${bungee.className}`}
            style={{
              textShadow: '0 4px 16px #000, 0 1px 0 #fff, 2px 2px 0 #e52d27, -2px -2px 0 #0a2540',
              letterSpacing: '2px',
            }}
          >
            <AnimatedText text="Zakres usług" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Naprawa komputerów i laptopów", desc: "Sprzętowa i systemowa naprawa komputerów oraz laptopów." },
              { title: "Odzyskiwanie danych", desc: "Przywracanie utraconych plików z dysków, pendrive'ów i kart pamięci." },
              { title: "Czyszczenie i przyspieszanie systemów", desc: "Optymalizacja i usuwanie wirusów, przyspieszanie działania systemu." },
              { title: "Instalacja Windows / oprogramowania", desc: "Instalacja i konfiguracja systemów operacyjnych oraz programów." },
              { title: "Konfiguracja internetu, Wi-Fi, drukarek", desc: "Pomoc w podłączaniu i konfiguracji urządzeń sieciowych." },
              { title: "Składanie zestawów komputerowych", desc: "Doradztwo i montaż komputerów na zamówienie." },
              { title: "Zdalna pomoc IT", desc: "Szybka pomoc przez internet, bez wychodzenia z domu." },
              { title: "Diagnoza usterek", desc: "Szybka i trafna diagnoza problemów sprzętowych i programowych." },
            ].map((usluga, i) => (
              <div
                key={usluga.title}
                className="relative bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center min-h-[180px] border-2 border-white/30 transition-all duration-300 group cursor-pointer overflow-hidden hover:scale-105 hover:shadow-2xl hover:bg-[#e52d27]/80 hover:border-[#e52d27]"
              >
                {icons[i]}
                <h3 className="font-bold text-lg mb-2 text-blue-900 z-10 relative transition-colors duration-300 group-hover:text-white">{usluga.title}</h3>
                <p className="text-gray-800 text-center z-10 relative transition-colors duration-300 group-hover:text-white font-medium">{usluga.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* DLACZEGO WARTO */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="w-full py-12 px-4 relative z-10"
      >
        <h2
          className={`text-3xl sm:text-5xl mb-8 text-center animate-fade-in-up ${bungee.className}`}
          style={{
            textShadow: '0 4px 16px #000, 0 1px 0 #fff, 2px 2px 0 #e52d27, -2px -2px 0 #0a2540',
            letterSpacing: '2px',
            color: '#fff',
          }}
        >
          <AnimatedText text="Dlaczego warto wybrać nas?" />
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          <div className="flex-1 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg p-6 m-2 flex flex-col items-center justify-center text-center min-h-[120px] border-2 border-white/30 transition-all duration-300 group cursor-pointer overflow-hidden hover:scale-105 hover:shadow-2xl hover:bg-[#e52d27]/80 hover:border-[#e52d27]">
            {whyIcons[0]}
            <h3 className="font-bold text-xl mb-2 text-blue-700 drop-shadow-md transition-colors duration-300 group-hover:text-white">Szybki dojazd</h3>
            <p className="text-gray-800 text-center transition-colors duration-300 group-hover:text-white">Często nawet w 60 minut na terenie całego województwa Kujawsko-Pomorskiego</p>
          </div>
          <div className="flex-1 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg p-6 m-2 flex flex-col items-center justify-center text-center min-h-[120px] border-2 border-white/30 transition-all duration-300 group cursor-pointer overflow-hidden hover:scale-105 hover:shadow-2xl hover:bg-[#e52d27]/80 hover:border-[#e52d27]">
            {whyIcons[1]}
            <h3 className="font-bold text-xl mb-2 text-blue-700 drop-shadow-md transition-colors duration-300 group-hover:text-white">Przystępne ceny</h3>
            <p className="text-gray-800 text-center transition-colors duration-300 group-hover:text-white">Jasny cennik i brak ukrytych kosztów</p>
          </div>
          <div className="flex-1 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg p-6 m-2 flex flex-col items-center justify-center text-center min-h-[120px] border-2 border-white/30 transition-all duration-300 group cursor-pointer overflow-hidden hover:scale-105 hover:shadow-2xl hover:bg-[#e52d27]/80 hover:border-[#e52d27]">
            {whyIcons[2]}
            <h3 className="font-bold text-xl mb-2 text-blue-700 drop-shadow-md transition-colors duration-300 group-hover:text-white">Doświadczenie</h3>
            <p className="text-gray-800 text-center transition-colors duration-300 group-hover:text-white">Pomoc dla osób prywatnych i firm, 24/7</p>
          </div>
        </div>
      </motion.section>

      {/* Sekcja statystyk */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
        className="w-full py-8 px-4 flex flex-col items-center justify-center bg-transparent z-10"
      >
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          <AnimatedCounter value={1000} label="Naprawionych urządzeń" plus />
          <AnimatedCounter value={6} label="Lat doświadczenia" />
          <AnimatedCounter value={800} label="Zadowolonych klientów" plus />
        </div>
      </motion.section>

      {/* KONTAKT */}
      <motion.section
        id="kontakt"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        className="max-w-2xl w-full py-12 px-4 text-center relative z-10"
      >
        <h2
          className={`text-3xl sm:text-5xl mb-6 text-center animate-fade-in-up ${bungee.className}`}
          style={{
            textShadow: '0 4px 16px #000, 0 1px 0 #fff, 2px 2px 0 #e52d27, -2px -2px 0 #0a2540',
            letterSpacing: '2px',
            color: '#fff',
          }}
        >
          <AnimatedText text="Kontakt" />
        </h2>
        <div className="flex flex-col gap-2 items-center">
          <a href="tel:573021012" className="text-lg font-bold text-white drop-shadow-lg hover:text-red-200 hover:underline transition-colors duration-300">573 021 012</a>
          <a href="mailto:wlasciciel@pogotowie-informatyczne.com" className="text-lg text-white drop-shadow-lg hover:text-red-200 hover:underline transition-colors duration-300">wlasciciel@pogotowie-informatyczne.com</a>
        </div>
        <p className="text-gray-100 mt-2 drop-shadow">Działamy 24/7 na terenie całego województwa Kujawsko-Pomorskiego i okolic.</p>
        <form
          action="https://formspree.io/f/mkgbpzjb"
          method="POST"
          className="mt-8 flex flex-col gap-4 items-center w-full max-w-md mx-auto bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border-2 border-white/30 hover:border-red-400 transition-all duration-300"
        >
          <input type="text" name="name" placeholder="Imię" required className="w-full px-4 py-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-gray-700" />
          <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-gray-700" />
          <textarea name="message" placeholder="Wiadomość" required rows={4} className="w-full px-4 py-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-gray-700" />
          <button type="submit" className="w-full bg-gradient-to-r from-red-600 via-blue-700 to-blue-900 text-white font-extrabold py-3 rounded hover:scale-105 hover:shadow-2xl transition-all duration-300 drop-shadow-lg border border-white">Wyślij wiadomość</button>
        </form>
      </motion.section>

      {/* OPINIE (slider) */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        className="w-full py-12 px-4 text-center relative z-10"
      >
        <h2
          className={`text-3xl sm:text-5xl mb-6 text-center animate-fade-in-up ${bungee.className}`}
          style={{
            textShadow: '0 4px 16px #000, 0 1px 0 #fff, 2px 2px 0 #e52d27, -2px -2px 0 #0a2540',
            letterSpacing: '2px',
            color: '#fff',
          }}
        >
          <AnimatedText text="Opinie klientów" />
        </h2>
        <div className="max-w-xl mx-auto">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={true}
            afterChange={() => slideSound.play()}
            className="flex justify-center items-center"
          >
            {[
              {
                author: "Anna Kowalska",
                nick: "techfan88",
                avatar: "A",
                avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
                color: "bg-blue-500",
                date: "2024-05-10",
                rating: 5,
                text: "Bardzo szybka i profesjonalna pomoc! Laptop uratowany w godzinę. Polecam każdemu!"
              },
              {
                author: "Marek Piotrowski",
                nick: "kompMaster",
                avatar: "M",
                avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
                color: "bg-red-500",
                date: "2024-04-22",
                rating: 5,
                text: "Świetny kontakt, ekspresowa naprawa komputera, przystępna cena. Dziękuję!"
              },
              {
                author: "Ewa Zielińska",
                nick: "agn3ska",
                avatar: "E",
                avatarUrl: "",
                color: "bg-green-500",
                date: "2024-03-15",
                rating: 5,
                text: "Odzyskali mi dane z uszkodzonego dysku, myślałam że to niemożliwe. Super ekipa!"
              },
              {
                author: "Tomasz Lewandowski",
                nick: "user_krzys",
                avatar: "T",
                avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg",
                color: "bg-yellow-500",
                date: "2024-02-28",
                rating: 5,
                text: "Zawsze można liczyć na pomoc, nawet w nocy. Fachowo i z uśmiechem."
              },
              {
                author: "Katarzyna Nowak",
                nick: "pawelx",
                avatar: "K",
                avatarUrl: "",
                color: "bg-pink-500",
                date: "2024-01-12",
                rating: 4,
                text: "Bardzo miła obsługa, szybka diagnoza i naprawa. Jedyny minus to cena, ale warto!"
              },
              {
                author: "Paweł Grabowski",
                nick: "julia.pw",
                avatar: "P",
                avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
                color: "bg-indigo-500",
                date: "2023-12-03",
                rating: 5,
                text: "Profesjonalizm na najwyższym poziomie. Polecam każdemu, kto potrzebuje pomocy IT."
              },
              {
                author: "Joanna Szymańska",
                nick: "bartekW",
                avatar: "J",
                avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
                color: "bg-teal-500",
                date: "2023-11-18",
                rating: 5,
                text: "Naprawa drukarki w 30 minut! Fachowo, sprawnie, sympatycznie. Dziękuję!"
              },
              {
                author: "Grzegorz Wójcik",
                nick: "zofiaQ",
                avatar: "G",
                avatarUrl: "",
                color: "bg-orange-500",
                date: "2023-10-05",
                rating: 4,
                text: "Usługa wykonana poprawnie, kontakt bez zarzutu. Polecam, choć czas oczekiwania mógłby być krótszy."
              },
              {
                author: "Monika Pawlak",
                nick: "urbanN",
                avatar: "M",
                avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
                color: "bg-purple-500",
                date: "2023-09-21",
                rating: 5,
                text: "Zgłoszenie awarii w nocy, rano komputer już działał. Super!"
              },
              {
                author: "Krzysztof Baran",
                nick: "sebastian_23",
                avatar: "K",
                avatarUrl: "",
                color: "bg-blue-800",
                date: "2023-08-10",
                rating: 5,
                text: "Bardzo polecam! Szybko, sprawnie, bez zbędnych formalności."
              },
              {
                author: "Natalia Urban",
                nick: "karolinkaXD",
                avatar: "N",
                avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
                color: "bg-pink-700",
                date: "2023-07-02",
                rating: 5,
                text: "Najlepszy serwis komputerowy w okolicy!"
              },
              {
                author: "user1234",
                nick: "piotrmajster",
                avatar: "U",
                avatarUrl: "",
                color: "bg-gray-400",
                date: "2023-06-15",
                rating: 4,
                text: "Wszystko ok, polecam."
              },
              {
                author: "Sebastian Krawczyk",
                nick: "nowyAndrzej",
                avatar: "S",
                avatarUrl: "https://randomuser.me/api/portraits/men/23.jpg",
                color: "bg-blue-400",
                date: "2023-05-11",
                rating: 5,
                text: "Bardzo szybka reakcja na zgłoszenie, komputer naprawiony tego samego dnia. Polecam każdemu!"
              },
              {
                author: "Agnieszka Lis",
                nick: "ithelp24",
                avatar: "A",
                avatarUrl: "",
                color: "bg-pink-400",
                date: "2023-04-29",
                rating: 4,
                text: "Miła obsługa, wszystko wyjaśnione krok po kroku. Cena mogłaby być niższa, ale jakość super."
              },
              {
                author: "Michał Nowicki",
                nick: "fix4you",
                avatar: "M",
                avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg",
                color: "bg-blue-700",
                date: "2023-03-18",
                rating: 5,
                text: "Naprawa laptopa przebiegła sprawnie, bardzo dobry kontakt z serwisem."
              },
              {
                author: "Karolina Dąbrowska",
                nick: "laptopQueen",
                avatar: "K",
                avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
                color: "bg-pink-600",
                date: "2023-02-07",
                rating: 5,
                text: "Polecam! Fachowa pomoc, sympatyczna obsługa, szybka realizacja."
              },
              {
                author: "Piotr Maj",
                nick: "printHero",
                avatar: "P",
                avatarUrl: "",
                color: "bg-green-700",
                date: "2022-12-19",
                rating: 4,
                text: "Usługa wykonana poprawnie, sprzęt działa jak nowy."
              },
              {
                author: "Zofia Król",
                nick: "nightOwl",
                avatar: "Z",
                avatarUrl: "https://randomuser.me/api/portraits/women/19.jpg",
                color: "bg-yellow-600",
                date: "2022-11-02",
                rating: 5,
                text: "Najlepszy serwis w mieście! Dziękuję za uratowanie moich zdjęć."
              },
              {
                author: "Bartek Wrona",
                nick: "fastFixer",
                avatar: "B",
                avatarUrl: "",
                color: "bg-orange-700",
                date: "2022-10-15",
                rating: 5,
                text: "Szybko, sprawnie, bezproblemowo. Polecam każdemu!"
              },
              {
                author: "Julia Pawłowska",
                nick: "happyClient",
                avatar: "J",
                avatarUrl: "https://randomuser.me/api/portraits/women/25.jpg",
                color: "bg-purple-400",
                date: "2022-09-30",
                rating: 5,
                text: "Bardzo profesjonalna obsługa, wszystko działa jak należy."
              },
              {
                author: "Andrzej Nowak",
                nick: "dataSaver",
                avatar: "A",
                avatarUrl: "",
                color: "bg-blue-900",
                date: "2022-08-12",
                rating: 4,
                text: "Serwis godny polecenia, choć czas oczekiwania mógłby być krótszy."
              },
            ].map((op, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(10,37,64,0.18)' }}
                className="flex flex-col sm:flex-row items-center gap-6 justify-center min-h-[180px] max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 px-8 py-6 my-4 relative overflow-hidden review-card"
                style={{ boxShadow: '0 8px 32px 0 rgba(10,37,64,0.10)' }}
              >
                {/* Avatar lub zdjęcie */}
                {op.avatarUrl ? (
                  <img src={op.avatarUrl} alt={op.author} className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-white/60 select-none" />
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white/60 ${op.color} select-none`}>
                    {op.avatar}
                  </div>
                )}
                {/* Treść */}
                <div className="flex-1 flex flex-col items-start justify-center text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-lg text-gray-900">
                      {op.author.split(' ')[0]} {op.author.split(' ')[1][0]}.
                    </span>
                    {/* Ikona Google */}
                    <svg className="w-6 h-6 ml-1" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.6 4.5 29.6 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c10.5 0 20-7.7 20-20 0-1.3-.1-2.7-.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.6 4.5 29.6 2.5 24 2.5c-7.2 0-13 5.8-13 13 0 2.1.5 4.1 1.3 5.7z"/><path fill="#FBBC05" d="M24 43.5c5.7 0 10.5-1.9 14.3-5.1l-6.6-5.4c-2.1 1.4-4.8 2.2-7.7 2.2-6.1 0-11.3-4.1-13.1-9.6l-7 5.4C7.7 39.2 15.2 43.5 24 43.5z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 5.5-7.7 5.5-4.7 0-8.5-3.8-8.5-8.5s3.8-8.5 8.5-8.5c2.1 0 4 .7 5.5 2.1l6.2-6.2C34.6 4.5 29.6 2.5 24 2.5c-7.2 0-13 5.8-13 13s5.8 13 13 13c6.1 0 11.2-4.1 12.7-9.5z"/></g></svg>
                  </div>
                  {/* Gwiazdki */}
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, idx) => (
                      <motion.svg
                        key={idx}
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill={idx < op.rating ? '#FFD600' : '#E0E0E0'}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 + idx * 0.08, duration: 0.3, type: 'spring' }}
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </motion.svg>
                    ))}
                  </div>
                  {/* Tekst opinii */}
                  <motion.p
                    className="text-lg text-gray-800 font-medium mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    „{op.text}”
                  </motion.p>
                  {/* Data */}
                  <span className="text-sm text-gray-500 mt-1">{new Date(op.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </motion.section>

      {/* Sticky Call Button */}
      <div className="w-full flex justify-end px-4 sm:px-8 pt-6">
        <button
          onClick={() => {
            clickSound.play();
            const contact = document.getElementById('kontakt');
            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gradient-to-r from-red-600 via-blue-700 to-blue-900 text-white font-bold rounded-full shadow-2xl px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl flex items-center gap-2 sm:gap-3 hover:scale-110 hover:shadow-3xl transition-all duration-300 border-4 border-white/40 backdrop-blur-lg"
          style={{ boxShadow: '0 8px 32px 0 rgba(10,37,64,0.25)' }}
          aria-label="Zadzwoń teraz"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75C3 4.784 3.784 4 4.75 4h2.5A1.75 1.75 0 0 1 9 5.75v2.5A1.75 1.75 0 0 1 7.25 10H6.5a11.5 11.5 0 0 0 11 11v-.75A1.75 1.75 0 0 1 19.25 18h2.5A1.75 1.75 0 0 1 23 19.75v2.5A1.75 1.75 0 0 1 21.25 24h-2.5A1.75 1.75 0 0 1 17 22.25v-2.5A1.75 1.75 0 0 1 18.75 18h.75a11.5 11.5 0 0 0-11-11v.75A1.75 1.75 0 0 1 4.75 6H2.25A1.75 1.75 0 0 1 .5 4.25v-2.5A1.75 1.75 0 0 1 2.25 0h2.5A1.75 1.75 0 0 1 6.5 1.75v2.5A1.75 1.75 0 0 1 4.75 6H4a11.5 11.5 0 0 0 11 11v-.75A1.75 1.75 0 0 1 16.25 16h-2.5A1.75 1.75 0 0 1 12 14.25v-2.5A1.75 1.75 0 0 1 13.75 10h.75a11.5 11.5 0 0 0-11-11v.75A1.75 1.75 0 0 1 2.25 2H.5A1.75 1.75 0 0 1-1.25.25v-2.5A1.75 1.75 0 0 1 .5-2h2.5A1.75 1.75 0 0 1 4.75 0v2.5A1.75 1.75 0 0 1 3 4.25v1.5z"/>
          </svg>
          Zadzwoń
        </button>
      </div>
    </div>
  );
}