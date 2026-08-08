/**
 * PDF Utilities for handling PDF files in the portfolio
 * Supports PDF viewing, text extraction, and data integration
 */

// PDF configuration
export const PDF_CONFIG = {
  // Default PDF files paths
  RESUME_PATH: "/documents/GiaSi_Resume.pdf",
  PORTFOLIO_PATH: "/documents/GiaSi_Portfolio.pdf",
  CERTIFICATES_PATH: "/documents/certificates/",

  // PDF viewer options
  VIEWER_OPTIONS: {
    scale: 1.2,
    page: 1,
    rotation: 0,
    textLayerMode: 1, // Enable text selection
    annotationMode: 1, // Enable annotations
  },
};

// Mock PDF data - Replace with actual extracted data
export const PDF_DATA = {
  resume: {
    personalInfo: {
      name: "Nguyen Tran Gia Si",
      email: "giasinguyentran@gmail.com",
      phone: "+84 34 899 6487",
      location: "Ho Chi Minh City, Vietnam",
      linkedin: "linkedin.com/in/giasinguyen",
      github: "github.com/giasinguyen",
    },

    summary: `Passionate Full-Stack Developer with expertise in Java ecosystem, React, and modern web technologies. 
              Experienced in building scalable applications with Spring Boot, microservices architecture, and cloud deployment.`,

    experience: [
      {
        id: 1,
        title: "Senior Full-Stack Developer",
        company: "Tech Innovation Co.",
        duration: "2023 - Present",
        location: "Ho Chi Minh City, Vietnam",
        responsibilities: [
          "Led development of microservices architecture using Spring Boot and React",
          "Implemented CI/CD pipelines reducing deployment time by 70%",
          "Mentored junior developers and conducted code reviews",
          "Architected scalable solutions serving 100K+ daily users",
        ],
        technologies: [
          "Java 17",
          "Spring Boot",
          "React",
          "PostgreSQL",
          "Docker",
          "AWS",
        ],
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Solutions Ltd.",
        duration: "2021 - 2023",
        location: "Ho Chi Minh City, Vietnam",
        responsibilities: [
          "Developed responsive web applications using React and TypeScript",
          "Improved application performance by 40% through optimization",
          "Collaborated with UI/UX team to implement pixel-perfect designs",
          "Integrated RESTful APIs and implemented state management",
        ],
        technologies: ["React", "TypeScript", "Redux", "TailwindCSS", "Jest"],
      },
    ],

    education: [
      {
        id: 1,
        degree: "Bachelor of Computer Science",
        institution: "University of Technology",
        duration: "2018 - 2022",
        gpa: "3.8/4.0",
        achievements: [
          "Graduated Magna Cum Laude",
          "Best Final Year Project Award",
          "Dean's List for 6 semesters",
        ],
      },
    ],

    skills: {
      technical: [
        { name: "Java", level: 95, category: "backend" },
        { name: "Spring Boot", level: 92, category: "backend" },
        { name: "React", level: 88, category: "frontend" },
        { name: "TypeScript", level: 85, category: "frontend" },
        { name: "PostgreSQL", level: 90, category: "database" },
        { name: "MongoDB", level: 82, category: "database" },
        { name: "Docker", level: 80, category: "devops" },
        { name: "AWS", level: 75, category: "cloud" },
      ],
      soft: [
        "Leadership",
        "Problem Solving",
        "Team Collaboration",
        "Project Management",
        "Communication",
      ],
    },

    projects: [
      {
        id: 1,
        name: "E-Commerce Platform",
        description:
          "Full-stack e-commerce solution with microservices architecture",
        technologies: [
          "Java",
          "Spring Boot",
          "React",
          "PostgreSQL",
          "Redis",
          "Docker",
        ],
        url: "https://github.com/giasinguyen/ecommerce",
        highlights: [
          "Handles 10K+ concurrent users",
          "99.9% uptime achieved",
          "Integrated payment gateway",
          "Real-time inventory management",
        ],
      },
      {
        id: 2,
        name: "Task Management System",
        description:
          "Collaborative project management tool with real-time updates",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        url: "https://github.com/giasinguyen/task-manager",
        highlights: [
          "Real-time collaboration",
          "Drag-and-drop interface",
          "File sharing capabilities",
          "Advanced reporting",
        ],
      },
    ],

    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        date: "2023",
        credentialId: "AWS-DEV-2023-001",
      },
      {
        id: 2,
        name: "Oracle Certified Professional, Java SE Developer",
        issuer: "Oracle",
        date: "2022",
        credentialId: "OCP-JAVA-2022-001",
      },
    ],

    languages: [
      { name: "Vietnamese", level: "Native" },
      { name: "English", level: "Professional Working Proficiency" },
      { name: "Japanese", level: "Basic Conversational" },
    ],
  },
};

/**
 * Utility functions for PDF handling
 */

// Check if PDF file exists
export const checkPDFExists = async (pdfPath) => {
  try {
    const response = await fetch(pdfPath, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.warn(`PDF not found: ${pdfPath}`);
    console.log(error);
    return false;
  }
};

// Get PDF metadata
export const getPDFInfo = (pdfDocument) => {
  return {
    numPages: pdfDocument.numPages,
    info: pdfDocument.getMetadata(),
    fingerprint: pdfDocument.fingerprint,
  };
};

// Extract text from PDF page
export const extractTextFromPage = async (page) => {
  try {
    const textContent = await page.getTextContent();
    return textContent.items.map((item) => item.str).join(" ");
  } catch (error) {
    console.error("Error extracting text from PDF page:", error);
    return "";
  }
};

// Format resume data for display
export const formatResumeSection = (sectionData, sectionType) => {
  switch (sectionType) {
    case "experience":
      return sectionData.map((exp) => ({
        ...exp,
        formattedDuration: exp.duration,
        formattedResponsibilities: exp.responsibilities.join("\n• "),
      }));

    case "skills":
      return {
        ...sectionData,
        categorized: sectionData.technical.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {}),
      };

    case "projects":
      return sectionData.map((project) => ({
        ...project,
        formattedTech: project.technologies.join(" • "),
        formattedHighlights: project.highlights.join("\n• "),
      }));

    default:
      return sectionData;
  }
};

// Generate dynamic resume data based on PDF content
export const generateDynamicResume = (extractedText) => {
  // This would parse the extracted text and create structured data
  // For now, return the static data
  console.log(extractedText);
  return PDF_DATA.resume;
};

export default {
  PDF_CONFIG,
  PDF_DATA,
  checkPDFExists,
  getPDFInfo,
  extractTextFromPage,
  formatResumeSection,
  generateDynamicResume,
};
