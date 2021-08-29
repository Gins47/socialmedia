require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log(" MongoDB connection Success");
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(" MongoDB connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;
