const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://mindversityapi:mindversity2025@mvycluster.gk9dwah.mongodb.net/");
    console.log("Database Connected");
  } catch (err) {
    console.log(`Database connection error, ${err}`);
  }
};

module.exports = connectMongoDB;
