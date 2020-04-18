import React from "react";

function Options(props) {
  if (props.show) {
    return (
      <div className="optionsDialog py-2 border-bottom text-center bg-warning">
        <form className="optionsForm">
          <div className="form-check form-check-inline">
            <input
              checked={props.options.gif ? true : false}
              onChange={props.handleChange}
              className="form-check-input"
              type="checkbox"
              name="gif"
              id="gif"
            />
            <label className="form-check-label" htmlFor="gif">
              Gif
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              checked={props.options.comps ? true : false}
              onChange={props.handleChange}
              className="form-check-input"
              type="checkbox"
              name="comps"
              id="comps"
            />
            <label className="form-check-label" htmlFor="comps">
              Components
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              checked={props.options.classes ? true : false}
              onChange={props.handleChange}
              className="form-check-input"
              type="checkbox"
              name="classes"
              id="classes"
            />
            <label className="form-check-label" htmlFor="classes">
              Available Classes
            </label>
          </div>
        </form>
      </div>
    );
  } else return null;
}

export default Options;
