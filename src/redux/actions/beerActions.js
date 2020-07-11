import * as types from "./actionTypes";

export function createBeer(beer) {
  return { type: types.CREATE_BEER, beer };
}

export function loadBeers(beers) {
  return { type: types.LOAD_BEERS, beers };
}

export function updateBeer(beer) {
  return { type: types.UPDATE_BEER, beer };
}

export function deleteBeer(beerId) {
  return { type: types.DELETE_BEER, beerId };
}
