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
    let optionalInfo = {};
    optionalInfo.classDiv = (
      <div className="class col border-bottom border-dark">
        {this.props.spell.classes.map((dndClass) => {
          return (
            <span className="maroon font-weight-bold">{dndClass.name} </span>
          );
        })}
      </div>
    );
    optionalInfo.compDiv = (
      <div className="comp col">
        {" "}
        <span className="title">Components:</span>
        {this.props.spell.components.map((comp) => {
          return <span>{comp} </span>;
        })}
      </div>
    );
    optionalInfo.imageDiv = this.makeImg();
    return optionalInfo;
  }

  render() {
    let optionals = this.renderOptions();
    return (
      <div className="container spellResult mt-3 spellCard">
        <div className="spellHeader container border-bottom border-dark">
          <div className="row">
            <div className="col">
              <div className="name display-4">{this.props.spell.name}</div>
              <div className="school lead maroon text-weight bold">
                {this.props.spell.school.name}
              </div>
            </div>
            <div className="col">
              {this.props.options.gif && optionals.imageDiv}
            </div>
          </div>
        </div>

        <div className="container py-0 border-bottom border-dark">
          <div className="row">
            {this.props.options.classes && optionals.classDiv}
          </div>

          <div className="row">
            <div className="level col">
              <span className="title">Level </span>
              {this.props.spell.level}
            </div>
            <div className="col placeholder"></div>
            <div className="range col">
              <span className="title">Range: </span>
              {this.props.spell.range}
            </div>
          </div>

          <div className="row">
            <div className="castingtime col">
              <span className="title">Casting Time:</span>
              {this.props.spell.casting_time}
            </div>
            {this.props.options.comps || <div className="col"></div>}
            {this.props.options.comps && optionals.compDiv}
            <div className="duration col">
              <span className="title">Duration:</span>
              {this.props.spell.duration}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row border-bottom border-dark py-2 ">
            <div className="col-11">
              <div className="description ">{this.props.spell.desc[0]} </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-11 ">
              {this.props.spell.higher_level && (
                <div className="higherLevel ">
                  <span className="title">At Higher Levels:</span>
                  {this.props.spell.higher_level[0]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Spell;
