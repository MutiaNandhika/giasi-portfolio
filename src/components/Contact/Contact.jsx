import { memo } from "react";
import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaExternalLinkAlt,
  FaBehance,
} from "react-icons/fa";


/*
 * ============================================================
 * DIRECT CONTACT
 * ============================================================
 */

const contactMethods = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "mutianandhika@gmail.com",
    href: "mailto:mutianandhika@gmail.com",
  },

  {
    icon: FaPhone,
    label: "Phone",
    value: "+62 812-2993-8305",
    href: "tel:+6281229938305",
  },

  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "Purwokerto, Indonesia",
    href: "https://maps.google.com/?q=Purwokerto,Indonesia",
  },
];


/*
 * ============================================================
 * SOCIAL LINKS
 * ============================================================
 */

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/MutiaNandhika",
    label: "GitHub",
  },

  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/mutia-nandhika/",
    label: "LinkedIn",
  },

  {
    icon: FaBehance,
    href:
      "https://www.behance.net/gallery/253178057/Portofolio-Graphic-Design",
    label: "Behance",
  },
];


/*
 * ============================================================
 * RENDER
 * ============================================================
 */

function Contact() {
  return (
    <section className="section-padding pt-16 pb-20">

      <div className="max-w-5xl mx-auto">

        {/* ==================================================
            HEADER
        =================================================== */}

        <motion.div
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

          className="text-center mb-12"
        >

          <h1
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              text-neutral-100
              mb-4
            "
          >
            Get In Touch
          </h1>


          <p
            className="
              text-neutral-400
              text-lg
              max-w-xl
              mx-auto
            "
          >
            Interested in working together or discussing a project?
            Feel free to reach out and let's connect.
          </p>

        </motion.div>


        {/* ==================================================
            CONTENT
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* ==================================================
              DIRECT CONTACT
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
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

            className="
              bg-neutral-900/60
              backdrop-blur-sm
              rounded-2xl
              p-6
              md:p-8
              border
              border-neutral-800
              hover:border-purple-500/20
              transition-colors
              duration-300
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                text-neutral-100
                mb-6
              "
            >
              Direct Contact
            </h2>


            <div className="space-y-4">

              {contactMethods.map(
                (method, index) => {

                  const Icon =
                    method.icon;


                  return (
                    <a
                      key={index}

                      href={
                        method.href
                      }

                      target={
                        method.href.startsWith(
                          "http"
                        )
                          ? "_blank"
                          : undefined
                      }

                      rel={
                        method.href.startsWith(
                          "http"
                        )
                          ? "noopener noreferrer"
                          : undefined
                      }

                      className="
                        flex
                        items-center
                        gap-4
                        p-4
                        rounded-xl
                        bg-neutral-800/40
                        hover:bg-purple-500/10
                        border
                        border-neutral-700/50
                        hover:border-purple-500/30
                        transition-all
                        duration-300
                        group
                      "
                    >

                      {/* ICON - SOLID PURPLE */}

                      <div
                        className="
                          w-11
                          h-11
                          rounded-lg

                          bg-purple-500/10

                          flex
                          items-center
                          justify-center

                          text-purple-400

                          group-hover:bg-purple-500/20

                          transition-colors
                          flex-shrink-0
                        "
                      >

                        <Icon
                          className="text-lg"
                        />

                      </div>


                      <div
                        className="
                          flex-1
                          min-w-0
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-neutral-500
                            mb-1
                          "
                        >
                          {method.label}
                        </p>


                        <p
                          className="
                            text-sm
                            text-neutral-200
                            truncate
                          "
                        >
                          {method.value}
                        </p>

                      </div>


                      {/* EXTERNAL LINK ICON - SOLID PURPLE */}

                      <FaExternalLinkAlt
                        className="
                          text-xs
                          text-neutral-500
                          group-hover:text-purple-400
                          transition-colors
                          flex-shrink-0
                        "
                      />

                    </a>
                  );
                }
              )}

            </div>

          </motion.div>


          {/* ==================================================
              CONNECT ONLINE
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.5,
              delay: 0.2,
            }}

            viewport={{
              once: true,
            }}

            className="
              bg-neutral-900/60
              backdrop-blur-sm
              rounded-2xl
              p-6
              md:p-8
              border
              border-neutral-800
              hover:border-purple-500/20
              transition-colors
              duration-300
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                text-neutral-100
                mb-6
              "
            >
              Connect Online
            </h2>


            <div className="space-y-3">

              {socialLinks.map(
                (social, index) => {

                  const Icon =
                    social.icon;


                  return (
                    <a
                      key={index}

                      href={
                        social.href
                      }

                      target="_blank"

                      rel="noopener noreferrer"

                      className="
                        flex
                        items-center
                        gap-4
                        p-4
                        rounded-xl
                        bg-neutral-800/40
                        hover:bg-purple-500/10
                        border
                        border-neutral-700/50
                        hover:border-purple-500/30

                        text-neutral-400
                        hover:text-purple-400

                        transition-all
                        duration-300
                        group
                      "
                    >

                      {/* ICON - SOLID PURPLE */}

                      <div
                        className="
                          w-11
                          h-11
                          rounded-lg

                          bg-purple-500/10

                          flex
                          items-center
                          justify-center

                          text-purple-400

                          group-hover:bg-purple-500/20

                          transition-colors
                        "
                      >

                        <Icon
                          className="text-xl"
                        />

                      </div>


                      <div
                        className="
                          flex-1
                        "
                      >

                        <p
                          className="
                            text-sm
                            font-medium
                            text-neutral-200
                            group-hover:text-purple-400
                            transition-colors
                          "
                        >
                          {social.label}
                        </p>


                        <p
                          className="
                            text-xs
                            text-neutral-500
                          "
                        >
                          View my profile
                        </p>

                      </div>


                      {/* EXTERNAL LINK ICON - SOLID PURPLE */}

                      <FaExternalLinkAlt
                        className="
                          text-xs
                          text-neutral-500
                          group-hover:text-purple-400
                          transition-colors
                        "
                      />

                    </a>
                  );
                }
              )}

            </div>

          </motion.div>


          {/* ==================================================
              AVAILABILITY
          =================================================== */}

          <motion.div
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
              delay: 0.3,
            }}

            viewport={{
              once: true,
            }}

            className="
              md:col-span-2

              bg-gradient-to-br
              from-violet-500/10
              via-purple-500/10
              to-fuchsia-500/5

              rounded-2xl

              p-6
              md:p-8

              border
              border-purple-500/20

              hover:border-purple-500/30

              transition-all
              duration-300
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-4
              "
            >

              {/* STATUS INDICATOR - REMAINS GREEN */}

              <span
                className="
                  flex
                  h-3
                  w-3
                  relative
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
                    opacity-75
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    rounded-full
                    h-3
                    w-3
                    bg-green-500
                  "
                />

              </span>


              {/* TEXT - PURPLE GRADIENT */}

              <span
                className="
                  text-sm
                  font-semibold

                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-500

                  bg-clip-text
                  text-transparent
                "
              >
                Open to Opportunities
              </span>

            </div>


            <h2
              className="
                text-xl
                font-semibold
                text-neutral-100
                mb-3
              "
            >
              Let's Work Together
            </h2>


            <p
              className="
                text-sm
                text-neutral-400
                leading-relaxed
                max-w-2xl
              "
            >
              Open to opportunities related to UI/UX Design,
              Graphic Design, Web Development, and Software
              Engineering.
            </p>

          </motion.div>

        </div>

      </div>

    </section>
  );
}


export default memo(Contact);