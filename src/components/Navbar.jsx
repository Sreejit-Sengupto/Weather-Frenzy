import React from "react";

function Navbar(props) {
    return (
        <div className="search--section">
        <h1>Weather Frenzy</h1>
        <div className="searchbar">
          <input
            type="text"
            onChange={props.handleChange}
            name="location"
            value={props.userInput}
            placeholder="Enter the location....."
            className="user--input"
            autoComplete="off"
          />
          <button onClick={props.getWeather} className="get--btn">
            Get
          </button>
        </div>
      </div>
    )
}

export default Navbar;