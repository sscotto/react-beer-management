import React from "react";
import PropTypes from "prop-types";
import "./BeersList.css";

function BeersList({ beers, onEditClick, onDeleteClick }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Beer</th>
          <th scope="col">Brewery</th>
          <th scope="col">Style</th>
          <th scope="col">BJCP - Guide</th>
        </tr>
      </thead>
      <tbody>
        {beers.map((beer, i) => {
          return (
            <tr key={beer.id}>
              <td>{i++}</td>
              <td>
                <img
                  onClick={() => onEditClick(beer.id)}
                  className="beer-list-icon"
                  src="./assets/icons/detail.svg"
                  alt="edit"
                />{" "}
                <img
                  onClick={() => onDeleteClick(beer.id)}
                  className="beer-list-icon"
                  src="./assets/icons/delete.svg"
                  alt="edit"
                />{" "}
                {beer.name}
              </td>
              <td>{beer.brewery}</td>
              <td>{beer.style}</td>
              <td>
                {" "}
                <a className="btn btn-info" href={beer.guideUrl}>
                  View+
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

BeersList.propTypes = {
  beers: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default BeersList;
