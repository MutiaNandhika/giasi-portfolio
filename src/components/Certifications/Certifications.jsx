import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import {
  FaCertificate,
  FaTrophy,
  FaImages,
  FaEye,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaBriefcase,
  FaGraduationCap,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

import SEOHead from "../SEO/SEOHead";
import { SEO_CONFIGS } from "../SEO/seoConfigs";

import {
  motion,
  AnimatePresence,
} from "framer-motion";


/*
 * ============================================================
 * CERTIFICATIONS DATA
 * ============================================================
 *
 * Total: 21 Certifications / Achievements
 *
 * Categories:
 * - organization
 * - course
 * - work
 * - committee
 * - competition
 *
 */

const CERTIFICATIONS_DATA = [

  // ============================================================
  // COURSE
  // ============================================================

  {
    id: 1,

    name:
      "Complete UI Designer: Visual Design, Prototype, Usability Test",

    issuer:
      "BuildWithAngga",

    year:
      "September 14, 2024",

    category:
      "course",

    featured:
      true,

    documentation: [
      {
        image:
          "/certifications/uibuild.jpg",
      },
    ],
  },


  {
    id: 18,

    name:
      "Sertifikasi Kompetensi Rekayasa Perangkat Lunak",

    issuer:
      "BNSP",

    year:
      "May 2022 – May 2025",

    category:
      "course",

    documentation: [{
        image:
          "/certifications/bnsp.jpg",
      },],
  },


  {
    id: 19,

    name:
      "Talent Scouting Academy – Cyber Champion",

    issuer:
      "Kementerian Komunikasi dan Informatika",

    year:
      "November 2024",

    category:
      "course",

    documentation: [{
        image:
          "/certifications/talent.jpg",
      },],
  },


  {
    id: 20,

    name:
      "Intro to Software Engineering",

    issuer:
      "RevoU",

    year:
      "January 2024",

    category:
      "course",

    documentation: [{
        image:
          "/certifications/revou.jpg",
      },],
  },


  // ============================================================
  // WORK
  // ============================================================

  {
    id: 2,

    name:
      "Graphic Designer Intern",

    issuer:
      "PT Rasa Aksata Nusantara",

    year:
      "August 1 – November 30, 2025",

    category:
      "work",

    featured:
      true,

    documentation: [
      {
        image:
          "/certifications/duluin.png",
      },
    ],
  },


  {
    id: 3,

    name:
      "UI/UX Design Intern",

    issuer:
      "PT Kilang Pertamina Internasional",

    year:
      "July 1 – August 31, 2024",

    category:
      "work",

    featured:
      true,

    documentation: [
      {
        image:
          "/certifications/pertaminask.jpg",
      },
    ],
  },


  {
    id: 4,

    name:
      "Praktik Kerja Lapangan",

    issuer:
      "Dinas Komunikasi dan Informatika Kabupaten Banyumas",

    year:
      "December 14, 2020 – March 12, 2021",

    category:
      "work",

    featured:
      true,

    documentation: [
      {
        image:
          "/certifications/pklkominfo.jpg",
      },

      {
        image:
          "/certifications/pklkominfo-certificate.jpg",
      },
    ],
  },


  // ============================================================
  // COMPETITION
  // ============================================================

  {
    id: 5,

    name:
      "UI/UX Competition I/O Festival 2024",

    issuer:
      "BEM FTI Universitas Tarumanagara",

    year:
      "June 12 – 13, 2024",

    category:
      "competition",

    documentation: [
      {
        image:
          "/certifications/dwipantara.jpg",
      },
    ],
  },


  {
    id: 6,

    name:
      "Information Technology Creative Competition 2025",

    issuer:
      "Universitas Udayana",

    year:
      "October 31 – November 1, 2025",

    category:
      "competition",

    documentation: [
      {
        image:
          "/certifications/itcc.jpg",
      },
    ],
  },


  {
    id: 7,

    name:
      "Mobile UI/UX Competition",

    issuer:
      "Universitas Dian Nuswantoro",

    year:
      "June 28, 2025",

    category:
      "competition",

    documentation: [
      {
        image:
          "/certifications/mobile.jpg",
      },
    ],
  },


  {
    id: 8,

    name:
      "UI/UX Design Competition",

    issuer:
      "Universitas Majalengka",

    year:
      "March 25, 2025",

    category:
      "competition",

    documentation: [
      {
        image:
          "/certifications/nawaitu.jpg",
      },
    ],
  },


  {
    id: 9,

    name:
      "Web Competetion STECH 2024",

    issuer:
      "Universitas Jenderal Soedirman",

    year:
      "November 2, 2024",

    category:
      "competition",

    documentation: [
      {
        image:
          "/certifications/stech1.jpg",
      },
    ],
  },


  {
    id: 10,

    name:
      "Techcomfest UI/UX Design Competition 2024",

    issuer:
      "Politeknik Negeri Semarang",

    year:
      "January 20, 2024",

    category:
      "competition",

    documentation: [
      {
        image:
          "/certifications/gumy.jpg",
      },
    ],
  },


  {
    id: 21,

    name:
      "Best Design of Web Programming Practicum 2nd Test",

    issuer:
      "Universitas Jenderal Soedirman",

    year:
      "November 2023",

    category:
      "competition",

    documentation: [{
        image:
          "/certifications/best.jpg",
      },],
  },


  // ============================================================
  // ORGANIZATION
  // ============================================================

  {
    id: 11,

    name:
      "Minister of Research and Data",

    issuer:
      "BEM Universitas Jenderal Soedirman",

    year:
      "2024",

    category:
      "organization",

    documentation: [
      {
        image:
          "/certifications/bem24.jpg",
      },
    ],
  },


  {
    id: 12,

    name:
      "Staff Division of Research and Data",

    issuer:
      "BEM Universitas Jenderal Soedirman",

    year:
      "2023",

    category:
      "organization",

    documentation: [
      {
        image:
          "/certifications/bem23.jpg",
      },
    ],
  },


  // ============================================================
  // COMMITTEE
  // ============================================================

  {
    id: 13,

    name:
      "Steering committee SDS",

    issuer:
      "Soedirman Digital School 2024",

    year:
      "2024",

    category:
      "committee",

    documentation: [
      {
        image:
          "/certifications/sds.png",
      },
    ],
  },


  {
    id: 14,

    name:
      "Staff Division of Event",

    issuer:
      "Soedirman Technophoria 2022",

    year:
      "November 13 & 27, 2022",

    category:
      "committee",

    documentation: [
      {
        image:
          "/certifications/stech2.jpg",
      },
    ],
  },


  {
    id: 15,

    name:
      "Staff Division of Mentoring",

    issuer:
      "Soedirman Student Summit 2023",

    year:
      "2023",

    category:
      "committee",

    documentation: [
      {
        image:
          "/certifications/pendamping.jpg",
      },
    ],
  },


  {
    id: 16,

    name:
      "Staff Division of Event",

    issuer:
      "Maskrab Makrab 2023",

    year:
      "2023",

    category:
      "committee",

    documentation: [
      {
        image:
          "/certifications/mm.jpg",
      },
    ],
  },


  {
    id: 17,

    name:
      "Publication and Documentation Staff",

    issuer:
      "Soedirman Technophoria 2023",

    year:
      "November 12, 2023",

    category:
      "committee",

    documentation: [
      {
        image:
          "/certifications/stech3.jpg",
      },
    ],
  },

];


/*
 * ============================================================
 * CATEGORY CONFIGURATION
 * ============================================================
 */

const CATEGORY_CONFIG = {

  organization: {
    label: "Organization",
    icon: FaUsers,
  },

  course: {
    label: "Course",
    icon: FaGraduationCap,
  },

  work: {
    label: "Work",
    icon: FaBriefcase,
  },

  committee: {
    label: "Committee",
    icon: FaUserTie,
  },

  competition: {
    label: "Competition",
    icon: FaTrophy,
  },

};


/*
 * ============================================================
 * MAIN COMPONENT
 * ============================================================
 */

function Certifications({
  featuredOnly = false,
}) {

  const location = useLocation();


  /*
   * ============================================================
   * DETERMINE PAGE
   * ============================================================
   */

  const isCertificationsPage =
    location.pathname === "/certifications";


  const showAllPage =
    !featuredOnly &&
    isCertificationsPage;


  /*
   * ============================================================
   * STATE
   * ============================================================
   */

  const [filter, setFilter] =
    useState("all");


  const [featuredIndex, setFeaturedIndex] =
    useState(0);


  const [selectedCertification, setSelectedCertification] =
    useState(null);


  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);


  /*
   * ============================================================
   * FILTER CATEGORIES
   * ============================================================
   */

  const categories = useMemo(
    () => [
      {
        value: "all",
        label: "All",
      },

      {
        value: "organization",
        label: "Organization",
      },

      {
        value: "course",
        label: "Course",
      },

      {
        value: "work",
        label: "Work",
      },

      {
        value: "committee",
        label: "Committee",
      },

      {
        value: "competition",
        label: "Competition",
      },
    ],
    []
  );


  /*
   * ============================================================
   * ALL CERTIFICATIONS
   * ============================================================
   */

  const allCertifications =
    CERTIFICATIONS_DATA;


  /*
   * ============================================================
   * FEATURED CERTIFICATIONS
   * ============================================================
   */

  const featuredCertifications =
    useMemo(() => {

      const featured =
        allCertifications.filter(
          (item) =>
            item.featured
        );


      if (featured.length > 0) {
        return featured;
      }


      return allCertifications.slice(
        0,
        6
      );

    }, []);


  /*
   * ============================================================
   * FILTERED CERTIFICATIONS
   * ============================================================
   */

  const filteredCertifications =
    useMemo(() => {

      if (filter === "all") {
        return allCertifications;
      }


      return allCertifications.filter(
        (item) =>
          item.category === filter
      );

    }, [filter]);


  /*
   * ============================================================
   * FEATURED CAROUSEL
   * ============================================================
   */

  const featuredCount =
    featuredCertifications.length;


  const nextFeatured =
    useCallback(() => {

      if (featuredCount <= 1) {
        return;
      }


      setFeaturedIndex(
        (prev) =>
          (prev + 1) %
          featuredCount
      );

    }, [featuredCount]);


  const previousFeatured =
    useCallback(() => {

      if (featuredCount <= 1) {
        return;
      }


      setFeaturedIndex(
        (prev) =>
          (
            prev -
            1 +
            featuredCount
          ) %
          featuredCount
      );

    }, [featuredCount]);


  /*
   * ============================================================
   * GET FEATURED CERTIFICATION
   * ============================================================
   */

  const getFeaturedCertification =
    (offset = 0) => {

      if (featuredCount === 0) {
        return null;
      }


      return featuredCertifications[
        (
          featuredIndex +
          offset
        ) %
        featuredCount
      ];

    };


  /*
   * ============================================================
   * DOCUMENTATION
   * ============================================================
   */

  const openDocumentation =
    useCallback(
      (
        certification,
        index = 0
      ) => {

        if (
          !certification.documentation ||
          certification.documentation.length === 0
        ) {
          return;
        }


        setSelectedCertification(
          certification
        );

        setSelectedImageIndex(
          index
        );

      },
      []
    );


  const closeDocumentation =
    useCallback(() => {

      setSelectedCertification(
        null
      );

      setSelectedImageIndex(
        0
      );

    }, []);


  const nextImage =
    useCallback(() => {

      if (
        !selectedCertification ||
        !selectedCertification.documentation ||
        selectedCertification.documentation.length <= 1
      ) {
        return;
      }


      setSelectedImageIndex(
        (prev) =>
          (
            prev + 1
          ) %
          selectedCertification
            .documentation
            .length
      );

    }, [
      selectedCertification,
    ]);


  const previousImage =
    useCallback(() => {

      if (
        !selectedCertification ||
        !selectedCertification.documentation ||
        selectedCertification.documentation.length <= 1
      ) {
        return;
      }


      setSelectedImageIndex(
        (prev) =>
          (
            prev -
            1 +
            selectedCertification
              .documentation
              .length
          ) %
          selectedCertification
            .documentation
            .length
      );

    }, [
      selectedCertification,
    ]);


  /*
   * ============================================================
   * KEYBOARD CONTROL
   * ============================================================
   */

  useEffect(() => {

    const handleKeyDown =
      (event) => {

        if (!selectedCertification) {
          return;
        }


        if (
          event.key ===
          "Escape"
        ) {
          closeDocumentation();
        }


        if (
          event.key ===
          "ArrowRight"
        ) {
          nextImage();
        }


        if (
          event.key ===
          "ArrowLeft"
        ) {
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
    selectedCertification,
    closeDocumentation,
    nextImage,
    previousImage,
  ]);


  /*
   * ============================================================
   * BODY SCROLL
   * ============================================================
   */

  useEffect(() => {

    if (selectedCertification) {

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

  }, [
    selectedCertification,
  ]);


  /*
   * ============================================================
   * SEO
   * ============================================================
   */

  const seoConfig =
    SEO_CONFIGS.resume || {};


  /*
   * ============================================================
   * FEATURED SECTION
   * ============================================================
   */

  if (!showAllPage) {

    return (
      <>

        <SEOHead
          {...seoConfig}
        />


        <section
          id="certifications"
          className="py-24"
        >

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
            "
          >

            {/* ==================================================
                HEADER
            ================================================== */}

            <motion.div
              className="
                text-center
                mb-12
              "

              initial={{
                opacity: 0,
                y: 20,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.5,
              }}
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  border
                  border-purple-500/20
                  bg-purple-500/10
                  text-purple-400
                  text-xs
                  mb-5
                "
              >

                <FaCertificate
                  className="
                    text-purple-400
                  "
                />

                Certifications & Recognition

              </div>


              <h2
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  text-white
                  mb-4
                "
              >

                Certifications{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-violet-400
                    via-purple-500
                    to-fuchsia-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  & Recognition
                </span>

              </h2>


              <p
                className="
                  text-neutral-400
                  text-base
                  md:text-lg
                  max-w-2xl
                  mx-auto
                  leading-relaxed
                "
              >

                Professional certifications and
                recognitions that support my
                experience in technology,
                design, and software development.

              </p>

            </motion.div>


            {/* ==================================================
                CAROUSEL
            ================================================== */}

            {featuredCertifications.length >
            0 ? (

              <div
                className="
                  relative
                "
              >

                {/* DESKTOP */}

                <div
                  className="
                    hidden
                    md:grid
                    md:grid-cols-3
                    gap-5
                    lg:gap-6
                  "
                >

                  {[0, 1, 2].map(
                    (offset) => {

                      const certification =
                        getFeaturedCertification(
                          offset
                        );


                      if (
                        !certification
                      ) {
                        return null;
                      }


                      return (
                        <CertificationCard
                          key={`
                            ${certification.id}
                            -
                            ${featuredIndex}
                            -
                            ${offset}
                          `}
                          certification={
                            certification
                          }
                          onOpen={
                            openDocumentation
                          }
                        />
                      );

                    }
                  )}

                </div>


                {/* MOBILE */}

                <div
                  className="
                    md:hidden
                  "
                >

                  {getFeaturedCertification(
                    0
                  ) && (

                    <CertificationCard
                      certification={
                        getFeaturedCertification(
                          0
                        )
                      }
                      onOpen={
                        openDocumentation
                      }
                    />

                  )}

                </div>


                {/* LEFT ARROW */}

                {featuredCount > 1 && (

                  <button
                    type="button"
                    onClick={
                      previousFeatured
                    }

                    aria-label="
                      Previous certification
                    "

                    className="
                      absolute
                      left-[-18px]
                      md:left-[-24px]
                      top-1/2
                      -translate-y-1/2
                      z-20

                      w-11
                      h-11
                      rounded-full

                      border
                      border-neutral-700

                      bg-neutral-900/95

                      text-neutral-300

                      hover:text-purple-400
                      hover:border-purple-500/50
                      hover:bg-purple-500/10

                      flex
                      items-center
                      justify-center

                      transition-all
                      duration-300

                      shadow-xl
                    "
                  >

                    <FaChevronLeft />

                  </button>

                )}


                {/* RIGHT ARROW */}

                {featuredCount > 1 && (

                  <button
                    type="button"
                    onClick={
                      nextFeatured
                    }

                    aria-label="
                      Next certification
                    "

                    className="
                      absolute
                      right-[-18px]
                      md:right-[-24px]
                      top-1/2
                      -translate-y-1/2
                      z-20

                      w-11
                      h-11
                      rounded-full

                      border
                      border-neutral-700

                      bg-neutral-900/95

                      text-neutral-300

                      hover:text-purple-400
                      hover:border-purple-500/50
                      hover:bg-purple-500/10

                      flex
                      items-center
                      justify-center

                      transition-all
                      duration-300

                      shadow-xl
                    "
                  >

                    <FaChevronRight />

                  </button>

                )}

              </div>

            ) : (

              <div
                className="
                  text-center
                  py-16
                  text-neutral-500
                "
              >

                No certifications available.

              </div>

            )}


            {/* ==================================================
                INDICATORS
            ================================================== */}

            {featuredCount > 1 && (

              <div
                className="
                  flex
                  justify-center
                  items-center
                  gap-2
                  mt-7
                "
              >

                {featuredCertifications.map(
                  (_, index) => (

                    <button
                      key={index}
                      type="button"

                      onClick={() =>
                        setFeaturedIndex(
                          index
                        )
                      }

                      aria-label={`
                        Go to certification
                        ${index + 1}
                      `}

                      className={`
                        h-1.5
                        rounded-full
                        transition-all
                        duration-300

                        ${
                          index ===
                          featuredIndex

                            ? "w-7 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"

                            : "w-1.5 bg-neutral-700 hover:bg-purple-500/60"
                        }
                      `}
                    />

                  )
                )}

              </div>

            )}


            {/* ==================================================
                VIEW ALL
            ================================================== */}

            <div
              className="
                flex
                justify-center
                mt-8
              "
            >

              <Link
                to="/certifications"

                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold

                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-500

                  bg-clip-text
                  text-transparent

                  hover:from-violet-300
                  hover:via-purple-400
                  hover:to-fuchsia-400

                  transition-all
                  duration-300
                "
              >

                View All Certifications

                <span
                  className="
                    text-neutral-500
                  "
                >
                  (
                  {
                    allCertifications.length
                  }
                  )
                </span>


                <FaArrowRight
                  className="
                    text-xs
                    text-purple-400

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />

              </Link>

            </div>

          </div>

        </section>


        {/* ======================================================
            DOCUMENTATION MODAL
        ======================================================= */}

        <CertificationModal
          certification={
            selectedCertification
          }

          imageIndex={
            selectedImageIndex
          }

          onClose={
            closeDocumentation
          }

          onNext={
            nextImage
          }

          onPrevious={
            previousImage
          }

          onSelectImage={
            setSelectedImageIndex
          }
        />

      </>
    );
  }


  /*
   * ============================================================
   * ALL CERTIFICATIONS PAGE
   * ============================================================
   */

  return (
    <>

      <SEOHead
        {...seoConfig}
      />


      <section
        className="py-24"
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          {/* ==================================================
              HEADER
          ================================================== */}

          <motion.div
            className="
              text-center
              mb-10
              md:mb-12
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
              duration: 0.5,
            }}
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full

                border
                border-purple-500/20

                bg-purple-500/10

                text-purple-400
                text-xs
                mb-5
              "
            >

              <FaTrophy
                className="
                  text-purple-400
                "
              />

              Professional Achievements

            </div>


            <h1
              className="
                text-4xl
                md:text-5xl
                font-bold
                text-white
                mb-4
              "
            >

              All{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-500
                  bg-clip-text
                  text-transparent
                "
              >
                Certifications
              </span>

            </h1>


            <p
              className="
                text-neutral-400
                text-base
                md:text-lg
                max-w-2xl
                mx-auto
                leading-relaxed
              "
            >

              Explore my certifications,
              courses, work achievements,
              organizational activities,
              committees, and competitions.

            </p>

          </motion.div>


          {/* ==================================================
              FILTER
          ================================================== */}

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-2
              mb-6
            "
          >

            {categories.map(
              (category) => {

                const categoryCount =
                  category.value === "all"
                    ? allCertifications.length
                    : allCertifications.filter(
                        (item) =>
                          item.category ===
                          category.value
                      ).length;


                const CategoryIcon =
                  category.value !== "all"
                    ? CATEGORY_CONFIG[
                        category.value
                      ].icon
                    : null;


                return (

                  <button
                    key={
                      category.value
                    }

                    type="button"

                    onClick={() =>
                      setFilter(
                        category.value
                      )
                    }

                    className={`
                      inline-flex
                      items-center
                      gap-2

                      px-4
                      py-2.5

                      rounded-full

                      text-sm
                      font-medium

                      transition-all
                      duration-300

                      ${
                        filter ===
                        category.value

                          ? "bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/20 border border-purple-400/30"

                          : "bg-neutral-800/50 text-neutral-400 hover:text-purple-300 hover:bg-purple-500/10 border border-neutral-700/50 hover:border-purple-500/30"
                      }
                    `}
                  >

                    {CategoryIcon && (
                      <CategoryIcon
                        className={
                          filter ===
                          category.value
                            ? "text-white"
                            : "text-purple-400"
                        }
                      />
                    )}

                    {category.label}

                    <span
                      className={`
                        text-xs

                        ${
                          filter ===
                          category.value
                            ? "text-white/70"
                            : "text-neutral-600"
                        }
                      `}
                    >
                      {categoryCount}
                    </span>

                  </button>

                );

              }
            )}

          </div>


          {/* ==================================================
              COUNT
          ================================================== */}

          <div
            className="
              text-center
              mb-8
            "
          >

            <p
              className="
                text-neutral-500
                text-sm
              "
            >

              Showing{" "}

              <span
                className="
                  text-purple-400
                  font-semibold
                "
              >
                {
                  filteredCertifications.length
                }
              </span>{" "}

              {
                filteredCertifications.length ===
                1
                  ? "item"
                  : "items"
              }

            </p>

          </div>


          {/* ==================================================
              GRID
          ================================================== */}

          <motion.div
            layout

            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >

            <AnimatePresence
              mode="popLayout"
            >

              {filteredCertifications.map(
                (
                  certification,
                  index
                ) => (

                  <CertificationCard
                    key={
                      certification.id
                    }

                    certification={
                      certification
                    }

                    onOpen={
                      openDocumentation
                    }

                    fullPage={
                      true
                    }

                    index={
                      index
                    }

                  />

                )
              )}

            </AnimatePresence>

          </motion.div>


          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {
            filteredCertifications.length ===
              0 && (

              <div
                className="
                  text-center
                  py-16
                  text-neutral-500
                "
              >

                No certifications found
                in this category.

              </div>

            )
          }

        </div>

      </section>


      {/* ======================================================
          MODAL
      ======================================================= */}

      <CertificationModal
        certification={
          selectedCertification
        }

        imageIndex={
          selectedImageIndex
        }

        onClose={
          closeDocumentation
        }

        onNext={
          nextImage
        }

        onPrevious={
          previousImage
        }

        onSelectImage={
          setSelectedImageIndex
        }
      />

    </>
  );
}


/*
 * ================================================================
 * CERTIFICATION CARD
 * ================================================================
 */

function CertificationCard({
  certification,
  onOpen,
  index = 0,
}) {

  const documentation =
    certification.documentation ||
    [];


  const category =
    CATEGORY_CONFIG[
      certification.category
    ] || CATEGORY_CONFIG.course;


  const CategoryIcon =
    category.icon;


  return (

    <motion.article
      layout

      initial={{
        opacity: 0,
        y: 25,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        scale: 0.95,
      }}

      transition={{
        duration: 0.35,
        delay:
          index * 0.05,
      }}

      className="
        group
        h-full
      "
    >

      <div
        className="
          relative
          h-full

          bg-neutral-900/60
          backdrop-blur-sm

          rounded-2xl

          border
          border-neutral-800

          hover:border-purple-500/30

          overflow-hidden

          transition-all
          duration-500

          flex
          flex-col
        "
      >

        {/* =====================================================
            CATEGORY BADGE
        ====================================================== */}

        <div
          className="
            absolute
            top-4
            right-4
            z-20
          "
        >

          <span
            className="
              inline-flex
              items-center
              gap-1.5

              px-3
              py-1.5

              rounded-full

              bg-gradient-to-r
              from-violet-500/15
              via-purple-500/15
              to-fuchsia-500/15

              border
              border-purple-500/20

              text-purple-300
              text-xs
              font-medium
            "
          >

            <CategoryIcon
              className="
                text-purple-400
              "
            />

            {category.label}

          </span>

        </div>


        {/* =====================================================
            IMAGE
        ====================================================== */}

        <button
          type="button"

          onClick={() =>
            onOpen(
              certification,
              0
            )
          }

          disabled={
            documentation.length === 0
          }

          className="
            relative
            w-full

            h-52
            sm:h-56

            overflow-hidden

            bg-neutral-800/50

            cursor-zoom-in

            text-left

            disabled:cursor-default
          "
        >

          {
            documentation.length >
            0 ? (

              <img
                src={
                  documentation[0].image
                }

                alt={
                  certification.name
                }

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

            ) : (

              <div
                className="
                  w-full
                  h-full

                  flex
                  items-center
                  justify-center

                  bg-gradient-to-br
                  from-neutral-800
                  to-neutral-900
                "
              >

                <FaCertificate
                  className="
                    text-purple-500
                    text-5xl
                  "
                />

              </div>

            )
          }


          {documentation.length > 0 && (

            <>

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-neutral-950/90
                  via-transparent
                  to-transparent

                  pointer-events-none
                "
              />


              <div
                className="
                  absolute
                  inset-0

                  flex
                  items-center
                  justify-center

                  bg-neutral-950/0

                  hover:bg-neutral-950/45

                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    opacity-0
                    hover:opacity-100

                    flex
                    flex-col
                    items-center
                    gap-2

                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      w-12
                      h-12

                      rounded-full

                      bg-purple-600
                      hover:bg-purple-500

                      flex
                      items-center
                      justify-center

                      text-white

                      shadow-lg
                      shadow-purple-500/30
                    "
                  >

                    <FaEye />

                  </div>


                  <span
                    className="
                      px-3
                      py-1.5

                      rounded-lg

                      bg-neutral-950/80

                      text-white
                      text-xs
                      font-medium
                    "
                  >

                    View Certificate

                  </span>

                </div>

              </div>

            </>

          )}

        </button>


        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            p-5
            md:p-6

            flex
            flex-col
            flex-1
          "
        >

          {/* TITLE */}

          <h3
            className="
              text-lg
              md:text-xl

              font-bold

              text-white

              mb-2

              group-hover:bg-gradient-to-r
              group-hover:from-violet-400
              group-hover:via-purple-500
              group-hover:to-fuchsia-500

              group-hover:bg-clip-text
              group-hover:text-transparent

              transition-all
              duration-300
            "
          >

            {
              certification.name
            }

          </h3>


          {/* ISSUER */}

          <p
            className="
              bg-gradient-to-r
              from-violet-400
              via-purple-500
              to-fuchsia-500

              bg-clip-text
              text-transparent

              font-medium
              text-sm

              mb-1
            "
          >

            {
              certification.issuer
            }

          </p>


          {/* YEAR */}

          <p
            className="
              text-neutral-500
              text-xs
            "
          >

            {
              certification.year
            }

          </p>


          {/* =================================================
              DOCUMENTATION COUNT
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between

              pt-4
              mt-4

              border-t
              border-neutral-800
            "
          >

            <span
              className="
                flex
                items-center
                gap-2

                text-xs
                text-neutral-500
              "
            >

              <FaImages
                className="
                  text-purple-400
                "
              />

              {
                documentation.length
              }{" "}

              {
                documentation.length ===
                1
                  ? "document"
                  : "documents"
              }

            </span>


            {documentation.length > 0 && (

              <button
                type="button"

                onClick={() =>
                  onOpen(
                    certification,
                    0
                  )
                }

                className="
                  inline-flex
                  items-center
                  gap-2

                  text-xs
                  font-semibold

                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-500

                  bg-clip-text
                  text-transparent

                  hover:from-violet-300
                  hover:via-purple-400
                  hover:to-fuchsia-400

                  transition-all
                  duration-300
                "
              >

                View

                <FaArrowRight
                  className="
                    text-purple-400
                  "
                />

              </button>

            )}

          </div>

        </div>

      </div>

    </motion.article>
  );
}


/*
 * ================================================================
 * DOCUMENTATION MODAL
 * ================================================================
 */

function CertificationModal({
  certification,
  imageIndex,
  onClose,
  onNext,
  onPrevious,
  onSelectImage,
}) {

  if (!certification) {
    return null;
  }


  const documentation =
    certification.documentation ||
    [];


  const selectedImage =
    documentation[
      imageIndex
    ];


  const category =
    CATEGORY_CONFIG[
      certification.category
    ] || CATEGORY_CONFIG.course;


  const CategoryIcon =
    category.icon;


  return (

    <AnimatePresence>

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
          onClose
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
              CLOSE
          ================================================== */}

          <button
            type="button"

            onClick={
              onClose
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
              hover:bg-purple-600

              transition-all

              z-20
            "
          >

            <FaTimes />

          </button>


          {/* ==================================================
              IMAGE
          ================================================== */}

          <div
            className="
              relative

              bg-neutral-950

              rounded-2xl

              overflow-hidden

              border
              border-neutral-700/50
            "
          >

            {
              selectedImage && (

                <img
                  src={
                    selectedImage.image
                  }

                  alt={
                    certification.name
                  }

                  className="
                    w-full

                    max-h-[75vh]

                    object-contain
                  "
                />

              )
            }


            {/* PREVIOUS */}

            {
              documentation.length >
              1 && (

                <button
                  type="button"

                  onClick={
                    onPrevious
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
                    border-white/10

                    flex
                    items-center
                    justify-center

                    text-white

                    hover:bg-purple-600
                    hover:border-purple-400

                    transition-all
                  "
                >

                  <FaChevronLeft />

                </button>

              )
            }


            {/* NEXT */}

            {
              documentation.length >
              1 && (

                <button
                  type="button"

                  onClick={
                    onNext
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
                    border-white/10

                    flex
                    items-center
                    justify-center

                    text-white

                    hover:bg-purple-600
                    hover:border-purple-400

                    transition-all
                  "
                >

                  <FaChevronRight />

                </button>

              )
            }

          </div>


          {/* ==================================================
              INFORMATION
          ================================================== */}

          <div
            className="
              mt-4

              flex
              flex-col

              md:flex-row

              md:items-center
              md:justify-between

              gap-3

              bg-neutral-900/95

              border
              border-neutral-700/50

              rounded-2xl

              px-5
              py-4
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-purple-400

                  mb-1
                "
              >

                <CategoryIcon />

                <span
                  className="
                    text-xs
                    font-medium
                  "
                >

                  {
                    category.label
                  }

                </span>

              </div>


              <h3
                className="
                  text-sm
                  md:text-base

                  font-semibold

                  text-white
                "
              >

                {
                  certification.name
                }

              </h3>


              <p
                className="
                  text-xs
                  text-neutral-500

                  mt-1
                "
              >

                {
                  certification.issuer
                }

                {" • "}

                {
                  certification.year
                }

              </p>

            </div>


            {
              documentation.length >
              1 && (

                <div
                  className="
                    text-purple-400

                    text-sm

                    whitespace-nowrap

                    font-medium
                  "
                >

                  {
                    imageIndex + 1
                  }

                  {" / "}

                  {
                    documentation.length
                  }

                </div>

              )
            }

          </div>


          {/* ==================================================
              THUMBNAILS
          ================================================== */}

          {
            documentation.length >
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

                {
                  documentation.map(
                    (
                      item,
                      index
                    ) => (

                      <button
                        key={index}

                        type="button"

                        onClick={() =>
                          onSelectImage(
                            index
                          )
                        }

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
                            imageIndex

                              ? "border-purple-400 scale-105 shadow-lg shadow-purple-500/20"

                              : "border-neutral-700 opacity-60 hover:opacity-100 hover:border-purple-500/50"
                          }
                        `}
                      >

                        <img
                          src={
                            item.image
                          }

                          alt={`
                            Thumbnail
                            ${index + 1}
                          `}

                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      </button>

                    )
                  )
                }

              </div>

            )
          }


          {/* ==================================================
              HINT
          ================================================== */}

          <div
            className="
              text-center
              mt-3
            "
          >

            <span
              className="
                text-xs
                text-neutral-600
              "
            >

              Click outside or press Esc to close

            </span>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}


export default Certifications;