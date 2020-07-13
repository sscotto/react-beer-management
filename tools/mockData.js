const beers = [
  {
    id: 1,
    name: "Salvator",
    breweryId: 1,
    style: "DoppelBock",
    guideUrl: "https://dev.bjcp.org/style/2015/9/9A/doppelbock/",
    slug: "salvator-doppelbock",
  },
  {
    id: 2,
    name: "Fullers Black Cab",
    breweryId: 2,
    style: "Stout",
    guideUrl: "https://www.bjcp.org/2008styles/style13.php",
    slug: "fullers-black-cab-stout",
  },
  {
    id: 3,
    name: "Leffe Blond",
    breweryId: 4,
    style: "Belgian Blond",
    guideUrl: "https://dev.bjcp.org/style/2015/25/25A/belgian-blond-ale/",
    slug: "leffe-blond-belgian-blond",
  },
];

const breweries = [
  { id: 1, name: "Paulaner" },
  { id: 2, name: "Fuller's" },
  { id: 3, name: "Erdginer" },
  { id: 4, name: "Leffe" },
  { id: 5, name: "Sierra Nevada" },
];

/* eslint-disable no-undef */
module.exports = {
  beers,
  breweries,
};
