/* eslint-disable no-undef */
const fs = require("fs");
function configureBreweryEndPoints(app, dbPath) {
  app.get("/breweries", (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data).breweries);
    });
  });
}

/* eslint-disable no-undef */
module.exports = {
  configureBreweryEndPoints,
};
