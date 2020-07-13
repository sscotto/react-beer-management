import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as beerActions from "../../redux/actions/beerActions";
import * as breweryActions from "../../redux/actions/breweryActions";
import BeersList from "./BeersList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

function BeersCatalogPage(props) {
  const [redirectToManageBeerPage, setRedirectToManageBeerPage] = useState(
    false
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.beers.length === 0) {
      props.loadBeers().catch((error) => toast.error(error));
    } else setIsLoading(false);
  }, [props.beers]);

  const [editBeerSlug, setEditBeerSlug] = useState("");
  const [deleteBeerSlug, setDeleteBeerSlug] = useState("");

  const handleEdit = (beerSlug) => {
    setEditBeerSlug(beerSlug);
    setRedirectToManageBeerPage(true);
  };

  const handleDelete = (beerSlug) => {
    setDeleteBeerSlug(beerSlug);
    setRedirectToManageBeerPage(true);
  };

  return (
    <>
      {redirectToManageBeerPage && (
        <Redirect
          to={
            editBeerSlug !== ""
              ? "/beer/" + editBeerSlug
              : deleteBeerSlug !== ""
              ? "/beer/" + deleteBeerSlug + "/delete"
              : "/beer"
          }
        />
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
          ></BeersList>{" "}
        </>
      )}
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
