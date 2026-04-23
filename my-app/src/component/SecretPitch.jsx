import { useState, useEffect } from 'react';

const SecretPitch = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Tombol rahasia: Alt + P untuk buka/tutup
      if (e.altKey && e.key.toLowerCase() === 'p') {
        setIsOpen((prev) => !prev);
      }
      // Tombol Escape untuk tutup cepat
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const pricingData = [
    { name: 'Landing Page Standar', desc: 'Single page, responsif, Tailwind CSS', price: 'Rp 3 - 4 Juta' },
    { name: 'Multi-Page Website', desc: 'Up to 5 halaman (Home, About, dll), SEO', price: 'Rp 5 Juta' },
    { name: 'Web App + CRUD Simple', desc: 'Login admin, manajemen data, Database', price: 'Rp 7 Juta' },
    { name: 'Web App + CRUD Complex', desc: 'Relasi kompleks, dashboard, ekspor laporan', price: 'Rp 10 - 15 Juta' },
    { name: 'AI Integration Only', desc: 'Integrasi chatbot/analisis tanpa DB berat', price: 'Rp 10 Juta' },
    { name: 'Smart Web (CRUD + AI)', desc: 'Manajemen data + Asisten cerdas AI', price: 'Rp 12 - 13 Juta' },
    { name: 'FULL SYSTEM (Enterprise)', desc: 'Otomasi total, AI Analyst, Skala Besar', price: 'Rp 25 - 30 Juta' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900/90 p-8 shadow-2xl border border-slate-700">
        
        {/* Tombol Close tersembunyi (Bisa klik atau pencet Esc) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white tracking-wide">Investment Options</h2>
          <p className="text-sm text-slate-400 mt-1">Digital Solution & AI Integration</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/80 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Paket Layanan</th>
                <th className="px-6 py-4 font-semibold">Deskripsi</th>
                <th className="px-6 py-4 font-semibold text-right">Estimasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {pricingData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-slate-700/30 transition-colors ${index >= 5 ? 'bg-blue-900/10' : ''}`}
                >
                  <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                  <td className="px-6 py-4 text-slate-400">{item.desc}</td>
                  <td className="px-6 py-4 font-bold text-blue-400 text-right whitespace-nowrap">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-lg bg-orange-900/20 border border-orange-800/30 p-4">
          <p className="text-xs text-orange-200/80 text-center">
            *Biaya yang tertera adalah <b>Development Fee</b> (Jasa Pengembangan). Belum termasuk biaya operasional pihak ketiga (Domain, Supabase Pro, kuota API AI).
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecretPitch;