const express = require("express");
const cors = require("cors");
// const connectMongoDB = require("./res/config");
const appRouter = require("./res/authrouter");
const app = express()
const port = 5000

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
connectMongoDB();

require("dotenv").config();

app.use(cors());


app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome")
})




app.use("/api", appRouter);

app.listen(port, () => {
    console.log(`Server is Running on ${port}`)
})