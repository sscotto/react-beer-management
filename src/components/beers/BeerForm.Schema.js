function BuildBreweriesEnum(breweries) {
  return breweries.map((brewery) => {
    return { type: "number", title: brewery.name, enum: [brewery.id] };
  });
}

function buildSchema(breweries) {
  breweries = BuildBreweriesEnum(breweries);
  const beerSchemaTemplate = {
    title: "Beer Form",
    type: "object",
    properties: {
      id: {
        type: "number",
        defautl: 0,
      },
      name: {
        type: "string",
        title: "Beer Name",
      },
      breweryId: {
        type: "number",
        title: "Brewery",
        anyOf: breweries,
      },
      style: {
        type: "string",
        title: "Style",
        enum: ["Stout", "IPA", "Barley Wine", "DoppelBock", "Belgian Blond"],
      },
      guideUrl: {
        type: "string",
        title: "BJCP Link",
      },
    },
  };
  return beerSchemaTemplate;
}

export default buildSchema;
