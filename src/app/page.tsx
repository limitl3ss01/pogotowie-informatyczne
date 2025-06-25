import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div style={{position: 'relative', color: '#111', background: '#fff'}}>
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ padding: 40, fontSize: 24, textAlign: 'center' }}
        >
          <h1>HERO z animacją (framer-motion)</h1>
          <p>Test scrollowania. Przewiń stronę w dół i do góry.<br />
            Jeśli widzisz tylko jeden scroll, to znaczy, że problem leżał w kodzie.<br />
            Jeśli nadal są dwa scrolle, to problem leży w środowisku, Next.js lub przeglądarce.<br /><br />
            (Ten widok ma wrapper: min-h-screen flex flex-col + sekcję HERO z animacją framer-motion)
          </p>
        </motion.section>
        <div style={{height: '200vh'}}></div>
      </div>
    </div>
  );
}