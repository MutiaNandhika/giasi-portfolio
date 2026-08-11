import {
  useEffect,
  useState,
  Suspense,
  lazy,
} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";


/*
 * ============================================================
 * GLOBAL COMPONENTS
 * ============================================================
 */

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import Navbar from "./components/Layout/Navigation/Navbar";

import Footer from "./components/Layout/Navigation/Footer";

import ScrollToTop from "./components/Layout/Utilities/ScrollToTop";

import Preloader from "./components/Layout/Utilities/Preloader";

import MobilePreloader from "./components/Layout/Mobile/MobilePreloader";

import MobileSafeSection from "./components/Layout/Mobile/MobileSafeSection";


/*
 * ============================================================
 * HOME
 *
 * Home is loaded immediately because it is the first
 * section users see.
 * ============================================================
 */

import Home from "./components/Home/Home";


/*
 * ============================================================
 * LAZY LOADED PAGES
 * ============================================================
 */

const About = lazy(
  () => import("./components/About/About")
);

const Projects = lazy(
  () => import("./components/Projects/Projects")
);

const Resume = lazy(
  () => import("./components/Resume/Resume")
);

const TechStack = lazy(
  () => import("./components/TechStack/TechStack")
);

const Contact = lazy(
  () => import("./components/Contact/Contact")
);


/*
 * ============================================================
 * CERTIFICATIONS
 *
 * Featured certifications are displayed inside Resume.
 * The full Certifications page is available through:
 *
 * /certifications
 * ============================================================
 */

const Certifications = lazy(
  () => import("./components/Certifications/Certifications")
);


/*
 * ============================================================
 * APP
 * ============================================================
 */

function App() {

  const [loading, setLoading] =
    useState(true);

  const [isMobile, setIsMobile] =
    useState(false);


  /*
   * ==========================================================
   * DEVICE DETECTION + PRELOADER
   * ==========================================================
   */

  useEffect(() => {

    const checkMobile = () => {

      const mobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsMobile(mobile);

      return mobile;
    };


    const mobile = checkMobile();


    /*
     * Faster loading on mobile
     */

    const loadTime = mobile
      ? 150
      : 500;


    const timer = setTimeout(() => {

      setLoading(false);

    }, loadTime);


    /*
     * Update mobile state when window resized
     */

    const handleResize = () => {

      checkMobile();

    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      clearTimeout(timer);

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  /*
   * ==========================================================
   * LIGHTWEIGHT FALLBACK
   * ==========================================================
   */

  const FastFallback = ({
    message = "Loading...",
  }) => {

    return (

      <div
        className="
          flex
          items-center
          justify-center
          py-16
        "
      >

        <div
          className="
            text-sm
            text-neutral-500
          "
        >

          {message}

        </div>

      </div>

    );

  };


  /*
   * ==========================================================
   * APP RENDER
   * ==========================================================
   */

  return (

    <Router>

      <ErrorBoundary
        fallbackMessage="
          There was an error loading the application.
        "
      >

        <div
          className="
            relative
            min-h-screen
            bg-neutral-950
            overflow-x-hidden
          "
        >


          {/* ==================================================
              GLOBAL BACKGROUND
          ================================================== */}

          <div
            className="
              fixed
              inset-0
              pointer-events-none
              overflow-hidden
            "
          >


            {/* ==================================================
                WARM AMBIENT LIGHT
            ================================================== */}

            <div
              className="
                absolute
                top-0
                left-1/4
                w-[600px]
                h-[600px]
                bg-amber-500/[0.02]
                rounded-full
                blur-[120px]
              "
            />


            <div
              className="
                absolute
                bottom-0
                right-1/4
                w-[500px]
                h-[500px]
                bg-amber-600/[0.015]
                rounded-full
                blur-[100px]
              "
            />


            {/* ==================================================
                SUBTLE GRID
            ================================================== */}

            <div
              className="
                absolute
                inset-0
                bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)]
                bg-[size:100px_100px]
              "
            />


            {/* ==================================================
                NOISE TEXTURE
            ================================================== */}

            <div
              className="
                absolute
                inset-0
                opacity-[0.015]
              "
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              }}
            />

          </div>


          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              text-neutral-100
            "
          >


            {/* =================================================
                PRELOADER
            ================================================= */}

            {loading ? (

              isMobile
                ? <MobilePreloader />
                : <Preloader />

            ) : (

              <>

                {/* =================================================
                    NAVBAR
                ================================================= */}

                <Navbar />


                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <main
                  className="
                    relative
                  "
                >

                  <ScrollToTop />


                  <ErrorBoundary
                    fallbackMessage="
                      There was an error loading the page content.
                    "
                  >

                    <Routes>


                      {/* =================================================
                          HOME PAGE
                      ================================================= */}

                      <Route
                        path="/"
                        element={

                          <>

                            {/* =========================================
                                HOME
                            ========================================= */}

                            <MobileSafeSection
                              id="home"
                              priority={true}
                            >

                              <Home />

                            </MobileSafeSection>


                            {/* =========================================
                                ABOUT
                            ========================================= */}

                            <MobileSafeSection
                              id="about"
                              fallback={
                                <FastFallback
                                  message="Loading about..."
                                />
                              }
                            >

                              <Suspense
                                fallback={
                                  <FastFallback
                                    message="Loading about..."
                                  />
                                }
                              >

                                <About />

                              </Suspense>

                            </MobileSafeSection>


                            {/* =========================================
                                FEATURED PROJECTS
                                
                                Only selected projects are shown
                                on the homepage.
                                
                                The complete project collection
                                is available at /projects.
                            ========================================= */}

                            <MobileSafeSection
                              id="projects"
                              fallback={
                                <FastFallback
                                  message="Loading projects..."
                                />
                              }
                            >

                              <Suspense
                                fallback={
                                  <FastFallback
                                    message="Loading projects..."
                                  />
                                }
                              >

                                <Projects
                                  featuredOnly={true}
                                />

                              </Suspense>

                            </MobileSafeSection>


                            {/* =========================================
                                TECH STACK
                            ========================================= */}

                            <MobileSafeSection
                              id="tech-stack"
                              fallback={
                                <FastFallback
                                  message="Loading tech stack..."
                                />
                              }
                            >

                              <Suspense
                                fallback={
                                  <FastFallback
                                    message="Loading tech stack..."
                                  />
                                }
                              >

                                <TechStack />

                              </Suspense>

                            </MobileSafeSection>


                            {/* =========================================
                                RESUME
                                
                                Resume includes:
                                - Work Experience
                                - Academic Background
                                - Leadership & Organization
                                - Featured Certifications & Recognition
                            ========================================= */}

                            <MobileSafeSection
                              id="resume"
                              fallback={
                                <FastFallback
                                  message="Loading resume..."
                                />
                              }
                            >

                              <Suspense
                                fallback={
                                  <FastFallback
                                    message="Loading resume..."
                                  />
                                }
                              >

                                <Resume />

                              </Suspense>

                            </MobileSafeSection>


                            {/* =========================================
                                CONTACT
                            ========================================= */}

                            <MobileSafeSection
                              id="contact"
                              fallback={
                                <FastFallback
                                  message="Loading contact..."
                                />
                              }
                            >

                              <Suspense
                                fallback={
                                  <FastFallback
                                    message="Loading contact..."
                                  />
                                }
                              >

                                <Contact />

                              </Suspense>

                            </MobileSafeSection>

                          </>

                        }
                      />


                      {/* =================================================
                          ALL PROJECTS PAGE
                          
                          URL:
                          /projects
                          
                          Shows the complete project collection.
                          Projects.jsx should handle:
                          - All
                          - UI/UX
                          - Frontend
                          - Other categories
                      ================================================= */}

                      <Route
                        path="/projects"
                        element={

                          <Suspense
                            fallback={
                              <FastFallback
                                message="Loading projects..."
                              />
                            }
                          >

                            <Projects
                              featuredOnly={false}
                            />

                          </Suspense>

                        }
                      />


                      {/* =================================================
                          ALL CERTIFICATIONS & RECOGNITION PAGE
                          
                          URL:
                          /certifications
                          
                          Shows the complete certification and
                          recognition collection.
                          
                          Certifications.jsx should handle:
                          - All
                          - Certifications
                          - Recognition
                      ================================================= */}

                      <Route
                        path="/certifications"
                        element={

                          <Suspense
                            fallback={
                              <FastFallback
                                message="
                                  Loading certifications...
                                "
                              />
                            }
                          >

                            <Certifications
                              featuredOnly={false}
                            />

                          </Suspense>

                        }
                      />


                      {/* =================================================
                          ABOUT PAGE
                          
                          URL:
                          /about
                      ================================================= */}

                      <Route
                        path="/about"
                        element={

                          <Suspense
                            fallback={
                              <FastFallback
                                message="Loading about..."
                              />
                            }
                          >

                            <About />

                          </Suspense>

                        }
                      />


                      {/* =================================================
                          RESUME PAGE
                          
                          URL:
                          /resume
                      ================================================= */}

                      <Route
                        path="/resume"
                        element={

                          <Suspense
                            fallback={
                              <FastFallback
                                message="Loading resume..."
                              />
                            }
                          >

                            <Resume />

                          </Suspense>

                        }
                      />


                      {/* =================================================
                          TECH STACK PAGE
                          
                          URL:
                          /tech-stack
                      ================================================= */}

                      <Route
                        path="/tech-stack"
                        element={

                          <Suspense
                            fallback={
                              <FastFallback
                                message="Loading tech stack..."
                              />
                            }
                          >

                            <TechStack />

                          </Suspense>

                        }
                      />


                      {/* =================================================
                          CONTACT PAGE
                          
                          URL:
                          /contact
                      ================================================= */}

                      <Route
                        path="/contact"
                        element={

                          <Suspense
                            fallback={
                              <FastFallback
                                message="Loading contact..."
                              />
                            }
                          >

                            <Contact />

                          </Suspense>

                        }
                      />


                    </Routes>

                  </ErrorBoundary>

                </main>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <Footer />

              </>

            )}

          </div>

        </div>

      </ErrorBoundary>

    </Router>

  );
}


export default App;