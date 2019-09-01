import React from "react";
import "./FlowViewer.css";

import { Loading } from "../../Elements/Icons/Icons";

import axios from "axios";
import { Selector } from "../../Elements/Selector/Selector";
import { Editor } from "../../Elements/Editor/Editor";
import { Card } from "../../Elements/Card/Card";

class FlowViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        scene: 0,
        step: 0
      }
    };
    this.selectScene = this.selectScene.bind(this);
    this.selectStep = this.selectStep.bind(this);
    this.handleEditCommand = this.handleEditCommand.bind(this);
    this.handleEditQuestion = this.handleEditQuestion.bind(this);
    this.handleEditAnswer = this.handleEditAnswer.bind(this);
    this.handleAddScene = this.handleAddScene.bind(this);
    this.handleRemoveScene = this.handleRemoveScene.bind(this);
    this.handleAddStep = this.handleAddStep.bind(this);
    this.handleRemoveStep = this.handleRemoveStep.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this);
    this.loadFlow = this.loadFlow.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.loadFlow();
  }

  loadFlow() {
    axios.get("/flow/get").then(res => {
      if (res) {
        this.setState({
          flow: res.data.flow
        });
      }
    });
  }

  handleSave() {
    let flow = { flow: this.state.flow };
    console.log(flow);
    axios
      .post("/flow/set", flow)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectScene(index) {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        scene: index,
        step: 0
      }
    }));
  }

  selectStep(index) {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        step: index
      }
    }));
  }

  handleEditCommand(cmd) {
    if (cmd) {
      let scenes = this.state.flow.scenes;
      let selected_scene = scenes.find(
        (x, index) => index === this.state.selected.scene
      );
      selected_scene.cmd = cmd;
      this.setState(prevState => ({
        flow: { scenes: scenes }
      }));
    }
  }

  handleEditQuestion(question) {
    if (question) {
      let scenes = this.state.flow.scenes;
      let selected_scene = scenes.find(
        (x, index) => index === this.state.selected.scene
      );
      let steps = selected_scene.steps;
      let selected_step = steps.find(
        (x, index) => index === this.state.selected.step
      );
      selected_step.question = question;
      this.setState(prevState => ({
        flow: { scenes: scenes }
      }));
    }
  }

  handleEditAnswer(answer, index) {
    if (answer) {
      let scenes = this.state.flow.scenes;
      let scene = scenes.find(
        (x, index) => index === this.state.selected.scene
      );
      let step = scene.steps.find(
        (x, index) => index === this.state.selected.step
      );
      step.answers[index] = answer;
      this.setState(prevState => ({
        flow: { scenes: scenes }
      }));
    }
  }

  handleAddScene() {
    let new_id =
      (this.state.flow.scenes[this.state.flow.scenes.length - 1].id || 0) + 1;
    let newScene = {
      id: new_id,
      title: "Scene#" + new_id,
      steps: [
        {
          id: 1,
          question: "Question",
          answer: "Answer"
        }
      ]
    };

    this.setState(prevState => ({
      flow: { scenes: [...prevState.flow.scenes, newScene] }
    }));
  }

  handleRemoveScene(index) {
    let scenes = this.state.flow.scenes;
    if (scenes) {
      this.setState(prevState => ({
        flow: {
          scenes: scenes.filter((x, i) => i !== index)
        }
      }));
    }
  }

  handleAddStep() {
    let selected_scene = this.state.flow.scenes.find(
      (x, index) => index === this.state.selected.scene
    );

    let new_id =
      ((selected_scene.steps &&
        selected_scene.steps.length > 0 &&
        selected_scene.steps[selected_scene.steps.length - 1].id) ||
        0) + 1;
    const newstep = {
      id: new_id,
      question: "Question",
      answer: "Answer"
    };

    let scenes = this.state.flow.scenes;
    let selectedScene = scenes.find(
      (x, index) => index === this.state.selected.scene
    );
    selectedScene.steps = [...selectedScene.steps, newstep];

    this.setState(prevState => ({
      flow: { scenes: scenes }
    }));
  }

  handleRemoveStep(index) {
    let scenes = this.state.flow.scenes;
    let selected_scene = scenes.find((x, i) => i === this.state.selected.scene);
    if (selected_scene) {
      selected_scene.steps = selected_scene.steps.filter((x, i) => i !== index);
      this.setState(prevState => ({
        flow: {
          scenes: scenes
        }
      }));
    }
  }

  handleAddAnswer() {
    let scenes = this.state.flow.scenes;
    let scene = this.state.flow.scenes.find(
      (x, index) => index === this.state.selected.scene
    );

    let steps = scene.steps;
    let selected_step = steps.find(
      (x, index) => index === this.state.selected.step
    );

    if (!selected_step.answers || selected_step.answers.length === 0) {
      selected_step.answers = [""];
      this.setState(prevState => ({
        flow: { scenes: scenes }
      }));
    } else {
      selected_step.answers = [...selected_step.answers, " "];
      this.setState(prevState => ({
        flow: { scenes: scenes }
      }));
    }
  }

  handleRemoveAnswer(index) {
    let scenes = this.state.flow.scenes;
    let step = this.state.flow.scenes
      .find((x, index) => index === this.state.selected.scene)
      .steps.find((x, index) => index === this.state.selected.step);
    if (step) {
      step.answers = step.answers.filter((x, i) => i !== index);
      this.setState(prevState => ({
        flow: { scenes: scenes }
      }));
    }
  }

  getScenes() {
    return this.state.flow.scenes;
  }

  getSelectedSceneIndex() {
    return this.state.selected.scene;
  }

  getSteps() {
    let scenes = this.state.flow.scenes;
    let selected_scene_index = this.state.selected.scene;
    if (!scenes) return;

    let selected_scene = scenes.find(
      (x, index) => index === selected_scene_index
    );
    if (!selected_scene || !selected_scene.steps) return;

    let steps = selected_scene.steps;
    return steps;
  }

  getSelectedStepIndex() {
    return this.state.selected.step;
  }

  getSelectedScene() {
    let scenes = this.state.flow.scenes;
    let selected_scene_index = this.state.selected.scene;

    let selected_scene = scenes.find(
      (x, index) => index === selected_scene_index
    );

    return selected_scene;
  }

  getSelectedStep() {
    let scenes = this.state.flow.scenes;
    let selected_scene_index = this.state.selected.scene;
    let selected_step_index = this.state.selected.step;

    let selected_scene = scenes.find(
      (x, index) => index === selected_scene_index
    );

    let selected_step = selected_scene.steps.find(
      (x, index) => index === selected_step_index
    );

    return selected_step;
  }

  render() {
    if (!this.state.flow) {
      return <Loading />;
    }

    return (
      <div className="flow-viewer">
        <Selector
          accentColor="#9b27af"
          title="Scenes"
          data={this.getScenes()}
          keyToView={"title"}
          selectedIndex={this.getSelectedSceneIndex()}
          handleSelectItem={this.selectScene}
          handleAddItem={this.handleAddScene}
          handleRemoveItem={this.handleRemoveScene}
        />
        <Selector
          accentColor="#ffa000"
          title="Steps"
          data={this.getSteps()}
          keyToView={"question"}
          selectedIndex={this.getSelectedStepIndex()}
          handleSelectItem={this.selectStep}
          handleAddItem={this.handleAddStep}
          handleRemoveItem={this.handleRemoveStep}
        />

        <Card
          title={"Editor"}
          accentColor={"#304ffe"}
          button={{ text: "Save", onClick: () => this.handleSave() }}
        >
          <Editor
            scene={this.getSelectedScene()}
            step={this.getSelectedStep()}
            handleAddAnswer={() => this.handleAddAnswer()}
            handleRemoveAnswer={this.handleRemoveAnswer}
            handleEditCommand={this.handleEditCommand}
            handleEditQuestion={this.handleEditQuestion}
            handleEditAnswer={this.handleEditAnswer}
          />
        </Card>
      </div>
    );
  }
}

export default FlowViewer;
