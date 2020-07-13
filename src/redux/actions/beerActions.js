import * as types from "./actionTypes";
import * as beerApi from "../../api/beerApi";

export function createBeerSuccess(beer) {
  return { type: types.CREATE_BEER_SUCCESS, beer };
}

export function loadBeersSuccess(beers) {
  return { type: types.LOAD_BEERS_SUCCESS, beers };
}

export function updateBeerSuccess(beer) {
  return { type: types.UPDATE_BEER_SUCCESS, beer };
}

export function deleteBeerSuccess(beerId) {
  return { type: types.DELETE_BEER_SUCCESS, beerId };
}

//check: redux-thunk
export function loadBeers() {
  return function (dispatch) {
    return beerApi
      .getBeers()
      .then((beers) => {
        dispatch(loadBeersSuccess(beers));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveOrUpdateBeer(beer) {
  const isUpdate = beer.id > 0;
  return function (dispatch) {
    return beerApi
      .saveBeer(beer)
      .then((beer) => {
        isUpdate
          ? dispatch(updateBeerSuccess(beer))
          : dispatch(createBeerSuccess(beer));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteBeer(beerId) {
  return function (dispatch) {
    return beerApi
      .deleteBeer(beerId)
      .then((resp) => {
        dispatch(deleteBeerSuccess(parseInt(resp.id)));
      })
      .catch((error) => {
        throw error;
      });
  };
}
