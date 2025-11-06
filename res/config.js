const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://mindversityadmin:admin2025@mindversity.shz2nxg.mongodb.net/?appName=mindversity");
    console.log("Database Connected");
  } catch (err) {
    console.log(`Database connection error, ${err}`);
  }
};

module.exports = connectMongoDB;
