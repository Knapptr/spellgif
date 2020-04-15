import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  componentDidMount() {
    console.log("I've mounted baby!");
  }
  render() {
    return <h1>Working!</h1>;
  }
}
export default App;
