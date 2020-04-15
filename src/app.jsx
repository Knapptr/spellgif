import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    isLoaded: false,
    currentSpell: {},
    query: "",
  };
  searchForSpell() {
    fetch(`http://www.dnd5eapi.co/api/spells/?name=${this.state.query}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.results.length > 0) {
          return fetch(
            "http://www.dnd5eapi.co/api/spells/" + result.results[0].index
          )
            .then((res) => res.json())
            .then((spell) =>
              this.setState({ isLoaded: true, currentSpell: spell })
            );
        } else {
          this.setState({ isLoaded: false, currentSpell: result });
        }
      });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.searchForSpell();
  };
  showResults = (results) => {
    if (results.name) {
      return (
        <div>
          <h4>{results.name}</h4>
          <p>{results.desc}</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.query}
            name="query"
          />
          <button>Search!</button>
        </form>
        <div class="results">
          {this.state.isLoaded
            ? this.showResults(this.state.currentSpell)
            : "Error Loading"}
        </div>
      </div>
    );
  }
}
export default App;
