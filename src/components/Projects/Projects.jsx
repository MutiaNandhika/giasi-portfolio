import { useState, useMemo, useCallback, useEffect } from "react";

import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaStar,
  FaPalette,
  FaCode,
  FaMobileAlt,
  FaTimes,
  FaSearchPlus,
  FaFileAlt,
  FaUser,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import { useProjects } from "../../hooks/useProjects";
import SEOHead from "../SEO/SEOHead";
import { SEO_CONFIGS } from "../SEO/seoConfigs";

import { motion, AnimatePresence } from "framer-motion";


function Projects() {

  /* ============================================================
     ROUTE
  ============================================================ */

  const location = useLocation();

  /*
   * Jika berada di /projects:
   * tampilkan seluruh project + filter.
   *
   * Jika berada di /:
   * tampilkan Featured Projects carousel.
   */
  const isProjectsPage =
    location.pathname === "/projects";


  /* ============================================================
     STATE
  ============================================================ */

  const [filter, setFilter] = useState("all");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(null);

  /*
   * Index carousel Featured Projects
   */
  const [featuredIndex, setFeaturedIndex] =
    useState(0);


  /* ============================================================
     GET PROJECT DATA
  ============================================================ */

  const {
    projects = [],
    loading,
    error,
  } = useProjects("all");


  const allProjects = Array.isArray(projects)
    ? projects
    : [];


  /* ============================================================
     FILTER CATEGORIES
  ============================================================ */

  const categories = useMemo(
    () => [
      {
        value: "all",
        label: "All",
      },
      {
        value: "uiux",
        label: "UI/UX",
      },
      {
        value: "frontend",
        label: "Frontend",
      },
    ],
    []
  );


  /* ============================================================
     FILTER PROJECTS
  ============================================================ */

  const filteredProjects = useMemo(() => {

    if (filter === "all") {
      return allProjects;
    }

    return allProjects.filter((project) => {

      if (Array.isArray(project.category)) {
        return project.category.includes(filter);
      }

      return project.category === filter;

    });

  }, [allProjects, filter]);


  /* ============================================================
     FEATURED PROJECTS
  ============================================================ */

  const featuredProjects = useMemo(() => {

    const featured = allProjects.filter(
      (project) => project.featured
    );

    /*
     * Jika project memiliki featured:true,
     * gunakan project tersebut.
     *
     * Jika tidak ada featured project,
     * gunakan maksimal 6 project pertama.
     */
    if (featured.length > 0) {
      return featured;
    }

    return allProjects.slice(0, 6);

  }, [allProjects]);


  /* ============================================================
     FEATURED CAROUSEL
  ============================================================ */

  const featuredCount =
    featuredProjects.length;


  const nextFeatured = useCallback(() => {

    if (featuredCount <= 1) return;

    setFeaturedIndex((prev) =>
      (prev + 1) % featuredCount
    );

  }, [featuredCount]);


  const previousFeatured = useCallback(() => {

    if (featuredCount <= 1) return;

    setFeaturedIndex((prev) =>
      (prev - 1 + featuredCount) %
      featuredCount
    );

  }, [featuredCount]);


  /*
   * Desktop:
   * tampilkan 3 project sekaligus.
   *
   * Mobile:
   * tampilkan 1 project.
   */
  const getFeaturedProject = (offset = 0) => {

    if (featuredCount === 0) {
      return null;
    }

    return featuredProjects[
      (featuredIndex + offset) %
        featuredCount
    ];

  };


  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleFilterChange = useCallback(
    (newFilter) => {
      setFilter(newFilter);
    },
    []
  );


  const openProjectModal = useCallback(
    (project) => {
      setSelectedProject(project);
    },
    []
  );


  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);


  const openImagePreview = useCallback(
    (project) => {
      setImagePreview(project);
    },
    []
  );


  const closeImagePreview = useCallback(() => {
    setImagePreview(null);
  }, []);


  /* ============================================================
     ESCAPE KEY
  ============================================================ */

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key !== "Escape") {
        return;
      }

      if (imagePreview) {
        setImagePreview(null);
        return;
      }

      if (selectedProject) {
        setSelectedProject(null);
      }

    };


    window.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [
    imagePreview,
    selectedProject,
  ]);


  /* ============================================================
     LOCK BODY SCROLL
  ============================================================ */

  useEffect(() => {

    const modalOpen =
      selectedProject ||
      imagePreview;

    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };

  }, [
    selectedProject,
    imagePreview,
  ]);


  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {

    return (
      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <div className="h-10 w-72 mx-auto bg-neutral-800 rounded-lg animate-pulse mb-4" />

            <div className="h-5 w-96 max-w-full mx-auto bg-neutral-800/70 rounded-lg animate-pulse" />

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="h-[500px] bg-neutral-900/60 border border-neutral-800 rounded-2xl animate-pulse"
              />

            ))}

          </div>

        </div>

      </section>
    );

  }


  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {

    return (
      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <div className="text-red-400 text-lg font-semibold mb-2">
            Error loading projects
          </div>

          <p className="text-neutral-500 text-sm">
            {error}
          </p>

        </div>

      </section>
    );

  }


  /* ============================================================
     HOMEPAGE — FEATURED PROJECTS
  ============================================================ */

  if (!isProjectsPage) {

    return (
      <>
        <SEOHead {...SEO_CONFIGS.projects} />

        <section
          id="projects"
          className="py-24"
        >

          <div className="max-w-7xl mx-auto px-6">


            {/* ==================================================
                HEADER
            ================================================== */}

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
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
            >

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">

                Featured{" "}

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
                  Projects
                </span>

              </h2>


              <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">

                A selection of projects highlighting my experience in UI/UX design, web development, and software engineering.

              </p>

            </motion.div>


            {/* ==================================================
                FEATURED PROJECT CAROUSEL
            ================================================== */}

            {featuredProjects.length > 0 ? (

              <div className="relative">


                {/* ==================================================
                    DESKTOP — 3 CARDS
                ================================================== */}

                <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-6">

                  {[0, 1, 2].map((offset) => {

                    const project =
                      getFeaturedProject(offset);

                    if (!project) {
                      return null;
                    }

                    return (
                      <ProjectCard
                        key={`${project.id}-${featuredIndex}-${offset}`}
                        project={project}
                        index={offset}
                        onOpenDetails={
                          openProjectModal
                        }
                        onOpenImage={
                          openImagePreview
                        }
                        featuredMode={true}
                      />
                    );

                  })}

                </div>


                {/* ==================================================
                    MOBILE — 1 CARD
                ================================================== */}

                <div className="md:hidden">

                  {getFeaturedProject(0) && (

                    <ProjectCard
                      project={getFeaturedProject(0)}
                      index={0}
                      onOpenDetails={
                        openProjectModal
                      }
                      onOpenImage={
                        openImagePreview
                      }
                      featuredMode={true}
                    />

                  )}

                </div>


                {/* ==================================================
                    LEFT ARROW
                ================================================== */}

                {featuredCount > 1 && (

                  <button
                    type="button"
                    onClick={previousFeatured}
                    aria-label="Previous featured project"
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
                      border-purple-500/20
                      bg-neutral-900/95
                      text-purple-400
                      hover:text-purple-300
                      hover:border-purple-400/50
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


                {/* ==================================================
                    RIGHT ARROW
                ================================================== */}

                {featuredCount > 1 && (

                  <button
                    type="button"
                    onClick={nextFeatured}
                    aria-label="Next featured project"
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
                      border-purple-500/20
                      bg-neutral-900/95
                      text-purple-400
                      hover:text-purple-300
                      hover:border-purple-400/50
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

              <div className="text-center py-16 text-neutral-500">
                No featured projects available.
              </div>

            )}


            {/* ==================================================
                CAROUSEL INDICATORS
            ================================================== */}

            {featuredCount > 1 && (

              <div className="flex justify-center items-center gap-2 mt-7">

                {featuredProjects.map(
                  (_, index) => (

                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setFeaturedIndex(index)
                      }
                      aria-label={`Go to featured project ${index + 1}`}
                      className={`
                        h-1.5
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          index === featuredIndex
                            ? "w-7 bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-400"
                            : "w-1.5 bg-neutral-700 hover:bg-purple-400"
                        }
                      `}
                    />

                  )
                )}

              </div>

            )}


            {/* ==================================================
                VIEW ALL PROJECTS
            ================================================== */}

            <div className="flex justify-center mt-8">

              <Link
                to="/projects"
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
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                  hover:from-violet-300
                  hover:via-purple-400
                  hover:to-fuchsia-300
                  transition-all
                  duration-300
                "
              >

                View All Projects

                <span className="text-neutral-500">
                  ({allProjects.length})
                </span>

                <FaArrowRight
                  className="
                    text-purple-400
                    text-xs
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
            MODALS
        ======================================================= */}

        <AnimatePresence>

          {selectedProject && (

            <ProjectDetailModal
              project={selectedProject}
              onClose={closeProjectModal}
              onOpenImage={openImagePreview}
            />

          )}

        </AnimatePresence>


        <AnimatePresence>

          {imagePreview && (

            <ImagePreviewModal
              project={imagePreview}
              onClose={closeImagePreview}
            />

          )}

        </AnimatePresence>

      </>
    );

  }


  /* ============================================================
     ALL PROJECTS PAGE
  ============================================================ */

  return (
    <>
      <SEOHead {...SEO_CONFIGS.projects} />

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">


          {/* ==================================================
              HEADER
          ================================================== */}

          <motion.div
            className="text-center mb-10 md:mb-12"
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

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-neutral-400 text-xs mb-5">

              {/* ICON SOLID PURPLE */}

              <FaCode className="text-purple-400" />

              Project Collection

            </div>


            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">

              All{" "}

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
                Projects
              </span>

            </h2>


            <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">

              Explore my collection of UI/UX design,
              frontend development, and software
              engineering projects.

            </p>

          </motion.div>


          {/* ==================================================
              FILTER
          ================================================== */}

          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-6"
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
              delay: 0.1,
            }}
          >

            {categories.map((category) => (

              <button
                key={category.value}
                type="button"
                onClick={() =>
                  handleFilterChange(
                    category.value
                  )
                }
                className={`
                  px-5
                  py-2.5
                  rounded-full
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  ${
                    filter === category.value
                      ? "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/20"
                      : "bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-purple-500/10 border border-neutral-700/50 hover:border-purple-500/30"
                  }
                `}
              >

                {category.label}

              </button>

            ))}

          </motion.div>


          {/* ==================================================
              PROJECT COUNT
          ================================================== */}

          <motion.div
            className="text-center mb-8"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >

            <p className="text-neutral-500 text-sm">

              Showing{" "}

              <span
                className="
                  font-semibold
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-500
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                "
              >
                {filteredProjects.length}
              </span>{" "}

              {filteredProjects.length === 1
                ? "project"
                : "projects"}

            </p>

          </motion.div>


          {/* ==================================================
              PROJECT GRID
          ================================================== */}

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >

            <AnimatePresence mode="popLayout">

              {filteredProjects.map(
                (project, index) => (

                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onOpenDetails={
                      openProjectModal
                    }
                    onOpenImage={
                      openImagePreview
                    }
                    featuredMode={false}
                  />

                )
              )}

            </AnimatePresence>

          </motion.div>


          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {filteredProjects.length === 0 && (

            <motion.div
              className="text-center py-16"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >

              <div className="text-purple-400 text-5xl mb-4">

                {/* ICON SOLID PURPLE */}

                <FaCode className="mx-auto" />

              </div>

              <p className="text-neutral-400">
                No projects found in this category.
              </p>

            </motion.div>

          )}

        </div>

      </section>


      {/* ======================================================
          PROJECT DETAIL MODAL
      ======================================================= */}

      <AnimatePresence>

        {selectedProject && (

          <ProjectDetailModal
            project={selectedProject}
            onClose={closeProjectModal}
            onOpenImage={openImagePreview}
          />

        )}

      </AnimatePresence>


      {/* ======================================================
          FULLSCREEN IMAGE MODAL
      ======================================================= */}

      <AnimatePresence>

        {imagePreview && (

          <ImagePreviewModal
            project={imagePreview}
            onClose={closeImagePreview}
          />

        )}

      </AnimatePresence>

    </>
  );
}


/* ================================================================
   PROJECT CARD
================================================================ */

function ProjectCard({
  project,
  index,
  onOpenDetails,
  onOpenImage,
  featuredMode = false,
}) {

  const [imageError, setImageError] =
    useState(false);


  const projectCategories =
    Array.isArray(project.category)
      ? project.category
      : [project.category];


  /* ============================================================
     ICON
  ============================================================ */

  const getProjectIcon = () => {

    if (
      projectCategories.includes("uiux")
    ) {
      return <FaPalette />;
    }

    if (
      projectCategories.includes("frontend")
    ) {
      return <FaCode />;
    }

    return <FaMobileAlt />;

  };


  /* ============================================================
     CATEGORY FORMAT
  ============================================================ */

  const formatCategory = (category) => {

    if (category === "uiux") {
      return "UI/UX";
    }

    if (category === "frontend") {
      return "Frontend";
    }

    if (category === "backend") {
      return "Backend";
    }

    if (category === "fullstack") {
      return "Full Stack";
    }

    return category;

  };


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
        delay: index * 0.05,
      }}
      className="group relative h-full"
    >

      <div
        className={`
          relative
          h-full
          bg-neutral-900/60
          backdrop-blur-sm
          rounded-2xl
          border
          transition-all
          duration-500
          overflow-hidden
          flex
          flex-col
          ${
            project.featured
              ? "border-purple-500/20 hover:border-purple-400/40 shadow-lg shadow-purple-500/5"
              : "border-neutral-800 hover:border-purple-500/30"
          }
        `}
      >


        {/* =====================================================
            FEATURED BADGE
        ====================================================== */}

        {project.featured && (

          <div className="absolute top-4 right-4 z-20">

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1.5
                rounded-full
                bg-gradient-to-r
                from-violet-500
                via-purple-500
                to-fuchsia-500
                text-white
                text-xs
                font-medium
                shadow-lg
                shadow-purple-500/10
              "
            >

              <FaStar className="w-3 h-3" />

              Featured

            </span>

          </div>

        )}


        {/* =====================================================
            PROJECT IMAGE
        ====================================================== */}

        <div
          className={`
            relative
            ${
              featuredMode
                ? "h-52 sm:h-56"
                : "h-56 sm:h-64"
            }
            overflow-hidden
            bg-neutral-800/50
          `}
        >

          {!imageError ? (

            <button
              type="button"
              onClick={() =>
                onOpenImage(project)
              }
              className="relative w-full h-full block cursor-zoom-in text-left"
              aria-label={`View ${project.title} image`}
            >

              <img
                src={project.image}
                alt={`${project.title} project`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() =>
                  setImageError(true)
                }
                loading="lazy"
              />


              {/* Gradient */}

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent pointer-events-none" />


              {/* Zoom */}

              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 hover:bg-neutral-950/45 transition-all duration-300">

                <div className="opacity-0 hover:opacity-100 flex flex-col items-center gap-2 transition-all duration-300">

                  <div
                    className="
                      w-12
                      h-12
                      rounded-full
                      bg-purple-500
                      flex
                      items-center
                      justify-center
                      text-white
                      shadow-lg
                      shadow-purple-500/30
                    "
                  >

                    <FaSearchPlus className="w-5 h-5" />

                  </div>

                  <span className="px-3 py-1.5 rounded-lg bg-neutral-950/80 text-white text-xs font-medium backdrop-blur-sm">

                    View Image

                  </span>

                </div>

              </div>

            </button>

          ) : (

            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">

              {/* ICON SOLID PURPLE */}

              <div className="text-purple-400 text-4xl mb-3">

                {getProjectIcon()}

              </div>

              <span className="text-lg font-bold text-neutral-500 text-center px-6">

                {project.title}

              </span>

            </div>

          )}

        </div>


        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="p-5 md:p-6 flex flex-col flex-1">


          {/* TITLE */}

          <div className="mb-3">

            <h3
              className={`
                font-bold
                text-white
                mb-2
                group-hover:bg-gradient-to-r
                group-hover:from-violet-400
                group-hover:via-purple-500
                group-hover:to-fuchsia-400
                group-hover:bg-clip-text
                group-hover:text-transparent
                transition-all
                duration-300
                ${
                  featuredMode
                    ? "text-lg md:text-xl"
                    : "text-xl"
                }
              `}
            >
              {project.title}
            </h3>


            {/* Metadata */}

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">

              {project.period && (

                <span className="flex items-center gap-1.5">

                  {/* ICON SOLID PURPLE */}

                  <FaCalendarAlt className="w-3 h-3 text-purple-400" />

                  {project.period}

                </span>

              )}


              {project.role && (

                <span className="flex items-center gap-1.5">

                  {/* ICON SOLID PURPLE */}

                  <FaUser className="w-3 h-3 text-purple-400" />

                  {project.role}

                </span>

              )}

            </div>

          </div>


          {/* CATEGORIES */}

          <div className="flex flex-wrap gap-2 mb-3">

            {projectCategories.map(
              (category, categoryIndex) => (

                <span
                  key={categoryIndex}
                  className="
                    px-2.5
                    py-1
                    rounded-lg
                    bg-purple-500/10
                    border
                    border-purple-500/20
                    text-purple-400
                    text-xs
                    font-medium
                  "
                >

                  {formatCategory(category)}

                </span>

              )
            )}

          </div>


          {/* DESCRIPTION */}

          <p
            className={`
              text-neutral-400
              text-sm
              leading-relaxed
              mb-4
              flex-1
              ${
                featuredMode
                  ? "line-clamp-3"
                  : "line-clamp-2"
              }
            `}
          >

            {project.description}

          </p>


          {/* TAGS */}

          <div className="flex flex-wrap gap-1.5 mb-5">

            {Array.isArray(project.tags) &&
              project.tags
                .slice(0, featuredMode ? 4 : 6)
                .map((tag, index) => (

                  <span
                    key={index}
                    className="px-2 py-1 text-[11px] font-medium bg-neutral-800/80 text-neutral-400 rounded-md border border-neutral-700/50"
                  >

                    {tag}

                  </span>

                ))}


            {Array.isArray(project.tags) &&
              project.tags.length >
                (featuredMode ? 4 : 6) && (

                <span className="px-2 py-1 text-[11px] font-medium text-neutral-500">

                  +
                  {project.tags.length -
                    (featuredMode ? 4 : 6)}

                </span>

              )}

          </div>


          {/* =====================================================
              VIEW DETAILS
          ====================================================== */}

          <button
            type="button"
            onClick={() =>
              onOpenDetails(project)
            }
            className="
              w-full
              inline-flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-violet-500
              via-purple-500
              to-fuchsia-500
              hover:from-violet-400
              hover:via-purple-400
              hover:to-fuchsia-400
              text-white
              text-sm
              font-semibold
              transition-all
              duration-300
              shadow-lg
              shadow-purple-500/10
              hover:shadow-purple-500/20
            "
          >

            <span>
              View Details
            </span>

            {/* ICON TETAP SOLID PUTIH */}

            <FaArrowRight className="w-3.5 h-3.5 text-white" />

          </button>

        </div>

      </div>

    </motion.article>
  );
}


/* ================================================================
   PROJECT DETAIL MODAL
================================================================ */

function ProjectDetailModal({
  project,
  onClose,
  onOpenImage,
}) {

  const projectCategories =
    Array.isArray(project.category)
      ? project.category
      : [project.category];


  const formatCategory = (category) => {

    if (category === "uiux") {
      return "UI/UX";
    }

    if (category === "frontend") {
      return "Frontend";
    }

    if (category === "backend") {
      return "Backend";
    }

    if (category === "fullstack") {
      return "Full Stack";
    }

    return category;

  };


  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-8 bg-neutral-950/80 backdrop-blur-md"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClose}
    >

      <motion.div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl"
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
          duration: 0.3,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
      >


        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-30
            w-10
            h-10
            rounded-full
            bg-neutral-900/90
            hover:bg-purple-500/20
            border
            border-neutral-700
            hover:border-purple-500/30
            text-purple-400
            hover:text-purple-300
            flex
            items-center
            justify-center
            transition-all
            duration-300
          "
          aria-label="Close project details"
        >

          <FaTimes className="w-4 h-4" />

        </button>


        {/* IMAGE */}

        <button
          type="button"
          onClick={() =>
            onOpenImage(project)
          }
          className="relative w-full h-64 md:h-80 bg-neutral-900 overflow-hidden cursor-zoom-in group/modal-image"
        >

          <img
            src={project.image}
            alt={`${project.title} project`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/modal-image:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

          <div className="absolute bottom-5 right-5 flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-950/80 border border-neutral-700/70 text-neutral-300 text-xs backdrop-blur-sm opacity-0 group-hover/modal-image:opacity-100 transition-opacity duration-300">

            {/* ICON SOLID PURPLE */}

            <FaSearchPlus className="w-3.5 h-3.5 text-purple-400" />

            View Full Image

          </div>

        </button>


        {/* CONTENT */}

        <div className="p-6 md:p-8">


          {/* HEADER */}

          <div className="mb-6 pr-10">

            <div className="flex flex-wrap items-center gap-2 mb-3">

              {project.featured && (

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1
                    rounded-full
                    bg-purple-500/10
                    border
                    border-purple-500/20
                    text-purple-400
                    text-xs
                    font-medium
                  "
                >

                  {/* ICON SOLID PURPLE */}

                  <FaStar className="w-3 h-3 text-purple-400" />

                  Featured

                </span>

              )}


              {projectCategories.map(
                (category, index) => (

                  <span
                    key={index}
                    className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-purple-500/10
                      border
                      border-purple-500/20
                      text-purple-400
                      text-xs
                      font-medium
                    "
                  >

                    {formatCategory(category)}

                  </span>

                )
              )}

            </div>


            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">

              {project.title}

            </h2>


            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-400">

              {project.period && (

                <span className="flex items-center gap-2">

                  {/* ICON SOLID PURPLE */}

                  <FaCalendarAlt className="w-3.5 h-3.5 text-purple-400" />

                  {project.period}

                </span>

              )}


              {project.role && (

                <span className="flex items-center gap-2">

                  {/* ICON SOLID PURPLE */}

                  <FaUser className="w-3.5 h-3.5 text-purple-400" />

                  {project.role}

                </span>

              )}


              {project.teamSize &&
                project.teamSize > 1 && (

                  <span>
                    Team of {project.teamSize}
                  </span>

                )}

            </div>

          </div>


          {/* ABOUT */}

          <div className="mb-7">

            <h3
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                mb-3
                bg-gradient-to-r
                from-violet-400
                via-purple-500
                to-fuchsia-400
                bg-clip-text
                text-transparent
              "
            >

              About the Project

            </h3>

            <p className="text-neutral-300 leading-relaxed text-sm md:text-base">

              {project.description}

            </p>

          </div>


          {/* TECHNOLOGIES */}

          {Array.isArray(project.tags) &&
            project.tags.length > 0 && (

              <div className="mb-7">

                <h3
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    mb-3
                    bg-gradient-to-r
                    from-violet-400
                    via-purple-500
                    to-fuchsia-400
                    bg-clip-text
                    text-transparent
                  "
                >

                  Technologies & Skills

                </h3>

                <div className="flex flex-wrap gap-2">

                  {project.tags.map(
                    (tag, index) => (

                      <span
                        key={index}
                        className="
                          px-3
                          py-1.5
                          rounded-lg
                          bg-purple-500/10
                          border
                          border-purple-500/20
                          text-purple-300
                          text-xs
                          md:text-sm
                        "
                      >

                        {tag}

                      </span>

                    )
                  )}

                </div>

              </div>

            )}


          {/* ACTION BUTTONS */}

          <div className="flex flex-wrap gap-3 pt-5 border-t border-neutral-800">


            {project.githubUrl && (

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-neutral-800
                  hover:bg-neutral-700
                  text-neutral-300
                  hover:text-white
                  border
                  border-neutral-700/50
                  hover:border-purple-500/30
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                "
              >

                <FaGithub className="w-4 h-4" />

                View Source

              </a>

            )}


            {project.prototypeUrl &&
              project.prototypeUrl !==
                "LINK_FIGMA_KAMU" && (

                <a
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-gradient-to-r
                    from-violet-500
                    via-purple-500
                    to-fuchsia-500
                    hover:from-violet-400
                    hover:via-purple-400
                    hover:to-fuchsia-400
                    text-white
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    shadow-lg
                    shadow-purple-500/15
                  "
                >

                  {/* ICON TETAP PUTIH */}

                  <FaExternalLinkAlt className="w-3.5 h-3.5 text-white" />

                  View Prototype

                </a>

              )}


            {project.documentUrl && (

              <a
                href={project.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-neutral-800
                  hover:bg-neutral-700
                  text-neutral-300
                  hover:text-white
                  border
                  border-neutral-700/50
                  hover:border-purple-500/30
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                "
              >

                <FaFileAlt className="w-4 h-4" />

                View Document

              </a>

            )}

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}


/* ================================================================
   FULLSCREEN IMAGE PREVIEW
================================================================ */

function ImagePreviewModal({
  project,
  onClose,
}) {

  return (
    <motion.div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        p-4
        md:p-8
        bg-neutral-950/95
        backdrop-blur-md
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
      transition={{
        duration: 0.25,
      }}
      onClick={onClose}
    >


      {/* CLOSE */}

      <button
        type="button"
        onClick={onClose}
        className="
          absolute
          top-5
          right-5
          md:top-7
          md:right-7
          z-20
          w-11
          h-11
          md:w-12
          md:h-12
          rounded-full
          bg-neutral-800/90
          hover:bg-purple-500/20
          border
          border-neutral-700
          hover:border-purple-500/30
          text-purple-400
          hover:text-purple-300
          flex
          items-center
          justify-center
          transition-all
          duration-300
        "
        aria-label="Close image preview"
      >

        <FaTimes className="w-5 h-5" />

      </button>


      {/* TITLE */}

      <div className="absolute top-5 left-5 md:top-7 md:left-7 z-20">

        <div className="px-4 py-2.5 rounded-xl bg-neutral-900/80 border border-purple-500/20 backdrop-blur-sm">

          <p className="text-white text-sm md:text-base font-semibold">

            {project.title}

          </p>

          <p className="text-neutral-500 text-xs mt-0.5">

            Full Image Preview

          </p>

        </div>

      </div>


      {/* IMAGE */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        transition={{
          duration: 0.3,
        }}
        className="relative max-w-[95vw] max-h-[88vh] flex items-center justify-center"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <img
          src={project.image}
          alt={`${project.title} full preview`}
          className="max-w-[95vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
        />

      </motion.div>


      {/* HINT */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">

        <span className="text-xs text-neutral-500 bg-neutral-900/70 border border-purple-500/20 px-4 py-2 rounded-full backdrop-blur-sm whitespace-nowrap">

          Click outside or press Esc to close

        </span>

      </div>

    </motion.div>
  );
}


export default Projects;