import { useEffect, useRef, useState, useMemo } from "react";
import TypeWriter from "./TypeWriter";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaJava,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiSpring,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiNextdotjs,
} from "react-icons/si";

// Lazy load gsap for desktop animations
let gsap = null;

const loadGsap = async () => {
  try {
    const gsapModule = await import("gsap");
    gsap = gsapModule.default;
  } catch (error) {
    console.warn("Failed to load gsap:", error);
  }
};

/* ─── Animated gradient orb ─── */
function GradientOrb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      style={style}
    />
  );
}

/* ─── Stat counter card ─── */
function StatCard({ value, label, suffix = "+" }) {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-3">
      <span className="text-2xl md:text-3xl font-black text-amber-400 tabular-nums">
        {value}
        <span className="text-amber-500/70">{suffix}</span>
      </span>
      <span className="text-[11px] md:text-xs uppercase tracking-widest text-neutral-500 font-medium">
        {label}
      </span>
    </div>
  );
}

/* ─── Marquee tech ticker ─── */
function TechMarquee() {
  const techs = [
    { icon: FaJava, name: "Java", color: "text-red-400" },
    { icon: SiSpringboot, name: "Spring Boot", color: "text-green-400" },
    { icon: SiSpring, name: "Spring", color: "text-green-500" },
    { icon: SiReact, name: "React", color: "text-cyan-400" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-400" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-300" },
    { icon: SiMongodb, name: "MongoDB", color: "text-green-400" },
    { icon: SiRedis, name: "Redis", color: "text-red-500" },
    { icon: SiDocker, name: "Docker", color: "text-blue-400" },
  ];

  // Duplicate for seamless loop
  const items = [...techs, ...techs];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[rgb(5,5,8)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[rgb(5,5,8)] to-transparent pointer-events-none" />

      <div className="flex gap-6 animate-marquee whitespace-nowrap">
        {items.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60 hover:border-amber-500/30 transition-colors group flex-shrink-0"
            >
              <Icon
                className={`${tech.color} text-lg group-hover:scale-110 transition-transform`}
              />
              <span className="text-neutral-400 text-sm font-medium group-hover:text-neutral-200 transition-colors">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Home() {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      setIsMobile(mobile);
      setAnimationsEnabled(!mobile && !prefersReduced);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Load GSAP for desktop
  useEffect(() => {
    if (animationsEnabled && !gsap) loadGsap();
  }, [animationsEnabled]);

  // Staggered entrance
  useEffect(() => {
    if (!animationsEnabled || !gsap) return;
    const timer = setTimeout(() => {
      if (!gsap) return;
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-element",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
      );
      return () => tl.kill();
    }, 80);
    return () => clearTimeout(timer);
  }, [animationsEnabled]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background gradient orbs ── */}
      <GradientOrb
        className="w-[600px] h-[600px] -top-40 -left-40 animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,.35) 0%, transparent 70%)",
        }}
      />
      <GradientOrb
        className="w-[500px] h-[500px] top-1/2 -right-40 animate-float delay-700"
        style={{
          background:
            "radial-gradient(circle, rgba(234,179,8,.2) 0%, transparent 70%)",
        }}
      />
      <GradientOrb
        className="w-[350px] h-[350px] bottom-20 left-1/3 animate-float delay-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,.15) 0%, transparent 70%)",
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="section-padding max-w-7xl mx-auto w-full pt-28 pb-20"
        ref={heroRef}
      >
        {/* ══════════ TOP: Split hero ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center mb-16">
          {/* ── LEFT COL (3/5) ── */}
          <div className="lg:col-span-3 space-y-7">
            {/* Status badge */}
            <div className="hero-element">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/70 border border-neutral-800/60 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-neutral-400 text-sm font-medium">
                  Open to Opportunities
                </span>
              </div>
            </div>

            {/* Greeting */}
            <p className="hero-element text-neutral-500 text-lg font-medium tracking-wide">
              Hi there, I'm —
            </p>

            {/* Name */}
            <h1 className="hero-element">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight">
                <span className="text-neutral-50">Nguyen Tran</span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Gia Si
                  </span>
                </span>
              </span>
            </h1>

            {/* TypeWriter role */}
            <div className="hero-element">
              <span className="text-xl md:text-2xl font-semibold text-neutral-300">
                <TypeWriter
                  texts={[
                    "Java Backend Developer",
                    "Spring Boot Specialist",
                    "Full Stack Engineer",
                    "Team Leader",
                  ]}
                  delay={isMobile ? 100 : 80}
                  deleteDelay={isMobile ? 50 : 30}
                />
              </span>
            </div>

            {/* Description */}
            <p className="hero-element text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
              Final-year{" "}
              <span className="text-amber-400 font-semibold">
                Software Engineering
              </span>{" "}
              student building scalable systems with{" "}
              <span className="text-amber-400 font-semibold">
                Java, Spring Boot & React
              </span>
              . Leading teams to ship real-world products — from e-commerce
              platforms to real-time messaging apps.
            </p>

            {/* CTA row */}
            <div className="hero-element flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => scrollTo("projects")}
                className="btn-primary flex items-center gap-2.5 px-7 py-3.5 text-base group"
              >
                View Projects
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-7 py-3.5 text-base font-medium text-neutral-200 bg-neutral-800/60 hover:bg-neutral-700/60 border border-neutral-700/50 hover:border-amber-500/30 rounded-xl transition-all duration-300 flex items-center gap-2.5"
              >
                <FaEnvelope className="text-amber-500" />
                Contact Me
              </button>
              <a
                href="/documents/NguyenTranGiaSi_Intern_Backend_Developer.pdf"
                download
                className="px-7 py-3.5 text-base font-medium text-neutral-300 hover:text-amber-400 bg-neutral-900/60 hover:bg-neutral-800/60 border border-neutral-800/50 hover:border-amber-500/20 rounded-xl transition-all duration-300 flex items-center gap-2.5"
              >
                <FaDownload className="text-sm" />
                Resume
              </a>
            </div>

            {/* Social links */}
            <div className="hero-element flex gap-3 pt-1">
              <a
                href="https://github.com/giasinguyen"
                target="_blank"
                rel="noreferrer"
                className="p-3 text-neutral-500 hover:text-amber-400 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800/50 hover:border-amber-500/30 rounded-xl transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/giasinguyen"
                target="_blank"
                rel="noreferrer"
                className="p-3 text-neutral-500 hover:text-amber-400 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800/50 hover:border-amber-500/30 rounded-xl transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* ── RIGHT COL (2/5) — Interactive card ── */}
          <div className="hero-element lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent rounded-3xl blur-2xl" />

              <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/70 rounded-3xl p-7 space-y-6">
                {/* Terminal header */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-neutral-600 font-mono">
                    ~/giasi-dev
                  </span>
                </div>

                {/* Terminal content */}
                <div className="font-mono text-sm space-y-3">
                  <div>
                    <span className="text-amber-500">$</span>{" "}
                    <span className="text-neutral-400">whoami</span>
                    <p className="text-green-400 mt-1 pl-4">Gia Si Nguyen</p>
                  </div>
                  <div>
                    <span className="text-amber-500">$</span>{" "}
                    <span className="text-neutral-400">cat role.txt</span>
                    <p className="text-cyan-400 mt-1 pl-4">
                      Full Stack Developer
                    </p>
                  </div>
                  <div>
                    <span className="text-amber-500">$</span>{" "}
                    <span className="text-neutral-400">cat focus.txt</span>
                    <p className="text-amber-300 mt-1 pl-4">
                      Java · Spring Boot · React
                    </p>
                  </div>
                  <div>
                    <span className="text-amber-500">$</span>{" "}
                    <span className="text-neutral-400">echo $STATUS</span>
                    <p className="text-green-400 mt-1 pl-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Ready to build
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

                {/* Quick links */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 font-mono">
                    ▸ latest projects
                  </span>
                  <button
                    onClick={() => scrollTo("projects")}
                    className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                  >
                    View All →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ STATS BAR ══════════ */}
        <div className="hero-element">
          <div className="flex flex-wrap justify-center gap-2 md:gap-0 md:divide-x divide-neutral-800 bg-neutral-900/50 border border-neutral-800/60 rounded-2xl backdrop-blur-sm py-2">
            <StatCard value="8" label="Projects" />
            <StatCard value="4" label="Team Projects" />
            <StatCard value="10" label="Technologies" />
            <StatCard value="3.48" label="GPA" suffix="/4.0" />
          </div>
        </div>

        {/* ══════════ TECH MARQUEE ══════════ */}
        <div className="hero-element mt-10">
          <p className="text-center text-neutral-600 text-xs uppercase tracking-[0.2em] mb-3 font-medium">
            Technologies I work with
          </p>
          <TechMarquee />
        </div>

        {/* ══════════ SCROLL INDICATOR ══════════ */}
        {!isMobile && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600">
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
              Scroll
            </span>
            <div className="w-5 h-8 border-2 border-neutral-700 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-amber-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
