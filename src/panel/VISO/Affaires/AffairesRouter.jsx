import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import Affaires from './Affaires';
import { matchAffaires } from './matchAffaires';
import { strutures } from '../../../structure';

let affaire = strutures['VISO']['Affaires'];

function AffairesRouter() {
    let {path} = useRouteMatch();
  return (
    <Router>
        <Switch>
        <Route exact path={path}>
            <Affaires/>
        </Route>
        {Object.keys(affaire).map( (panel, index) => {
            return (
            <Route key={index} exact path={`${path}/${panel}`}>
                {matchAffaires[panel]}
            </Route>
            );
        })}
        </Switch>
    </Router>
  )
}

export default AffairesRouter