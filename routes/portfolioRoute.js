const express = require("express");
const router = express.Router();

// Import models
const {
  Intro,
  Abouts,
  Experiences,
  Project,
  Courses,
  SocialLink,
  User,
} = require("../models/portfolioModel");



// ---------- INTRO ----------
router.get("/intro", async (req, res) => {
  try {
    const intro = await Intro.findOne();
    res.json(intro);
  } catch (err) {
    res.status(500).json({ message: "Error fetching intro", error: err });
  }
});

router.post("/intro", async (req, res) => {
  try {
    const newIntro = new Intro(req.body);
    await newIntro.save();
    res.status(201).json(newIntro);
  } catch (err) {
    res.status(400).json({ message: "Error saving intro", error: err });
  }
});

router.put("/intro", async (req, res) => {
  try {
    const updatedIntro = await Intro.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedIntro);
  } catch (err) {
    res.status(500).json({ message: "Server error updating intro", error: err });
  }
});

// ---------- ABOUT ----------
router.get("/about", async (req, res) => {
  try {
    const about = await Abouts.findOne();
    if (!about) {
      return res.status(404).json({ message: "About content not found" });
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Error fetching about", error: err });
  }
});

router.put("/about", async (req, res) => {
  try {
    const updatedAbout = await Abouts.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedAbout);
  } catch (err) {
    res.status(500).json({ message: "Error updating about section", error: err });
  }
});

// ---------- EXPERIENCES ----------
router.get("/experience", async (req, res) => {
  try {
    const exp = await Experiences.find();
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: "Error fetching experiences", error: err });
  }
});

router.post("/experience", async (req, res) => {
  try {
    const newExp = new Experiences(req.body);
    await newExp.save();
    res.status(201).json(newExp);
  } catch (err) {
    res.status(400).json({ message: "Error saving experience", error: err });
  }
});

router.delete("/experience/:id", async (req, res) => {
  try {
    const deletedExp = await Experiences.findByIdAndDelete(req.params.id);
    if (!deletedExp) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully", deletedExp });
  } catch (err) {
    res.status(500).json({ message: "Error deleting experience", error: err });
  }
});

// ---------- PROJECTS ----------
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

router.put("/projects/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/projects/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid request" });
  }
});

// ---------- COURSES ----------
router.get("/courses", async (req, res) => {
  try {
    const courses = await Courses.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err });
  }
});

router.post("/courses", async (req, res) => {
  try {
    const newCourse = new Courses(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: "Error saving course", error: err });
  }
});

router.delete("/courses/:id", async (req, res) => {
  try {
    const course = await Courses.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course", error: err });
  }
});

// ---------- SOCIAL LINKS ----------
router.get("/socialLink", async (req, res) => {
  try {
    const links = await SocialLink.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: "Error fetching social links", error: err });
  }
});

router.post("/socialLink", async (req, res) => {
  try {
    const newLink = new SocialLink(req.body);
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(400).json({ message: "Error saving social link", error: err });
  }
});

// ---------- USERS ----------
router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

router.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Error saving user", error: err });
  }
});

module.exports = router;
