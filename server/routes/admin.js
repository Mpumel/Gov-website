const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const pool = require("../config/db");

// All admin routes require both middlewares — logged in AND admin role
// verifyToken runs first, then verifyAdmin checks the role

// GET all users — admin only
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Never return passwords — only safe fields
    const result = await pool.query(
      "SELECT id, full_name, email, role, created_at FROM users ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET dashboard stats — total users, events, services
router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const events = await pool.query("SELECT COUNT(*) FROM events");
    const services = await pool.query("SELECT COUNT(*) FROM services");

    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalEvents: parseInt(events.rows[0].count),
      totalServices: parseInt(services.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
