const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const MongoStore = require('connect-mongo');

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

app.use("/auth", require("./routes/auth"));






module.exports = app;
