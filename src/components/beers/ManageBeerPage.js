import React, { useState, useEffect } from "react";
import BeerForm from "./BeerForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as beerActions from "../../redux/actions/beerActions";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

function ManageBeerPage(props) {
  let history = useHistory();
  let { action } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (props.beers.length === 0) {
      props.loadBeers().catch((error) => toast.error(error));
    } else setIsLoading(false);
  }, [props.beers, props.breweries]);

  function handleCreateOrUpdate(beer, message) {
    props
      .saveOrUpdateBeer(beer)
      .then(() => {
        toast.success(message);
        history.push("/beers");
      })
      .catch((error) => {
        toast.error(error.message);
        setSaving(false);
      });
  }

  const handleSubmit = (beerForm, action) => {
    setSaving(true);
    switch (action) {
      case "CREATE":
        handleCreateOrUpdate(beerForm, "A new beer has been created!!");
        break;
      case "UPDATE":
        handleCreateOrUpdate(beerForm, "A beer has been updated!!");
        break;
      case "DELETE":
        props
          .deleteBeer(beerForm.id)
          .then(() => {
            toast.success("A beer has been delete!!");
            history.push("/beers");
          })
          .catch((error) => {
            toast.error(error.message);
            setSaving(false);
          });
        break;
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <BeerForm
          handleSubmit={handleSubmit}
          selectedBeer={props.beer}
          selectedBrewery={props.brewery}
          disableFields={action === "delete"}
          saving={saving}
        ></BeerForm>
      )}
    </>
  );
}

export function getBeerBySlug(beers, slug) {
  return beers.find((beer) => beer.slug === slug) || {};
}

export function getBreweryById(breweries, id) {
  return breweries.find((brewery) => brewery.id === id) || {};
}

function mapStateToProps(state, ownProps) {
  const beerSlug = ownProps.match.params.slug;
  let beer =
    beerSlug && state.beers.length > 0
      ? getBeerBySlug(state.beers, beerSlug)
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
    saveOrUpdateBeer: bindActionCreators(
      beerActions.saveOrUpdateBeer,
      dispatch
    ),
    deleteBeer: bindActionCreators(beerActions.deleteBeer, dispatch),
    loadBeers: bindActionCreators(beerActions.loadBeers, dispatch),
  };
}

ManageBeerPage.propTypes = {
  saveOrUpdateBeer: PropTypes.func.isRequired,
  deleteBeer: PropTypes.func.isRequired,
  loadBeers: PropTypes.func.isRequired,
  beers: PropTypes.array.isRequired,
  breweries: PropTypes.array.isRequired,
  beer: PropTypes.object.isRequired,
  brewery: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBeerPage);
