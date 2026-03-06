import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ─── Google Fonts injected ─── */
const FontLink = ({ dark }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&family=DM+Sans:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:${dark?"#040408":"#f4f4f8"};color:${dark?"#e2e2e8":"#111118"};font-family:'DM Sans',sans-serif;overflow-x:hidden;transition:background 0.4s,color 0.4s;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:${dark?"#040408":"#e8e8ef"};}
    ::-webkit-scrollbar-thumb{background:#00f5d4;border-radius:2px;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes slideRight{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}
    @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
    @keyframes rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(0,245,212,0.3);}50%{box-shadow:0 0 0 12px rgba(0,245,212,0);}}
    @keyframes scanline{0%{top:-10%;}100%{top:110%;}}
    @keyframes glow{0%,100%{text-shadow:0 0 20px rgba(0,245,212,0.5);}50%{text-shadow:0 0 40px rgba(0,245,212,0.9),0 0 80px rgba(0,245,212,0.4);}}
    @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}

    .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.7s ease,transform 0.7s ease;}
    .reveal.visible{opacity:1;transform:translateY(0);}
    .reveal-left{opacity:0;transform:translateX(-40px);transition:opacity 0.7s ease,transform 0.7s ease;}
    .reveal-left.visible{opacity:1;transform:translateX(0);}
    .reveal-right{opacity:0;transform:translateX(40px);transition:opacity 0.7s ease,transform 0.7s ease;}
    .reveal-right.visible{opacity:1;transform:translateX(0);}
    
    .card-hover{transition:transform 0.3s ease,box-shadow 0.3s ease;}
    .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,245,212,0.15);}
    
    .nav-link{position:relative;color:${dark?"#888":"#666"};text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:0.05em;transition:color 0.2s;}
    .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:#00f5d4;transition:width 0.3s ease;}
    .nav-link:hover{color:#00f5d4;}
    .nav-link:hover::after{width:100%;}
    
    .gradient-text{background:linear-gradient(135deg,#00f5d4 0%,#7b61ff 50%,#ff6b9d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .shimmer-text{background:linear-gradient(90deg,#00f5d4,${dark?"#fff":"#111"},#7b61ff,#00f5d4);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
    
    .skill-tag{display:inline-block;padding:4px 14px;border:1px solid rgba(0,245,212,0.25);border-radius:20px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#00a88f;background:rgba(0,245,212,0.05);transition:all 0.2s;}
    .skill-tag:hover{background:rgba(0,245,212,0.12);border-color:rgba(0,245,212,0.5);color:#00f5d4;}
    
    .timeline-dot{width:12px;height:12px;border-radius:50%;background:#00f5d4;box-shadow:0 0 12px rgba(0,245,212,0.7);animation:pulse 2s infinite;flex-shrink:0;}
    .timeline-line{width:1px;background:linear-gradient(to bottom,#00f5d4,transparent);flex-grow:1;}
    
    .project-card{background:${dark?"linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))":"linear-gradient(135deg,rgba(0,0,0,0.03),rgba(0,0,0,0.01))"};border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"};border-radius:16px;padding:28px;position:relative;overflow:hidden;transition:all 0.3s ease;}
    .project-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,245,212,0.5),transparent);opacity:0;transition:opacity 0.3s;}
    .project-card:hover::before{opacity:1;}
    .project-card:hover{border-color:rgba(0,245,212,0.25);transform:translateY(-4px);box-shadow:0 24px 48px ${dark?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.12)"};}
    
    .input-field{width:100%;background:${dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"};border:1px solid ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)"};border-radius:10px;padding:14px 18px;color:${dark?"#e2e2e8":"#111118"};font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:all 0.3s;}
    .input-field:focus{border-color:rgba(0,245,212,0.5);background:rgba(0,245,212,0.04);box-shadow:0 0 0 3px rgba(0,245,212,0.08);}
    .input-field::placeholder{color:${dark?"#555":"#aaa"};}
    
    .btn-primary{background:linear-gradient(135deg,#00f5d4,#7b61ff);color:#000;font-family:'Syne',sans-serif;font-weight:700;font-size:15px;border:none;border-radius:10px;padding:16px 40px;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,245,212,0.4);}
    .btn-primary:active{transform:translateY(0);}
    .btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
    
    .section-label{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.2em;color:#00a88f;text-transform:uppercase;margin-bottom:12px;}

    .noise{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");}
    
    .toggle-btn{background:none;border:1px solid ${dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.15)"};border-radius:8px;padding:8px 10px;cursor:pointer;color:${dark?"#888":"#666"};transition:all 0.2s;display:flex;align-items:center;justify-content:center;}
    .toggle-btn:hover{border-color:rgba(0,245,212,0.4);color:#00f5d4;}

    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.78);backdrop-filter:blur(12px);z-index:200;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease;}
    .modal-box{width:68vw;max-width:900px;height:82vh;background:${dark?"#0c0c14":"#f8f8fc"};border:1px solid ${dark?"rgba(255,255,255,0.09)":"rgba(0,0,0,0.1)"};border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 40px 100px rgba(0,0,0,0.7),0 0 0 1px rgba(0,245,212,0.08);animation:fadeUp 0.3s ease;}
    .modal-header{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"};}
    .modal-close{background:none;border:1px solid ${dark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.12)"};border-radius:8px;padding:6px 8px;cursor:pointer;color:${dark?"#888":"#666"};transition:all 0.2s;display:flex;}
    .modal-close:hover{border-color:rgba(255,107,157,0.5);color:#ff6b9d;}

    .contact-tab{background:none;border:none;padding:10px 20px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.05em;border-radius:8px;transition:all 0.2s;}
    .contact-tab.active{background:rgba(0,245,212,0.12);color:#00f5d4;}
    .contact-tab.inactive{color:${dark?"#666":"#aaa"};}
    .contact-tab.inactive:hover{color:${dark?"#aaa":"#666"};}
  `}</style>
);

/* ─── Three.js Particle Hero ─── */
function ParticleCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const W = mountRef.current.clientWidth;
    const H = mountRef.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 5;

    // Particles
    const count = 1800;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      const t = Math.random();
      if (t < 0.4) { colors[i*3]=0; colors[i*3+1]=0.96; colors[i*3+2]=0.83; }
      else if (t < 0.7) { colors[i*3]=0.48; colors[i*3+1]=0.38; colors[i*3+2]=1; }
      else { colors[i*3]=1; colors[i*3+1]=0.42; colors[i*3+2]=0.62; }
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.8 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Wireframe sphere
    const sphereGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, wireframe: true, transparent: true, opacity: 0.06 });
    const sphere = new THREE.Mesh(sphereGeo, wireMat);
    scene.add(sphere);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      points.rotation.y += 0.0006;
      points.rotation.x += 0.0002;
      sphere.rotation.y += 0.003;
      sphere.rotation.x += 0.001;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.03;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}

/* ─── Typewriter Effect ─── */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const speed = del ? 40 : 90;
    const timer = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1800);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setIdx(i => i + 1); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, idx, words]);

  return (
    <span style={{ color: "#00f5d4", fontFamily: "'JetBrains Mono',monospace" }}>
      {text}<span style={{ animation: "blink 1s infinite", opacity: 1 }}>|</span>
    </span>
  );
}

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Section Wrapper ─── */
const Section = ({ id, children, style = {} }) => (
  <section id={id} style={{ position: "relative", zIndex: 1, padding: "100px 0", ...style }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>{children}</div>
  </section>
);

/* ─── DATA ─── */
const experience = [
  {
    role: "Analyst — Interest Rate Futures",
    company: "Futures First",
    location: "Bangalore",
    period: "Aug 2024 – Present",
    color: "#00f5d4",
    points: [
      "Trade SOFR & Fed Funds (ZQ) futures with multi-leg structures: calendar spreads, butterflies & double butterflies across the interest rate curve.",
      "Configure OMS execution modules (RangeTrader, QuickASE, ECI) for rule-based strategies with deterministic real-time behavior.",
      "Analyze macro indicators (CPI, NFP, GDP) and execute event-driven logic under tight timing constraints.",
    ],
  },
  {
    role: "SDE Intern",
    company: "Samsung R&D",
    location: "Bangalore",
    period: "Jun 2023 – Jul 2023",
    color: "#7b61ff",
    points: [
      "Built a semi-supervised anomaly detection system for large-scale logs using deep learning — minimal labeled data.",
      "Designed RESTful APIs for session management (create/save/retrieve/list) into an internal tool, streamlining backend functionality.",
    ],
  },
];

const projects = [
  {
    title: "Macro Event Impact Analyzer & SOFR Intelligence Dashboard",
    period: "Oct 2025 – Present",
    tech: ["Python", "FastAPI", "React", "SQLite", "FRED API", "Gemini AI"],
    desc: "Full-stack SOFR rate dashboard visualizing live forward curve movements, spreads, butterflies, and basis-point shifts around macro events (CPI, NFP, GDP). AI-powered hawkish/dovish interpretation of every macro release via Gemini API.",
    highlight: "Deployed live on Render + Vercel",
    color: "#00f5d4",
    github: "https://github.com/ankit637836/",
    liveUrl: "https://macro-ai-dashboard.vercel.app/",
    live: true,
  },
  {
    title: "SQL Murder Mystery — Full Investigation Walkthrough",
    period: "2024",
    tech: ["SQL", "SQLite", "Joins", "Aggregations", "Schema Design", "HTML"],
    desc: "Complete detective investigation using pure SQL — from a cold crime scene report to unmasking the mastermind. Demonstrates advanced SQL: multi-table JOINs, GROUP BY + HAVING, pattern matching, and a single optimized query to identify the villain.",
    highlight: "Knight Lab Challenge · Case Solved ✓",
    color: "#ffd60a",
    github: "https://github.com/ankit637836/SQL-Murder-Mystery",
    liveUrl: "https://ankit637836.github.io/SQL-Murder-Mystery/sql_mystery.html",
    live: true,
  },
  {
    title: "Credit Risk Analyzer & Portfolio Optimizer",
    period: "Jan 2024 – May 2024",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "LSTM", "CNN"],
    desc: "ML pipeline to predict credit risk from financial data using Logistic Regression, RF, SVM, CNN, and LSTM. Implemented Markowitz MVO & Black-Litterman allocation with web-based risk visualization.",
    highlight: "84% accuracy · Top feature: M-Score",
    color: "#7b61ff",
    github: "https://github.com/ankit637836/",
  },
  {
    title: "Real-Time Face Recognition Attendance System",
    period: "Mar 2023 – Apr 2023",
    tech: ["Python", "OpenCV", "CNN", "HTML/CSS"],
    desc: "Web-based face recognition for college attendance & gate entry using live camera feed + Python/OpenCV backend. Multi-face detection, CNN embeddings, automated attendance logging.",
    highlight: "Under Dr. GS Raju, IIT Ropar",
    color: "#ff6b9d",
    github: "https://github.com/ankit637836/Biometric-Access-for-College",
    liveUrl: "https://biometric-access-for-college.netlify.app/",
    live: true,
  },
];

const skills = {
  "Languages": ["C/C++", "Python", "SQL", "HTML/CSS", "JavaScript", "TypeScript"],
  "Web & Backend": ["React", "FastAPI", "REST APIs", "Node.js", "PostgreSQL", "SQLite", "Git"],
  "ML / Data": ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "Matplotlib", "CNN", "LSTM"],
  "System Design & DB": ["System Design", "HLD / LLD", "SQL Queries", "Schema Design", "Indexing", "Joins & Aggregations"],
  "Domain Knowledge": ["SOFR Futures", "Macro Analysis", "OMS Systems", "TT Platform", "ADL"],
  "CS Fundamentals": ["DSA", "OOP", "OS", "Databases", "Probability & Stats"],
};

const achievements = [
  { icon: "🏆", text: "Participated in Google CodeJam, Google KickStart & Facebook Hacker Cup — competed against thousands of the best programmers globally." },
  { icon: "⚡", text: "600+ LeetCode problems · Active on Codeforces & CodeChef" },
  { icon: "🥇", text: "1st Position — Maths Quiz, Cynosure 2021 National Symposium on Advances in Mathematics" },
  { icon: "🎯", text: "Army Exhibition & AI/ML Workshop Head — Managed team of 30 at Annual Techno-Cultural Fest 2023" },
];

/* ─── MAIN COMPONENT ─── */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", org: "", role: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactTab, setContactTab] = useState("direct"); // "direct" | "gmail"

  // Apply body bg on theme change
  useEffect(() => {
    document.body.style.background = dark ? "#040408" : "#f4f4f8";
    document.body.style.color = dark ? "#e2e2e8" : "#111118";
  }, [dark]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = resumeOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [resumeOpen]);

  useReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = ["home", "about", "experience", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleDirectSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      // Uses Formspree — replace YOUR_FORM_ID with your free Formspree endpoint
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email,
          organization: form.org, role: form.role,
          subject: form.subject, message: form.message,
        }),
      });
      if (res.ok) {
        setFormSent("direct");
        setForm({ name: "", email: "", org: "", role: "", subject: "", message: "" });
      } else {
        setFormSent("error");
      }
    } catch {
      setFormSent("error");
    }
    setSending(false);
    setTimeout(() => setFormSent(false), 5000);
  };

  const handleGmailSend = () => {
    const subject = encodeURIComponent(form.subject || `Portfolio Contact: ${form.name}`);
    const body = encodeURIComponent(
      `Hi Ankit,\n\nName: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.org}\nRole/Position: ${form.role}\n\nMessage:\n${form.message}\n\n---\nSent via portfolio contact form`
    );
    window.open(`https://mail.google.com/mail/?view=cm&to=ankit6378yadav@gmail.com&su=${subject}&body=${body}`, "_blank");
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div style={{ background: dark ? "#040408" : "#f4f4f8", minHeight: "100vh", position: "relative", transition: "background 0.4s" }}>
      <FontLink dark={dark} />
      <div className="noise" />

      {/* ─── RESUME MODAL ─── */}
      {resumeOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setResumeOpen(false); }}>
          <div className="modal-box">
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00f5d4", boxShadow: "0 0 8px #00f5d4" }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: dark ? "#ccc" : "#333" }}>Ankit_Resume.pdf</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <a href="/ANKIT_Resume.pdf" download="Ankit_Resume.pdf"
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,245,212,0.1)", border: "1px solid rgba(0,245,212,0.25)", borderRadius: 8, padding: "7px 14px", color: "#00f5d4", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,245,212,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,245,212,0.1)"}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </a>
                <button className="modal-close" onClick={() => setResumeOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <iframe
                src="/ANKIT_Resume.pdf#toolbar=0&navpanes=0"
                style={{ width: "100%", height: "100%", border: "none", background: dark ? "#1a1a2e" : "#fff" }}
                title="Ankit Resume"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navScrolled ? (dark ? "rgba(4,4,8,0.92)" : "rgba(244,244,248,0.92)") : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}` : "none",
        transition: "all 0.4s ease",
      }}>
        <a href="#home" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: dark ? "#fff" : "#111", letterSpacing: "-0.02em" }}>
            AY<span style={{ color: "#00f5d4" }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navLinks.map(l => (
            <a key={l.id} href={`#${l.id}`} className="nav-link"
              style={{ color: activeSection === l.id ? "#00f5d4" : (dark ? "#888" : "#666") }}>
              {l.label}
            </a>
          ))}

          {/* Resume Preview Modal Button */}
          <button onClick={() => setResumeOpen(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,245,212,0.08)", border: "1px solid rgba(0,245,212,0.2)", borderRadius: 8, padding: "8px 14px", color: "#00f5d4", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,245,212,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,245,212,0.08)"}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Resume
          </button>

          {/* GitHub */}
          <a href="https://github.com/ankit637836/" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, borderRadius: 8, padding: "8px 14px", color: dark ? "#aaa" : "#555", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#00f5d4"; e.currentTarget.style.borderColor = "rgba(0,245,212,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = dark ? "#aaa" : "#555"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>

          {/* Dark/Light Toggle */}
          <button className="toggle-btn" onClick={() => setDark(d => !d)} title={dark ? "Switch to light mode" : "Switch to dark mode"}>
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <ParticleCanvas />

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 50%, rgba(0,245,212,0.05) 0%, transparent 60%)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(to bottom, transparent, ${dark ? "#040408" : "#f4f4f8"})`, zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
          {/* Tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,245,212,0.08)", border: "1px solid rgba(0,245,212,0.2)", borderRadius: 100, padding: "6px 18px", marginBottom: 32, animation: "fadeIn 1s ease" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00f5d4", boxShadow: "0 0 8px #00f5d4", display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#00f5d4", letterSpacing: "0.1em" }}>
              IIT Ropar · B.Tech Math & CS · Open to SDE Roles
            </span>
          </div>

          {/* Name */}
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(64px,11vw,120px)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 16, animation: "fadeUp 0.9s ease 0.2s both" }}>
            <span className="shimmer-text">ANKIT</span>
          </h1>

          {/* Typewriter */}
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(16px,2.5vw,22px)", color: "#888", marginBottom: 40, animation: "fadeUp 0.9s ease 0.4s both", minHeight: 36 }}>
            <Typewriter words={[
              "Software Development Engineer",
              "Full-Stack Developer",
              "Machine Learning Engineer",
              "Competitive Programmer",
              "IIT Ropar · Math & CS",
            ]} />
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.9s ease 0.6s both" }}>
            <a href="#projects" style={{ textDecoration: "none" }}>
              <button className="btn-primary">View Projects</button>
            </a>
            <a href="#contact" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#e2e2e8", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 15, borderRadius: 10, padding: "16px 36px", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,245,212,0.4)"; e.currentTarget.style.color = "#00f5d4"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#e2e2e8"; }}>
                Get in Touch
              </button>
            </a>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 48, animation: "fadeUp 0.9s ease 0.8s both" }}>
            {[
              { label: "GitHub", href: "https://github.com/ankit637836/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg> },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/ankit-80062b1b9/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { label: "Email", href: "mailto:ankit6378yadav@gmail.com", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, color: "#666", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00f5d4"}
                onMouseLeave={e => e.currentTarget.style.color = "#666"}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#888", letterSpacing: "0.15em" }}>SCROLL</span>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, #888, transparent)", animation: "scanline 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <Section id="about">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className="reveal-left">
            <div className="section-label">01 · About</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24, color: dark ? "#fff" : "#111" }}>
              Where <span className="gradient-text">Code</span> meets <span style={{ color: "#7b61ff" }}>Curiosity</span>
            </h2>
            <p style={{ color: dark ? "#999" : "#666", lineHeight: 1.8, marginBottom: 20, fontSize: 16 }}>
              I'm Ankit — a Mathematics & Computing graduate from <strong style={{ color: dark ? "#e2e2e8" : "#111" }}>IIT Ropar</strong>, passionate about building full-stack systems, writing clean backend APIs, and applying ML to solve real problems.
            </p>
            <p style={{ color: dark ? "#999" : "#666", lineHeight: 1.8, marginBottom: 32, fontSize: 16 }}>
              Currently working as an Analyst at Futures First, I build the tools I use — full-stack dashboards, ML pipelines, and AI-integrated systems. I'm actively looking to transition into an <strong style={{ color: "#00f5d4" }}>SDE role</strong> where I can ship meaningful products at scale.
            </p>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[["600+", "LeetCode problems"], ["3+", "Years of coding"], ["10+", "Shipped Projects"], ["IIT", "Ropar Graduate"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, color: "#00f5d4", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: dark ? "#666" : "#999", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "IIT Ropar", sub: "B.Tech · Math & CS", icon: "🎓", color: "#00f5d4" },
              { label: "Futures First", sub: "Analyst · Currently", icon: "📈", color: "#7b61ff" },
              { label: "Samsung R&D", sub: "SDE Intern · ML/APIs", icon: "⚡", color: "#ff6b9d" },
              { label: "Open Source", sub: "GitHub Active", icon: "🔗", color: "#ffd60a" },
            ].map(c => (
              <div key={c.label} style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${c.color}22`, borderRadius: 16, padding: 24, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + "66"; e.currentTarget.style.background = c.color + "08"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = c.color + "22"; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"; }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: dark ? "#e2e2e8" : "#111", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: dark ? "#666" : "#999" }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── EXPERIENCE ─── */}
      <Section id="experience" style={{ background: "linear-gradient(180deg, transparent, rgba(0,245,212,0.02), transparent)" }}>
        <div className="section-label reveal">02 · Experience</div>
        <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.02em", marginBottom: 60, color: dark ? "#fff" : "#111" }}>
          Where I've <span className="gradient-text">Worked</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {experience.map((exp, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div style={{ display: "flex", gap: 28 }}>
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                  <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}99` }} />
                  {i < experience.length - 1 && <div className="timeline-line" style={{ background: `linear-gradient(to bottom, ${exp.color}44, transparent)` }} />}
                </div>

                {/* Card */}
                <div className="project-card" style={{ flex: 1, borderColor: exp.color + "22" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 22, color: "#e2e2e8", marginBottom: 4 }}>{exp.role}</h3>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ color: exp.color, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{exp.company}</span>
                        <span style={{ color: "#555", fontSize: 13 }}>·</span>
                        <span style={{ color: "#666", fontSize: 14, fontFamily: "'JetBrains Mono',monospace" }}>{exp.location}</span>
                      </div>
                    </div>
                    <span style={{ background: exp.color + "15", border: `1px solid ${exp.color}33`, borderRadius: 6, padding: "4px 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: exp.color }}>
                      {exp.period}
                    </span>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "#999", fontSize: 15, lineHeight: 1.6 }}>
                        <span style={{ color: exp.color, marginTop: 6, fontSize: 8, flexShrink: 0 }}>◆</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── PROJECTS ─── */}
      <Section id="projects">
        <div className="section-label reveal">03 · Projects</div>
        <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.02em", marginBottom: 60, color: dark ? "#fff" : "#111" }}>
          Things I've <span className="gradient-text">Built</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {projects.map((p, i) => (
            <div key={i} className="project-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: p.color + "18", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${p.color}33` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {p.live && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 4, background: "#00f5d415", border: "1px solid #00f5d433", borderRadius: 4, padding: "2px 8px", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#00f5d4", textDecoration: "none", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#00f5d430"}
                      onMouseLeave={e => e.currentTarget.style.background = "#00f5d415"}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00f5d4", display: "inline-block", animation: "pulse 2s infinite" }} /> LIVE
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noreferrer" style={{ color: "#555", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = p.color}
                    onMouseLeave={e => e.currentTarget.style.color = "#555"}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                </div>
              </div>

              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#e2e2e8", marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
              
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: p.color + "12", border: `1px solid ${p.color}25`, borderRadius: 6, padding: "3px 10px", marginBottom: 14 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: p.color }}>{p.highlight}</span>
              </div>

              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map(t => (
                  <span key={t} className="skill-tag" style={{ fontSize: 11, padding: "3px 10px" }}>{t}</span>
                ))}
              </div>

              <div style={{ marginTop: 16, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#555" }}>{p.period}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── SKILLS ─── */}
      <Section id="skills" style={{ background: "linear-gradient(180deg, transparent, rgba(123,97,255,0.03), transparent)" }}>
        <div className="section-label reveal">04 · Skills</div>
        <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.02em", marginBottom: 60, color: dark ? "#fff" : "#111" }}>
          My <span className="gradient-text">Toolkit</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 80 }}>
          {Object.entries(skills).map(([cat, tags], i) => (
            <div key={cat} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)", border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: dark ? "#e2e2e8" : "#111", marginBottom: 16 }}>{cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="section-label reveal" style={{ marginBottom: 12 }}>Achievements</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {achievements.map((a, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, display: "flex", gap: 14, alignItems: "flex-start", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)", border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`, borderRadius: 12, padding: 20 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
              <p style={{ color: dark ? "#999" : "#666", fontSize: 14, lineHeight: 1.6 }}>{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="section-label reveal" style={{ textAlign: "center" }}>05 · Contact</div>
          <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", letterSpacing: "-0.02em", textAlign: "center", marginBottom: 16, color: dark ? "#fff" : "#111" }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="reveal" style={{ color: dark ? "#888" : "#777", textAlign: "center", fontSize: 17, lineHeight: 1.7, marginBottom: 48 }}>
            Whether it's a development collaboration, a job opening at your company, an internship or full-time SDE role, an HR inquiry, a project you'd like to build together, a trading idea, or just saying hello — I'd love to hear from you.
          </p>

          <div className="reveal" style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`, borderRadius: 24, padding: "40px 48px" }}>

            {/* Success banner */}
            {formSent && (
              <div style={{ background: "rgba(0,245,212,0.1)", border: "1px solid rgba(0,245,212,0.3)", borderRadius: 12, padding: "14px 20px", marginBottom: 24, display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>📨</span>
                <span style={{ color: "#00f5d4", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>Gmail opened and pre-filled! Just hit Send.</span>
              </div>
            )}

            {/* Form fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>YOUR NAME *</label>
                <input className="input-field" placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>YOUR EMAIL *</label>
                <input className="input-field" type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>COMPANY / SCHOOL</label>
                <input className="input-field" placeholder="e.g. Google, IIT Delhi..." value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>YOUR ROLE</label>
                <input className="input-field" placeholder="e.g. HR, Developer, Student..." value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>SUBJECT</label>
              <input className="input-field" placeholder="What's this about?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>MESSAGE *</label>
              <textarea className="input-field" rows={5} placeholder="Tell me about your opportunity, project, idea, or just say hello..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: "vertical", minHeight: 120 }} />
            </div>

            <button className="btn-primary" onClick={handleGmailSend}
              disabled={!form.name || !form.email || !form.message}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Open Gmail & Send
            </button>
            <p style={{ textAlign: "center", marginTop: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#555" }}>
              Opens Gmail pre-filled · No data stored · Direct to ankit6378yadav@gmail.com
            </p>
          </div>

          {/* Direct contact links */}
          <div className="reveal" style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            <a href="mailto:ankit6378yadav@gmail.com"
              style={{ display: "flex", alignItems: "center", gap: 8, color: dark ? "#666" : "#aaa", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#00f5d4"}
              onMouseLeave={e => e.currentTarget.style.color = dark ? "#666" : "#aaa"}>
              ✉ ankit6378yadav@gmail.com
            </a>
            <a href="https://wa.me/916378360564" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, color: dark ? "#666" : "#aaa", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#25d366"}
              onMouseLeave={e => e.currentTarget.style.color = dark ? "#666" : "#aaa"}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              +91 63783 60564
            </a>
            <a href="https://www.linkedin.com/in/ankit-80062b1b9/" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, color: dark ? "#666" : "#aaa", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#0077b5"}
              onMouseLeave={e => e.currentTarget.style.color = dark ? "#666" : "#aaa"}>
              💼 LinkedIn
            </a>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)"}`, padding: "40px 32px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: dark ? "#fff" : "#111" }}>
            AY<span style={{ color: "#00f5d4" }}>.</span>
          </span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: dark ? "#444" : "#aaa" }}>
            © 2026 Ankit Yadav · IIT Ropar · Made with ♥ and caffeine
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: dark ? "#555" : "#aaa", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00f5d4"}
                onMouseLeave={e => e.currentTarget.style.color = dark ? "#555" : "#aaa"}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
