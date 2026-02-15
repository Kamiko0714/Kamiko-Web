import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Instagram, Twitter, MessageSquare, MessageCircle, ExternalLink,
  Shield, Lightbulb, Network, Globe, Mail, Send, Settings, X 
} from 'lucide-react';
import LineIcon from '../assets/icons/line.png';
import DiscordIcon from '../assets/icons/discord.png';
import TelegramIcon from '../assets/icons/telegram.png';
import WhatsAppIcon from '../assets/icons/whatsapp.png';
import { certificateData } from '../data/certs.js';

export default function ModernView({ t, lang }) {
  const [certTab, setCertTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentNode, setCurrentNode] = useState('AZURE-SGP');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const nodes = ['AZURE-SGP', 'ALIBABA-IDN', 'GCP-HKG'];
    const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
    setCurrentNode(randomNode);
  }, []);

  const skills = {
    infra: ["Kubernetes", "Ansible", "Docker", "Linux"],
    cloud: ["Azure", "GCP", "Alibaba Cloud"],
    other: ["Bash", "Prometheus", "Grafana"]
  };

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING...");
    
    const formData = new FormData(e.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setStatus("SUCCESS! 🚀");
      e.target.reset();
      setTimeout(() => setStatus(""), 4000);
    } else {
      setStatus("ERROR! Try again.");
    }
  };

  return (
    <div className="modern-container">
      {/* HEADER SECTION */}
      <header className="modern-hero" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="node-status" style={{ color: '#00ff88' }} > ● NODE: {currentNode} | OPERATIONAL </div>
        <h1 className="glitch-text" style={{ fontSize: '3.5rem', margin: '10px 0' }}>
          <span style={{ color: '#00ff88' }}>|</span>KAMIKO<span style={{ color: '#00ff88' }}>|</span>
        </h1>
        <div className="role-intent">{t.desc}</div> 
      </header>

      <div className="modern-grid">
        {/* 1. ABOUT ME */}
        <section className="modern-card about-section card-priority-full">
          <div className="about-content">
            <h2 style={{ color: '#00ff88', marginBottom: '10px', fontSize: '1.2rem' }}>{t.hello}</h2>
            <p className="about-text-glow">{t.about_text}</p>
          </div>
        </section>

        {/* 2. EXPERIENCE */}
        <section className="modern-card">
          <div className="card-badge-shimmer">{t.connect_title}</div>
          <div className="experience-timeline">
            
            <div className="exp-item">
              <div className="exp-content">
                <div className="exp-main-row">
                  <h3 className="exp-title">DevOps Trainee</h3>
                  <span className="exp-period">2025 — {t.exp_now}</span>
                </div>
                <div className="exp-company">PT. Tiga Daya Digital Indonesia — (Triputra Group)</div>
                <p className="exp-detail">Eksad Technology</p>
              </div>
            </div>

            <div className="exp-item">
              <div className="exp-content">
                <div className="exp-main-row">
                  <h3 className="exp-title">Lab Assistant</h3>
                  <span className="exp-period">2022 — 2025</span>
                </div>
                <div className="exp-company">Institut Teknologi Indonesia</div>
                <p className="exp-detail">Computer Science</p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. TECHNICAL STACK */}
        <section className="modern-card">
          <div className="card-badge-shimmer">Technical Stack</div>
          <div className="skills-flex" style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.infra.map(s => <span key={s} className="skill-tag-neon">{s}</span>)}
            {skills.cloud.map(s => <span key={s} className="skill-tag-neon">{s}</span>)}
          </div>
        </section>

        {/* 4. FEATURED PROJECTS */}
        <section className="modern-card card-priority-full">
          <div className="card-badge-shimmer">{t.projects_title}</div>
          <div className="projects-grid-2x2"> 
            {[
              { title: t.project_1_title, desc: t.project_1_desc, detail: t.project_1_detail, tools: [Globe] },
              { title: t.project_2_title, desc: t.project_2_desc, detail: t.project_2_detail, tools: [Lightbulb] },
              { title: t.project_3_title, desc: t.project_3_desc, detail: t.project_3_detail, tools: [Settings] },
              { title: t.project_4_title, desc: t.project_4_desc, detail: t.project_4_detail, tools: [Shield] }
            ].map((proj, i) => (
              <div key={i} className="modern-card"> 
                <div className="project-thumb-mini">
                  <div className="tool-icons-row">
                    {proj.tools.map((Icon, idx) => (
                      <Icon key={idx} size={14} color="#00ff00" />
                    ))}
                  </div>
                </div>
                <h4 className="proj-title">{proj.title}</h4>
                <p className="proj-desc">{proj.desc}</p>
                <div className="project-actions">
                  <button className="btn-mini-solid" onClick={() => setSelectedProject(proj)}>
                    {t.view_detail}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CREDENTIALS */}
        <section className="modern-card card-priority-full">
          <div className="card-badge-shimmer">Credentials</div>
          <div className="cert-tabs">
            {['all', 'networking', 'cloud', 'security'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setCertTab(tab)} 
                className={`tab-btn ${certTab === tab ? 'active' : ''}`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="cert-list-featured">
            {certificateData
              .filter(cert => certTab === 'all' || cert.category === certTab)
              .slice(0, 3)
              .map(cert => (
                <div key={cert.id} className="cert-item">
                  {cert.name} 
                  <a href={cert.link} target="_blank" rel="noreferrer">
                    <ExternalLink size={14} color="#00ff00"/>
                  </a>
                </div>
              ))
            }
          </div>
          <button className="more-certs-btn" onClick={() => setShowModal(true)}>
            View all the certificates I have
          </button>
        </section>

        {/* 6. CONTACT SECTION (DIBUNGKUS GRID AGAR SEJAJAR DI DESKTOP) */}
        {/* BOX 1: SOCIAL CONNECT */}
        <div className="modern-card social-architecture-area">
          <div className="card-badge-shimmer">{t.nonformal}</div>
          <div className="social-nodes-container">
            <a href="https://linkedin.com/in/kamiko0714" target="_blank" rel="noopener noreferrer" className="node-main">
              <div className="node-pulse"></div>
              <Linkedin size={24} color="#0077b5" />
              <span className="node-label">Professional Hub</span>
            </a>
            <div className="nodes-satellite-grid">
              <a href="https://github.com/kamiko0714" target="_blank" className="node-satellite github">
                <Github size={20} />
                <div className="node-line"></div>
              </a>
              <a href="https://wa.me/6285111300714" target="_blank" className="node-satellite whatsapp">
                <img src={WhatsAppIcon} alt="WA" />
                <div className="node-line"></div>
              </a>
              <a href="https://line.me/ti/p/9dzEKkRqQ2" target="_blank" className="node-satellite line">
                <img src={LineIcon} alt="LINE" />
                <div className="node-line"></div>
              </a>
              <a href="https://discordapp.com/users/mikade0714" target="_blank" className="node-satellite discord">
                <img src={DiscordIcon} alt="Discord" />
                <div className="node-line"></div>
              </a>
            </div>
          </div>
        </div>

        {/* BOX 2: CONTACT FORM */}
        <div className="modern-card contact-form-area">
          <h2 className="section-title">{t.contact_title}</h2>
          <form 
            className="modern-email-form" 
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <input 
              name="name"
              placeholder={t.form_name} 
              className="contact-input" 
              style={{ width: '100%', boxSizing: 'border-box' }} 
              required
            />
            <input 
              type="email"
              name="email"
              placeholder="your-email@example.com" 
              className="contact-input" 
              style={{ width: '100%', boxSizing: 'border-box' }} 
              required
            />
            <textarea 
              name="message"
              placeholder={t.form_message} 
              className="contact-textarea" 
              style={{ width: '100%', boxSizing: 'border-box', minHeight: '100px' }} 
              required
            />
            <button 
              type="submit" 
              className="neon-btn-send" 
              style={{ width: '100%', position: 'relative', overflow: 'hidden' }}
              disabled={status === "SENDING..."}
            >
              <div className="btn-content-wrapper">
                {status === "SENDING..." ? (
                  <>
                    <div className="loader-spinner"></div>
                    <span>TRANSMITTING...</span>
                  </>
                ) : status === "SUCCESS! 🚀" ? (
                  <span className="status-pulse">DATA_RECEIVED_OK</span>
                ) : (
                  <>
                    <Mail size={16} /> 
                    <span>{t.form_send}</span>
                  </>
                )}
              </div>
            </button>
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
          </form>
        </div>
      </div>

      {/* MODAL SECTION */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>DATABASE_CERTS</h3>
              <button onClick={() => setShowModal(false)} className="close-modal-btn">
                <span className="close-text">CLOSE</span>
                <X size={18} />
              </button>
            </div>
            <ul className="modal-cert-list">
              {certificateData.map((cert) => (
                <li key={cert.id}>
                  {cert.name} 
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={12}/>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content cyberpunk-border" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ color: '#00ff00' }}>{selectedProject.title}</h3>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            </div>
            <div className="modal-body">
              <p className="about-text-glow">{selectedProject.detail}</p>
              <div className="modal-tools-row" style={{ marginTop: '15px' }}>
                {selectedProject.tools.map((Icon, idx) => <Icon key={idx} size={20} color="#00ff00" />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}