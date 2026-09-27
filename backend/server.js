require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// =====================================================
// CONNECT DATABASE
// =====================================================
connectDB();

// =====================================================
// PERFORMANCE
// =====================================================
app.disable("x-powered-by");

app.use(
  compression({
    threshold: 1024,
    level: 6,
  })
);

// =====================================================
// MIDDLEWARE
// =====================================================
app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// =====================================================
// ROOT
// =====================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Ramdev Udhyog & Hardware Backend is running!",
  });
});

// =====================================================
// HEALTH CHECK
// =====================================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

// =====================================================
// PRODUCT ROUTES
// =====================================================
app.use(
  "/api/products",
  productRoutes
);

// =====================================================
// 404
// =====================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================
app.use(
  (err, req, res, next) => {
    console.error(
      "Global Error:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
);

// =====================================================
// START SERVER
// =====================================================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    "========================================"
  );

  console.log(
    "Ramdev Udhyog & Hardware Backend"
  );

  console.log(
    "========================================"
  );

  console.log(
    `Server running on port ${PORT}`
  );

  console.log(
    `http://localhost:${PORT}`
  );

  console.log(
    "========================================"
  );
});