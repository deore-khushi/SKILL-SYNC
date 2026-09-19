const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from Client folder
app.use(express.static(path.join(__dirname, "../Client")));

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/Pages/index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ SkillSync Server is running`);
    console.log(`🌐 http://localhost:${PORT}`);
});