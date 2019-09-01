import React, { useState } from "react";
import logo from "../Elements/Icons/engine.png";
import "./Navbar.css";
import { ButtonText } from "../Elements/Buttons/ButtonText";
import { withRouter } from "react-router-dom";

const links = [
  {
    text: "Flow",
    name: "flow",
    link: "/flow"
  },
  {
    text: "Commands",
    name: "commands",
    link: "/commands"
  },
  {
    text: "Settings",
    name: "settings",
    link: "/settings"
  }
];

const Navbar = props => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img className="navbar-logo-image" src={logo} alt="logo" />
          <div className="navbar-title">Chat.Engine</div>
        </div>
        <div className="nav">
          {links.map((x, index) => (
            <ButtonText
              key={index}
              selected={index === selectedIndex}
              onClick={() => {
                props.history.push(x.link);
                setSelectedIndex(index);
              }}
            >
              {x.text}
            </ButtonText>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
