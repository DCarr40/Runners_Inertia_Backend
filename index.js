const connectDB = require("./startup/db");
const express = require("express");
const app = express();
const cors = require("cors");
const collections = require("./routes/collections");
const bodyParser = require("body-parser");



app.use(express.json());
app.use(bodyParser.json({limit: "30mb",extend: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extend: true}));
app.use(cors());
app.use("/api/collections", collections);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

connectDB();
