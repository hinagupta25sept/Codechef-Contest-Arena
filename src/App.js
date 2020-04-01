import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import login from "./components/login";
import Dashboard from "./components/dashboard";
import callback from "./components/callback";
import Contest from "./components/contest";
import Display from "./components/display";
import Ranklist from "./components/ranklist";
import CodeEditor from "./components/codeEditor";
import Submission from "./components/submission";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact strict component={login} />
          <Route path="/callback" component={callback} />
          <Route path="/home" exact strict component={Dashboard} />
          <Route
            path="/rankings/:contestCode"
            exact
            strict
            component={Ranklist}
          />
          <Route
            path="/submissions/:contestCode/:problemCode"
            exact
            strict
            component={Submission}
          />
          <Route
            path="/contest/:contestCode"
            exact
            strict
            component={Contest}
          />
          <Route path="/run/" exact strict component={CodeEditor} />
          <Route
            path="/contest/:contestCode/problems/:problemCode"
            exact
            strict
            component={Display}
          />
        </Router>
      </div>
    );
  }
}
export default App;
