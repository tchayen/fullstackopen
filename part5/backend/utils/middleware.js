const morgan = require("morgan");

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).send({ error: "Incorrect token" });
  }

  next(error);
};

const token = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

morgan.token("body", (req) => JSON.stringify(req.body));
const logger = morgan(":method :url :status :response-time ms :body");

module.exports = {
  errorHandler,
  logger,
  token,
};
