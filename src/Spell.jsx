import React, { Component } from "react";
import { GIPHY_API_KEY } from "./util/global.js";
import NOIMAGE from "./images/sadboi.jpg";

class Spell extends Component {
  state = {
    image: "",
    imageIsLoaded: false,
  };
  componentDidMount() {
    fetch(
      "http://api.giphy.com/v1/gifs/random?api_key=" +
        GIPHY_API_KEY +
        "&tag=" +
        encodeURI(this.props.spell.name) +
        "&rating=G"
    )
      .then((res) => res.json())
      .then((gif) => {
        if (gif.data.images !== undefined) {
          return this.setState({
            image: gif.data.images.fixed_height.url,
            imageIsLoaded: true,
          });
        } else {
          return this.setState({
            image: NOIMAGE,
            imageIsLoaded: true,
          });
        }
      });
  }

  makeImg = () => {
    if (this.state.imageIsLoaded) {
      return <img src={this.state.image} alt={this.props.spell.name} />;
    } else {
      return null;
    }
  };

  renderOptions() {
    let optionalInfo = [];
    const classDiv = (
      <div className="class">
        {this.props.spell.classes.map((dndClass) => {
          return <span>{dndClass.name} </span>;
        })}
      </div>
    );
    const compDiv = (
      <div className="comp">
        {this.props.spell.components.map((comp) => {
          return <span>{comp} </span>;
        })}
      </div>
    );
    const imageDiv = this.makeImg();
    if (this.props.options.classes) {
      optionalInfo.push(classDiv);
    }
    if (this.props.options.comps) {
      optionalInfo.push(compDiv);
    }
    if (this.props.options.gif) {
      optionalInfo.push(this.makeImg(this.makeImg()));
    }
    return optionalInfo.map((el) => el);
  }

  render() {
    return (
      <div className="container border spellResult">
        <div className="name">{this.props.spell.name}</div>
        <div className="school">{this.props.spell.school.name}</div>
        <div className="level">Level {this.props.spell.level}</div>
        <div className="range">Range: {this.props.spell.range}</div>
        <div className="components">{this.props.spell.components.length}</div>
        <div className="castingtime">{this.props.spell.casting_time}</div>
        <div className="duration">{this.props.spell.duration}</div>
        <div className="description">{this.props.spell.desc[0]}</div>
        {this.renderOptions()}
      </div>
    );
  }
}

export default Spell;
