const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const serviceRoutes = require("./routes/services");

dotenv.config();

const pool = require("./config/db");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected:", res.rows[0].now);
  }
});

const app = express();

// with your other app.use lines
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.json({ message: "eThekwini API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
