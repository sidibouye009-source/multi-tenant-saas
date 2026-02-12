import express from "express";

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Multi Tenant SaaS",
    time: new Date().toISOString(),
  });
});

// Example tenant route
app.get("/tenant/:tenantId", (req, res) => {
  const { tenantId } = req.params;

  res.json({
    tenantId,
    message: "Tenant loaded successfully",
  });
});

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("🚀 SaaS is running successfully");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send("Database connected successfully: " + result.rows[0].now);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection failed");
  }
});
