import * as beerActions from "../actions/actionTypes";

export default function breweryReducer(state = [], action) {
  switch (action.type) {
    case beerActions.LOAD_BREWERIES:
      return action.breweries;
    case beerActions.CREATE_BREWERY:
      return [...state, { ...action.brewery }];
    default:
      return state;
  }
}
