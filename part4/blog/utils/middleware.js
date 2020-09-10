const morgan = require("morgan");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

morgan.token("body", (req) => JSON.stringify(req.body));
const logger = morgan(":method :url :status :response-time ms :body");

module.exports = {
  errorHandler,
  logger,
};
