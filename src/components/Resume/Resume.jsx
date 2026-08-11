import {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import {
  FaEye,
  FaGraduationCap,
  FaBriefcase,
  FaUsers,
  FaPalette,
  FaCode,
  FaImages,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import SEOHead from "../SEO/SEOHead";
import { SEO_CONFIGS } from "../SEO/seoConfigs";

// Featured Certifications & Recognition
import Certifications from "../Certifications/Certifications";

import {
  motion,
  AnimatePresence,
} from "framer-motion";


function Resume() {

  /*
   * ============================================================
   * STATE
   * ============================================================
   */

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  const [selectedDocumentation, setSelectedDocumentation] =
    useState([]);


  /*
   * ============================================================
   * DOCUMENTATION HANDLERS
   * ============================================================
   */

  const openDocumentation = useCallback(
    (documentation, index = 0) => {

      if (
        !documentation ||
        documentation.length === 0
      ) {
        return;
      }

      setSelectedDocumentation(
        documentation
      );

      setSelectedImageIndex(index);

      setSelectedImage(
        documentation[index]
      );
    },
    []
  );


  const closeDocumentation =
    useCallback(() => {

      setSelectedImage(null);

      setSelectedDocumentation([]);

      setSelectedImageIndex(0);

    }, []);


  const nextImage = useCallback(() => {

    if (
      !selectedDocumentation.length
    ) {
      return;
    }

    const nextIndex =
      (selectedImageIndex + 1) %
      selectedDocumentation.length;

    setSelectedImageIndex(
      nextIndex
    );

    setSelectedImage(
      selectedDocumentation[nextIndex]
    );

  }, [
    selectedDocumentation,
    selectedImageIndex,
  ]);


  const previousImage =
    useCallback(() => {

      if (
        !selectedDocumentation.length
      ) {
        return;
      }

      const previousIndex =
        (
          selectedImageIndex -
          1 +
          selectedDocumentation.length
        ) %
        selectedDocumentation.length;

      setSelectedImageIndex(
        previousIndex
      );

      setSelectedImage(
        selectedDocumentation[
          previousIndex
        ]
      );

    }, [
      selectedDocumentation,
      selectedImageIndex,
    ]);


  /*
   * ============================================================
   * KEYBOARD CONTROL
   * ============================================================
   */

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (!selectedImage) {
        return;
      }

      if (event.key === "Escape") {
        closeDocumentation();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    selectedImage,
    closeDocumentation,
    nextImage,
    previousImage,
  ]);


  /*
   * ============================================================
   * PREVENT BODY SCROLL WHEN MODAL IS OPEN
   * ============================================================
   */

  useEffect(() => {

    if (selectedImage) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";

    }


    return () => {

      document.body.style.overflow =
        "";

    };

  }, [selectedImage]);


  /*
   * ============================================================
   * WORK EXPERIENCE
   * ============================================================
   */

  const experiences = useMemo(
    () => [
      {
        title:
          "Graphic Designer Intern",

        company:
          "PT Rasa Aksata Nusantara (Duluin Group)",

        period:
          "Aug 2025 – Dec 2025",

        location:
          "Bandung, Indonesia",

        icon: <FaPalette />,

        achievements: [
          "Created content plans and managed the company's social media content calendar.",

          "Designed Instagram content aligned with the company's brand identity using Canva and Figma.",

          "Developed company profiles in A4 document and presentation deck formats.",

          "Wrote copy, captions, and informative blog articles for digital marketing purposes while creating consistent, professional, and user-friendly visual designs.",
        ],

        documentation: [
          {
            image:
              "/experience/rasa-aksata/duluin3.jpg",
          },

          {
            image:
              "/experience/rasa-aksata/duluin6.jpg",
          },

          {
            image:
              "/experience/rasa-aksata/duluin7.jpg",
          },
        ],
      },


      {
        title:
          "UI/UX Design Intern",

        company:
          "PT Kilang Pertamina Internasional – Refinery Unit IV",

        period:
          "Jul 2024 – Aug 2024",

        location:
          "Cilacap, Indonesia",

        icon: <FaPalette />,

        achievements: [
          "Designed the UI/UX for a web-based inventory management application using Figma.",

          "Conducted user research and requirement gathering with internal procurement teams and external vendors.",

          "Applied Design Thinking methodology from empathize to testing stages.",

          "Created wireframes and high-fidelity interactive prototypes using Figma.",

          "Prepared user personas, user journeys, use cases, activity diagrams, and class diagrams.",

          "Conducted usability testing and iterative design improvements.",
        ],

        documentation: [
          {
            image:
              "/experience/pertamina/pertamina3.JPG",
          },

          {
            image:
              "/experience/pertamina/pertamina2.JPG",
          },

          {
            image:
              "/experience/pertamina/pertamina4.JPG",
          },
        ],
      },


      {
        title:
          "Software Engineering Intern",

        company:
          "Dinkominfo Kabupaten Banyumas",

        period:
          "Dec 2020 – Mar 2021",

        location:
          "Purwokerto, Indonesia",

        icon: <FaCode />,

        achievements: [
          "Designed the UI/UX for the Flutix mobile application, a cinema ticket booking app, using Figma.",

          "Developed an Academic Information System (SIAKAD) website using the CodeIgniter 3 framework.",
        ],

        documentation: [
          {
            image:
              "/experience/dinkominfo/dinkominfo1.jpg",
          },
        ],
      },
    ],
    []
  );


  /*
   * ============================================================
   * EDUCATION
   * ============================================================
   */

  const education = useMemo(
    () => [
      {
        degree:
          "Bachelor's Degree in Informatics",

        institution:
          "Jenderal Soedirman University",

        period:
          "2022 – 2026",

        location:
          "Purwokerto, Indonesia",

        details: [
          "Relevant Coursework: Web Programming, Systems Analysis and Design, Web Design, and Human-Computer Interaction.",

          "Final Project: Development of a Web-Based Outsourcing Recruitment Information System Using the Agile Development Method at PT Mitra Daksa Anarawata.",
        ],

        documentation: [
          {
            image:
              "/education/unsoed1.jpg",
          },

          {
            image:
              "/education/unsoed2.jpg",
          },

          {
            image:
              "/education/unsoed3.jpg",
          },
        ],
      },


      {
        degree:
          "Software Engineering",

        institution:
          "SMK Telkom Purwokerto",

        period:
          "2019 – 2022",

        location:
          "Purwokerto, Indonesia",

        details: [
          "Competency Certification: Indonesian National Qualifications Framework (KKNI) Level II in Software Engineering.",
        ],

        documentation: [
          {
            image:
              "/education/telkom1.jpg",
          },
        ],
      },
    ],
    []
  );


  /*
   * ============================================================
   * ORGANIZATIONAL EXPERIENCE
   * ============================================================
   */

  const organizations = useMemo(
    () => [
      {
        title:
          "Minister of Research and Data",

        organization:
          "BEM UNSOED 2024",

        period:
          "Mar 2024 – Dec 2024",

        location:
          "Purwokerto, Indonesia",

        achievements: [
          "Coordinated 21 staff members across three divisions: Research and Survey, Data Analysis, and Infographics.",

          "Successfully executed 10 work programs, achieving a perfect evaluation score of 100.",

          "Managed digital platforms, including the organization's website and Instagram account, @dataatunsoed.",

          "Successfully organized the \"Satu Data untuk Unsoed\" program, producing five high-quality surveys.",
        ],

        documentation: [
          {
            image:
              "/organization/bem2.JPG",
          },

          {
            image:
              "/organization/bem4.JPG",
          },

          {
            image:
              "/organization/bem3.JPG",
          },
        ],
      },


      {
        title:
          "Staff Member & Treasurer, Ministry of Research and Data",

        organization:
          "BEM UNSOED 2023",

        period:
          "Mar 2023 – Dec 2023",

        location:
          "Purwokerto, Indonesia",

        achievements: [
          "Coordinated the Institutional Visit to the Banyumas Regency Statistics Agency (BPS), overseeing the planning, budgeting, and execution of the event.",

          "Managed a database of the academic community at Jenderal Soedirman University by collecting data from relevant departments for public access.",

          "Designed and managed Instagram content, including data visualizations based on survey results.",

          "Conducted quantitative and qualitative surveys for data collection and analysis.",

          "Managed the ministry's finances and operational funds.",
        ],

        documentation: [
          {
            image:
              "/organization/bps1.jpeg",
          },

          {
            image:
              "/organization/bem231.jpg",
          },

          {
            image:
              "/organization/bem232.jpg",
          },
        ],
      },
    ],
    []
  );


  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <>

      <SEOHead
        {...SEO_CONFIGS.resume}
      />


      <section className="section-padding pt-28">

        <div className="max-w-6xl mx-auto px-6">


          {/* ====================================================
              HEADER
          ===================================================== */}

          <div className="text-center mb-16">

            <motion.h1
              className="
                text-4xl
                md:text-5xl
                lg:text-6xl
                font-bold
                mb-4
                text-neutral-100
              "

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

              My{" "}

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
                Resume
              </span>

            </motion.h1>


            {/* Purple Gradient Line */}

            <motion.div
              className="
                h-1.5
                bg-gradient-to-r
                from-violet-500
                via-purple-500
                to-fuchsia-500
                mx-auto
                mb-8
                rounded-full
              "

              initial={{
                width: 0,
              }}

              animate={{
                width: 96,
              }}

              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
            />


            <motion.p
              className="
                text-xl
                text-neutral-400
                max-w-3xl
                mx-auto
                leading-relaxed
              "

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

              Informatics graduate focused on UI/UX Design and Software Engineering, creating user-centered digital experiences through thoughtful design and functional development.

            </motion.p>

          </div>


          {/* ====================================================
              WORK EXPERIENCE
          ===================================================== */}

          <section className="mb-16">

            <div className="text-center mb-12">

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-6
                  py-3
                  rounded-full
                  glass-effect
                  border
                  border-purple-500/30
                  mb-6
                "
              >

                {/* ICON - SOLID PURPLE */}

                <FaBriefcase
                  className="
                    w-5
                    h-5
                    text-purple-400
                  "
                />

                <span
                  className="
                    text-lg
                    font-semibold
                    text-neutral-300
                  "
                >

                  Work Experience

                </span>

              </div>


              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                "
              >

                Professional Experience

              </h2>

            </div>


            <div className="space-y-8">

              {experiences.map(
                (experience, index) => (

                  <motion.div
                    key={index}

                    className="
                      glass-effect
                      rounded-2xl
                      p-6
                      md:p-8
                      border
                      border-neutral-700/50
                    "

                    initial={{
                      opacity: 0,
                      y: 30,
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      delay: index * 0.1,
                    }}

                    viewport={{
                      once: true,
                    }}

                    whileHover={{
                      y: -4,
                    }}
                  >

                    {/* Experience Header */}

                    <div
                      className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-start
                        md:justify-between
                        mb-5
                      "
                    >

                      <div
                        className="
                          flex
                          gap-4
                        "
                      >

                        {/* ICON - SOLID PURPLE */}

                        <div
                          className="
                            hidden
                            sm:flex
                            w-11
                            h-11
                            rounded-xl
                            bg-purple-500/10
                            border
                            border-purple-500/20
                            items-center
                            justify-center
                            text-purple-400
                            flex-shrink-0
                          "
                        >

                          {experience.icon}

                        </div>


                        <div>

                          <h3
                            className="
                              text-xl
                              font-bold
                              text-neutral-100
                              mb-1
                            "
                          >

                            {experience.title}

                          </h3>


                          {/* Purple Gradient Accent */}

                          <p
                            className="
                              font-semibold
                              bg-gradient-to-r
                              from-violet-400
                              via-purple-500
                              to-fuchsia-400
                              bg-clip-text
                              text-transparent
                              inline-block
                            "
                          >

                            {experience.company}

                          </p>

                        </div>

                      </div>


                      <div
                        className="
                          text-neutral-400
                          text-sm
                          mt-3
                          md:mt-0
                          md:text-right
                        "
                      >

                        <p>
                          {experience.period}
                        </p>

                        <p>
                          {experience.location}
                        </p>

                      </div>

                    </div>


                    {/* Achievements */}

                    <ul className="space-y-3">

                      {experience.achievements.map(
                        (achievement, i) => (

                          <li
                            key={i}

                            className="
                              text-neutral-300
                              text-sm
                              md:text-base
                              flex
                              items-start
                              gap-3
                            "
                          >

                            {/* SOLID PURPLE BULLET */}

                            <span
                              className="
                                w-2
                                h-2
                                bg-purple-400
                                rounded-full
                                mt-2
                                flex-shrink-0
                              "
                            />

                            <span>
                              {achievement}
                            </span>

                          </li>

                        )
                      )}

                    </ul>


                    {/* Documentation */}

                    {experience.documentation &&
                      experience.documentation.length > 0 && (

                        <div
                          className="
                            mt-8
                            pt-6
                            border-t
                            border-neutral-700/50
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              mb-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              {/* ICON CONTAINER */}

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-purple-500/10
                                  border
                                  border-purple-500/20
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaImages
                                  className="
                                    text-purple-400
                                  "
                                />

                              </div>


                              <h4
                                className="
                                  text-lg
                                  font-semibold
                                  text-neutral-100
                                "
                              >

                                Documentation

                              </h4>

                            </div>


                            <span
                              className="
                                text-xs
                                text-neutral-500
                              "
                            >

                              {experience.documentation.length} items

                            </span>

                          </div>


                          <div
                            className="
                              grid
                              grid-cols-1
                              md:grid-cols-2
                              lg:grid-cols-3
                              gap-5
                            "
                          >

                            {experience.documentation.map(
                              (item, docIndex) => (

                                <motion.button
                                  key={docIndex}

                                  type="button"

                                  onClick={() =>
                                    openDocumentation(
                                      experience.documentation,
                                      docIndex
                                    )
                                  }

                                  className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-neutral-700/50
                                    bg-neutral-900/50
                                    text-left
                                  "

                                  whileHover={{
                                    y: -4,
                                  }}

                                  whileTap={{
                                    scale: 0.98,
                                  }}
                                >

                                  <div
                                    className="
                                      relative
                                      aspect-[16/10]
                                      overflow-hidden
                                    "
                                  >

                                    <img
                                      src={item.image}

                                      alt={`Documentation ${
                                        docIndex + 1
                                      }`}

                                      className="
                                        w-full
                                        h-full
                                        object-cover
                                        transition-transform
                                        duration-500
                                        group-hover:scale-105
                                      "

                                      loading="lazy"
                                    />


                                    <div
                                      className="
                                        absolute
                                        inset-0
                                        bg-black/0
                                        group-hover:bg-black/30
                                        transition-all
                                        duration-300
                                      "
                                    />


                                    <div
                                      className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        opacity-0
                                        group-hover:opacity-100
                                        transition-opacity
                                        duration-300
                                      "
                                    >

                                      <div
                                        className="
                                          w-12
                                          h-12
                                          rounded-full
                                          bg-black/60
                                          backdrop-blur-sm
                                          border
                                          border-white/20
                                          flex
                                          items-center
                                          justify-center
                                        "
                                      >

                                        <FaEye
                                          className="
                                            text-white
                                          "
                                        />

                                      </div>

                                    </div>

                                  </div>

                                </motion.button>

                              )
                            )}

                          </div>

                        </div>

                      )}

                  </motion.div>

                )
              )}

            </div>

          </section>


          {/* ====================================================
              EDUCATION
          ===================================================== */}

          <section className="mb-16">

            <div className="text-center mb-12">

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-6
                  py-3
                  rounded-full
                  glass-effect
                  border
                  border-purple-500/30
                  mb-6
                "
              >

                {/* ICON - SOLID PURPLE */}

                <FaGraduationCap
                  className="
                    w-5
                    h-5
                    text-purple-400
                  "
                />

                <span
                  className="
                    text-lg
                    font-semibold
                    text-neutral-300
                  "
                >

                  Education

                </span>

              </div>


              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                "
              >

                Academic Background

              </h2>

            </div>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              {education.map(
                (edu, index) => (

                  <motion.div
                    key={index}

                    className="
                      glass-effect
                      rounded-2xl
                      p-6
                      md:p-8
                      border
                      border-neutral-700/50
                      h-full
                    "

                    initial={{
                      opacity: 0,
                      y: 30,
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      delay: index * 0.1,
                    }}

                    viewport={{
                      once: true,
                    }}

                    whileHover={{
                      y: -4,
                    }}
                  >

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-neutral-100
                        mb-2
                      "
                    >

                      {edu.degree}

                    </h3>


                    {/* Purple Gradient Accent */}

                    <p
                      className="
                        font-semibold
                        mb-3
                        bg-gradient-to-r
                        from-violet-400
                        via-purple-500
                        to-fuchsia-400
                        bg-clip-text
                        text-transparent
                        inline-block
                      "
                    >

                      {edu.institution}

                    </p>


                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:justify-between
                        gap-1
                        text-neutral-400
                        text-sm
                        mb-4
                      "
                    >

                      <span>
                        {edu.period}
                      </span>

                      <span>
                        {edu.location}
                      </span>

                    </div>


                    <div className="space-y-3">

                      {edu.details.map(
                        (detail, i) => (

                          <div
                            key={i}

                            className="
                              flex
                              items-start
                              gap-3
                              text-neutral-400
                              text-sm
                              leading-relaxed
                            "
                          >

                            {/* SOLID PURPLE BULLET */}

                            <span
                              className="
                                w-1.5
                                h-1.5
                                bg-purple-400
                                rounded-full
                                mt-2
                                flex-shrink-0
                              "
                            />

                            <span>
                              {detail}
                            </span>

                          </div>

                        )
                      )}

                    </div>


                    {/* Education Documentation */}

                    {edu.documentation &&
                      edu.documentation.length > 0 && (

                        <div
                          className="
                            mt-6
                            pt-6
                            border-t
                            border-neutral-700/50
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              mb-4
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-purple-500/10
                                  border
                                  border-purple-500/20
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaImages
                                  className="
                                    text-purple-400
                                  "
                                />

                              </div>


                              <h4
                                className="
                                  text-lg
                                  font-semibold
                                  text-neutral-100
                                "
                              >

                                Documentation

                              </h4>

                            </div>


                            <span
                              className="
                                text-xs
                                text-neutral-500
                              "
                            >

                              {edu.documentation.length} items

                            </span>

                          </div>


                          <div
                            className="
                              grid
                              grid-cols-2
                              md:grid-cols-3
                              gap-3
                            "
                          >

                            {edu.documentation.map(
                              (item, docIndex) => (

                                <motion.button
                                  key={docIndex}

                                  type="button"

                                  onClick={() =>
                                    openDocumentation(
                                      edu.documentation,
                                      docIndex
                                    )
                                  }

                                  className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-neutral-700/50
                                    bg-neutral-900/50
                                  "

                                  whileHover={{
                                    y: -3,
                                  }}

                                  whileTap={{
                                    scale: 0.98,
                                  }}
                                >

                                  <div
                                    className="
                                      relative
                                      aspect-[4/3]
                                      overflow-hidden
                                    "
                                  >

                                    <img
                                      src={item.image}

                                      alt={`Education documentation ${
                                        docIndex + 1
                                      }`}

                                      className="
                                        w-full
                                        h-full
                                        object-cover
                                        transition-transform
                                        duration-500
                                        group-hover:scale-105
                                      "

                                      loading="lazy"
                                    />


                                    <div
                                      className="
                                        absolute
                                        inset-0
                                        bg-black/0
                                        group-hover:bg-black/30
                                        transition-all
                                        duration-300
                                      "
                                    />


                                    <div
                                      className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        opacity-0
                                        group-hover:opacity-100
                                        transition-opacity
                                        duration-300
                                      "
                                    >

                                      <div
                                        className="
                                          w-10
                                          h-10
                                          rounded-full
                                          bg-black/60
                                          backdrop-blur-sm
                                          border
                                          border-white/20
                                          flex
                                          items-center
                                          justify-center
                                        "
                                      >

                                        <FaEye
                                          className="
                                            text-white
                                          "
                                        />

                                      </div>

                                    </div>

                                  </div>

                                </motion.button>

                              )
                            )}

                          </div>

                        </div>

                      )}

                  </motion.div>

                )
              )}

            </div>

          </section>


          {/* ====================================================
              ORGANIZATIONAL EXPERIENCE
          ===================================================== */}

          <section className="mb-16">

            <div className="text-center mb-12">

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-6
                  py-3
                  rounded-full
                  glass-effect
                  border
                  border-purple-500/30
                  mb-6
                "
              >

                {/* ICON - SOLID PURPLE */}

                <FaUsers
                  className="
                    w-5
                    h-5
                    text-purple-400
                  "
                />

                <span
                  className="
                    text-lg
                    font-semibold
                    text-neutral-300
                  "
                >

                  Organizational Experience

                </span>

              </div>


              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                "
              >

                Leadership & Organization

              </h2>

            </div>


            <div className="space-y-6">

              {organizations.map(
                (organization, index) => (

                  <motion.div
                    key={index}

                    className="
                      glass-effect
                      rounded-2xl
                      p-6
                      md:p-8
                      border
                      border-neutral-700/50
                    "

                    initial={{
                      opacity: 0,
                      y: 30,
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      delay: index * 0.1,
                    }}

                    viewport={{
                      once: true,
                    }}

                    whileHover={{
                      y: -4,
                    }}
                  >

                    <div
                      className="
                        flex
                        flex-col
                        md:flex-row
                        md:justify-between
                        mb-5
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-xl
                            font-bold
                            text-neutral-100
                            mb-1
                          "
                        >

                          {organization.title}

                        </h3>


                        {/* Purple Gradient Accent */}

                        <p
                          className="
                            font-semibold
                            bg-gradient-to-r
                            from-violet-400
                            via-purple-500
                            to-fuchsia-400
                            bg-clip-text
                            text-transparent
                            inline-block
                          "
                        >

                          {organization.organization}

                        </p>

                      </div>


                      <div
                        className="
                          text-neutral-400
                          text-sm
                          mt-3
                          md:mt-0
                          md:text-right
                        "
                      >

                        <p>
                          {organization.period}
                        </p>

                        <p>
                          {organization.location}
                        </p>

                      </div>

                    </div>


                    <ul className="space-y-3">

                      {organization.achievements.map(
                        (achievement, i) => (

                          <li
                            key={i}

                            className="
                              text-neutral-300
                              text-sm
                              md:text-base
                              flex
                              items-start
                              gap-3
                            "
                          >

                            {/* SOLID PURPLE BULLET */}

                            <span
                              className="
                                w-2
                                h-2
                                bg-purple-400
                                rounded-full
                                mt-2
                                flex-shrink-0
                              "
                            />

                            <span>
                              {achievement}
                            </span>

                          </li>

                        )
                      )}

                    </ul>


                    {/* Organization Documentation */}

                    {organization.documentation &&
                      organization.documentation.length > 0 && (

                        <div
                          className="
                            mt-6
                            pt-6
                            border-t
                            border-neutral-700/50
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              mb-4
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-purple-500/10
                                  border
                                  border-purple-500/20
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaImages
                                  className="
                                    text-purple-400
                                  "
                                />

                              </div>


                              <h4
                                className="
                                  text-lg
                                  font-semibold
                                  text-neutral-100
                                "
                              >

                                Documentation

                              </h4>

                            </div>


                            <span
                              className="
                                text-xs
                                text-neutral-500
                              "
                            >

                              {organization.documentation.length} items

                            </span>

                          </div>


                          <div
                            className="
                              grid
                              grid-cols-2
                              md:grid-cols-3
                              gap-3
                            "
                          >

                            {organization.documentation.map(
                              (item, docIndex) => (

                                <motion.button
                                  key={docIndex}

                                  type="button"

                                  onClick={() =>
                                    openDocumentation(
                                      organization.documentation,
                                      docIndex
                                    )
                                  }

                                  className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-neutral-700/50
                                    bg-neutral-900/50
                                  "

                                  whileHover={{
                                    y: -3,
                                  }}

                                  whileTap={{
                                    scale: 0.98,
                                  }}
                                >

                                  <div
                                    className="
                                      relative
                                      aspect-[4/3]
                                      overflow-hidden
                                    "
                                  >

                                    <img
                                      src={item.image}

                                      alt={`Organization documentation ${
                                        docIndex + 1
                                      }`}

                                      className="
                                        w-full
                                        h-full
                                        object-cover
                                        transition-transform
                                        duration-500
                                        group-hover:scale-105
                                      "

                                      loading="lazy"
                                    />


                                    <div
                                      className="
                                        absolute
                                        inset-0
                                        bg-black/0
                                        group-hover:bg-black/30
                                        transition-all
                                        duration-300
                                      "
                                    />


                                    <div
                                      className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        opacity-0
                                        group-hover:opacity-100
                                        transition-opacity
                                        duration-300
                                      "
                                    >

                                      <div
                                        className="
                                          w-10
                                          h-10
                                          rounded-full
                                          bg-black/60
                                          backdrop-blur-sm
                                          border
                                          border-white/20
                                          flex
                                          items-center
                                          justify-center
                                        "
                                      >

                                        <FaEye
                                          className="
                                            text-white
                                          "
                                        />

                                      </div>

                                    </div>

                                  </div>

                                </motion.button>

                              )
                            )}

                          </div>

                        </div>

                      )}

                  </motion.div>

                )
              )}

            </div>

          </section>


          {/* ====================================================
              FEATURED CERTIFICATIONS & RECOGNITION
          ===================================================== */}

          <section className="mb-16">

            <Certifications
              featuredOnly={true}
            />

          </section>


        </div>

      </section>


      {/* ============================================================
          DOCUMENTATION IMAGE MODAL
      ============================================================= */}

      <AnimatePresence>

        {selectedImage && (

          <motion.div
            className="
              fixed
              inset-0
              z-[9999]
              bg-black/90
              backdrop-blur-md
              flex
              items-center
              justify-center
              p-4
              md:p-8
            "

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            onClick={
              closeDocumentation
            }
          >

            <motion.div
              className="
                relative
                w-full
                max-w-6xl
                max-h-[95vh]
                flex
                flex-col
              "

              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}

              transition={{
                duration: 0.25,
              }}

              onClick={(event) =>
                event.stopPropagation()
              }
            >


              {/* ==================================================
                  CLOSE BUTTON
              ================================================== */}

              <button
                type="button"

                onClick={
                  closeDocumentation
                }

                className="
                  absolute
                  -top-12
                  right-0
                  md:-right-2
                  w-10
                  h-10
                  rounded-full
                  bg-neutral-800/90
                  border
                  border-neutral-700
                  flex
                  items-center
                  justify-center
                  text-neutral-300
                  hover:text-white
                  hover:bg-purple-600/30
                  transition-all
                  z-20
                "

                aria-label="Close documentation"
              >

                <FaTimes />

              </button>


              {/* ==================================================
                  IMAGE CONTAINER
              ================================================== */}

              <div
                className="
                  relative
                  bg-neutral-950
                  rounded-2xl
                  overflow-hidden
                  border
                  border-purple-500/20
                "
              >

                <img
                  src={selectedImage.image}

                  alt="Portfolio documentation"

                  className="
                    w-full
                    max-h-[75vh]
                    object-contain
                  "
                />


                {/* Previous Button */}

                {selectedDocumentation.length >
                  1 && (

                  <button
                    type="button"

                    onClick={
                      previousImage
                    }

                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-11
                      h-11
                      md:w-12
                      md:h-12
                      rounded-full
                      bg-black/60
                      backdrop-blur-sm
                      border
                      border-purple-400/20
                      flex
                      items-center
                      justify-center
                      text-purple-300
                      hover:bg-purple-600/30
                      hover:text-white
                      transition-all
                    "

                    aria-label="Previous image"
                  >

                    <FaChevronLeft />

                  </button>

                )}


                {/* Next Button */}

                {selectedDocumentation.length >
                  1 && (

                  <button
                    type="button"

                    onClick={
                      nextImage
                    }

                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      w-11
                      h-11
                      md:w-12
                      md:h-12
                      rounded-full
                      bg-black/60
                      backdrop-blur-sm
                      border
                      border-purple-400/20
                      flex
                      items-center
                      justify-center
                      text-purple-300
                      hover:bg-purple-600/30
                      hover:text-white
                      transition-all
                    "

                    aria-label="Next image"
                  >

                    <FaChevronRight />

                  </button>

                )}

              </div>


              {/* ==================================================
                  IMAGE INFORMATION
              ================================================== */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  bg-neutral-900/95
                  border
                  border-purple-500/20
                  rounded-2xl
                  px-5
                  py-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  {/* SOLID PURPLE ICON */}

                  <FaImages
                    className="
                      text-purple-400
                    "
                  />

                  <span
                    className="
                      text-sm
                      text-neutral-300
                    "
                  >

                    Documentation

                  </span>

                </div>


                {selectedDocumentation.length >
                  1 && (

                  <div
                    className="
                      text-neutral-500
                      text-sm
                      whitespace-nowrap
                    "
                  >

                    {selectedImageIndex + 1}

                    {" / "}

                    {selectedDocumentation.length}

                  </div>

                )}

              </div>


              {/* ==================================================
                  THUMBNAIL NAVIGATION
              ================================================== */}

              {selectedDocumentation.length >
                1 && (

                <div
                  className="
                    flex
                    justify-center
                    gap-2
                    mt-4
                    overflow-x-auto
                    pb-2
                  "
                >

                  {selectedDocumentation.map(
                    (item, index) => (

                      <button
                        key={index}

                        type="button"

                        onClick={() => {

                          setSelectedImageIndex(
                            index
                          );

                          setSelectedImage(
                            item
                          );

                        }}

                        className={`
                          relative
                          flex-shrink-0
                          w-16
                          h-12
                          rounded-lg
                          overflow-hidden
                          border-2
                          transition-all
                          ${
                            index ===
                            selectedImageIndex
                              ? "border-purple-400 scale-105"
                              : "border-neutral-700 opacity-60 hover:opacity-100"
                          }
                        `}
                      >

                        <img
                          src={item.image}

                          alt={`Thumbnail ${
                            index + 1
                          }`}

                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      </button>

                    )
                  )}

                </div>

              )}

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}


export default Resume;