import React from "react";

export function About(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row maroon display-4">5ESpellRef</div>
          <p className="row maroon">
            By: <span className="font-weight-bold"> Tyler Knapp</span>
          </p>
          <h5 className="font-weight-bold">About:</h5>
          <p>A simple project to work with:</p>
          <ul>
            <li>Html Markup</li>
            <li>React</li>
            <li>Vim</li>
            <li>Fetch() api</li>
            <li>Bootstrap 4</li>
          </ul>
          <h5>How it Works</h5>
          <p>
            Spells are sourced from the DnD5eAPI. After submission, specific
            information is returned from a second call to the 5e api. If the GIF
            option is checked- a spell will be accompanied by a *random* Gif
            related to the name of the spell. At present, gifs are 3/10 times
            funny. Usually its fairly unrelated. Hallucinatory terrain and Alter
            Self usually yield good results.
          </p>
          <div className="row">
            <div classname="col">
              <button className="btn btn-link" onClick={props.toggle}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
