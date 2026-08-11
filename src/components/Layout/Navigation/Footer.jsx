import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaHeart,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/MutiaNandhika",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/mutia-nandhika",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: "mailto:mutianandhika@gmail.com",
    },
  ];

  const quickLinks = [
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Projects",
      href: "#projects",
    },
    {
      name: "Tech Stack",
      href: "#tech-stack",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <footer className="relative">

      {/* ==================================================
          SUBTLE TOP BORDER
      =================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-purple-500/40
          to-transparent
        "
      />

      <div className="py-12 px-6">

        <motion.div
          className="
            flex
            flex-col
            items-center
            gap-8
          "

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

          {/* ==================================================
              LOGO & NAME
          =================================================== */}

          <motion.a
            href="#home"

            className="
              group
              flex
              items-center
              gap-2
            "

            whileHover={{
              scale: 1.02,
            }}
          >

            <span
              className="
                text-2xl
                font-bold
                text-neutral-100
                tracking-tight
              "
            >
              Mutia Nandhika
            </span>


            {/* Gradient accent */}

            <span
              className="
                text-2xl
                font-bold

                bg-gradient-to-r
                from-violet-400
                via-purple-500
                to-fuchsia-500

                bg-clip-text
                text-transparent
              "
            >
              .
            </span>

          </motion.a>


          {/* ==================================================
              QUICK NAVIGATION
          =================================================== */}

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-x-6
              gap-y-2
            "
          >

            {quickLinks.map(
              (link) => (
                <motion.a
                  key={link.name}

                  href={link.href}

                  className="
                    text-sm
                    text-neutral-400

                    hover:text-purple-400

                    transition-colors
                    duration-300
                  "

                  whileHover={{
                    y: -1,
                  }}
                >
                  {link.name}
                </motion.a>
              )
            )}

          </div>


          {/* ==================================================
              SOCIAL LINKS
          =================================================== */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {socialLinks.map(
              (social) => {

                const Icon =
                  social.icon;


                return (
                  <motion.a
                    key={social.name}

                    href={social.url}

                    target={
                      social.url.startsWith(
                        "mailto"
                      )
                        ? undefined
                        : "_blank"
                    }

                    rel={
                      social.url.startsWith(
                        "mailto"
                      )
                        ? undefined
                        : "noopener noreferrer"
                    }

                    className="
                      w-10
                      h-10
                      rounded-full

                      bg-neutral-800/50

                      border
                      border-neutral-700/50

                      flex
                      items-center
                      justify-center

                      text-purple-400

                      hover:text-purple-300

                      hover:border-purple-500/40

                      hover:bg-purple-500/10

                      transition-all
                      duration-300
                    "

                    whileHover={{
                      y: -3,
                    }}

                    whileTap={{
                      scale: 0.95,
                    }}

                    aria-label={
                      social.name
                    }
                  >

                    {/* SOLID PURPLE ICON */}

                    <Icon
                      className="
                        text-base
                        text-purple-400
                      "
                    />

                  </motion.a>
                );
              }
            )}

          </div>


          {/* ==================================================
              DIVIDER
          =================================================== */}

          <div
            className="
              w-16
              h-px

              bg-gradient-to-r
              from-transparent
              via-purple-500/50
              to-transparent
            "
          />


          {/* ==================================================
              COPYRIGHT
          =================================================== */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-2

              text-sm
              text-neutral-500
            "
          >

            <span
              className="
                text-neutral-600
              "
            >
              © {currentYear} Mutia Nandhika.
              All rights reserved.
            </span>

          </div>

        </motion.div>

      </div>

    </footer>
  );
};

export default Footer;