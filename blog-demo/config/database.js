const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster.0xrj66k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster",
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
