import { Component } from "react";

export default class ThankYou extends Component {
  componentDidMount() {
    setTimeout(() => this.props.updateStage("startPage"), 5000);
  }
  render() {
    return <h1>ThankYou</h1>;
  }
}
