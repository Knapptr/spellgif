import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import "./styles/app.css";
import Spell from "./Spell.jsx";
import Options from "./Options";

class App extends Component {
  state = {
    isLoaded: false,
    options: {
      gif: false,
      classes: true,
      comps: true,
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
    e.preventDefault();
    document.activeElement.blur();
    const spellName = e.target.query.value;
    const spellFound = this.state.spellsList.find((spell) => {
      return spell.name === spellName;
    });
    let spellIndex = "";
    if (spellFound) {
      spellIndex = spellFound.index;
    }
    this.setState({ spellSelected: false }, () => {
      if (spellIndex) {
        fetch("http://www.dnd5eapi.co/api/spells/" + spellIndex)
          .then((res) => res.json())
          .then((spell) => {
            this.setState({
              currentSpell: spell,
              spellSelected: true,
              errorMsg: "",
              query: "",
            });
          });
      } else {
        this.setState({
          spellSelected: true,
          currentSpell: null,
          errorMsg: "Spell not found",
        });
      }
    });
  };

  displayResults = () => {
    if (!this.state.spellSelected) {
      return null;
    } else if (this.state.errorMsg) {
      return <div>Spell not found</div>;
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
  handleSearchChange = (e) => {
    this.setState({ query: e.target.value });
  };
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-light bg-light border-bottom">
          <ul className="nav">
            <li className="navbar-brand">
              <FontAwesomeIcon icon={faHatWizard} /> 5E SpellRef
            </li>
            <li>
              <a className="nav-link" href="/">
                About
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
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
                className="form-control searchBarLarge"
                type="text"
                name="query"
                id="query"
                value={this.state.query}
                list="spells"
                onChange={this.handleSearchChange}
              />
              {this.createSpellOptions()}
              <button className="form-control btn btn-success">Search</button>
            </form>
          </div>
          <div id="searchBottom">
            <button
              className="form-control btn btn-primary"
              onClick={this.toggleOptionVisibility}
            >
              Options <FontAwesomeIcon icon={faChevronDown} />
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
