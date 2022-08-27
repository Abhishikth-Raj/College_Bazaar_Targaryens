const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const setPassport = require("./config/passport");
const passport = require("passport");

const app = express();
setPassport(passport);
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
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

module.exports = app;
