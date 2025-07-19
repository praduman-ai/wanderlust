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
for (let i = 0; i < initData.length; i++) {
  if (!initData[i].title) {
    console.log(` Missing title at index ${i}`, initData[i]);
  }
}

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();