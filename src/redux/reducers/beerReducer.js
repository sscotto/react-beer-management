import * as beerActions from "../actions/actionTypes";

export default function beerReducer(state = [], action) {
  switch (action.type) {
    case beerActions.CREATE_BEER_SUCCESS:
      return [...state, { ...action.beer }];
    case beerActions.UPDATE_BEER_SUCCESS:
      return state.map((beer) =>
        beer.id === action.beer.id ? action.beer : beer
      );
    case beerActions.DELETE_BEER_SUCCESS:
      return state.filter((beer) => beer.id !== action.beerId);
    case beerActions.LOAD_BEERS_SUCCESS:
      return action.beers;
    default:
      return state;
  }
}
