const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://yoyi:${password}@cluster0.sge7d.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model("person", personSchema);

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.phone} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length == 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.phone);
    });
    mongoose.connection.close();
  });
}
