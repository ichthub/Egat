const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/user');
require('./services/passport');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json()); // parse body of req and assign it to req.body obj
app.use(
  cookieSession({
    name: 'session_v1',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
// authRoutes(app); same as require("./routes/authRoutes")(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // handle routes in production
  app.use(express.static('client/build')); // serving production assets like main.js and main.css

  const path = require('path');
  app.get('*', (req, res) => {
    // if the url is not recognizable by express, serve index.html
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/* 
dynamic port bounding
process.env.PORT is an environement var
passad by heroku in run time
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);
