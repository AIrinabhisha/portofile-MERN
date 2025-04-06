import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';
import SectionTItle from '../compounts/SectionTItle';

const Project = () => {
  const [visibleProject, setVisibleProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const toggleDetails = (projectName) => {
    setVisibleProject((prev) => (prev === projectName ? null : projectName));
  };

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full bg-primary py-10 px-20 sm:px-4">
      <SectionTItle title="Project" />

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#092532] p-5 rounded-lg shadow-md border border-[#1f3a4c]"
          >
            <p
              onClick={() => toggleDetails(project.name)}
              className="text-xl text-tertiary font-semibold cursor-pointer hover:underline"
            >
              {project.name}
            </p>

            {visibleProject === project.name && (
              <div className="mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-tertiary"
                >
                  <FaGithub className="text-3xl mb-2" />
                </a>
                <h2 className="text-secondary text-2xl font-semibold mb-2">{project.name}</h2>
                <p className="text-white text-sm leading-relaxed">{project.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
