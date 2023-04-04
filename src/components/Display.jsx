import React from "react";

function Display(props) {
  return (
    <>
      {props.data.length == 0 && (
        <h1 className="prompt--text">Type in your city or place....</h1>
      )}

      {props.data.length !== 0 && (
        <div className="display--section">
          <div className="city--name--section">
            <h1>{props.cityName}</h1>
            <div className="underliner"></div>
          </div>

          <div className="details">
            <div className="details--text">
              <div>
                <p>TEMPERATURE</p>
                <div className="underliner"></div>
              </div>
              <p>{props.data[0].Temperature.Metric.Value}&#8451;</p>
            </div>

            <div className="details--text">
              <div>
                <p>WEATHER TYPE</p>
                <div className="underliner"></div>
              </div>
              <p>{props.data[0].WeatherText}</p>
            </div>

            <div className="details--text">
              <div>
                <p>PRECIPITATION</p>
                <div className="underliner"></div>
              </div>
              {props.data[0].HasPrecipitation ? (
                <p>Precipitation expected</p>
              ) : (
                <p>No Precipitation expected</p>
              )}
            </div>

            <div className="details--text">
              <div>
                <p>DOWNPOUR</p>
                <div className="underliner"></div>
              </div>
              {props.data[0].PrecipitationType ? (
                <p>{props.data[0].PrecipitationType}</p>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
          <footer className="footer">
            Get more weather details at{" "}
            <a href={props.data[0].Link} target="_blank">
              AccuWeather
            </a>
          </footer>
        </div>
      )}
    </>
  );
}

export default Display;
