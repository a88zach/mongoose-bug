const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { personModel } = require("./person.model");

describe("testing", () => {
  let mongod;

  before(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it("should patch a sub-document (failure)", async () => {
    const person = new personModel({
      name: "John",
      age: 42,
      address: {
        street: "123 Fake St",
        city: "Springfield",
        state: "IL",
        zip: 12345,
      },
    });

    await person.save();

    person.address = {
      ...person.address,
      zip: 54321,
    };

    await person.save();

    assert.strictEqual(person.address.zip, 54321);
  });

  it("should patch a sub-document (success)", async () => {
    const person = new personModel({
      name: "John",
      age: 42,
      address: {
        street: "123 Fake St",
        city: "Springfield",
        state: "IL",
        zip: 12345,
      },
    });

    await person.save();

    person.address.zip = 54321;

    await person.save();

    assert.strictEqual(person.address.zip, 54321);
  });
});
