import React, { useEffect, useState } from 'react';
import SectionTItle from '../SectionTItle';
import './experiences.css';
import axios from 'axios'; // Ensure axios is installed

const Experiences = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio/experience')
        // Adjust this if your baseURL is different
        setExperiences(response.data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div className="px-20 sm:px-3 py-10">
      <SectionTItle title="Experience" /><br /><br />

      <div className="flex flex-col gap-6 mt-6 border-l-4 border-tertiary pl-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            onClick={() => setSelectedItem(index)}
            className={`cursor-pointer transition-all duration-300 
              ${selectedItem === index ? "bg-[#084a4a] p-4 rounded-md shadow-lg" : "hover:bg-[#063636] p-4 rounded-md"}`}
          >
            <h1
              className={`text-xl font-semibold mb-2 
                ${selectedItem === index ? "text-tertiary" : "text-white"}`}
            >
              {exp.period}
            </h1>
            <p className="text-secondary irin text-base sm:text-sm">
              {exp.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
