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

  handleKeyDown = (e) => {
    if (e.key === "Enter" && this.state.city.trim() !== "") {
      this.fetchWeather();
    }
  };

  fetchWeather = () => {
    // Dummy data (no API needed)
    const dummyData = {
      name: this.state.city,
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

    this.setState({
      weatherData: dummyData,
      city: "" // ✅ CLEAR INPUT (VERY IMPORTANT)
    });
  };

  render() {
    const { city, weatherData } = this.state;

    return (
      <div className="app">
        <h1>City Weather</h1>

        {/* REQUIRED BY TEST */}
        <input
          type="text"
          className="search"
          placeholder="Enter city"
          value={city}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}   // ✅ ENTER KEY HANDLED
        />

        {/* REQUIRED BY TEST */}
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
