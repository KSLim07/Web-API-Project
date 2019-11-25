import React from "react";
import {BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";


export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/history">
            <About />
          </Route>
          <Route path="/home">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}