import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Panel from "./panel/Panel";

import { strutures } from "./structure";
import { matchStructure } from "./matchStructure";
import "./index.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(()=>{
    axios.post("http://127.0.0.1:8000/api/users/dj-rest-auth/login/", {
      username : "dodo",
      password : "1230"
    }, {withCredentials : true}).then(res=>{
      let data = res.data;
      console.log(data);
      localStorage.clear();         
      localStorage.setItem('key', data.key);         
      axios.defaults.headers.common['Authorization'] = `Token ${data['key']}`;  
    })
  }, []);
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
