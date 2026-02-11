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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
