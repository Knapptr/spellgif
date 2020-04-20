import React from "react";

export function NotFound() {
  return (
    <div className="container my-5 bg-light ">
      <div className="row ">
        <div className="col text-center">
          <h4 className="maroon">Spell Not Found</h4>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h2>:(</h2>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <p>
            Make sure the spelling matches the spelling from the dropdown list
            provided. <br />
            If the spell is not listed, it is not in the database.
          </p>
        </div>
      </div>
    </div>
  );
}
