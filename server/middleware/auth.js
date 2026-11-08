const jwt = require("jsonwebtoken");

// This function runs BEFORE protected routes
// It checks if the request has a valid token
const verifyToken = (req, res, next) => {
  // The token comes in the request headers like this:
  // Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user info to the request so the next function can use it
    req.user = decoded;
    next(); // move on to the actual route
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
// ADMIN GUARD — runs after verifyToken
// Checks that the logged in user has the admin role
// Used on any route that only admins should access
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
