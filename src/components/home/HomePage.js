import React from "react";
import Carrousel from "./Carrousel";

const HomePage = () => (
  <>
    <div className="jumbotron">
      <div className="row">
        <div className="col-sm-4">
          <h1 className="display-4">Beer Management</h1>
          <p>React Site for Management Beer.</p>
        </div>
        <div className="col-sm-8" style={{ textAlign: "center" }}>
          <Carrousel></Carrousel>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
