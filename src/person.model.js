const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
  { _id: false }
);

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: addressSchema,
});

const personModel = mongoose.model("Person", personSchema);

module.exports = { personModel };
