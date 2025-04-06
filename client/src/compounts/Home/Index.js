import React from 'react';
import Header from './Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Project from '../../project/Project';
import Courses from '../courses/Courses';
import LeftSide from '../../Leftside/LeftSide';
import Contact from './Contact';
import Con from './contactMe';
import Footer from "./Footer"

const Index = () => {
  return (
    <div className="bg-primary text-white min-h-screen">
      
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="px-24 sm:px-5">
        <Intro />
        <About />
        <Experiences />
        <Project />
        <Courses />
        <Contact />
        <Con />
        <LeftSide />
        <Footer />
      
      </div>
      
    </div>
  );
};

export default Index;
