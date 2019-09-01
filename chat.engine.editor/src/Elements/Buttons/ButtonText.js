import React, { useState } from "react";
import "./ButtonText.css";
import "./Ripple.css";

const ButtonText = props => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="button-text-container">
      <button
        style={{
          backgroundColor: props.selected && props.accentColor
        }}
        className={
          "button-text ripple " +
          ((props.selected && "button-text-selected") || "")
        }
        onClick={props.onClick}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {props.children || props.text}
      </button>
    </div>
  );
};
export { ButtonText };
