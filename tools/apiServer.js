/* eslint-disable no-console */
/* eslint-disable no-undef */
const beerConfiguration = require("./beerEndPoints");
const { configureBeerEndpoints } = beerConfiguration;
const breweryConfiguration = require("./breweryEndPoints");
const { configureBreweryEndPoints } = breweryConfiguration;

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dbPath = path.join(__dirname, "db.json");
const API_PORT = process.env.REACT_APP_API_PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  setTimeout(next, 2500);
});

configureBeerEndpoints(app, dbPath);
configureBreweryEndPoints(app, dbPath);

//If use API_PORT got permission denied
app.listen(3005, () => {
  console.log(`Listening on Port ${API_PORT}`);
}); //SOME ISSUE READING API_PORT DIRECTLY
