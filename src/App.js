import { Component } from "react";
import StartPage from "./components/StartPage";
import Survey from "./components/Survey";
import ThankYou from "./components/ThankYou";
import "./styles.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      stage: "startPage",
      surveyMessage:
        "Please fill up this survey. It would take only few minutes."
    };
  }

  updateStage = (stage) => {
    this.setState({
      stage: stage
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.stage === "startPage" ? (
          <StartPage
            message={this.state.surveyMessage}
            updateStage={this.updateStage}
          />
        ) : this.state.stage === "survey" ? (
          <Survey updateStage={this.updateStage} />
        ) : (
          <ThankYou updateStage={this.updateStage} />
        )}
      </div>
    );
  }
}
