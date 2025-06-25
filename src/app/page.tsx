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
  const [showAmbulance, setShowAmbulance] = useState(false);

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

  useEffect(() => {
    const t1 = setTimeout(() => setShowAmbulance(true), 350);
    return () => {
      clearTimeout(t1);
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

  // Usprawnienie: opóźnione renderowanie animacji tła
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowParticles(true), 200);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center text-gray-900 overflow-x-hidden" style={{position: 'relative', minHeight: '100vh', overflowX: 'hidden'}}>
      {/* ANIMOWANE TŁO: tsParticles + animowany gradient */}
      <div className="fixed inset-0 -z-10 animate-gradient-move pointer-events-none" style={{background: 'linear-gradient(135deg, #0a2540, #e52d27, #1e90ff, #e52d27, #0a2540)', minHeight: '100vh'}} />
      {showParticles && (
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
      )}
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
      {/* ANIMACJA KARETKI + DYM */}
      {showAmbulance && (
        <div
          ref={ambulanceRef}
          className="pointer-events-none fixed z-0"
          style={{ top: '32vh', width: 240 }}
        >
          <div className="mb-4 ml-16 flex justify-center">
            <div className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg border-2 border-blue-300 text-lg animate-bounce">Pędzimy uratować Twój sprzęt!</div>
          </div>
          <svg width="240" height="90" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pendrive tył */}
            <rect x="135" y="38" width="18" height="10" rx="3" fill="#e52d27" stroke="#0a2540" strokeWidth="2"/>
            <rect x="150" y="41" width="3" height="4" fill="#fff" stroke="#0a2540" strokeWidth="1"/>
            {/* Karetka */}
            <rect x="20" y="20" width="90" height="30" rx="8" fill="#fff" stroke="#0a2540" strokeWidth="3"/>
            <rect x="110" y="30" width="30" height="20" rx="5" fill="#e52d27" stroke="#0a2540" strokeWidth="3"/>
            <rect x="35" y="10" width="30" height="20" rx="5" fill="#e52d27" stroke="#0a2540" strokeWidth="3"/>
            {/* Krzyż na dachu */}
            <rect x="48" y="13" width="4" height="14" fill="#fff"/>
            <rect x="43" y="18" width="14" height="4" fill="#fff"/>
            {/* Światła */}
            <rect x="70" y="5" width="10" height="10" fill="#fff" stroke="#e52d27" strokeWidth="2"/>
            <rect x="74" y="7" width="2" height="6" fill="#e52d27"/>
            <rect x="72" y="11" width="6" height="2" fill="#e52d27"/>
            {/* Koła */}
            <circle cx="40" cy="50" r="8" fill="#0a2540" stroke="#fff" strokeWidth="3"/>
            <circle cx="120" cy="50" r="8" fill="#0a2540" stroke="#fff" strokeWidth="3"/>
            {/* Okna */}
            <rect x="60" y="25" width="15" height="5" fill="#0a2540"/>
            <rect x="80" y="25" width="15" height="5" fill="#0a2540"/>
            <rect x="60" y="35" width="35" height="5" fill="#0a2540"/>
            {/* Syrena */}
            <rect x="100" y="15" width="8" height="8" rx="2" fill="#0af" stroke="#0a2540" strokeWidth="1"/>
            {/* Reflektory */}
            <circle cx="20" cy="35" r="4" fill="#ff0" stroke="#0a2540" strokeWidth="1"/>
            <circle cx="20" cy="45" r="4" fill="#ff0" stroke="#0a2540" strokeWidth="1"/>
          </svg>
        </div>
      )}
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
        <div className="max-w-2xl mx-auto">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={true}
            afterChange={() => slideSound.play()}
            className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-lg p-6 border-2 border-white/30"
          >
            {[
              { author: "Anna K.", text: "Bardzo szybka i profesjonalna pomoc! Laptop uratowany w godzinę. Polecam każdemu!" },
              { author: "Marek P.", text: "Świetny kontakt, ekspresowa naprawa komputera, przystępna cena. Dziękuję!" },
              { author: "Ewa Z.", text: "Odzyskali mi dane z uszkodzonego dysku, myślałam że to niemożliwe. Super ekipa!" },
              { author: "Tomasz L.", text: "Zawsze można liczyć na pomoc, nawet w nocy. Fachowo i z uśmiechem." },
            ].map((op: { author: string, text: string }, i: number) => (
              <div key={i} className="flex flex-col items-center justify-center min-h-[180px]">
                <p className="text-xl text-blue-900 font-semibold mb-4">&quot;{op.text}&quot;</p>
                <span className="text-lg text-red-700 font-bold">{op.author}</span>
              </div>
            ))}
          </Slider>
        </div>
      </motion.section>

      {/* Sticky Call Button */}
      <button
        onClick={() => {
          clickSound.play();
          const contact = document.getElementById('kontakt');
          if (contact) contact.scrollIntoView({ behavior: 'smooth' });
        }}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-red-600 via-blue-700 to-blue-900 text-white font-bold rounded-full shadow-2xl px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl flex items-center gap-2 sm:gap-3 hover:scale-110 hover:shadow-3xl transition-all duration-300 border-4 border-white/40 backdrop-blur-lg"
        style={{boxShadow:'0 8px 32px 0 rgba(10,37,64,0.25)'}}
        aria-label="Zadzwoń teraz"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75C3 4.784 3.784 4 4.75 4h2.5A1.75 1.75 0 0 1 9 5.75v2.5A1.75 1.75 0 0 1 7.25 10H6.5a11.5 11.5 0 0 0 11 11v-.75A1.75 1.75 0 0 1 19.25 18h2.5A1.75 1.75 0 0 1 23 19.75v2.5A1.75 1.75 0 0 1 21.25 24h-2.5A1.75 1.75 0 0 1 17 22.25v-2.5A1.75 1.75 0 0 1 18.75 18h.75a11.5 11.5 0 0 0-11-11v.75A1.75 1.75 0 0 1 4.75 6H2.25A1.75 1.75 0 0 1 .5 4.25v-2.5A1.75 1.75 0 0 1 2.25 0h2.5A1.75 1.75 0 0 1 6.5 1.75v2.5A1.75 1.75 0 0 1 4.75 6H4a11.5 11.5 0 0 0 11 11v-.75A1.75 1.75 0 0 1 16.25 16h-2.5A1.75 1.75 0 0 1 12 14.25v-2.5A1.75 1.75 0 0 1 13.75 10h.75a11.5 11.5 0 0 0-11-11v.75A1.75 1.75 0 0 1 2.25 2H.5A1.75 1.75 0 0 1-1.25.25v-2.5A1.75 1.75 0 0 1 .5-2h2.5A1.75 1.75 0 0 1 4.75 0v2.5A1.75 1.75 0 0 1 3 4.25v1.5z"/></svg>
        Zadzwoń
      </button>
    </div>
  );
}