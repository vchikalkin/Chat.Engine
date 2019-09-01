import React from "react";
import "./Layout.css";
import Navbar from "./Navbar";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="layout">
        <div>
          <Navbar />
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
