import React, { useEffect, useState } from "react";
import axios from "axios";

const Intro = () => {
  const [intro, setIntro] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/portfolio/intro");

        setIntro(response.data);
      } catch (error) {
        console.error("Error fetching intro data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntro();
  }, []);

  if (loading) {
    return <div className="text-white p-5">Loading intro...</div>;
  }

  if (!intro) {
    return <div className="text-white p-5">Intro data not found.</div>;
  }

  const { welcomeText,firstName, lastName,  caption, description } = intro;

  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-6 py-10 px-20 md:px-5 sm:px-3 text-left">
      <h1 className="text-white text-3xl md:text-2xl sm:text-lg"> {welcomeText || "Welcome!"}</h1>

      <h1 className="text-6xl md:text-4xl sm:text-3xl text-secondary font-bold">
        {firstName} {lastName}
      </h1>
      <h1 className="text-5xl md:text-3xl sm:text-2xl text-white font-semibold">{caption}</h1>
      <p className="text-white w-3/4 lg:w-2/3 md:w-full">{description}</p>
      <button className="border-2 border-[#64ffda] text-white px-8 py-4 md:px-6 md:py-3 sm:px-5 sm:py-2 text-lg md:text-base sm:text-sm rounded-md transition-all duration-300 hover:bg-[#64ffda] hover:text-[#0a192f]">
        Get Started
      </button>
    </div>
  );
};

export default Intro;
