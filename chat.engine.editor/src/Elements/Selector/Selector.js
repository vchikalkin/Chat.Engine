import React from "react";
import "./Selector.css";
import { ButtonText } from "../Buttons/ButtonText";
import { ButtonRound } from "../Buttons/ButtonRound";
import minus from "../Icons/sharp-remove-24px.svg";
import plus from "../Icons/sharp-add-24px.svg";

const Selector = props => {
  let rows = null;
  if (props.data)
    rows = props.data.map((x, index) => (
      <div key={index} className="selector__row animated">
        <ButtonText
          accentColor={props.accentColor}
          selected={index === props.selectedIndex}
          onClick={() => props.handleSelectItem(index)}
        >
          {x[props.keyToView] || x}
        </ButtonText>
        {props.handleRemoveItem && (
          <ButtonRound
            xs
            accentColor={"red"}
            onClick={() => props.handleRemoveItem(index)}
          >
            <img src={minus} />
          </ButtonRound>
        )}
      </div>
    ));

  return (
    <div className="selector">
      <div
        className="selector__title"
        style={{
          backgroundColor: props.accentColor
        }}
      >
        {props.title}
      </div>
      <div className="selector-content">
        <div className="selector__rows">
          {rows || "No data to display in selector..."}
        </div>

        <ButtonRound
          md
          active
          accentColor={props.accentColor}
          onClick={() => props.handleAddItem()}
        >
          <img src={plus} />
        </ButtonRound>
      </div>
    </div>
  );
};

export { Selector };
