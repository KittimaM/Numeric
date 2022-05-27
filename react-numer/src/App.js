import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Layout/Navbar/Navbar";
import BisectionPage from "./Layout/Pages/BisectionPage";
import FalsePositionPage from "./Layout/Pages/FalsePositionPage";
import Home from "./Layout/Pages/Home";
import OnePointPage from './Layout/Pages/OnePointPage'
import NewtonPage from './Layout/Pages/NewtonPage'
import SecantPage from './Layout/Pages/SecantPage'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact><Home /> </Route>
        <Route path="/bisection" exact><BisectionPage/></Route>
        <Route path="/falseposition" exact><FalsePositionPage/></Route>
        <Route path="/onepoint" exact><OnePointPage/></Route>
        <Route path="/newton" exact><NewtonPage/></Route>
        <Route path="/secant" exact><SecantPage/></Route>
        
      </Switch>
    </Router>
  );
};

export default App;
