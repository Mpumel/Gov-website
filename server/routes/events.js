const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// Public — anyone can view events
router.get("/", getAllEvents);

// Protected — only authenticated users can create, update, or delete events
router.post("/", verifyToken, createEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;
