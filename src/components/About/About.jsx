import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import {
  FaPalette,
  FaCode,
  FaMobileAlt,
  FaGraduationCap,
} from "react-icons/fa";


function About() {

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );


  useEffect(() => {

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };


    const handleResize = () => {

      clearTimeout(window.resizeTimeout);

      window.resizeTimeout = setTimeout(
        checkMobile,
        100
      );

    };


    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      }
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      clearTimeout(window.resizeTimeout);

    };

  }, []);


  /*
   * Highlight data
   */
  const highlights = [
    {
      icon: FaPalette,
      title: "UI/UX Designer",
      description:
        "Designing intuitive and user-centered digital experiences with Figma.",
    },

    {
      icon: FaCode,
      title: "Software Engineer",
      description:
        "Building functional web and mobile applications with modern development technologies.",
    },

    {
      icon: FaMobileAlt,
      title: "Web & Mobile",
      description:
        "Experienced in developing responsive web and mobile application interfaces.",
    },

    {
      icon: FaGraduationCap,
      title: "Informatics Graduate",
      description:
        "Bachelor's degree in Informatics with an interest in digital product development.",
    },
  ];


  return (

    <section
      id="about"
      className="relative overflow-hidden"
    >


      {/* ==================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.025]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",

          backgroundSize:
            "60px 60px",
        }}
      />


      {/* ==================================================
          BACKGROUND GLOW
      =================================================== */}

      <div
        className="
          absolute
          top-20
          left-1/4
          w-96
          h-96
          rounded-full
          blur-3xl
          opacity-10
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,.45) 0%, rgba(139,92,246,.20) 35%, transparent 70%)",
        }}
      />


      <div
        className="
          absolute
          bottom-20
          right-1/4
          w-96
          h-96
          rounded-full
          blur-3xl
          opacity-10
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,.40) 0%, rgba(168,85,247,.18) 35%, transparent 70%)",
        }}
      />


      {/* ==================================================
          MAIN CONTAINER
      =================================================== */}

      <div
        className="
          section-padding
          max-w-7xl
          mx-auto
          relative
          z-10
        "
      >


        {/* ==================================================
            SECTION HEADER
        =================================================== */}

        <motion.div
          className="text-center mb-12"

          initial={{
            opacity: 0,
            y: 20,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
          }}

          viewport={{
            once: true,
          }}
        >


          <h2
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              tracking-tight
              text-neutral-50
            "
          >

            About{" "}

            {/* GRADIENT TEXT */}

            <span
              className="
                bg-gradient-to-r
                from-violet-400
                via-purple-500
                to-fuchsia-400
                bg-clip-text
                text-transparent
              "
            >
              Me
            </span>

          </h2>


          {/* GRADIENT DIVIDER */}

          <div
            className="
              w-24
              h-1
              bg-gradient-to-r
              from-violet-500
              via-purple-500
              to-fuchsia-400
              mx-auto
              mt-5
              rounded-full
            "
          />

        </motion.div>


        {/* ==================================================
            MAIN CONTENT
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-5
            gap-12
            lg:gap-16
            items-center
            mb-6
          "
        >


          {/* ==================================================
              LEFT - PROFILE IMAGE
          =================================================== */}

          <motion.div
            className="
              lg:col-span-2
              flex
              justify-center
            "

            initial={{
              opacity: 0,
              scale: 0.9,
            }}

            whileInView={{
              opacity: 1,
              scale: 1,
            }}

            transition={{
              duration: 0.5,
            }}

            viewport={{
              once: true,
            }}
          >

            <div className="relative">


              {/* PROFILE IMAGE */}

              <div
                className="
                  relative
                  w-56
                  h-56
                  md:w-72
                  md:h-72
                  rounded-2xl
                  overflow-hidden
                  border-2
                  border-neutral-800
                  bg-neutral-900
                  shadow-2xl
                "
              >

                <img
                  src="/avatar.jpg"
                  alt="Mutia Nandhika"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                  loading="lazy"
                />


                {/* IMAGE OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/30
                    via-transparent
                    to-transparent
                    pointer-events-none
                  "
                />


                {/* SUBTLE PURPLE OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-purple-500/[0.06]
                    via-transparent
                    to-fuchsia-500/[0.03]
                    pointer-events-none
                  "
                />

              </div>


              {/* ==================================================
                  DECORATIVE ELEMENTS
              =================================================== */}


              {/* MAIN PURPLE DOT */}

              <div
                className="
                  absolute
                  -top-3
                  -right-3
                  w-9
                  h-9
                  rounded-full
                  bg-purple-500
                  shadow-lg
                  shadow-purple-500/20
                "
              />


              {/* SMALL PURPLE DOT */}

              <div
                className="
                  absolute
                  -bottom-3
                  -left-3
                  w-5
                  h-5
                  rounded-full
                  bg-purple-400
                  shadow-md
                  shadow-purple-500/10
                "
              />


              {/* NEUTRAL DOT */}

              <div
                className="
                  absolute
                  top-1/2
                  -right-8
                  w-3.5
                  h-3.5
                  rounded-full
                  bg-neutral-700
                "
              />


              {/* SMALL NEUTRAL DOT */}

              <div
                className="
                  absolute
                  bottom-1/4
                  -left-7
                  w-3
                  h-3
                  rounded-full
                  bg-neutral-800
                  border
                  border-neutral-700
                "
              />


              {/* ==================================================
                  STATUS BADGE
              =================================================== */}

              <div
                className="
                  absolute
                  -bottom-5
                  left-1/2
                  -translate-x-1/2
                  px-5
                  py-2
                  bg-neutral-900
                  border
                  border-neutral-700
                  rounded-full
                  flex
                  items-center
                  gap-2
                  shadow-xl
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
                    whitespace-nowrap
                    font-medium
                  "
                >
                  Open to Work
                </span>

              </div>

            </div>

          </motion.div>


          {/* ==================================================
              RIGHT - ABOUT TEXT
          =================================================== */}

          <motion.div
            className="
              lg:col-span-3
              space-y-6
            "

            initial={{
              opacity: 0,
              x: isMobile ? 0 : 30,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.5,
              delay: 0.1,
            }}

            viewport={{
              once: true,
            }}
          >


            {/* ==================================================
                INTRODUCTION
            =================================================== */}

            <div>

              <h3
                className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  text-neutral-100
                  mb-2
                "
              >

                Hi, I'm{" "}

                {/* GRADIENT NAME */}

                <span
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-purple-500
                    to-fuchsia-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  Mutia Nandhika
                </span>

              </h3>


              {/* GRADIENT SUBTITLE */}

              <p
                className="
                  font-medium
                  text-lg
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                  w-fit
                "
              >
                UI/UX Designer & Software Engineer
              </p>

            </div>


            {/* ==================================================
                ABOUT DESCRIPTION
            =================================================== */}

            <div
              className="
                space-y-4
                text-neutral-400
                leading-relaxed
                text-base
                md:text-lg
              "
            >


              {/* PARAGRAPH 1 */}

              <p>

                I'm an{" "}

                <span
                  className="
                    text-neutral-200
                    font-medium
                  "
                >
                  Informatics graduate
                </span>{" "}

                with a strong interest in{" "}

                {/* GRADIENT */}

                <span
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-purple-500
                    to-fuchsia-400
                    bg-clip-text
                    text-transparent
                    font-medium
                  "
                >
                  UI/UX Design
                </span>

                ,{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-purple-500
                    to-fuchsia-400
                    bg-clip-text
                    text-transparent
                    font-medium
                  "
                >
                  Software Engineering
                </span>

                , and{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-purple-500
                    to-fuchsia-400
                    bg-clip-text
                    text-transparent
                    font-medium
                  "
                >
                  Graphic Design
                </span>

                . I enjoy transforming ideas and user needs into
                intuitive, functional, and visually engaging digital
                experiences.

              </p>


              {/* PARAGRAPH 2 */}

              <p>

                My experience includes creating{" "}

                <span
                  className="
                    text-neutral-200
                  "
                >
                  user flows, wireframes, prototypes, and
                  high-fidelity interfaces
                </span>{" "}

                using Figma, as well as developing web and mobile
                applications using technologies such as{" "}

                {/* GRADIENT TECHNOLOGIES */}

                <span
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-purple-500
                    to-fuchsia-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  Laravel, PHP, JavaScript, Vue.js, Flutter,
                  and MySQL
                </span>

                .

              </p>


              {/* PARAGRAPH 3 */}

              <p>

                I believe good digital products combine{" "}

                <span
                  className="
                    text-neutral-200
                  "
                >
                  thoughtful design, clear functionality, and real
                  user needs
                </span>

                . I'm continuously learning and improving my skills
                to contribute to meaningful digital products and
                collaborative projects.

              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}


export default About;