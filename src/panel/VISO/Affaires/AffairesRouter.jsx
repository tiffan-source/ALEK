import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import Affaires from './Affaires';

let affaire = strutures['VISO']['Affaires'];

function AffairesRouter() {
    let {path, url} = useRouteMatch();
  return (
    <Router>
        <Switch>
        <Route exact path={path}>
            <Affaires/>
        </Route>
        {Object.keys(strutures).map( panel => {
            return (
            <Route exact path={`/${panel}`}>
                {matchStructure[panel]}
            </Route>
            );
        })}
        </Switch>
    </Router>
  )
}

export default AffairesRouter