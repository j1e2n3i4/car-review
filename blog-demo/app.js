const express = require("express");
const path = require("path");
const connectDB = require("./config/database");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB

// Middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

app.use("/blogs", blogRoutes);
app.use("/categories", categoryRoutes);
app.use("/vehicles", vehicleRoutes);

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
