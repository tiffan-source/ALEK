import React from 'react';
import { strutures } from '../../structure';
import { useRouteMatch } from 'react-router-dom';
import { matchVISO } from './matchVISO';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

let visio = strutures['VISO'];

function VISO() {
  let {path, url} = useRouteMatch()
  return (
    <Router>
        <Switch>
          {Object.keys(visio).map( panel => {
            return (
              <Route path={`${path}/${panel}`}>
                {matchVISO[panel]}
              </Route>
            );
          })}
        </Switch>
    </Router>
  )
}

export default VISO