const pool = require("../config/db");

// Saves one submitted issue report
const createReport = async (req, res) => {
  // Pull the five fields out of the JSON body sent by the frontend
  const { name, email, area, service, description } = req.body;

  // Never trust the frontend: reject the request if anything is missing
  if (!name || !email || !area || !service || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO reports (name, email, area, service, description) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, area, service, description],
    );

    res.status(201).json(result.rows[0]); // Return the newly created report
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not save report." });
  }
};

module.exports = {
  createReport,
};
