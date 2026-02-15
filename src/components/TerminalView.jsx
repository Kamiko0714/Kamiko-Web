import React, { useState, useEffect, useRef } from 'react';

export default function TerminalView({ t, lang }) {
  const [input, setInput] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [logs, setLogs] = useState([
    `[${new Date().toISOString().replace('T', ' ').split('.')[0]}] INFO: ${t.booting}`,
    `[${new Date().toISOString().replace('T', ' ').split('.')[0]}] INFO: Profile Loaded.`,
    `[LOG] STATUS: READY_FOR_COMMANDS`
  ]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderProjects = (args = []) => {
    const projectId = args[0]; 
    const validIds = ['1', '2', '3', '4'];

    if (projectId && validIds.includes(projectId)) {
      const num = projectId;
      return `
      [ DETAIL PROJECT ${num} ]
      --------------------------
      Title  : ${t[`project_${num}_title`]}
      Type   : ${t[`project_${num}_desc`]}
      Detail : ${t[`project_${num}_detail`]}
      `;  
    }

    let output = `${t.projects_title}\n${"=".repeat(t.projects_title.length)}\n`;
    validIds.forEach(num => {
      output += `\n[${num}] ${t[`project_${num}_title`]}\n    > ${t[`project_${num}_desc`]}\n`;
    });
    
    output += `\nTip: Type 'projects <id>' (ex: projects 1) for more details.`;
    return output;
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const fullInput = input.trim();
      if (!fullInput) return;

      const [cmd, ...args] = fullInput.toLowerCase().split(' ');
      let response = "";

      const commands = {
        help: () => "Available commands: about, skills, projects, certs, cv, status, clear",
        about: () => `NAME   : Dewa Athallah Putra Kamiko\nROLE   : ${t.desc}\nFOCUS  : IT Infrastructure, Automation, Reliability`,
        skills: () => "INFRA  : K8S, Docker, Ansible, Terraform\nCLOUD  : Azure, GCP\nLANGS  : Go, Bash, Python",
        cv: () => {
          window.open(`/cv/cv-${lang}.pdf`, '_blank');
          return "ACTION: Opening CV in a new tab...";
        },
        projects: (args) => renderProjects(args), 
        certs: (flags) => {
          if (flags.includes('--all')) return "1. CCNA\n2. Ethical Hacker\n3. Bangkit Academy\n4. Alibaba Cloud (VPC, OSS, ECS)\n5. IoT Camp\n... total 20+ certs found.";
          return "TOP CREDENTIALS:\n- CCNA (Cisco Certified Network Associate)\n- Certified Ethical Hacker\n- Bangkit Cloud Computing Graduate";
        },
        status: () => {
          const timestamp = new Date().toLocaleTimeString();
          const baseStatus = [
            `SYSTEM STATUS : OPERATIONAL`,
            `OS            : Kamiko-OS v0.7.14`,
            `NODE          : AZURE-SOUTH-SGP-01`,
            `UPTIME        : 99.9% (Stable)`,
            `CPU/MEM       : 0.12% / 128MB`,
            `LOCATION      : Jakarta, Indonesia [ID]`,
          ].join('\n');

          const langStatus = `\n[INFO] : ${wrapText(t.lang_status, 9)}`;
          const aiNotice = lang === 'jp' || lang === 'en' ? `\n[NOTE]        : ${t.jp_status}` : '';

          return `${baseStatus}${langStatus}${aiNotice}\nLAST_CHECK    : ${timestamp}`;
        }
      };

      if (cmd === 'clear') {
        setLogs([]);
      } else if (commands[cmd]) {
        response = commands[cmd](args);
        setLogs(prev => [...prev, `guest@kamiko:~$ ${fullInput}`, response]);
      } else {
        setLogs(prev => [...prev, `guest@kamiko:~$ ${fullInput}`, `command not found: ${cmd}. Type 'help' for list.`]);
      }

      setInput('');
    }
  };

return (
  <div className="terminal-wrapper" 
       onClick={() => inputRef.current?.focus()} 
       style={{ 
         display: 'flex', 
         flexDirection: 'column', 
         background: '#000',
         color: '#ffffff', 
         fontFamily: '"Courier New", Courier, monospace',
         padding: '100px 30px 30px 30px',
         minHeight: '100vh', 
         width: '100%', 
         overflowY: 'auto'
       }}
       ref={scrollRef}>
      
      <style>{`
        .fake-input { background: transparent; border: none; color: #ffffff; outline: none; flex-grow: 1; font-family: inherit; font-size: 1rem; }
        .prompt { color: #ffffff; font-weight: bold; }
        .scanline { position: fixed; top: 0; left: 0; width: 100%; height: 2px; background: rgba(0, 255, 0, 0.1); opacity: 0.5; pointer-events: none; z-index: 10; }
        pre { color: #ffffff; line-height: 1.2; margin-bottom: 20px; white-space: pre; }
      `}</style>

      <div className="scanline"></div>

      <pre>
{`#####################################################################################
[ SYSTEM STATUS: OPERATIONAL ]                                 [ TIME: ${currentTime} WIB ]
#####################################################################################

  _  __               _ _       
 | |/ /__ _ _ __ ___ (_) | _____    
 | ' // _\` | '_ \` _ \\| | |/ / _ \\
 | . \\ (_| | | | | | | |   < (_) |
 |_|\\_\\__,_|_| |_| |_|_|_|\\_\\___/

 > ${t.hello} | ${t.desc}
 -----------------------------------------------------------------------------------
 ${t.welcome} - Kamiko-OS v0.7.14
 Hint: Type 'help' to see available commands or 'projects' to see my work.
 ${t.info}
 -----------------------------------------------------------------------------------`}
      </pre>

      <div className="logs terminal-content">
        {logs.map((log, i) => {
          let logColor = "#ffffff";
          if (log.includes("INFO:")) logColor = "#00ff88";
          if (log.includes("guest@kamiko")) logColor = "#5dade2";
          if (log.includes("command not found")) logColor = "#ff5555";
          if (log.includes("[ DETAIL PROJECT")) logColor = "#f1c40f";

          return (
            <div key={i} style={{ 
              whiteSpace: 'pre-wrap', 
              marginBottom: '8px', 
              color: logColor,
              borderLeft: log.startsWith('[') ? '2px solid' + logColor : 'none',
              paddingLeft: log.startsWith('[') ? '10px' : '0'
            }}>
              {log}
            </div>
          );
        })}
      </div>

      <div className="input-area" style={{ display: 'flex', gap: '1ch', marginTop: '10px' }}>
        <span className="prompt">guest@kamiko:~$</span>
        <input
          ref={inputRef}
          type="text"
          className="fake-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  );
}