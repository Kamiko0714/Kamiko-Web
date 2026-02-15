import React from 'react';

export default function SplashScreen({ onSelect }) {
  const langs = [
    { code: 'en', label: 'English' },
    { code: 'id', label: 'Indonesia' },
    { code: 'jp', label: '日本語' }
  ];

  return (
    <div style={{ background: '#000', color: '#0f0', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <h2>[ INITIALIZING SYSTEM ]</h2>
      <p>Select Language & UI Mode:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {langs.map(l => (
          <div key={l.code} style={{ border: '1px solid #0f0', padding: '10px' }}>
            <span>{l.label}</span> <br/>
            <button onClick={() => onSelect(l.code, 'ascii')}>ASCII</button>
            <button onClick={() => onSelect(l.code, 'modern')}>MODERN</button>
          </div>
        ))}
      </div>
    </div>
  );
}