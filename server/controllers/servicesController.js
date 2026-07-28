const pool = require("../config/db");

// Get all services

const getAllServices = async (req, res) => {
  try {
    const services = await pool.query(
      "SELECT * FROM services ORDER BY name ASC",
    );
    res.json(services.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// Create a new service
const createService = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newService = await pool.query(
      "INSERT INTO services (name, description) VALUES ($1, $2) RETURNING *",
      [name, description],
    );
    res.status(201).json(newService.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create service" });
  }
};

// UPDATE a service status
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, category, status, description } = req.body;
  try {
    const updated = await pool.query(
      "UPDATE services SET name=$1, category=$2, status=$3, description=$4, updated_at=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *",
      [name, category, status, description, id],
    );
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a service
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM services WHERE id=$1", [id]);
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};
