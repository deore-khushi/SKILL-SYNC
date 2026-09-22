const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ======================
// MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================
// MONGODB CONNECTION
// ======================
mongoose.connect("mongodb://127.0.0.1:27017/skillsync")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // stop server if DB fails
  });

// ======================
// ROUTES
// ======================
const resumeRoutes = require('./Routes/resumeRoutes');

app.use('/api/resume', resumeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SkillSync API is running" });
});

// ======================
// SERVE STATIC FILES (Frontend)
// ======================
app.use(express.static(path.join(__dirname, "../Client")));

// Default route → landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/Pages/index.html"));
});

// Direct profile page
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/Pages/buildResume.html"));
});



// ======================
// CATCH-ALL FOR ANY PAGE UNDER Client/Pages
// Serves /buildResume.html, /achievements.html, /wallet.html,
// /projects.html, /profile.html, /settings.html, /firstLogin.html, etc.
// automatically — no need to add a new app.get() for every new page.
// ======================
app.get("/:page.html", (req, res, next) => {
  const filePath = path.join(__dirname, "../Client/Pages", `${req.params.page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next(); // page doesn't exist → fall through to 404 handler
  });
});

// ======================
// 404 HANDLER (must be last)
// ======================
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`✅ SkillSync Server is running`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📄 Profile  → http://localhost:${PORT}/profile`);
  
});