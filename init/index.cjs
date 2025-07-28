const mongoose = require("mongoose");
const initData = require("./data.cjs");
const Listing = require("../models/listing.cjs");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
for (let i = 0; i < initData.data.length; i++) {
  if (!initData.data[i].title) {
    console.log(` Missing title at index ${i}`, initData.data[i]);
  }
}

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
  mongoose.connection.close();
  console.log("connection closed");
};

initDB();