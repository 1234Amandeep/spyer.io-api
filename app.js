const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fetchRouter = require("./routes/fetchRoutes");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

console.log(process.env.DB_URI);

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fetchRouter);
app.use(authRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen("4000", () => {
      console.log("After connecting to auth db, listening at port 4000...");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// basic routes
app.get("/", authMiddleware.checkUser);
