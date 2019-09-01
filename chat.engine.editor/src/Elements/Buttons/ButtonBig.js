import React, { useState } from "react";

import "./ButtonBig.css";
import "./Ripple.css";

const defaultAccentColor = "rgba(60,60,255,1)";

const ButtonBig = props => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="button-big ripple"
      style={{
        backgroundColor: hovered && props.accentColor,
        color: !hovered && props.accentColor,
        borderColor: props.accentColor
      }}
      onClick={props.onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      {props.text}
    </button>
  );
};

export { ButtonBig };
