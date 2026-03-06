# 🚀 Personal Portfolio — Ankit Yadav

[![React](https://img.shields.io/badge/Framework-React-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/3D-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Status](https://img.shields.io/badge/Status-Live-39d353?style=for-the-badge)](https://ankit-portfolio.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**A dark-themed, interactive personal portfolio with live 3D particle animations, scroll-triggered reveals, dark/light mode, and a Gmail-integrated contact form.**

[🌐 Live Site](#) · [💼 LinkedIn](https://www.linkedin.com/in/ankit-80062b1b9/) · [🐙 GitHub](https://github.com/ankit637836/)

---

## 📸 Preview

> Dark mode hero with interactive Three.js particle field + mouse parallax

---

## ✨ Features

| Feature | Details |
| --- | --- |
| 🎨 **Dark / Light Mode** | Toggle with persistent theme, every element adapts |
| 🌌 **3D Particle Hero** | Live Three.js particle field + icosahedron wireframe with mouse parallax |
| 📜 **Scroll Animations** | IntersectionObserver-powered fade-up, slide-left, slide-right reveals |
| ⌨️ **Typewriter Effect** | Cycles through roles: SDE, Full-Stack Dev, ML Engineer, etc. |
| 📄 **Resume Modal** | In-page PDF preview (no new tab), with download button |
| 📬 **Contact Form** | Pre-fills Gmail with name, email, org, role, subject & message |
| 📱 **WhatsApp Link** | One-click direct WhatsApp message |
| 🔗 **Live Project Links** | All projects link to GitHub + live demos |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |

---

## 🗂️ Sections

```
Portfolio
│
├── 🏠  Hero          — Name, animated typewriter, 3D particles, social links
├── 👤  About         — Bio, stats, affiliation cards
├── 💼  Experience    — Futures First · Samsung R&D (animated timeline)
├── 🛠️  Projects      — SOFR Dashboard · SQL Mystery · Credit Risk · Face Recognition
├── ⚡  Skills        — Languages, Web/Backend, ML, System Design, CS Fundamentals
└── 📬  Contact       — Gmail-integrated form + WhatsApp + LinkedIn
```

---

## 🧰 Tech Stack

```
Frontend        React 18 + Vite
3D / Animation  Three.js · CSS Keyframes · IntersectionObserver API
Styling         Inline styles + Google Fonts (Syne, JetBrains Mono, DM Sans)
Contact         Gmail mailto deep-link · WhatsApp wa.me link
Deployment      Vercel
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repo
git clone https://github.com/ankit637836/My-Portfolio.git
cd My-Portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
my-portfolio/
│
├── public/
│   └── ANKIT_Resume.pdf       # Resume shown in modal + download
│
├── src/
│   ├── App.jsx                # Entire portfolio — single component file
│   └── main.jsx               # React entry point
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🖼️ Projects Showcased

| Project | Stack | Links |
| --- | --- | --- |
| Macro Event Impact Analyzer & SOFR Intelligence Dashboard | Python · FastAPI · React · SQLite · FRED API · Gemini AI | [GitHub](https://github.com/ankit637836/Macro-AI-Dashboard) · [Live](https://sofr-dashboard.vercel.app) |
| SQL Murder Mystery — Full Investigation Walkthrough | SQL · SQLite · Joins · Aggregations · HTML | [GitHub](https://github.com/ankit637836/SQL-Murder-Mystery) · [Live](https://ankit637836.github.io/SQL-Murder-Mystery/sql_mystery.html) |
| Credit Risk Analyzer & Portfolio Optimizer | Python · Pandas · Scikit-learn · CNN · LSTM | [GitHub](https://github.com/ankit637836/) |
| Real-Time Face Recognition Attendance System | Python · OpenCV · CNN · HTML/CSS | [GitHub](https://github.com/ankit637836/) |

---

## 🎨 Design Decisions

- **Font pairing** — `Syne` (display/headings) + `JetBrains Mono` (labels/code) + `DM Sans` (body)
- **Color palette** — Deep black `#040408` · Electric cyan `#00f5d4` · Violet `#7b61ff` · Coral `#ff6b9d`
- **No UI library** — 100% custom inline styles for full control and zero overhead
- **Single file** — Entire portfolio lives in `App.jsx` for simplicity and easy editing

---

## 📦 Dependencies

```json
{
  "react": "^18",
  "react-dom": "^18",
  "three": "^0.x",
  "framer-motion": "^11.x"
}
```

---

## 👤 Author

**Ankit Yadav**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ankit-80062b1b9/)
[![GitHub](https://img.shields.io/badge/GitHub-bc8cff?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ankit637836/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ankit6378yadav@gmail.com)

---

## 🙏 Credits

- 3D animations powered by [Three.js](https://threejs.org/)
- Fonts via [Google Fonts](https://fonts.google.com/)
- Deployed on [Vercel](https://vercel.com/)

---

⭐ If you liked this portfolio, consider starring the repo!
