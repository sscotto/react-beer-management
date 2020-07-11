import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as beerActions from "../../redux/actions/beerActions";
import * as breweryActions from "../../redux/actions/breweryActions";
import BeersList from "./BeersList";
import { Redirect } from "react-router-dom";

function BeersCatalogPage(props) {
  const [redirectToManageBeerPage, setRedirectToManageBeerPage] = useState(
    false
  );

  const [editBeerId, setEditBeerId] = useState(0);
  const [deleteBeerId, setDeleteBeerId] = useState(0);

  const handleEdit = (beerId) => {
    setEditBeerId(beerId);
    setRedirectToManageBeerPage(true);
  };

  const handleDelete = (beerId) => {
    setDeleteBeerId(beerId);
    setRedirectToManageBeerPage(true);
  };

  return (
    <>
      {redirectToManageBeerPage && (
        <Redirect
          to={
            editBeerId !== 0
              ? "/beer/" + editBeerId
              : deleteBeerId !== 0
              ? "/beer/" + deleteBeerId + "/delete"
              : "/beer"
          }
        />
      )}
      <button
        className="btn btn-info"
        style={{ marginBottom: 5 }}
        onClick={() => setRedirectToManageBeerPage(true)}
      >
        Add Beer
      </button>
      <BeersList
        beers={props.beers}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
      ></BeersList>
    </>
  );
}

function mapStateToProps(state) {
  return {
    beers:
      state.breweries.length === 0
        ? []
        : state.beers.map((beer) => {
            return {
              ...beer,
              brewery: state.breweries.find((br) => br.id === beer.breweryId)
                .name,
            };
          }),
    breweries: state.breweries,
  };
}

function mapDistatchToProps(dispatch) {
  return {
    loadBeers: bindActionCreators(beerActions.loadBeers, dispatch),
    loadBreweries: bindActionCreators(breweryActions.loadBreweries, dispatch),
  };
}

BeersCatalogPage.propTypes = {
  beers: PropTypes.array.isRequired,
  loadBeers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDistatchToProps)(BeersCatalogPage);
