/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PERSONAL PORTFOLIO — Production-Ready React Component
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * DESIGN PHILOSOPHY
 * -----------------
 * Inspired by editorial/cinematic aesthetics: think Bauhaus meets dark-room
 * photography. The palette is warm-dark (not cold-dark) — deep charcoal with
 * aged-parchment accents and burnished gold highlights. Typography uses a serif
 * display font (Playfair Display) paired with a refined mono-ish sans (DM Mono)
 * for a scholarly, precise feel — unusual in dev portfolios.
 *
 * STACK
 * -----
 * React 18 + Tailwind CSS + Framer Motion + Lucide React
 * Single-file for portability. Split into logical component sections below.
 *
 * SETUP
 * -----
 * npm create vite@latest portfolio -- --template react
 * npm install framer-motion lucide-react
 * npm install -D tailwindcss postcss autoprefixer
 * npx tailwindcss init -p
 *
 * tailwind.config.js → extend theme with custom colors below.
 * index.css → import Google Fonts + Tailwind directives.
 *
 * FONT IMPORTS (add to index.html or index.css)
 * @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useSpring,
} from "framer-motion";
import { GitBranch, ExternalLink, Mail, ArrowDown, FileText, Terminal, 
  Cpu, Brain, Pen, ChevronRight } from "lucide-react";
// ─────────────────────────────────────────────────────────────────────────────
// TAILWIND CONFIG EXTENSION (paste into tailwind.config.js)
// ─────────────────────────────────────────────────────────────────────────────
// theme: {
//   extend: {
//     colors: {
//       ink:    { DEFAULT: '#0c0c0e', 50: '#111113', 100: '#161618', 200: '#1e1e21' },
//       stone:  { DEFAULT: '#2a2825', 300: '#3a3530', 400: '#4a4540', 500: '#5a5550', 600: '#6b6660', 700: '#8a8580', 800: '#b0aaa0', 900: '#c8bfad' },
//       gold:   { DEFAULT: '#c8a882', light: '#d4b892', dark: '#a0845e' },
//     },
//     fontFamily: {
//       serif:  ['Playfair Display', 'Georgia', 'serif'],
//       sans:   ['DM Sans', 'system-ui', 'sans-serif'],
//       mono:   ['DM Mono', 'Courier New', 'monospace'],
//     },
//   },
// }

// ─────────────────────────────────────────────────────────────────────────────
// DATA — edit this to personalize
// ─────────────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Sara Khataan",
  initials: "S.K.",
  title: "Computer Engineering Student",
  location: "Cairo, Egypt",
  email: "sarakhataan.ce@gmail.com",
  github: "https://github.com/sarakhat3an",
  linkedin: "https://www.linkedin.com/in/sara-khataan-95ba23352/",
  statement:
    "Systems-minded engineer drawn to elegant code, low-level architecture, and the quiet precision of AI. I also sketch.",
  about: [
    "I'm a computer engineering student fascinated by the full stack of computing — from transistors to transformers. I believe good software is like good writing: clear, purposeful, and quietly powerful.",
    "My interests live at intersections: systems meets AI, precision meets aesthetics, engineering meets art. I gravitate toward problems that reward deep thinking and refuse to resolve quickly.",
    "When I'm not debugging kernels or training models, I'm sketching — finding in visual form the same logic I find in code.",
  ],
  philosophy:
    "Build to understand. Understand to build better. Repeat until elegant.",
  skills: [
    "C / C++", "Python", "Rust", "x86 Assembly",
    "Linux Kernel", "Systems Design", "Machine Learning",
    "Neural Networks", "Computer Vision", "Embedded Systems",
    "POSIX / UNIX", "Compilers", "Networking", "PyTorch",
  ],
  projects: [
    {
      id: "01",
      year: "2024",
      title: "MicroKernel OS",
      description:
        "A minimal operating system built from scratch in C and x86 assembly. Implements a custom memory allocator, interrupt descriptor table, paging, and a basic POSIX-inspired shell.",
      tags: ["C", "x86 ASM", "Bootloader", "QEMU"],
      github: "#",
      demo: null,
      icon: Terminal,
    },
    {
      id: "02",
      year: "2024",
      title: "Latent Diffusion Probe",
      description:
        "Research into interpretability of latent spaces in diffusion models. Visualizes activation patterns as generative noise evolves into coherent imagery across denoising steps.",
      tags: ["Python", "PyTorch", "DDPM", "Interpretability"],
      github: "#",
      demo: "#",
      icon: Brain,
    },
    {
      id: "03",
      year: "2023",
      title: "Concurrent HTTP/1.1 Server",
      description:
        "A multi-threaded web server in C using epoll for event-driven I/O. Implements chunked transfer encoding, keep-alive, and static file serving. Benchmarked at 40k+ req/sec.",
      tags: ["C", "epoll", "POSIX Threads", "HTTP"],
      github: "#",
      demo: null,
      icon: Cpu,
    },
    {
      id: "04",
      year: "2023",
      title: "Edge Vision Pipeline",
      description:
        "Real-time object detection optimized for embedded ARM devices. Quantized YOLOv8 via ONNX to run at 30fps on Raspberry Pi 4 without a dedicated GPU.",
      tags: ["Python", "ONNX", "YOLOv8", "ARM", "Quantization"],
      github: "#",
      demo: "#",
      icon: Cpu,
    },
  ],
  timeline: [
    {
      year: "2024 — Present",
      role: "Teaching Assistant",
      place: "Data Structures & Algorithms · Cairo University",
      current: true,
    },
    {
      year: "2024",
      role: "ICPC Regional Finalist",
      place: "Arab and Africa Regional Contest",
      current: false,
    },
    {
      year: "2023",
      role: "Open Source Contributor",
      place: "Linux Kernel · Scheduler subsystem patches",
      current: false,
    },
    {
      year: "2023",
      role: "National Olympiad in Informatics",
      place: "Top 10 Finalist · Egypt",
      current: false,
    },
    {
      year: "2022 — Present",
      role: "B.Sc. Computer Engineering",
      place: "Cairo University · Faculty of Engineering · GPA 3.8",
      current: false,
    },
  ],
  gallery: [
    { title: "Portrait Study", medium: "Pencil", year: "2026", src: "/sarakhataan/images/sketch1.jpg" },
    { title: "Portrait Study", medium: "Acrylic", year: "2024", src: "/sarakhataan/images/sketch2.jpeg" },
    { title: "Character Design", medium: "Acrylic", year: "2023", src: "/sarakhataan/images/sketch3.jpeg" },
    { title: "Portrait Study", medium: "Acrylic", year: "2023", src: "/sarakhataan/images/sketch4.jpeg" },
    { title: "Still Life", medium: "Acrylic", year: "2022", src: "/sarakhataan/images/sketch5.jpeg" },
    { title: "Portrait Sketch", medium: "Charcoal", year: "2024", src: "/sarakhataan/images/sketch6.jpeg"},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE & STYLES (inline CSS-in-JS for portability without Tailwind config)
// ─────────────────────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#0c0c0e",
  surface: "#111113",
  surfaceHover: "#161618",
  border: "#1e1e21",
  borderMid: "#2a2825",
  textMuted: "#3a3530",
  textDim: "#5a5550",
  textSecondary: "#6b6660",
  textTertiary: "#8a8580",
  textPrimary: "#c8bfad",
  textBright: "#e8e4dc",
  gold: "#c8a882",
  goldLight: "#d4b892",
  goldDark: "#a0845e",
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: LoadingScreen
// Cinematic reveal with a progress bar and name. Unmounts after 2.4s.
// ─────────────────────────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    const raf = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      // Ease-out cubic
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(onComplete, 300);
    });
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: COLORS.bg,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      {/* Grain overlay on loader */}
      <div style={grainStyle} aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "13px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: COLORS.textPrimary,
        }}
      >
        {DATA.initials}
      </motion.div>

      <div
        style={{
          width: "120px",
          height: "0.5px",
          background: COLORS.border,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            background: COLORS.gold,
            width: `${progress}%`,
            transition: "width 0.05s linear",
          }}
        />
      </div>

      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: COLORS.textMuted,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {String(progress).padStart(3, "0")}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: CustomCursor
// A small dot + trailing ring that follows mouse position with spring physics.
// ─────────────────────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Detect hover on interactive elements
      const el = document.elementFromPoint(mouseX, mouseY);
      const interactive = el?.closest("a, button, [data-hover]");
      setHovered(!!interactive);
    };

    const animate = () => {
      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDot}
        className="custom-cursor"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: hovered ? COLORS.gold : COLORS.textPrimary,
          pointerEvents: "none",
          zIndex: 9999,
          transition: "background 0.2s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={cursorRing}
        className="custom-cursor"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -16,
          left: -16,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: `0.5px solid ${hovered ? COLORS.gold : COLORS.borderMid}`,
          pointerEvents: "none",
          zIndex: 9998,
          transition: "border-color 0.3s, width 0.2s, height 0.2s",
          willChange: "transform",
          ...(hovered && { width: "44px", height: "44px", top: -22, left: -22 }),
        }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: GrainOverlay
// Subtle film-grain texture via SVG feTurbulence, fixed position over everything.
// ─────────────────────────────────────────────────────────────────────────────
const grainStyle = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 500,
  opacity: 0.035,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
  backgroundSize: "128px 128px",
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Nav
// Sticky top nav with logo + links. Adds blur/border on scroll.
// ─────────────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["About", "Projects", "Timeline", "Art", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 800,
        padding: "0 clamp(24px, 5vw, 64px)",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: scrolled ? `0.5px solid ${COLORS.border}` : "0.5px solid transparent",
        background: scrolled ? "rgba(12,12,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "14px",
          letterSpacing: "0.2em",
          color: COLORS.textPrimary,
          textTransform: "uppercase",
          background: "none",
          border: "none",
          cursor: "none",
        }}
      >
        {DATA.initials}
      </button>

      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          gap: "36px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="desktop-nav"
      >
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => scrollTo(link)}
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: COLORS.textSecondary,
                background: "none",
                border: "none",
                cursor: "none",
                transition: "color 0.2s",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.textPrimary)}
              onMouseLeave={(e) => (e.target.style.color = COLORS.textSecondary)}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: SectionLabel
// Eyebrow text with a decorative line — used at the top of every section.
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "52px",
      }}
    >
      <span
        style={{
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: COLORS.textMuted,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {children}
      </span>
      <div
        style={{
          height: "0.5px",
          width: "48px",
          background: COLORS.border,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Hero
// Full-viewport hero with animated headline, subtle grid, and orb glow.
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px clamp(24px, 5vw, 64px) clamp(48px, 8vh, 96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,191,173,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,191,173,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Warm orb — top right */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160,132,94,0.06) 0%, transparent 68%)",
          top: "-160px",
          right: "-120px",
          pointerEvents: "none",
        }}
      />

      {/* Parallax content */}
      <motion.div style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "0.5px",
              background: COLORS.textMuted,
            }}
          />
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {DATA.title} &nbsp;·&nbsp; {DATA.location}
          </span>
        </motion.div>

        {/* Main headline — staggered letter reveal via word chunks */}
        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            color: COLORS.textBright,
            marginBottom: "24px",
            maxWidth: "760px",
          }}
        >
          {["Building things", "that think"].map((line, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              custom={i * 0.08}
              style={{ display: "block" }}
            >
              {i === 1 ? (
                <>
                  that think{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: COLORS.gold,
                    }}
                  >
                    clearly.
                  </em>
                </>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          style={{
            fontSize: "clamp(13px, 1.4vw, 15px)",
            color: COLORS.textSecondary,
            lineHeight: 1.8,
            maxWidth: "400px",
            marginBottom: "44px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
          }}
        >
          {DATA.statement}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
        >
          <HeroButton
            primary
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </HeroButton>
          <HeroButton
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Read More <ArrowDown size={12} style={{ marginLeft: "6px" }} />
          </HeroButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "absolute",
          right: "clamp(24px, 5vw, 64px)",
          bottom: "clamp(32px, 6vh, 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={14} color={COLORS.textMuted} />
        </motion.div>
        <div
          style={{
            writingMode: "vertical-lr",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.textMuted,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Scroll
        </div>
      </motion.div>
    </section>
  );
}

function HeroButton({ children, primary, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "11px 28px",
        background: primary ? (hov ? COLORS.goldLight : COLORS.gold) : "transparent",
        color: primary ? COLORS.bg : hov ? COLORS.textPrimary : COLORS.textSecondary,
        fontSize: "10px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        border: primary ? "none" : `0.5px solid ${hov ? COLORS.borderMid : COLORS.border}`,
        cursor: "none",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        fontFamily: "'DM Mono', monospace",
        transition: "all 0.25s ease",
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: About
// Two-column: personal statement left, skills right.
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "clamp(80px, 12vh, 128px) clamp(24px, 5vw, 64px)",
        borderTop: `0.5px solid ${COLORS.border}`,
      }}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionLabel>About</SectionLabel>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
        {/* Left: text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 400,
              color: COLORS.textPrimary,
              marginBottom: "28px",
              lineHeight: 1.3,
            }}
          >
            Systems, aesthetics,<br />
            and the space{" "}
            <em style={{ fontStyle: "italic", color: COLORS.gold }}>
              between.
            </em>
          </motion.h2>

          {DATA.about.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i * 0.07}
              style={{
                fontSize: "14px",
                color: COLORS.textSecondary,
                lineHeight: 1.85,
                marginBottom: "16px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              {para}
            </motion.p>
          ))}

          {/* Philosophy quote */}
          <motion.blockquote
            variants={fadeUp}
            custom={0.3}
            style={{
              borderLeft: `1px solid ${COLORS.gold}`,
              paddingLeft: "16px",
              marginTop: "28px",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "14px",
              color: COLORS.textDim,
              lineHeight: 1.6,
            }}
          >
            "{DATA.philosophy}"
          </motion.blockquote>
        </motion.div>

        {/* Right: skills */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3
            variants={fadeIn}
            style={{
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              marginBottom: "20px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Tools &amp; Interests
          </motion.h3>

          <motion.div
            variants={stagger}
            style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
          >
            {DATA.skills.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </motion.div>

          {/* Decorative vertical text */}
          <motion.div
            variants={fadeIn}
            custom={0.5}
            style={{
              marginTop: "48px",
              writingMode: "vertical-lr",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              fontFamily: "'DM Mono', monospace",
              opacity: 0.5,
            }}
          >
            Est. 2022
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillTag({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.span
      variants={fadeIn}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block",
        padding: "5px 12px",
        border: `0.5px solid ${hov ? COLORS.gold : COLORS.border}`,
        borderRadius: "2px",
        fontSize: "11px",
        color: hov ? COLORS.gold : COLORS.textSecondary,
        fontFamily: "'DM Mono', monospace",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
    >
      {children}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Projects
// Grid of project cards with hover-reveal details and tech tags.
// ─────────────────────────────────────────────────────────────────────────────
function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: "clamp(80px, 12vh, 128px) clamp(24px, 5vw, 64px)",
        borderTop: `0.5px solid ${COLORS.border}`,
      }}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionLabel>Selected Work</SectionLabel>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: COLORS.border,
          border: `0.5px solid ${COLORS.border}`,
        }}
      >
        {DATA.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  const Icon = project.icon;

  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? COLORS.surfaceHover : COLORS.surface,
        padding: "clamp(24px, 3vw, 36px)",
        transition: "background 0.3s ease",
        cursor: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: COLORS.textMuted,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {project.id} — {project.year}
        </span>
        <motion.div
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", gap: "10px" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.textDim }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.gold)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textDim)}
            >
              <GitBranch size={14} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.textDim }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.gold)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textDim)}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </motion.div>
      </div>

      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "16px",
          fontWeight: 400,
          color: COLORS.textPrimary,
          marginBottom: "10px",
          transition: "color 0.2s",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: "12px",
          color: COLORS.textDim,
          lineHeight: 1.75,
          marginBottom: "20px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
        }}
      >
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              border: `0.5px solid ${COLORS.border}`,
              padding: "2px 7px",
              borderRadius: "1px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover accent line */}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "0.5px",
          background: COLORS.gold,
          transformOrigin: "left",
        }}
      />
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Timeline
// Vertical timeline with a persistent line and dot markers.
// ─────────────────────────────────────────────────────────────────────────────
function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="timeline"
      ref={ref}
      style={{
        padding: "clamp(80px, 12vh, 128px) clamp(24px, 5vw, 64px)",
        borderTop: `0.5px solid ${COLORS.border}`,
      }}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionLabel>Experience &amp; Milestones</SectionLabel>
      </motion.div>

      <div
        style={{
          maxWidth: "640px",
          position: "relative",
        }}
      >
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            position: "absolute",
            left: "5px",
            top: "8px",
            bottom: "8px",
            width: "0.5px",
            background: COLORS.border,
            transformOrigin: "top",
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {DATA.timeline.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.08}
              style={{
                display: "flex",
                gap: "28px",
                paddingBottom: "32px",
                position: "relative",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  border: `0.5px solid ${item.current ? COLORS.gold : COLORS.borderMid}`,
                  background: item.current ? COLORS.gold : COLORS.bg,
                  flexShrink: 0,
                  marginTop: "3px",
                  zIndex: 1,
                  transition: "background 0.3s",
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: COLORS.textMuted,
                    marginBottom: "5px",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {item.year}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: item.current ? COLORS.textPrimary : COLORS.textTertiary,
                    marginBottom: "4px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: item.current ? 500 : 300,
                  }}
                >
                  {item.role}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: COLORS.textDim,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {item.place}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Gallery
// Minimal grid of sketch placeholders with hover border reveal.
// Replace placeholder divs with <img> elements pointing to your actual files.
// ─────────────────────────────────────────────────────────────────────────────
function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="art"
      ref={ref}
      style={{
        padding: "clamp(80px, 12vh, 128px) clamp(24px, 5vw, 64px)",
        borderTop: `0.5px solid ${COLORS.border}`,
      }}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionLabel>Art &amp; Sketches</SectionLabel>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: COLORS.border,
        }}
      >
        {DATA.gallery.map((item, i) => (
          <GalleryItem key={i} item={item} />
        ))}
      </motion.div>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.4}
        style={{
          marginTop: "20px",
          fontSize: "11px",
          color: COLORS.textMuted,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.05em",
        }}
      >
        — Replace placeholder cells with your actual sketch images
      </motion.p>
    </section>
  );
}

function GalleryItem({ item }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      variants={fadeIn}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        aspectRatio: "1",
        background: hov ? COLORS.surfaceHover : COLORS.surface,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        transition: "background 0.3s",
      }}
    >
      <img
  src={item.src}
  alt={item.title}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    inset: 0,
    opacity: hov ? 0.7 : 0.9,
    transition: "opacity 0.3s",
  }}
/>

      <motion.div
        animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        style={{ textAlign: "center" }}
      >
        <div
          style={{
            fontSize: "11px",
            color: COLORS.textTertiary,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "3px",
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: COLORS.textMuted,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {item.medium} · {item.year}
        </div>
      </motion.div>

      {/* Hover border accent */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          inset: "8px",
          border: `0.5px solid ${COLORS.gold}`,
          borderRadius: "1px",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Contact
// Two-column: headline left, social links right.
// ─────────────────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const links = [
    { label: "GitHub", href: DATA.github, icon: GitBranch },
{ label: "LinkedIn", href: DATA.linkedin, icon: ExternalLink },
{ label: `Email — ${DATA.email}`, href: `mailto:${DATA.email}`, icon: Mail },
{ label: "Resume / CV", href: "#", icon: FileText, download: true },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "clamp(80px, 12vh, 128px) clamp(24px, 5vw, 64px)",
        borderTop: `0.5px solid ${COLORS.border}`,
      }}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionLabel>Contact</SectionLabel>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(24px, 3.5vw, 40px)",
              fontWeight: 400,
              color: COLORS.textPrimary,
              lineHeight: 1.25,
              marginBottom: "16px",
            }}
          >
            Let's build something{" "}
            <em style={{ fontStyle: "italic", color: COLORS.gold }}>
              worth building.
            </em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            style={{
              fontSize: "13px",
              color: COLORS.textSecondary,
              lineHeight: 1.75,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              maxWidth: "320px",
            }}
          >
            Open to research collaborations, engineering roles, and interesting
            conversations about systems, AI, or art.
          </motion.p>
        </motion.div>

        {/* Right: links */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          {links.map((link) => (
            <ContactLink key={link.label} link={link} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactLink({ link }) {
  const [hov, setHov] = useState(false);
  const Icon = link.icon;

  return (
    <motion.a
      variants={fadeUp}
      href={link.href}
      target={link.download ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 18px",
        border: `0.5px solid ${hov ? COLORS.borderMid : COLORS.border}`,
        borderRadius: "2px",
        textDecoration: "none",
        background: hov ? COLORS.surface : "transparent",
        transition: "all 0.2s ease",
        cursor: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Icon
          size={14}
          color={hov ? COLORS.gold : COLORS.textDim}
          style={{ transition: "color 0.2s" }}
        />
        <span
          style={{
            fontSize: "12px",
            color: hov ? COLORS.textPrimary : COLORS.textSecondary,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            transition: "color 0.2s",
          }}
        >
          {link.label}
        </span>
      </div>
      <ChevronRight
        size={12}
        color={hov ? COLORS.gold : COLORS.border}
        style={{ transition: "color 0.2s" }}
      />
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        borderTop: `0.5px solid ${COLORS.border}`,
        padding: "24px clamp(24px, 5vw, 64px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: COLORS.textMuted,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        © {new Date().getFullYear()} — {DATA.name}
      </span>
      <span
        style={{
          fontSize: "10px",
          color: COLORS.textMuted,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.05em",
        }}
      >
        Designed &amp; built with intention.
      </span>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// Orchestrates loading screen, custom cursor, grain overlay, and all sections.
// ─────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Google Fonts — add to <head> in index.html instead for production */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html {
  scroll-behavior: smooth;
}

@media (pointer: fine) {
  html { cursor: none; }
}

@media (pointer: coarse) {
  .custom-cursor { display: none !important; }
}
        body {
          background: ${COLORS.bg};
          color: ${COLORS.textBright};
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        a { cursor: none; }
        button { cursor: none; }
        /* Mobile nav visibility */
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
        /* Single column on mobile */
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Persistent grain texture overlay */}
          <div style={grainStyle} aria-hidden="true" />

          {/* Custom cursor — hidden on touch devices */}
          <CustomCursor />

          {/* Main layout */}
          <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
            <Nav />

            <main>
              <Hero />
              <About />
              <Projects />
              <Timeline />
              <Gallery />
              <Contact />
            </main>

            <Footer />
          </div>
        </>
      )}
    </>
  );
}
