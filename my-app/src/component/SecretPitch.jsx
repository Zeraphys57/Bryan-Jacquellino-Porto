import { useState, useEffect } from 'react';

const TIERS = [
  { range: [0, 1], label: 'Starter',    color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
  { range: [2, 3], label: 'Pro',         color: '#0d9488', bg: 'rgba(13,148,136,0.08)' },
  { range: [4, 5], label: 'AI',          color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { range: [6, 6], label: 'Enterprise',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
];

const getTier = (i) => TIERS.find(t => i >= t.range[0] && i <= t.range[1]);

const SecretPitch = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'p') setIsOpen(prev => !prev);
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const pricingData = [
    { name: 'Landing Page Standar', desc: 'Single page, responsif, Tailwind CSS', price: 'Rp 3 - 4 Juta' },
    { name: 'Multi-Page Website',   desc: 'Up to 5 halaman (Home, About, dll), SEO', price: 'Rp 5 Juta' },
    { name: 'Web App + CRUD Simple',  desc: 'Login admin, manajemen data, Database', price: 'Rp 7 Juta' },
    { name: 'Web App + CRUD Complex', desc: 'Relasi kompleks, dashboard, ekspor laporan', price: 'Rp 10 - 15 Juta' },
    { name: 'AI Integration Only',  desc: 'Integrasi chatbot/analisis tanpa DB berat', price: 'Rp 10 Juta' },
    { name: 'Smart Web (CRUD + AI)', desc: 'Manajemen data + Asisten cerdas AI', price: 'Rp 12 - 13 Juta' },
    { name: 'FULL SYSTEM (Enterprise)', desc: 'Otomasi total, AI Analyst, Skala Besar', price: 'Rp 25 - 30 Juta' },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(18px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
      onClick={e => e.target === e.currentTarget && setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl"
        style={{
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: -1, borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(13,148,136,0.2))',
          filter: 'blur(1px)', zIndex: -1,
        }}/>

        {/* Card */}
        <div style={{
          background: 'rgba(9,9,11,0.96)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{ padding: '28px 32px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#8b5cf6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Bryan Jacquellino · Dev
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 300, color: 'white', letterSpacing: '-0.02em', margin: 0 }}>
                  Investment Options
                </h2>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                  Digital Solution & AI Integration
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#64748b', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.color = 'white'; }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.color = '#64748b'; }}
              >✕</button>
            </div>

            {/* Tier legend */}
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {TIERS.map(t => (
                <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.color }}/>
                  <span style={{ fontSize: 10, color: '#64748b', fontFamily: 'monospace' }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing rows */}
          <div style={{ padding: '8px 0' }}>
            {pricingData.map((item, i) => {
              const tier = getTier(i);
              const isEnterprise = i === 6;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center',
                  padding: '14px 32px',
                  borderLeft: `3px solid ${tier.color}`,
                  marginLeft: 0,
                  background: isEnterprise ? 'rgba(245,158,11,0.05)' : 'transparent',
                  transition: 'background 0.15s',
                  gap: 16,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = tier.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isEnterprise ? 'rgba(245,158,11,0.05)' : 'transparent'; }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: isEnterprise ? 13 : 12,
                      fontWeight: isEnterprise ? 600 : 500,
                      color: isEnterprise ? '#f59e0b' : 'white',
                      marginBottom: 2,
                    }}>
                      {item.name}
                      {isEnterprise && (
                        <span style={{
                          marginLeft: 8, fontSize: 9, padding: '2px 6px',
                          borderRadius: 4, background: 'rgba(245,158,11,0.15)',
                          color: '#f59e0b', fontFamily: 'monospace',
                          letterSpacing: '0.1em', verticalAlign: 'middle',
                        }}>TOP</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: '#475569' }}>{item.desc}</div>
                  </div>
                  <div style={{
                    fontSize: isEnterprise ? 14 : 13,
                    fontWeight: 700,
                    color: tier.color,
                    whiteSpace: 'nowrap',
                    fontFamily: 'monospace',
                  }}>
                    ~{item.price}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div style={{
            margin: '0 24px 24px',
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.12)',
          }}>
            <p style={{ fontSize: 10, color: 'rgba(253,230,138,0.7)', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
              * Biaya yang tertera adalah <strong style={{ color: 'rgba(253,230,138,0.9)' }}>Development Fee</strong> (Jasa Pengembangan).
              Belum termasuk biaya operasional pihak ketiga (Domain, Supabase Pro, kuota API AI).
            </p>
          </div>
        </div>

        {/* Shortcut hint */}
        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: '#334155', fontFamily: 'monospace' }}>
          ESC to close · Alt+P to toggle
        </p>
      </div>
    </div>
  );
};

export default SecretPitch;
