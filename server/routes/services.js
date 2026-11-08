const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/servicesController");

// Public — anyone can view services
router.get("/", getAllServices);

// Protected — only logged in users can modify
router.post("/", verifyToken, createService);
router.put("/:id", verifyToken, updateService);
router.delete("/:id", verifyToken, deleteService);

module.exports = router;
