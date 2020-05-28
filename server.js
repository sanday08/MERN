const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

//db Config
const db = require("./config/keys").mongoURI;
//Mongo DB Connection
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connection Sccessful!"))
  .catch((err) => console.log(err));
// Passport middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);
//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use route
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

app.get("/", (req, res) => res.send("This is home page"));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server strated on ${port}`);
});
