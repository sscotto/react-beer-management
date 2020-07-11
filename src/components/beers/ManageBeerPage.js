import React from "react";
import BeerForm from "./BeerForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as beerActions from "../../redux/actions/beerActions";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ManageBeerPage(props) {
  let history = useHistory();
  let { action } = useParams();

  function AssignNewId(beers) {
    let maxId = Math.max(...beers.map((b) => b.id));
    return ++maxId;
  }

  const handleSubmit = (beerForm, action) => {
    switch (action) {
      case "CREATE":
        props.createBeer({ id: AssignNewId(props.beers), ...beerForm });
        toast.success("A new beer has been created!!");
        break;
      case "UPDATE":
        props.updateBeer(beerForm);
        toast.success("A beer has been updated!!");
        break;
      case "DELETE":
        props.deleteBeer(beerForm.id);
        toast.success("A beer has been deleted!!");
        break;
    }
    history.push("/beers");
  };

  return (
    <BeerForm
      handleSubmit={handleSubmit}
      selectedBeer={props.beer}
      selectedBrewery={props.brewery}
      disableFields={action === "delete"}
    ></BeerForm>
  );
}

export function getBeerById(beers, id) {
  return beers.find((beer) => beer.id === id) || {};
}

export function getBreweryById(breweries, id) {
  return breweries.find((brewery) => brewery.id === id) || {};
}

function mapStateToProps(state, ownProps) {
  const beerId = ownProps.match.params.id;
  let beer =
    beerId && state.beers.length > 0
      ? getBeerById(state.beers, parseInt(beerId))
      : {};
  const brewery =
    Object.entries(beer).length !== 0 && state.breweries.length > 0
      ? getBreweryById(state.breweries, beer.breweryId)
      : {};
  return {
    beers: state.beers,
    breweries: state.breweries,
    beer,
    brewery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createBeer: bindActionCreators(beerActions.createBeer, dispatch),
    updateBeer: bindActionCreators(beerActions.updateBeer, dispatch),
    deleteBeer: bindActionCreators(beerActions.deleteBeer, dispatch),
  };
}

ManageBeerPage.propTypes = {
  createBeer: PropTypes.func.isRequired,
  updateBeer: PropTypes.func.isRequired,
  deleteBeer: PropTypes.func.isRequired,
  beers: PropTypes.array.isRequired,
  beer: PropTypes.object.isRequired,
  brewery: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBeerPage);
