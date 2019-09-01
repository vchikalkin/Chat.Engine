import React, { Component } from "react";

import Layout from "./Layout/Layout";
import Flow from "./Containers/Flow";
import Commands from "./Containers/Commands";
import Home from "./Containers/Home";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/flow" component={Flow} />
            <Route exact path="/commands" component={Commands} />
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
