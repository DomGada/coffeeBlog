const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const coffeeShop = require("./models/coffeeshops");
const ejsMate = require('ejs-mate')

mongoose.connect("mongodb://localhost:27017/coffeeShops", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makeshop", async (req, res) => {
  const shop = new shop({
    title: "My Backyard",
    description: "Cheap camping",
  });
  await shop.save();
  res.send(shop);
});

app.get("/coffeeshops", async (req, res) => {
  const coffeeshops = await coffeeShop.find({});
  res.render("coffeeshops/index", {
    coffeeshops,
  });
});

app.get("/coffeeshops/new", (req, res) => {
  res.render("coffeeshops/new");
});

app.get("/coffeeshops/:id", async (req, res) => {
  const shop = await coffeeShop.findById(req.params.id);
  res.render("coffeeshops/show", {
    shop,
  });
});

app.get("/coffeeshops/:id/edit", async (req, res) => {
  const shop = await coffeeShop.findById(req.params.id);
  res.render("coffeeshops/edit", {
    shop
  });
});

app.post("/coffeeshops", async (req, res) => {
  const shop = new coffeeShop(req.body.shop);
  await shop.save();
  res.redirect(`/coffeeshops/${shop._id}`);
});

app.put("/coffeeshops/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const shop = await coffeeShop.findByIdAndUpdate(id, {
    ...req.body.shop,
  });
  res.redirect(`/coffeeshops/${shop._id}`);
});

app.delete("/coffeeshops/:id", async (req, res) => {
  const {
    id
  } = req.params;
  await coffeeShop.findByIdAndDelete(id);
  res.redirect("/coffeeshops");
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
