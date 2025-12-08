const mongoose = require("mongoose");
// mongodb+srv://mindversityadmin:admin2025@mindversity.shz2nxg.mongodb.net/?appName=mindversity
const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mindversityadmin:mindversity2025@cluster0.wchyqfm.mongodb.net");
    console.log("Database Connected");
  } catch (err) {
    console.log(`Database connection error, ${err}`);
  }
};

module.exports = connectMongoDB;
