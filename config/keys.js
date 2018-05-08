// if in production - return the prod set of keys
// if in developement - return the dev set of keys
const keys =
  process.env.NODE_ENV === "production"
    ? require("./prodkeys")
    : require("./devKeys");

export {keys};
/*
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prodkeys");
} else {
  module.exports = require("./devKeys");
}
*/
