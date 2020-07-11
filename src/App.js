import React from "react";
import "./App.css";
import Header from "../src/components/common/Header";
import HomePage from "../src/components/home/HomePage";
import AboutPage from "../src/components/about/AboutPage";
import BeersCatalogPage from "./components/beers/BeersCatalogPage";
import PageNotFound from "./components/PageNotFound";
import { Switch, Route } from "react-router-dom";
import ManageBeerPage from "./components/beers/ManageBeerPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/beers" component={BeersCatalogPage}></Route>
        <Route
          exact
          path="/beer/:id/:action"
          component={ManageBeerPage}
        ></Route>
        <Route exact path="/beer/:id" component={ManageBeerPage}></Route>
        <Route exact path="/beer" component={ManageBeerPage}></Route>
        <Route exact path="/about" component={AboutPage}></Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
      <ToastContainer></ToastContainer>
      <div>
        Iconos diseñados por{" "}
        <a href="https://www.flaticon.es/autores/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.es/" title="Flaticon">
          www.flaticon.es
        </a>
      </div>
    </div>
  );
}

export default App;
