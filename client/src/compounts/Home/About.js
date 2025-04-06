import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionTItle from "../SectionTItle";
import irin from "./k.png";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/portfolio/about");
        setAboutData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about data:", error);
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <div className="text-white p-10">Loading About...</div>;

  return (
    <div className="w-full px-20 py-10 bg-[#0a192f] text-white">
      <SectionTItle title="About" />
      <br />
      <br />

      {/* Image & Text */}
      <div className="flex w-full items-center sm:flex-col gap-10">
        <div className="w-full sm:w-full md:w-1/2 flex justify-center">
          <img
            src={irin} // You can replace this with image from DB if stored
            alt="Profile"
            className="rounded-lg shadow-lg w-72 h-auto object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full flex flex-col gap-5 text-lg leading-7">
          <p>{aboutData?.description1}</p>
          <p>{aboutData?.description2}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="py-10 text-center">
        <h1 className="text-tertiary text-xl font-semibold">
          Here are a few technologies I've been working with recently:
        </h1>

        <ul className="flex flex-wrap gap-5 mt-5 justify-center">
          {aboutData?.skills?.map((skill, index) => (
            <div
              key={index}
              className="border border-tertiary py-3 px-6 rounded-md transition-all hover:bg-[#64ffda] hover:text-[#0a192f]"
            >
              <h1 className="text-white font-semibold">{skill}</h1>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
