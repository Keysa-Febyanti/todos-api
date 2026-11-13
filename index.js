require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");

const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");
const catchAsync = require("./utils/catchAsync");
const authRoutes = require("./routes/authRoutes");
const restrictTo = require("./middleware/restrictTo");
const protect = require("./middleware/protect");
const todoRoutes = require("./routes/todoRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const activityLogRoutes = require("./routes/activityLogRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/activity-logs", activityLogRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Todos-List Management API is running!"
  });
});

app.get("/api/auth/me", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    }
  });
});

app.get(
  "/api/test-admin",
  protect,
  restrictTo("admin"),
  (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Admin access success"
    });
  }
);

app.get(
  "/test-error",
  catchAsync(async (req, res, next) => {
    return next(new AppError("Tes error berhasil!", 400));
  })
);

app.use(notFound);
app.use(errorHandler);

// Menjalankan server setelah database terhubung
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// Menjalankan server hanya ketika file ini dijalankan langsung
if (require.main === module) {
  startServer();
}

module.exports = app;