import { Button } from "@mui/material";
import { Component } from "react";

export default class StartPage extends Component {
  render() {
    return (
      <div className="start-page">
        <h1>Welcome</h1>
        <div>{this.props.message}</div>
        <Button
          variant="contained"
          className="action"
          onClick={() => this.props.updateStage("survey")}
        >
          Start
        </Button>
      </div>
    );
  }
}
