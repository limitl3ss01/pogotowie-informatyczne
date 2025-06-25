export default function Home() {
  return (
    <div style={{position: 'relative', color: '#111', background: '#fff'}}>
      <div style={{padding: 40, fontSize: 24, textAlign: 'center'}}>
        Test scrollowania. Przewiń stronę w dół i do góry.<br />
        Jeśli widzisz tylko jeden scroll, to znaczy, że problem leżał w kodzie.<br />
        Jeśli nadal są dwa scrolle, to problem leży w środowisku, Next.js lub przeglądarce.<br /><br />
        (Ten widok nie ma żadnych styli, animacji, czcionek, wrapperów, flexów, min-h-screen, ani efektów!)
      </div>
      <div style={{height: '200vh'}}></div>
    </div>
  );
}