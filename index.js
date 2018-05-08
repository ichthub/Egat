const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/user");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);
const app = express();
app.use(
  cookieSession({
    name: "session_v1",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
// dynamic port bounding
/* process.env.PORT is an environement var
 passad by heroku in run time
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);
