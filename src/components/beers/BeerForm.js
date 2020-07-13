import React, { useState, useEffect } from "react";
import Form from "react-jsonschema-form";
import "./BeerForm.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breweryActions from "../../redux/actions/breweryActions";
import buildSchema from "./BeerForm.Schema";

const uiSchema = {
  classNames: "beer-form",
  id: { "ui:widget": "hidden" },
};

const uiDisableSchema = {
  classNames: "beer-form",
  id: { "ui:widget": "hidden" },
  name: { "ui:readonly": true },
  breweryId: { "ui:readonly": true },
  style: { "ui:readonly": true },
  guideUrl: { "ui:readonly": true },
};

const required = (fieldName, displayName, formData, errors) => {
  if (typeof formData[fieldName] === "undefined") {
    errors[fieldName].addError(`${displayName} is required`);
  }
  return errors;
};

const validate = (formData, errors) => {
  required("name", "Beer Name", formData, errors);
  required("style", "Style", formData, errors);
  required("breweryId", "Brewery", formData, errors);
  required("guideUrl", "BJCP Link", formData, errors);

  return errors;
};

function BeerForm({
  handleSubmit,
  selectedBeer,
  selectedBrewery,
  disableFields,
  saving,
  ...props
}) {
  const [beerSchema, setBeerSchema] = useState({});

  useEffect(() => {
    if (props.breweries.length > 0) {
      setBeerSchema(buildSchema(props.breweries));
    }
  }, [props.breweries]);

  const onSubmit = ({ formData }) => {
    const action = disableFields
      ? "DELETE"
      : Object.entries(selectedBeer).length !== 0
      ? "UPDATE"
      : "CREATE";
    handleSubmit(formData, action);
  };

  return (
    <>
      <Form
        formData={{ ...selectedBeer, brewery: selectedBrewery.id }}
        schema={beerSchema}
        uiSchema={disableFields ? uiDisableSchema : uiSchema}
        validate={validate}
        showErrorList={false}
        onSubmit={onSubmit}
      >
        <div>
          <button type="submit" className="btn btn-info" disabled={saving}>
            {saving
              ? "Saving"
              : disableFields
              ? "Delete"
              : Object.entries(selectedBeer).length !== 0
              ? "Update"
              : "Create"}
          </button>
        </div>
      </Form>
    </>
  );
}

function mapStateToProps(state) {
  return {
    breweries: state.breweries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadBreweries: bindActionCreators(breweryActions.loadBreweries(), dispatch),
  };
}

BeerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  selectedBeer: PropTypes.object.isRequired,
  selectedBrewery: PropTypes.object.isRequired,
  breweries: PropTypes.array.isRequired,
  disableFields: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(BeerForm);
