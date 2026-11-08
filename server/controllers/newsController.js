const pool = require("../config/db");

// GET all news
const getAllNews = async (req, res) => {
  try {
    const news = await pool.query("SELECT * FROM news ORDER BY date DESC");
    res.json(news.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE a news article
const createNews = async (req, res) => {
  const { title, excerpt, category, date, image_url } = req.body;
  try {
    const newArticle = await pool.query(
      "INSERT INTO news (title, excerpt, category, date, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, excerpt, category, date, image_url],
    );
    res.status(201).json(newArticle.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a news article
const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM news WHERE id=$1", [id]);
    res.json({ message: "Article deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllNews, createNews, deleteNews };
