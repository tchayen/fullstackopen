const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.fy68u.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (!process.argv[3]) {
  Person.find({}).then((people) => {
    people.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
  return;
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then(() => {
  console.log("Saved!");
  mongoose.connection.close();
});
