const pool = require("./config/db");

async function createReportTable() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS reports (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL,
            area VARCHAR(100) NOT NULL,
            service VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'open',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )    
        `);

    const result = await pool.query(`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'reports'
            ORDER BY ordinal_position
        `);
    console.log("reports table ready , columns:");
    console.table(result.rows);
  } catch (err) {
    console.error("Failed to create table:", err.message);
  } finally {
    await pool.end();
  }
}

createReportTable();
