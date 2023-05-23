import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Display from "./components/Display";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey);

  // State to manage user input
  const [userInput, setUserInput] = useState("");

  // State to manage the data returned by the API
  const [displayData, setDisplayData] = useState([]);

  // State to manage the city name sent by the GET METHOD of the API
  const [cityName, setCityName] = useState("");

  // To look for changes in the input field
  function handleChange(event) {
    setUserInput(event.target.value);
  }

  console.log(userInput);
  function getWeather() {
    // GET METHOD of the Get city CODE API
    fetch(`
      http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09${apiKey}&q=${userInput}`)
      .then((response) => response.json())

      // Passing the city code to the AccuWeather API
      .then((response) => {
        fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${response[0].Key}?apikey=${apiKey}`
        )
          .then((response) => response.json())
          .then((response) => setDisplayData(response)); // Storing the API data in the state

        setCityName(response[0].LocalizedName); // Storing the city name returned from the GET CITY CODE API
      })
      .then((error) => console.log(error));
  }

  return (
    <div className="App">
      <Navbar handleChange={handleChange} userInput={userInput} getWeather={getWeather} />
      <Display cityName={cityName} data={displayData} />
    </div>
  );
}

export default App;
