const mongoose = require("mongoose");

// Intro Schema
const introSchema = new mongoose.Schema({
  welcomeText: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// About Schema
const aboutSchema = new mongoose.Schema({
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Array of strings for skills
    required: true,
  },
});

// Experiences Schema
const experiencesSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Project Schema
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  github: { // Updated field name to lowercase
    type: String,
    required: true,
  },
});

// Course Schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
// Social Link Schema
const socialLinkSchema = new mongoose.Schema({
  href: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});




// Export models with explicit collection names
module.exports = {
  Intro: mongoose.model("Intro", introSchema, "intros"),
  Abouts: mongoose.model("About", aboutSchema, "about"),
  Experiences: mongoose.model("Experience", experiencesSchema, "experience"),
  Project: mongoose.model("Project", projectSchema, "projects"),
  Courses: mongoose.model("Course", courseSchema, "course"),
  SocialLink: mongoose.model("SocialLink", socialLinkSchema, "sociallinks"),
  User: mongoose.model("User", userSchema, "user"),
};
  