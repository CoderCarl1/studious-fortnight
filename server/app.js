const express = require("express");
const path = require("path");
const passport = require("passport");
const authRouter = require("./routes/auth");
const app = express();
require("./config/githubOauth");
require("./config/facebookOauth");
require("./config/jwtStrategy");
require("./config/googleOauth");

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.get("/api", passport.authenticate("jwt", { session: false }), (req, res) =>
  res.send("all api routes")
);

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}../client/build/index.html`));
});

module.exports = app;
