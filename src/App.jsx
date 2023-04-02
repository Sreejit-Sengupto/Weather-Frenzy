import { useState } from 'react'
import './App.css'

function App() {
  let apiKey = import.meta.env.VITE_API_KEY;
  
  // State to manage user input
  const [userInput, setUserInput] = useState({
    location: ""
  });

  // State to manage the data returned by the API
  const [data, setData] = useState([])

  // State to manage the city name sent by the GET METHOD of the API
  const [cityName, setCityName] = useState("");

  // To look for changes in the input field
  function handleChange(event) {
    const { name, value } = event.target;
    setUserInput(prevState => {
      return({
        ...prevState,
        [name]: value
      })
    })
  }


  function getWeather() {
    // GET METHOD of the Get city CODE API
    fetch(`
      http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09${apiKey}&q=${userInput.location}`
    )
     .then(response => response.json())

     // Passing the city code to the AccuWeather API
     .then(response => {
      fetch(`http://dataservice.accuweather.com/currentconditions/v1/${response[0].Key}?apikey=${apiKey}`)
       .then(response => response.json())
       .then(response => setData(response)) // Storing the API data in the state

       setCityName(response[0].LocalizedName) // Storing the city name returned from the GET CITY CODE API
     })
     .then(error => console.log(error))
  }


  return (
    <div className="App">
      <div className="search--section">
        <h1>Weather Frenzy</h1>
        <div className='searchbar'>
          <input type="text" onChange={handleChange} name='location' value={userInput.location} placeholder='Enter the location.....'className='user--input'autoComplete='off' />
          <button onClick={getWeather} className='get--btn'>Get</button>
        </div>
      </div>


      {data.length == 0 && <h1 className='prompt--text'>Type in your city or place....</h1>}


      {data.length !== 0 && <div className='display--section'>
        <div className='city--name--section'>
          <h1>{cityName}</h1>
          <div className='underliner'></div>
        </div>
        
        <div className="details">
          <div className='details--text'>
            <div>
              <p>TEMPERATURE</p>
            <div className="underliner"></div>
            </div>
            <p>{data[0].Temperature.Metric.Value}&#8451;</p>
          </div>

          <div className='details--text'>
            <div>
              <p>WEATHER TYPE</p>
            <div className="underliner"></div>
            </div>
            <p>{data[0].WeatherText}</p>
          </div>

          <div className='details--text'>
            <div>
              <p>PRECIPITATION</p>
            <div className="underliner"></div>
            </div>
            {data[0].HasPrecipitation ? <p>Precipitation expected</p> : <p>No Precipitation expected</p>}
          </div>

          <div className='details--text'>
          <div>
              <p>DOWNPOUR</p>
            <div className="underliner"></div>
            </div>
            {data[0].PrecipitationType ? <p>{data[0].PrecipitationType}</p> : <p>-</p>}
          </div>
        </div>
        <footer className='footer'>Get more weather details at <a href={data[0].Link} target='_blank'>AccuWeather</a></footer>
      </div>}

    </div>
  )
}

export default App
