const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Surveys');
require('./services/passport');

const keys = require('./config/keys');

// solve connection to DB issues
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(keys.mongoURI, options).then(() => {
  console.log('connected to DB is successful'),
    err => {
      console.log('this is an error from mLab', err);
    };
});
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
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // handle routes in production
  app.use(express.static('client/build')); // serving production assets like main.js and main.css

  const path = require('path');
  app.get('/*', (req, res) => {
    // if the url is not recognizable by express, serve index.html
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
