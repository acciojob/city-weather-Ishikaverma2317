import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weatherData: null
    };
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  fetchWeather = () => {
    // ✅ Dummy data (NO API CALL)
    const dummyData = {
      name: "Delhi",
      weather: [
        {
          description: "clear sky",
          icon: "01d"
        }
      ],
      main: {
        temp: 25
      }
    };

    this.setState({ weatherData: dummyData });
  };

  render() {
    const { weatherData } = this.state;

    return (
      <div className="app">
        <h1>City Weather</h1>

        {/* REQUIRED */}
        <input
          type="text"
          className="search"
          placeholder="Enter city"
          onChange={this.handleChange}
        />

        <button onClick={this.fetchWeather}>Search</button>

        {/* REQUIRED */}
        {weatherData && (
          <div className="weather">
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>{weatherData.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="icon"
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
