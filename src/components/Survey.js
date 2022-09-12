import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField
} from "@mui/material";
import { Component } from "react";
import { questions } from "../questions";

export default class Survey extends Component {
  constructor() {
    super();
    this.state = {
      userId: 0,
      currentQuestion: 1,
      responses: {},
      isSubmit: false,
      textInp: ""
    };
  }

  componentDidMount() {
    this.setState({
      userId: Math.floor(Math.random() * 1000000)
    });
  }

  prev = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion - 1
    });
  };

  next = () => {
    if (this.state.currentQuestion !== questions.length)
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      });
    else {
      this.setState({
        isSubmit: true
      });
    }
  };

  addResponse = (ans) => {
    let addAns = {
      userId: this.state.userId,
      questionId: this.state.currentQuestion,
      answer: ans,
      isCompleted: false
    };

    let post = JSON.stringify(addAns);

    const url = "https://no9i2ulh2j.execute-api.ap-south-1.amazonaws.com/dev";
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(post);

    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log("Data updated");
      }
      console.log(xhr.status);
    };

    if (this.state.currentQuestion !== questions.length) this.next();
  };

  updateIsSubmit = (status) => {
    this.setState({
      isSubmit: status
    });
  };

  submitSurvey = () => {
    let submitData = {
      userId: this.state.userId,
      isCompleted: true
    };

    let post = JSON.stringify(submitData);

    const url = "https://no9i2ulh2j.execute-api.ap-south-1.amazonaws.com/dev";
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(post);

    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log("Data updated");
      }
      console.log(xhr.status);
    };

    this.props.updateStage("thankyou");
  };

  submitText = () => {
    let addAns = {
      userId: this.state.userId,
      questionId: this.state.currentQuestion,
      answer: this.state.textInp,
      isCompleted: false
    };

    let post = JSON.stringify(addAns);

    const url = "https://no9i2ulh2j.execute-api.ap-south-1.amazonaws.com/dev";
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(post);

    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log("Data updated");
      }
      console.log(xhr.status);
    };

    if (this.state.currentQuestion !== questions.length) this.next();
  };

  render() {
    const { currentQuestion } = this.state;
    return (
      <div className="survey">
        <h1>Customer Survey</h1>
        <div className="questionPos">
          {currentQuestion} / {questions.length}
        </div>
        <div className="questions">
          <div className="qNo">{currentQuestion}.</div>
          <div className="question">
            {questions[currentQuestion - 1].question}
          </div>
        </div>
        {questions[currentQuestion - 1].type === "rating" ? (
          <div className="ratings">
            {questions[currentQuestion - 1].ratings?.map((rating, i) => (
              <div
                key={i + ""}
                className="rating"
                onClick={() => this.addResponse(i)}
              >
                {rating}
              </div>
            ))}
          </div>
        ) : questions[currentQuestion - 1].type === "text" ? (
          <div>
            <TextField
              id="filled-multiline-static"
              label="Your Response"
              multiline
              rows={4}
              variant="filled"
              className="text"
              value={this.state.textInp}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ textInp: value });
              }}
            />
            <div>
              <Button variant="contained" onClick={this.submitText}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="action">
          {currentQuestion !== 1 ? (
            <Button
              variant="contained"
              className="actionButtons"
              onClick={this.prev}
            >
              Prev
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            variant="contained"
            className="actionButtons"
            onClick={this.next}
          >
            {currentQuestion !== questions.length ? "Next" : "Submit"}
          </Button>
        </div>
        <Dialog
          open={this.state.isSubmit}
          onClose={() => this.updateIsSubmit(false)}
        >
          <DialogTitle>Do you want to submit Survey</DialogTitle>
          <DialogActions>
            <Button onClick={() => this.updateIsSubmit(false)}>Cancel</Button>
            <Button onClick={this.submitSurvey} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
