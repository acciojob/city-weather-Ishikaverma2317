import React, { Component } from "react";
import "../styles/App.css";

const API_KEY = "YOUR_API_KEY_HERE";

class App extends Component {
  state = {
    city: "",
    weatherData: null,
    error: ""
  };

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  fetchWeather = async () => {
    const { city } = this.state;
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        this.setState({ error: "City not found", weatherData: null });
        return;
      }

      this.setState({ weatherData: data, error: "" });
    } catch (err) {
      this.setState({ error: "Something went wrong" });
    }
  };

  render() {
    const { weatherData, error } = this.state;

    return (
      <div className="app">
        <h1>City Weather</h1>

        {/* Search Input */}
        <input
          type="text"
          className="search"
          placeholder="Enter city name"
          onChange={this.handleChange}
        />
        <button onClick={this.fetchWeather}>Search</button>

        {/* Weather Output */}
        {weatherData && (
          <div className="weather">
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>{weatherData.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default App;
