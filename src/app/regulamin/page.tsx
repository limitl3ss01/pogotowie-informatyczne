import React from 'react';
export default function Regulamin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-16 px-4 bg-gradient-to-br from-blue-100 via-white to-red-100">
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-2 border-white/40">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-900 text-center">Regulamin świadczenia usług</h1>
        <ol className="list-decimal pl-6 text-gray-900 space-y-4">
          <li><b>Postanowienia ogólne:</b> Niniejszy regulamin określa zasady korzystania z usług pogotowia informatycznego dostępnych na stronie pogotowie-informatyczne.com.</li>
          <li><b>Zakres usług:</b> Usługi obejmują naprawę, diagnostykę, konfigurację sprzętu i oprogramowania komputerowego, odzyskiwanie danych, doradztwo IT oraz inne usługi informatyczne świadczone u klienta lub zdalnie.</li>
          <li><b>Warunki realizacji usług:</b> Usługi realizowane są po wcześniejszym zgłoszeniu przez formularz, telefonicznie lub mailowo. Terminy i ceny ustalane są indywidualnie.</li>
          <li><b>Płatności:</b> Akceptujemy płatność gotówką lub przelewem. Wystawiamy faktury VAT na życzenie klienta.</li>
          <li><b>Odpowiedzialność:</b> Serwis dokłada wszelkich starań, by usługi były świadczone profesjonalnie. Nie ponosimy odpowiedzialności za utratę danych powstałą w wyniku awarii sprzętu niezależnej od serwisu.</li>
          <li><b>Reklamacje:</b> Reklamacje można składać mailowo lub telefonicznie w terminie 14 dni od wykonania usługi. Każda reklamacja rozpatrywana jest indywidualnie.</li>
          <li><b>Ochrona danych osobowych:</b> Dane osobowe klientów są przetwarzane zgodnie z polityką prywatności dostępną na stronie.</li>
          <li><b>Postanowienia końcowe:</b> Regulamin może być zmieniany, a aktualna wersja zawsze dostępna jest na stronie internetowej.</li>
        </ol>
        <p className="mt-8 text-sm text-gray-500 text-center">W przypadku pytań dotyczących regulaminu prosimy o kontakt: wlasciciel@pogotowie-informatyczne.com</p>
      </div>
    </div>
  );
} 