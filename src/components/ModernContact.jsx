import React from 'react';
import { Mail, Linkedin, Github, Instagram, Whatsapp, Youtube, ExternalLink } from 'lucide-react';

export default function ModernContact({ lang }) {
  const downloadCV = () => {
    const filePath = `/assets/cv-${lang}.pdf`;
    window.open(filePath, '_blank');
  };

  return (
    <div className="modern-container">
      {/* Tombol Download CV*/}
      <div className="cv-header">
        <button onClick={downloadCV} className="neon-btn download-cv">
          {lang === 'id' ? 'Unduh CV' : lang === 'jp' ? '履歴書' : 'Download CV'}
        </button>
      </div>

      <div className="contact-grid">
        {/* SECTION 1: Direct Email Form */}
        <section className="contact-form-card">
          <h2 className="section-title">Get in Touch</h2>
          <p className="subtitle">Have a question or want to work together?</p>
          
          <form className="email-form">
            <div className="input-field">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="input-field">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="input-field">
              <textarea placeholder="Your Message" rows="4"></textarea>
            </div>
            <button type="submit" className="neon-btn send-msg">
              <Mail size={18} /> Send Message
            </button>
          </form>
        </section>

        {/* SECTION 2: Connect With Me (Social Cards) */}
        <section className="social-connect-card">
          <h2 className="section-title">Connect With Me</h2>
          <div className="social-grid">
            <a href="https://linkedin.com/in/kamiko0714" target="_blank" className="social-item linkedin-wide">
              <div className="social-content">
                <div className="icon-box"><Linkedin /></div>
                <div className="text-box">
                  <span className="platform">Let's Connect</span>
                  <span className="username">on LinkedIn</span>
                </div>
              </div>
              <ExternalLink className="hover-icon" size={20} />
            </a>

            {/* Grid Kecil */}
            <div className="small-social-grid">
               <a href="#" className="social-item"><Github /> <span>Github</span></a>
               <a href="#" className="social-item"><Instagram /> <span>Instagram</span></a>
               <a href="#" className="social-item"><Whatsapp /> <span>WhatsApp</span></a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}