// app
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const githubRoutes = require("./routes/github");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/github", githubRoutes);

// 404 handler – NO '*' here!
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Optional: Global error handler (for 500s)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

module.exports = app;
