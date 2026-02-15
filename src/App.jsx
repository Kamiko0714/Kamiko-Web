import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import TerminalView from './components/TerminalView'; 
import ModernView from './components/ModernView';
import './styles/theme.css';
import './styles/layout.css';
import './styles/terminal.css';
import './styles/mobile.css';

function App() {
  const [isTerminal, setIsTerminal] = useState(false); 
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'id', label: 'ID INDONESIA', icon: '🇮🇩' },
    { code: 'en', label: 'GB ENGLISH', icon: '🇬🇧' },
    { code: 'jp', label: 'JP 日本語', icon: '🇯🇵' }
  ];

  // --- STAGGERED ANIMATION ---
  useEffect(() => {
    if (isTerminal) return;

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px"
    };

    // 3. Logic Sensor
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('appear');
          }, index * 100); 

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
        const cards = document.querySelectorAll('.modern-card, .project-card-bento');
        cards.forEach(card => observer.observe(card));
    }, 100);

    return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
    };

  }, [isTerminal]);

  const downloadCV = () => {
    const filePath = `/cv/cv-${lang}.pdf`;
    window.open(filePath, '_blank');
  };

  return (
    <div className="main-app" onClick={() => setIsLangOpen(false)}>
      <div className="global-controls" onClick={(e) => e.stopPropagation()}>
        <button className="control-btn" onClick={() => setIsTerminal(!isTerminal)}>
          {isTerminal ? "MODE: MODERN" : "MODE: TERMINAL"}
        </button>
        
        <div className="lang-dropdown">
          <button className="control-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
            LANG: {lang.toUpperCase()} ▾
          </button>

          {isLangOpen && (
            <div className="dropdown-content show">
              {languages.map((l) => (
                <button 
                  key={l.code} 
                  onClick={() => {
                    setLang(l.code);
                    setIsLangOpen(false);
                  }}
                  className={lang === l.code ? 'active' : ''}
                >
                  <span style={{ minWidth: '25px' }}>{l.icon}</span> 
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={downloadCV} className="neon-btn-download">
          {lang === 'id' ? 'UNDUH CV' : lang === 'jp' ? '履歴書' : 'DOWNLOAD CV'}
        </button>
      </div>

      <main key={isTerminal ? "terminal" : "modern"} className="fade-transition">
        {isTerminal ? <TerminalView lang={lang} t={t} /> : <ModernView lang={lang} t={t} />}
      </main>
    </div>
  );
};

export default App;