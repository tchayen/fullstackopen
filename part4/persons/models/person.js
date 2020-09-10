const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);
