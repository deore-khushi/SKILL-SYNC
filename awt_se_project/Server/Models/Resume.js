const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  year: String,
  score: String
});

const ExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  duration: String,
  description: String
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  technologies: String,
  description: String,
  link: String
});

const CertificationSchema = new mongoose.Schema({
  name: String,
  organization: String,
  date: String,
  link: String
});

const ResumeSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
    unique: true
  },

  personalInfo: {

    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    bio: String,
    photo: String

  },

  education: [EducationSchema],

  skills: {

    technical: [String],
    soft: [String],
    tools: [String]

  },

  experience: [ExperienceSchema],

  projects: [ProjectSchema],

  certifications: [CertificationSchema],

  achievements: [String],

  updatedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Resume', ResumeSchema);