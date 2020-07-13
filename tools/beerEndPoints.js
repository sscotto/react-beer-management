/* eslint-disable no-undef */
const fs = require("fs");
function configureBeerEndpoints(app, dbPath) {
  app.post("/beers/", function (req, res, next) {
    const error = validateBeer(req.body);
    if (error) {
      res.status(400).send(error);
    } else {
      req.body.slug = createSlug(req.body);
      next();
    }
  });

  app.post("/beers/", (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const { beers, breweries } = JSON.parse(data);
      const newBeer = createNewBeer(req.body, beers);
      const newBeers = [...beers, newBeer];
      fs.writeFile(
        dbPath,
        JSON.stringify({ beers: newBeers, breweries }),
        () => {}
      );
      res.send(newBeer);
    });
  });

  app.put("/beers/:id", function (req, res, next) {
    const error = validateBeer(req.body);
    if (error) {
      res.status(400).send(error);
    } else next();
  });

  app.put("/beers/:id", (req, res) => {
    const id = req.params.id;
    res.send(req.body);
  });

  app.delete("/beers/:id", function (req, res) {
    const id = req.params.id;
    res.send({ id: id });
  });

  // READ
  app.get("/beers", (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data).beers);
    });
  });

  function validateBeer(beer) {
    if (!beer.name) return "Beer name is required";
    if (!beer.breweryId) return "Brewery is required";
    if (!beer.style) return "Style is required";
    if (!beer.guideUrl) return "BJCP Link is required";
    return;
  }

  function formatField(field) {
    return field
      .replace(/[^a-z0-9_]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
  }

  function createSlug(beer) {
    let formattedName = formatField(beer.name);
    let formattedStyle = formatField(beer.style);
    return `${formattedName}-${formattedStyle}`;
  }

  function getNewId(beers) {
    let maxId = Math.max(...beers.map((b) => b.id));
    return ++maxId;
  }

  function createNewBeer(beer, beers) {
    return { id: getNewId(beers), ...beer };
  }
}

/* eslint-disable no-undef */
module.exports = {
  configureBeerEndpoints,
};
