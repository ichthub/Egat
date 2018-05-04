const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({Hello: "TSDI members"});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// https://shrouded-fjord-57164.herokuapp.com/ | https://git.heroku.com/shrouded-fjord-57164.git
