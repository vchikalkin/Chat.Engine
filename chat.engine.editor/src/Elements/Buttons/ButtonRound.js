import React, { useState } from "react";
import "./ButtonRound.css";
import "./Ripple.css";
import "./Overlay.css";

const ButtonRound = props => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={
        "button-round " +
        ((props.xs && "button-round-xs") || "") +
        ((props.sm && "button-round-sm") || "") +
        ((props.md && "button-round-md") || "") +
        ((props.lg && "button-round-lg") || "")
      }
    >
      <div className="button-round__button-container overlay">
        <button
          style={{
            backgroundColor: (hovered || props.active) && props.accentColor,
            opacity: ((props.active || hovered) && 1) || 0.25
          }}
          className={"button-round__button ripple "}
          onClick={props.onClick}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {" "}
        </button>
      </div>
      <div className="button-round__icon-container">
        {props.children}
      </div>
    </div>
  );
};

export { ButtonRound };
