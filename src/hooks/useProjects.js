import { useState, useEffect, useMemo } from 'react';
import projectsData from '../data/projects.json';

/**
 * Custom hook to load and manage projects data
 * @returns {Object} { projects, loading, error, filteredProjects }
 */
export const useProjects = (filter = 'all') => {
  const [projects] = useState(projectsData || []);
  const [loading] = useState(false);
  const [error] = useState(null);

  // Filter projects based on category with memoization
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    return filter === 'all' 
      ? projects 
      : projects.filter((project) => {
          if (!project) return false;
          if (Array.isArray(project.category)) {
            return project.category.includes(filter);
          }
          return project.category === filter;
        });
  }, [projects, filter]);

  return {
    projects,
    loading,
    error,
    filteredProjects
  };
};

/**
 * Get unique categories from projects with counts
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of category objects with value, label, and count
 */
export const getProjectCategories = (projects) => {
  if (!Array.isArray(projects) || projects.length === 0) {
    return [{ value: 'all', label: 'All Projects', count: 0 }];
  }

  const categoriesMap = projects.reduce((acc, project) => {
    if (project && project.category) {
      const cats = Array.isArray(project.category) ? project.category : [project.category];
      cats.forEach((cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const categoryObjects = [
    { value: 'all', label: 'All', count: projects.length }
  ];

  const categoryLabels = {
    uiux: 'UI/UX',
    fullstack: 'Full Stack',
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile'
  };

  Object.entries(categoriesMap).forEach(([category, count]) => {
    categoryObjects.push({
      value: category,
      label: categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1),
      count
    });
  });

  return categoryObjects;
};
