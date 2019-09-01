import React from "react";
import "./InputText.css";

const InputText = props => {
  return (
    <div className="input-text">
      {props.label && <label>{props.label}</label>}
      <input
        value={props.value}
        onChange={e => props.onChange(e.target.value, props.index)}
      />
    </div>
  );
};

export { InputText };
