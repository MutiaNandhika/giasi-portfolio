import { useMemo } from "react";
import { motion } from "framer-motion";

import SEOHead from "../SEO/SEOHead";
import { SEO_CONFIGS } from "../SEO/seoConfigs";

import {
  FaPalette,
  FaPaintBrush,
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaProjectDiagram,
  FaMobileAlt,
  FaExchangeAlt,
  FaLayerGroup,
  FaUsers,
  FaClipboardCheck,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPhp,
  FaGitAlt,
  FaGithub,
  FaLaptopCode,
} from "react-icons/fa";

function TechStack() {
  /*
   * ============================================================
   * TECHNOLOGY CATEGORIES
   * ============================================================
   */

  const techCategories = useMemo(
    () => [
      {
        id: 1,
        title: "UI/UX & Design",
        icon: FaPalette,
        color: "text-pink-400",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/20",

        technologies: [
          {
            name: "Figma",
            icon: FaPalette,
            level: "Advanced",
            color: "#F24E1E",
          },
          {
            name: "Canva",
            icon: FaPaintBrush,
            level: "Advanced",
            color: "#00C4CC",
          },
          {
            name: "Wireframing",
            icon: FaLayerGroup,
            level: "Advanced",
            color: "#A855F7",
          },
          {
            name: "Prototyping",
            icon: FaMobileAlt,
            level: "Advanced",
            color: "#A855F7",
          },
          {
            name: "User Flow",
            icon: FaProjectDiagram,
            level: "Intermediate",
            color: "#3B82F6",
          },
          {
            name: "Design Thinking",
            icon: FaUsers,
            level: "Intermediate",
            color: "#EC4899",
          },
        ],
      },

      {
        id: 2,
        title: "Frontend Development",
        icon: FaCode,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",

        technologies: [
          {
            name: "HTML",
            icon: FaHtml5,
            level: "Advanced",
            color: "#E34F26",
          },
          {
            name: "CSS",
            icon: FaCss3Alt,
            level: "Advanced",
            color: "#1572B6",
          },
          {
            name: "JavaScript",
            icon: FaJs,
            level: "Intermediate",
            color: "#F7DF1E",
          },
          {
            name: "Vue.js",
            icon: FaCode,
            level: "Intermediate",
            color: "#42B883",
          },
          {
            name: "React.js",
            icon: FaReact,
            level: "Intermediate",
            color: "#61DAFB",
          },
          {
            name: "Tailwind CSS",
            icon: FaCode,
            level: "Intermediate",
            color: "#06B6D4",
          },
        ],
      },

      {
        id: 3,
        title: "Backend Development",
        icon: FaServer,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",

        technologies: [
          {
            name: "PHP",
            icon: FaPhp,
            level: "Intermediate",
            color: "#777BB4",
          },
          {
            name: "Laravel",
            icon: FaCode,
            level: "Intermediate",
            color: "#FF2D20",
          },
          {
            name: "Inertia.js",
            icon: FaExchangeAlt,
            level: "Intermediate",
            color: "#9553E9",
          },
          {
            name: "Flutter",
            icon: FaMobileAlt,
            level: "Intermediate",
            color: "#02569B",
          },
          {
            name: "RESTful API",
            icon: FaExchangeAlt,
            level: "Intermediate",
            color: "#10B981",
          },
        ],
      },

      {
        id: 4,
        title: "Database & Version Control",
        icon: FaDatabase,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",

        technologies: [
          {
            name: "MySQL",
            icon: FaDatabase,
            level: "Intermediate",
            color: "#4479A1",
          },
          {
            name: "Relational Database",
            icon: FaDatabase,
            level: "Intermediate",
            color: "#22C55E",
          },
          {
            name: "Git",
            icon: FaGitAlt,
            level: "Intermediate",
            color: "#F05032",
          },
          {
            name: "GitHub",
            icon: FaGithub,
            level: "Intermediate",
            color: "#FFFFFF",
          },
        ],
      },

      {
        id: 5,
        title: "Development Tools",
        icon: FaTools,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",

        technologies: [
          {
            name: "VS Code",
            icon: FaLaptopCode,
            level: "Advanced",
            color: "#007ACC",
          },
          {
            name: "Figma",
            icon: FaPalette,
            level: "Advanced",
            color: "#F24E1E",
          },
          {
            name: "Canva",
            icon: FaPaintBrush,
            level: "Advanced",
            color: "#00C4CC",
          },
          {
            name: "Postman",
            icon: FaExchangeAlt,
            level: "Intermediate",
            color: "#FF6C37",
          },
        ],
      },

      {
        id: 6,
        title: "Development Practices",
        icon: FaClipboardCheck,
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/20",

        technologies: [
          {
            name: "Agile Development",
            icon: FaProjectDiagram,
            level: "Intermediate",
            color: "#06B6D4",
          },
          {
            name: "SDLC",
            icon: FaLayerGroup,
            level: "Intermediate",
            color: "#8B5CF6",
          },
          {
            name: "User-Centered Design",
            icon: FaUsers,
            level: "Intermediate",
            color: "#EC4899",
          },
          {
            name: "Blackbox Testing",
            icon: FaClipboardCheck,
            level: "Intermediate",
            color: "#A855F7",
          },
        ],
      },
    ],
    []
  );

  /*
   * ============================================================
   * TECHNOLOGY LEVEL COLOR
   * ============================================================
   */

  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced":
        return "text-purple-300";

      case "Intermediate":
        return "text-purple-400";

      case "Familiar":
        return "text-neutral-400";

      default:
        return "text-neutral-400";
    }
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <>
      <SEOHead {...SEO_CONFIGS.techStack} />

      {/* Reduced top spacing so Tech Stack sits closer to Projects */}
      <section className="section-padding pt-8 md:pt-12 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* ====================================================
              HEADER
          ===================================================== */}

          <div className="text-center mb-16">

            <motion.h1
  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.6,
    delay: 0.1,
  }}
>
  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
    Technologies
  </span>{" "}
  <span className="text-neutral-50">
    & Tools
  </span>
</motion.h1>
            <motion.p
              className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >
              A collection of technologies, design tools, and
              development practices I use to design and build
              user-centered digital experiences and web applications.
            </motion.p>

          </div>

          {/* ====================================================
              TECHNOLOGY CATEGORIES
          ===================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {techCategories.map(
              (category, categoryIndex) => {
                const IconComponent = category.icon;

                return (
                  <motion.div
                    key={category.id}
                    className={`glass-effect rounded-2xl p-6 border ${category.borderColor} ${category.bgColor}`}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: categoryIndex * 0.1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    whileHover={{
                      scale: 1.02,
                    }}
                  >

                    {/* Category Header */}

                    <div className="flex items-center gap-3 mb-6">

                      <div
                        className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${category.color}`}
                        />
                      </div>

                      <h3 className="text-lg font-bold text-neutral-100">
                        {category.title}
                      </h3>

                    </div>

                    {/* Technology List */}

                    <div className="space-y-3">

                      {category.technologies.map(
                        (tech, techIndex) => {
                          const TechIcon = tech.icon;

                          return (
                            <motion.div
                              key={techIndex}
                              className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg border border-neutral-700/30"
                              initial={{
                                opacity: 0,
                                x: -20,
                              }}
                              whileInView={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                delay:
                                  0.2 +
                                  techIndex * 0.05,
                              }}
                              viewport={{
                                once: true,
                              }}
                              whileHover={{
                                x: 5,
                              }}
                            >

                              <div className="flex items-center gap-3 min-w-0">

                                <TechIcon
                                  className="w-5 h-5 flex-shrink-0"
                                  style={{
                                    color: tech.color,
                                  }}
                                />

                                <span className="font-medium text-neutral-200 text-sm truncate">
                                  {tech.name}
                                </span>

                              </div>

                              <span
                                className={`text-xs font-semibold ml-3 flex-shrink-0 ${getLevelColor(
                                  tech.level
                                )}`}
                              >
                                {tech.level}
                              </span>

                            </motion.div>
                          );
                        }
                      )}

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>

        </div>
      </section>
    </>
  );
}

export default TechStack;