require("dotenv").config();
const express = require("express");

const public_users = require("./router/general");
const regd_users = require("./router/auth_users");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── API Routes (BEFORE static, so /api/* is never intercepted) ──────────────
app.use("/api", public_users);                 // Tasks 1–7  (public)
app.use("/api/customer/auth", regd_users);     // Tasks 8–9  (JWT-protected)

// ─── Static frontend (serves public/index.html at /) ─────────────────────────
app.use(express.static("public"));

// ─── 404 catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`📚 Book Shop server running on http://localhost:${PORT}`);
  console.log(`\n🌐 Open the UI at: http://localhost:${PORT}`);
  console.log("\nAPI routes (all prefixed with /api)");
  console.log("  GET  /api/                          → All books");
  console.log("  GET  /api/isbn/:isbn                → Book by ISBN");
  console.log("  GET  /api/author/:author            → Books by Author");
  console.log("  GET  /api/title/:title              → Books by Title");
  console.log("  GET  /api/review/:isbn              → Book reviews");
  console.log("  POST /api/register                  → Register user");
  console.log("  POST /api/login                     → Login");
  console.log("  PUT  /api/customer/auth/review/:isbn → Add/Modify review");
  console.log("  DEL  /api/customer/auth/review/:isbn → Delete review");
});

module.exports = app;
