import { useEffect } from "react";

const SEOHead = ({
  title = "Mutia Nandhika's Portfolio",

  description =
    "Welcome to Mutia Nandhika's portfolio. Explore selected projects, experience, skills, and digital work.",

  keywords =
    "Mutia Nandhika, portfolio, UI/UX Design, Software Engineering, Graphic Design, Figma, Laravel, PHP, JavaScript, Vue.js, Flutter, MySQL, Web Development",

  image = "/logo.png",

  url = "https://portfolio-mutia-nandhika.vercel.app/",

  type = "website",
}) => {
  useEffect(() => {
    // ============================================================
    // DOCUMENT TITLE
    // ============================================================

    document.title = title;

    // ============================================================
    // META TAG HELPER
    // ============================================================

    const updateMetaTag = (
      name,
      content,
      property = false
    ) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;

      let meta = document.querySelector(selector);

      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");

        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }

        meta.setAttribute("content", content);

        document.head.appendChild(meta);
      }
    };

    // ============================================================
    // BASIC SEO
    // ============================================================

    updateMetaTag(
      "description",
      description
    );

    updateMetaTag(
      "keywords",
      keywords
    );

    updateMetaTag(
      "author",
      "Mutia Nandhika"
    );

    updateMetaTag(
      "robots",
      "index, follow"
    );

    updateMetaTag(
      "language",
      "English"
    );

    // ============================================================
    // OPEN GRAPH / FACEBOOK
    // ============================================================

    updateMetaTag(
      "og:type",
      type,
      true
    );

    updateMetaTag(
      "og:url",
      url,
      true
    );

    updateMetaTag(
      "og:title",
      title,
      true
    );

    updateMetaTag(
      "og:description",
      description,
      true
    );

    updateMetaTag(
      "og:image",
      image,
      true
    );

    updateMetaTag(
      "og:site_name",
      "Mutia Nandhika's Portfolio",
      true
    );

    // ============================================================
    // TWITTER / X
    // ============================================================

    updateMetaTag(
      "twitter:card",
      "summary_large_image"
    );

    updateMetaTag(
      "twitter:url",
      url
    );

    updateMetaTag(
      "twitter:title",
      title
    );

    updateMetaTag(
      "twitter:description",
      description
    );

    updateMetaTag(
      "twitter:image",
      image
    );

    // ============================================================
    // THEME COLOR
    // ============================================================

    updateMetaTag(
      "theme-color",
      "#0a0a0a"
    );

    updateMetaTag(
      "msapplication-TileColor",
      "#0a0a0a"
    );

    // ============================================================
    // CANONICAL URL
    // ============================================================

    let canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (canonical) {
      canonical.setAttribute(
        "href",
        url
      );
    } else {
      canonical =
        document.createElement("link");

      canonical.setAttribute(
        "rel",
        "canonical"
      );

      canonical.setAttribute(
        "href",
        url
      );

      document.head.appendChild(
        canonical
      );
    }

  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
  ]);

  return null;
};

export default SEOHead;