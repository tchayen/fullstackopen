require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
const PORT = process.env.PORT || 3002;

module.exports = {
  MONGODB_URI,
  PORT,
};
