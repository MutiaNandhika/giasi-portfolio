import { useEffect, useRef, useState } from "react";
import TypeWriter from "./TypeWriter";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaBehance,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import {
  SiFigma,
  SiLaravel,
  SiPhp,
  SiJavascript,
  SiFlutter,
  SiMysql,
  SiGit,
  SiVuedotjs,
  SiPostman,
} from "react-icons/si";

// Lazy load GSAP for desktop animations
let gsap = null;

const loadGsap = async () => {
  try {
    const gsapModule = await import("gsap");
    gsap = gsapModule.default;
  } catch (error) {
    console.warn("Failed to load gsap:", error);
  }
};


/* ============================================================
   GRADIENT ORB
   ============================================================ */

function GradientOrb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      style={style}
    />
  );
}


/* ============================================================
   TECH MARQUEE
   ============================================================ */

function TechMarquee() {

  const techs = [
    {
      icon: SiFigma,
      name: "Figma",
      color: "text-purple-400",
    },
    {
      icon: SiLaravel,
      name: "Laravel",
      color: "text-red-400",
    },
    {
      icon: SiPhp,
      name: "PHP",
      color: "text-indigo-400",
    },
    {
      icon: SiJavascript,
      name: "JavaScript",
      color: "text-yellow-400",
    },
    {
      icon: SiVuedotjs,
      name: "Vue.js",
      color: "text-green-400",
    },
    {
      icon: SiFlutter,
      name: "Flutter",
      color: "text-cyan-400",
    },
    {
      icon: SiMysql,
      name: "MySQL",
      color: "text-blue-400",
    },
    {
      icon: SiGit,
      name: "Git",
      color: "text-orange-400",
    },
    {
      icon: SiPostman,
      name: "REST API",
      color: "text-orange-500",
    },
  ];

  const items = [...techs, ...techs];

  return (
    <div className="relative w-full overflow-hidden py-4">

      {/* Left fade */}

      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-16
          z-10
          bg-gradient-to-r
          from-[rgb(5,5,8)]
          to-transparent
          pointer-events-none
        "
      />


      {/* Right fade */}

      <div
        className="
          absolute
          right-0
          top-0
          bottom-0
          w-16
          z-10
          bg-gradient-to-l
          from-[rgb(5,5,8)]
          to-transparent
          pointer-events-none
        "
      />


      <div className="flex gap-6 animate-marquee whitespace-nowrap">

        {items.map((tech, index) => {

          const Icon = tech.icon;

          return (

            <div
              key={index}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-lg
                bg-neutral-900/60
                border
                border-neutral-800/60
                hover:border-purple-500/30
                transition-colors
                group
                flex-shrink-0
              "
            >

              {/* SOLID ICON - intentionally NOT gradient */}

              <Icon
                className={`
                  ${tech.color}
                  text-lg
                  group-hover:scale-110
                  transition-transform
                `}
              />


              <span
                className="
                  text-neutral-400
                  text-sm
                  font-medium
                  group-hover:text-neutral-200
                  transition-colors
                "
              >
                {tech.name}
              </span>

            </div>

          );

        })}

      </div>

    </div>
  );
}


/* ============================================================
   HERO VISUAL
   ============================================================ */

function HeroVisual() {

  return (

    <div
      className="
        relative
        w-full
        max-w-[560px]
        h-[560px]
        mx-auto
        lg:ml-auto
      "
    >

      {/* ======================================================
          SUBTLE AMBIENT GLOW
          ====================================================== */}

      <div
        className="
          absolute
          top-10
          right-10
          w-72
          h-72
          rounded-full
          bg-purple-500/[0.07]
          blur-[110px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-10
          left-10
          w-64
          h-64
          rounded-full
          bg-purple-500/[0.04]
          blur-[100px]
          pointer-events-none
        "
      />


      {/* ======================================================
          SUBTLE GRID
          ====================================================== */}

      <div
        className="
          absolute
          inset-8
          rounded-[3rem]
          opacity-[0.12]
          pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",

          backgroundSize:
            "36px 36px",

          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 78%)",

          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 78%)",
        }}
      />


      {/* ======================================================
          DECORATIVE FRAME
          ====================================================== */}

      <div
        className="
          absolute
          top-[8%]
          right-[7%]
          w-[68%]
          h-[78%]
          rounded-[3rem]
          border
          border-neutral-800/40
          bg-neutral-900/10
          rotate-3
          pointer-events-none
        "
      />


      <div
        className="
          absolute
          top-[5%]
          right-[11%]
          w-[68%]
          h-[78%]
          rounded-[3rem]
          border
          border-purple-500/[0.08]
          rotate-6
          pointer-events-none
        "
      />


      {/* ======================================================
          MAIN PROFILE PHOTO
          ====================================================== */}

      <div
        className="
          absolute
          top-[7%]
          right-[10%]
          w-[70%]
          h-[80%]
          z-20
        "
      >

        <div
          className="
            relative
            w-full
            h-full
            rounded-[3rem]
            overflow-hidden
            border
            border-neutral-700/70
            bg-neutral-900
            shadow-2xl
            shadow-black/60
            -rotate-2
            hover:rotate-0
            transition-transform
            duration-700
          "
        >

          {/* Photo */}

          <img
            src="/avatar1.png"
            alt="Mutia Nandhika"
            className="w-full h-full object-cover"
            loading="eager"
          />


          {/* Dark gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/65
              via-transparent
              to-black/10
              pointer-events-none
            "
          />


          {/* Subtle purple gradient overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-violet-500/[0.06]
              via-purple-500/[0.03]
              to-fuchsia-500/[0.04]
              pointer-events-none
            "
          />


          {/* ==================================================
              TOP LABEL
              ================================================== */}

          <div className="absolute top-6 right-6">

            <div
              className="
                px-4
                py-2
                rounded-full
                bg-black/55
                backdrop-blur-xl
                border
                border-white/[0.08]
              "
            >

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-neutral-200
                  font-semibold
                "
              >
                UI/UX Designer
              </span>

            </div>

          </div>


          {/* ==================================================
              BOTTOM INFORMATION
              ================================================== */}

          <div
            className="
              absolute
              bottom-7
              left-7
              right-7
            "
          >

            {/* Purple gradient line */}

            <div
              className="
                w-10
                h-px
                bg-gradient-to-r
                from-violet-400
                via-purple-500
                to-fuchsia-400
                mb-4
              "
            />


            <p
              className="
                text-white
                text-xl
                md:text-2xl
                font-bold
                tracking-tight
              "
            >
              Mutia Nandhika
            </p>


            <p
              className="
                text-neutral-300
                text-sm
                mt-1
              "
            >
              Informatics Graduate
            </p>

          </div>

        </div>

      </div>


      {/* ======================================================
          OPEN TO WORK BADGE
          ====================================================== */}

      <div
        className="
          absolute
          z-40
          left-[4%]
          top-[47%]
        "
      >

        <div
          className="
            flex
            items-center
            gap-2.5
            px-5
            py-3
            rounded-full
            bg-neutral-900/90
            backdrop-blur-xl
            border
            border-neutral-700/80
            shadow-xl
            shadow-black/40
          "
        >

          <span
            className="
              relative
              flex
              h-2.5
              w-2.5
            "
          >

            <span
              className="
                animate-ping
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                bg-green-400
                opacity-60
              "
            />

            <span
              className="
                relative
                inline-flex
                rounded-full
                h-2.5
                w-2.5
                bg-green-500
              "
            />

          </span>


          <span
            className="
              text-xs
              text-neutral-300
              font-medium
              whitespace-nowrap
            "
          >
            Open to Work
          </span>

        </div>

      </div>


      {/* ======================================================
          DECORATIVE DOTS
          ====================================================== */}

      {/* Main purple solid dot */}

      <div
        className="
          absolute
          top-[7%]
          left-[15%]
          w-3.5
          h-3.5
          rounded-full
          bg-purple-500
          shadow-lg
          shadow-purple-500/20
        "
      />


      {/* Small purple solid dot */}

      <div
        className="
          absolute
          top-[34%]
          right-[2%]
          w-2
          h-2
          rounded-full
          bg-purple-500
        "
      />


      {/* Small neutral dot */}

      <div
        className="
          absolute
          bottom-[22%]
          right-[1%]
          w-3.5
          h-3.5
          rounded-full
          bg-neutral-700/70
          border
          border-neutral-600/50
        "
      />


      {/* Small left dot */}

      <div
        className="
          absolute
          bottom-[13%]
          left-[14%]
          w-2
          h-2
          rounded-full
          bg-neutral-700/50
        "
      />


      {/* Tiny purple solid dot */}

      <div
        className="
          absolute
          top-[23%]
          left-[8%]
          w-1.5
          h-1.5
          rounded-full
          bg-purple-500
        "
      />


      {/* ======================================================
          DECORATIVE LINE
          ====================================================== */}

      <div
        className="
          absolute
          bottom-[8%]
          left-[27%]
          w-20
          h-px
          bg-gradient-to-r
          from-transparent
          via-purple-500/40
          to-transparent
        "
      />


      {/* ======================================================
          SMALL ROLE LABEL
          ====================================================== */}

      <div
        className="
          absolute
          bottom-[7%]
          right-[3%]
          z-30
        "
      >

        <div
          className="
            px-4
            py-2.5
            rounded-xl
            bg-neutral-900/80
            backdrop-blur-xl
            border
            border-neutral-800/80
          "
        >

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-neutral-500
            "
          >
            Focus
          </p>


          <p
            className="
              text-xs
              text-neutral-300
              font-semibold
              mt-0.5
            "
          >
            Digital Experience
          </p>

        </div>

      </div>


      {/* ======================================================
          DECORATIVE NUMBER
          ====================================================== */}

      <div
        className="
          absolute
          top-[18%]
          left-[3%]
          pointer-events-none
        "
      >

        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-neutral-700
          "
        >
          Portfolio
        </p>


        <p
          className="
            text-lg
            font-bold
            text-neutral-700/70
          "
        >
          01
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   HOME
   ============================================================ */

function Home() {

  const heroRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const [animationsEnabled, setAnimationsEnabled] =
    useState(true);


  /* ==========================================================
     DEVICE CHECK
     ========================================================== */

  useEffect(() => {

    const check = () => {

      const mobile =
        window.innerWidth < 768;

      const prefersReduced =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      setIsMobile(mobile);

      setAnimationsEnabled(
        !mobile && !prefersReduced
      );

    };


    check();


    window.addEventListener(
      "resize",
      check
    );


    return () => {

      window.removeEventListener(
        "resize",
        check
      );

    };

  }, []);


  /* ==========================================================
     GSAP ENTRANCE ANIMATION
     ========================================================== */

  useEffect(() => {

    if (!animationsEnabled) return;

    let animation;


    const initAnimation = async () => {

      await loadGsap();

      if (!gsap) return;


      animation = gsap.fromTo(
        ".hero-element",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        }
      );


      gsap.fromTo(
        ".hero-visual",
        {
          opacity: 0,
          x: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.35,
          ease: "power3.out",
        }
      );

    };


    initAnimation();


    return () => {

      if (animation) {
        animation.kill();
      }

    };

  }, [animationsEnabled]);


  return (

    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
      "
    >


      {/* ======================================================
          BACKGROUND ORBS
          ====================================================== */}

      <GradientOrb
        className="
          w-[600px]
          h-[600px]
          -top-40
          -left-40
          animate-float
        "
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,.35) 0%, rgba(139,92,246,.18) 40%, transparent 70%)",
        }}
      />


      <GradientOrb
        className="
          w-[500px]
          h-[500px]
          top-1/2
          -right-40
          animate-float
          delay-700
        "
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,.25) 0%, rgba(168,85,247,.12) 40%, transparent 70%)",
        }}
      />


      <GradientOrb
        className="
          w-[350px]
          h-[350px]
          bottom-20
          left-1/3
          animate-float
          delay-1000
        "
        style={{
          background:
            "radial-gradient(circle, rgba(192,132,252,.20) 0%, rgba(168,85,247,.10) 40%, transparent 70%)",
        }}
      />


      {/* ======================================================
          GLOBAL GRID
          ====================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.03]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",

          backgroundSize:
            "60px 60px",
        }}
      />


      {/* ======================================================
          MAIN CONTAINER
          ====================================================== */}

      <div
        ref={heroRef}
        className="
          section-padding
          max-w-7xl
          mx-auto
          w-full
          pt-28
          pb-20
        "
      >


        {/* ====================================================
            HERO GRID
            ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-5
            gap-14
            lg:gap-12
            items-center
          "
        >


          {/* ==================================================
              LEFT COLUMN
              ================================================== */}

          <div
            className="
              lg:col-span-3
              space-y-7
            "
          >


            {/* Status */}

            <div className="hero-element">
            </div>


            {/* Greeting */}

            <p
              className="
                hero-element
                text-neutral-500
                text-lg
                font-medium
                tracking-wide
              "
            >
              Hi there, I'm —
            </p>


            {/* Name */}

            <h1 className="hero-element">

              <span
                className="
                  block
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-black
                  leading-[1.08]
                  tracking-tight
                "
              >

                <span className="text-neutral-50">
                  Mutia
                </span>

                <br />


                <span
                  className="
                    relative
                    inline-block
                  "
                >

                  {/* GRADIENT NAME */}

                  <span
                    className="
                      bg-gradient-to-r
                      from-violet-300
                      via-purple-400
                      to-fuchsia-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Nandhika
                  </span>

                </span>

              </span>

            </h1>


            {/* Role */}

            <div className="hero-element">

              <span
                className="
                  text-xl
                  md:text-2xl
                  font-semibold
                  text-neutral-300
                "
              >

                <TypeWriter
                  texts={[
                    "UI/UX Designer",
                    "Software Engineer",
                    "Graphic Designer",
                    "Web & Mobile Developer",
                  ]}
                  delay={
                    isMobile
                      ? 100
                      : 80
                  }
                  deleteDelay={
                    isMobile
                      ? 50
                      : 30
                  }
                />

              </span>

            </div>


            {/* Description */}

            <p
              className="
                hero-element
                text-neutral-400
                text-base
                md:text-lg
                leading-relaxed
                max-w-xl
              "
            >

              I'm an Informatics graduate focused on{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                  font-semibold
                "
              >
                UI/UX Design
              </span>{" "}

              and{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                  font-semibold
                "
              >
                Software Engineering
              </span>

              , creating user-centered digital experiences through thoughtful
              design and functional development.

            </p>


            {/* =================================================
                CTA
                ================================================= */}

            <div
              className="
                hero-element
                flex
                flex-wrap
                gap-3
                pt-2
              "
            >

              {/* DOWNLOAD CV */}

              <a
                href="https://drive.google.com/drive/folders/14ax3pBUyr-RPUMpxF_7RSwnTZU0hycet?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-2.5
                  px-7
                  py-3.5
                  text-base
                  font-semibold
                  text-white

                  bg-gradient-to-r
                  from-violet-600
                  via-purple-600
                  to-fuchsia-600

                  hover:from-violet-500
                  hover:via-purple-500
                  hover:to-fuchsia-500

                  border
                  border-purple-500/60
                  hover:border-purple-400

                  rounded-xl

                  shadow-lg
                  shadow-purple-500/20

                  hover:shadow-purple-500/40

                  hover:-translate-y-0.5

                  transition-all
                  duration-300
                "
              >

                {/* SOLID ICON */}

                <FaDownload
                  className="
                    text-sm
                    text-white
                    flex-shrink-0
                  "
                />

                Download CV

              </a>

            </div>


            {/* =================================================
                SOCIAL LINKS
                ================================================= */}

            <div
              className="
                hero-element
                flex
                flex-wrap
                gap-3
                pt-1
              "
            >


              {/* GitHub */}

              <a
                href="https://github.com/MutiaNandhika"
                target="_blank"
                rel="noreferrer"
                className="
                  p-3
                  text-neutral-500
                  hover:text-purple-400
                  bg-neutral-900/50
                  hover:bg-neutral-800/80
                  border
                  border-neutral-800/50
                  hover:border-purple-500/30
                  rounded-xl
                  transition-all
                  duration-300
                "
                aria-label="GitHub"
              >
                <FaGithub
                  className="
                    h-5
                    w-5
                  "
                />
              </a>


              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/mutia-nandhika/"
                target="_blank"
                rel="noreferrer"
                className="
                  p-3
                  text-neutral-500
                  hover:text-purple-400
                  bg-neutral-900/50
                  hover:bg-neutral-800/80
                  border
                  border-neutral-800/50
                  hover:border-purple-500/30
                  rounded-xl
                  transition-all
                  duration-300
                "
                aria-label="LinkedIn"
              >
                <FaLinkedin
                  className="
                    h-5
                    w-5
                  "
                />
              </a>


              {/* Behance */}

              <a
                href="https://www.behance.net/gallery/253178057/Portofolio-Graphic-Design"
                target="_blank"
                rel="noreferrer"
                className="
                  p-3
                  text-neutral-500
                  hover:text-purple-400
                  bg-neutral-900/50
                  hover:bg-neutral-800/80
                  border
                  border-neutral-800/50
                  hover:border-purple-500/30
                  rounded-xl
                  transition-all
                  duration-300
                "
                aria-label="Behance"
              >
                <FaBehance
                  className="
                    h-5
                    w-5
                  "
                />
              </a>


              {/* Instagram */}

              <a
                href="https://www.instagram.com/nanndhika/"
                target="_blank"
                rel="noreferrer"
                className="
                  p-3
                  text-neutral-500
                  hover:text-purple-400
                  bg-neutral-900/50
                  hover:bg-neutral-800/80
                  border
                  border-neutral-800/50
                  hover:border-purple-500/30
                  rounded-xl
                  transition-all
                  duration-300
                "
                aria-label="Instagram"
              >
                <FaInstagram
                  className="
                    h-5
                    w-5
                  "
                />
              </a>


              {/* WhatsApp */}

              <a
                href="https://wa.me/6281229938305"
                target="_blank"
                rel="noreferrer"
                className="
                  p-3
                  text-neutral-500
                  hover:text-purple-400
                  bg-neutral-900/50
                  hover:bg-neutral-800/80
                  border
                  border-neutral-800/50
                  hover:border-purple-500/30
                  rounded-xl
                  transition-all
                  duration-300
                "
                aria-label="WhatsApp"
              >
                <FaWhatsapp
                  className="
                    h-5
                    w-5
                  "
                />
              </a>


              {/* Email */}

              <a
                href="mailto:mutianandhika@gmail.com"
                className="
                  p-3
                  text-neutral-500
                  hover:text-purple-400
                  bg-neutral-900/50
                  hover:bg-neutral-800/80
                  border
                  border-neutral-800/50
                  hover:border-purple-500/30
                  rounded-xl
                  transition-all
                  duration-300
                "
                aria-label="Email"
              >
                <FaEnvelope
                  className="
                    h-5
                    w-5
                  "
                />
              </a>

            </div>

          </div>


          {/* ==================================================
              RIGHT COLUMN
              ================================================== */}

          <div
            className="
              lg:col-span-2
              hero-visual
            "
          >

            <HeroVisual />

          </div>

        </div>


        {/* ====================================================
            TECH MARQUEE
            ==================================================== */}

        <div
          className="
            hero-element
            mt-16
          "
        >

          <p
            className="
              text-center
              text-neutral-600
              text-xs
              uppercase
              tracking-[0.2em]
              mb-3
              font-medium
            "
          >
            Technologies & Tools I Work With
          </p>


          <TechMarquee />

        </div>

      </div>

    </section>
  );
}


export default Home;