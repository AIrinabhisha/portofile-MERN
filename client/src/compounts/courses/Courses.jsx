import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionTItle from "../SectionTItle";

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  const toggleDetails = (courseName) => {
    setSelectedCourse((prev) => (prev === courseName ? null : courseName));
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/portfolio/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-10 px-20 bg-[#0F172A] text-white">
      <SectionTItle title="Courses" />
      <div className="mt-4 space-y-4">
        {courses.map((course, index) => {
          const isSelected = selectedCourse === course.name;
          return (
            <div
              key={index}
              onClick={() => toggleDetails(course.name)}
              className={`relative border-l-4 p-4 rounded-lg shadow-md transition-all duration-300 cursor-pointer 
                ${isSelected ? "bg-teal-700 border-teal-400" : "bg-primary"} 
                hover:scale-105`}
            >
              <h3 className="text-xl font-semibold text-teal-300">{course.name}</h3>
              <p className="text-orange-400">{course.domain}</p>
              {isSelected && (
                <p className="mt-2 text-gray-300">{course.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
