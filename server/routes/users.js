// app.js or a separate routes/users.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all users with roles
router.get("/", (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

export default router;
