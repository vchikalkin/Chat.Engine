import React from "react";
import "./Editor.css";
import { InputText } from "../Inputs/InputText";
import { ButtonRound } from "../Buttons/ButtonRound";
import minus from "../Icons/sharp-remove-24px.svg";
import plus from "../Icons/sharp-add-24px.svg";

const Editor = props => {
  return (
    <div className="editor">
      <InputText
        label={"Command"}
        value={props.scene && props.scene.cmd}
        onChange={props.handleEditCommand}
      />
      <InputText
        label={"Question"}
        value={props.step && props.step.question}
        onChange={props.handleEditQuestion}
      />

      <fieldset>
        <legend>Answers</legend>
        {props.step &&
          props.step.answers &&
          props.step.answers.map((x, index) => (
            <div className="editor__answer-row">
              <InputText
                key={index}
                index={index}
                value={x}
                onChange={props.handleEditAnswer}
              />
              <ButtonRound
                xs
                accentColor={"red"}
                onClick={() => props.handleRemoveAnswer(index)}
              >
                <img src={minus} />
              </ButtonRound>
            </div>
          ))}
        <div className="editor__add-answer-button-container">
          <div />
          <ButtonRound
            xs
            active
            accentColor={"#00c853"}
            onClick={props.handleAddAnswer}
          >
            <img src={plus} />
          </ButtonRound>
        </div>
      </fieldset>
    </div>
  );
};

export { Editor };
