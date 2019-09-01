import React from "react";

import "./Card.css";

import { ButtonBig } from "../Buttons/ButtonBig";

const Card = props => {
  return (
    <div className="card">
      <div
        className="card__title"
        style={{
          backgroundColor: props.accentColor,
          color: "white"
        }}
      >
        {props.title}
      </div>
      <div className="card__content">
        {props.children || "Content should be here..."}
      </div>
      <div className="button-bottom__container">
        {props.button && (
          <ButtonBig accentColor={props.accentColor} {...props.button} />
        )}
      </div>
    </div>
  );
};

export { Card };
