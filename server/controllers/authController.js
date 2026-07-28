const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
// Takes full_name, email, password from the request body
// Hashes the password before saving — never store plain text passwords
const register = async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password — 10 is the salt rounds (how complex the hash is)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email, role",
      [full_name, email, hashedPassword],
    );

    res.status(201).json({
      message: "Account created successfully",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
// Checks email exists, compares password, returns a JWT token if successful
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the entered password against the hashed one in the database
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token — this is what the frontend will store and send with requests
    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.rows[0].id,
        full_name: user.rows[0].full_name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
