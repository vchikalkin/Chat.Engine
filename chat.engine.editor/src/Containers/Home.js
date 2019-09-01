import React from "react";

class Home extends React.Component {
  render() {
    this.props.history.push("/flow");
    return <></>;
  }
}

export default Home;
