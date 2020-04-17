import React, { Component } from "react";
import "./App.css";
import Spell from "./Spell.jsx";
import Options from "./Options";

class App extends Component {
  state = {
    isLoaded: false,
    options: {
      gif: true,
      classes: false,
      comps: false,
    },
    showOptions: false,
    spellsList: [],
    query: "",
    currentSpell: {},
    spellSelected: false,
  };

  componentWillMount = () => {
    fetch("http://www.dnd5eapi.co/api/spells")
      .then((res) => res.json())
      .then((spells) => {
        this.setState({ spellsList: spells.results, isLoaded: true });
      });
  };

  createSpellOptions = () => {
    if (this.state.isLoaded) {
      return (
        <datalist id="spells">
          {this.state.spellsList.map((spell) => {
            return <option value={spell.name} />;
          })}
        </datalist>
      );
    } else return null;
  };

  submitSpell = (e) => {
    let spellName = e.target.query.value;
    e.preventDefault();
    this.setState({ spellSelected: false }, () => {
      fetch(
        "http://www.dnd5eapi.co/api/spells/" +
          this.state.spellsList.find((spell) => {
            return spell.name === spellName;
          }).index
      )
        .then((res) => res.json())
        .then((spell) => {
          this.setState({ currentSpell: spell, spellSelected: true });
        });
    });
  };

  displayResults = () => {
    if (!this.state.spellSelected) {
      return null;
    } else {
      return (
        <Spell options={this.state.options} spell={this.state.currentSpell} />
      );
    }
  };

  handleOptChange = (e) => {
    this.setState({
      options: {
        ...this.state.options,
        [e.target.name]: e.target.checked,
      },
    });
  };

  toggleOptionVisibility = () => {
    this.setState({ showOptions: !this.state.showOptions });
  };
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-light bg-light border-bottom">
          <ul className="nav">
            <li className="navbar-brand">5E SpellRef</li>
            <li>
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Github
              </a>
            </li>
          </ul>
        </nav>
        <div id="searchBar">
          <div id="searchTop">
            <form onSubmit={this.submitSpell}>
              {" "}
              <input
                className="form-control"
                type="text"
                name="query"
                id="query"
                list="spells"
              />
              {this.createSpellOptions()}
              <button className="form-control">Search</button>
            </form>
          </div>
          <div id="searchBottom">
            <button
              className="form-control btn btn-primary"
              onClick={this.toggleOptionVisibility}
            >
              Options
            </button>
          </div>
        </div>
        <Options
          options={this.state.options}
          show={this.state.showOptions}
          handleChange={this.handleOptChange}
        />
        {this.displayResults()}
      </div>
    );
  }
}
export default App;
