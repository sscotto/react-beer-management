import { combineReducers } from "redux";
import beers from "./beerReducer";
import breweries from "./breweryReducer";

const rootReducer = combineReducers({
  beers,
  breweries,
});

export default rootReducer;
