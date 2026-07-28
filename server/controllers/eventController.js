const pool = require("../config/db");

// GET all events
const getAllEvents = async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM events ORDER BY date ASC");
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE an event
const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const newEvent = await pool.query(
      "INSERT INTO events (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, date, location],
    );
    res.status(201).json(newEvent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  try {
    const updated = await pool.query(
      "UPDATE events SET title = $1, description = $2, date = $3, location = $4 WHERE id = $5 RETURNING *",
      [title, description, date, location, id],
    );
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
