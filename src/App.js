import "./App.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card, Button } from "reactstrap";

function App() {
  let zip = null;
  const api_url = `https://api.openweathermap.org/data/2.5/forecast?zip=${
    zip ? zip : 37221
  },us&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const [weather, setWeather] = useState([]);
  const [cityName, setCityName] = useState("");
  useEffect(() => {
    const getCityName = async () => {
      const res = await axios(api_url);
      setCityName(res.data.city.name);
    };
    getCityName();
  }, []);
  useEffect(() => {
    const getApiData = async () => {
      const res = await axios(api_url);
      setWeather(res.data.list);
    };
    getApiData();
    console.log(weather, "a test will go here");
  }, []);
  useEffect(() => {
    const getIconUrl = () => {
      weather.slice(0, 5).map((w) => {
        w.weather.map((l) => l.icon);
      });
    };
    getIconUrl();
  }, []);

  const temperatureConverter = (num) => {
    num = parseInt(num);
    return Math.round((num - 273.15) * 1.8 + 32);
  };

  return (
    <div className="App">
      {cityName ? cityName : <></>}{" "}
      <div className="weather_cards">
        {weather.slice(0, 5).map((w) => (
          <Card>
            
            <div>
              {w.weather.map((l) => (
                <img
                  src={`http://openweathermap.org/img/wn/${l.icon}@2x.png`}
                />
              ))}
            </div>
            MAX {temperatureConverter(w.main.temp_max)}
            {"\xB0"}F MIN {temperatureConverter(w.main.temp_min)}
            {"\xB0"}F
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
