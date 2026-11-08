const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getAllNews,
  createNews,
  deleteNews,
} = require("../controllers/newsController");

// Public — anyone can read news
router.get("/", getAllNews);

// Protected — only logged in users can create or delete
router.post("/", verifyToken, createNews);
router.delete("/:id", verifyToken, deleteNews);

module.exports = router;
