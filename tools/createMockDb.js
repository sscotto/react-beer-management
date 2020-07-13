/* eslint-disable no-console */
/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { beers, breweries } = mockData;
const data = JSON.stringify({ beers, breweries });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
