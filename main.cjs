const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.cjs");
const path = require("path");
const methodOverride = require("method-override");
const ejsLint = require('ejs-lint');
const initData = require("./init/data.cjs");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//Index Route
app.get("/listings", async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
  let listing = req.body.listing;
  await Listing.create(listing);
  res.redirect("/listings");
});

//Edit Route
app.put("/listings/:id", async (req, res) => {
  console.log("EDIT (PUT) route hit");  // Log that should show
  let { id } = req.params;
  let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });
  console.log("Updated:", updatedListing);
  res.redirect(`/listings/${updatedListing._id}`);
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  console.log("DELETE route hit"); // Log at the top to confirm route is triggered

  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log("Deleted listing:", deletedListing); // Log the deleted item

  res.redirect("/listings"); 
});



app.listen(3000, () => {
  console.log("server is listening to port 3000");
});