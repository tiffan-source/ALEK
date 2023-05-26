import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Panel from "./panel/Panel";

import { strutures } from "./structure";
import { matchStructure } from "./matchStructure";
import "./index.css";
import { Component } from "react";
import axios from "axios";
import Loader from "./component/utils/Loader/Loader";

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount(){
    axios.get("http://localhost:8000/api/get-csrf-token/", { withCredentials: true }).then(res=>{
      const csrfToken = res.headers['x-csrftoken'];
  
      axios.post("http://localhost:8000/api/users/dj-rest-auth/login/", {
        // csrfmiddlewaretoken : csrfToken,
        username : "dodo@gmail.com",
        password : "Anlyou4545",
        // submit :	"Log+in",
        // next :	"/api/admin/plan/affaire/"
        // email: process.env.REACT_APP_EMAIL
      }, {withCredentials : true,
        headers : {'X-CSRFToken' : csrfToken}
      }).then(res=>{
        let data = res.data;
        // localStorage.clear();         
        localStorage.setItem('key', data.key);         
        axios.defaults.headers.common['Authorization'] = `Token ${data['key']}`;
        this.setState({ isLoading: false });
      });
    });
  }

  render(){
    const { isLoading } = this.state;

    if (isLoading) {
      return <Loader/>;
    }

    return (
      <div className="App grid grid-cols-[18rem_auto] h-screen w-screen">
        <Router>
          <div className="h-screen">
            <Panel/>
          </div>
          <div className="bg-gray-100 h-screen overflow-scroll">
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
}

export default App;
