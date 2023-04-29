import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Panel from "./panel/Panel";

import { strutures } from "./structure";
import { matchStructure } from "./matchStructure";
import "./index.css";

function App() {
  return (
    <div className="App grid grid-cols-[20rem_auto] h-screen w-screen">
      <Router>
        <div>
          <Panel/>
        </div>
        <div className="bg-gray-100">
          <Switch>
            {Object.keys(strutures).map( (panel, index) => {
              return (
                <Route key={index} path={`/${panel}`}>
                  {matchStructure[panel]}
                </Route>
              );
            })}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
