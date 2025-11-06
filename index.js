const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./res/config");
const appRouter = require("./res/authrouter");
const app = express()
const port = 5000

require("dotenv").config();

app.use(cors());
connectMongoDB();

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