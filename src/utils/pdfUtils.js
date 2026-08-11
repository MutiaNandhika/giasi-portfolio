/**
 * PDF Utilities
 * Utility functions for handling PDF files in the portfolio.
 */

/**
 * Check whether a PDF file exists.
 *
 * @param {string} pdfPath
 * @returns {Promise<boolean>}
 */
export const checkPDFExists = async (pdfPath) => {
  if (!pdfPath) {
    return false;
  }

  try {
    const response = await fetch(pdfPath, {
      method: "HEAD",
      cache: "no-cache",
    });

    return response.ok;
  } catch (error) {
    console.warn(`PDF not found: ${pdfPath}`);
    return false;
  }
};

/**
 * Get PDF metadata.
 *
 * @param {object} pdfDocument
 * @returns {object}
 */
export const getPDFInfo = async (pdfDocument) => {
  if (!pdfDocument) {
    return {
      numPages: 0,
      info: null,
      fingerprint: null,
    };
  }

  let metadata = null;

  try {
    if (pdfDocument.getMetadata) {
      metadata = await pdfDocument.getMetadata();
    }
  } catch (error) {
    console.warn("Unable to read PDF metadata:", error);
  }

  return {
    numPages: pdfDocument.numPages || 0,
    info: metadata,
    fingerprint: pdfDocument.fingerprint || null,
  };
};

/**
 * Extract text from a PDF page.
 *
 * @param {object} page
 * @returns {Promise<string>}
 */
export const extractTextFromPage = async (page) => {
  if (!page) {
    return "";
  }

  try {
    const textContent = await page.getTextContent();

    return textContent.items
      .map((item) => item.str || "")
      .join(" ");
  } catch (error) {
    console.error("Error extracting text from PDF page:", error);
    return "";
  }
};

/**
 * Format experience data.
 *
 * Kept for compatibility with existing components.
 */
export const formatResumeSection = (
  sectionData,
  sectionType
) => {
  if (!sectionData) {
    return sectionData;
  }

  switch (sectionType) {
    case "experience":
      if (!Array.isArray(sectionData)) {
        return [];
      }

      return sectionData.map((experience) => ({
        ...experience,

        formattedDuration:
          experience.duration ||
          experience.period ||
          "",

        formattedResponsibilities:
          Array.isArray(experience.responsibilities)
            ? experience.responsibilities.join("\n• ")
            : Array.isArray(experience.achievements)
            ? experience.achievements.join("\n• ")
            : "",
      }));

    case "skills":
      if (!sectionData.technical) {
        return sectionData;
      }

      return {
        ...sectionData,

        categorized:
          sectionData.technical.reduce(
            (accumulator, skill) => {
              const category =
                skill.category || "other";

              if (!accumulator[category]) {
                accumulator[category] = [];
              }

              accumulator[category].push(skill);

              return accumulator;
            },
            {}
          ),
      };

    case "projects":
      if (!Array.isArray(sectionData)) {
        return [];
      }

      return sectionData.map((project) => ({
        ...project,

        formattedTech:
          Array.isArray(project.technologies)
            ? project.technologies.join(" • ")
            : Array.isArray(project.techUsed)
            ? project.techUsed.join(" • ")
            : "",

        formattedHighlights:
          Array.isArray(project.highlights)
            ? project.highlights.join("\n• ")
            : "",
      }));

    default:
      return sectionData;
  }
};

/**
 * Generate dynamic resume data.
 *
 * The portfolio currently uses static React data,
 * so this function is kept only for compatibility.
 */
export const generateDynamicResume = (
  extractedText
) => {
  return extractedText || "";
};

export default {
  checkPDFExists,
  getPDFInfo,
  extractTextFromPage,
  formatResumeSection,
  generateDynamicResume,
};