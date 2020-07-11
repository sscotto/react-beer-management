import * as types from "./actionTypes";

export function loadBreweries(breweries) {
  return { type: types.LOAD_BREWERIES, breweries };
}

export function createBrewery(brewery) {
  return { type: types.CREATE_BREWERY, brewery };
}
