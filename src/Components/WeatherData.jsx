import axios from "axios";
import { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";

import hazeImg from "../images/haze.png";
import drizzleImg from "../images/drizzle.png";
import humidityImg from "../images/humidity.png";
import mistImg from "../images/mist.png";
import rainImg from "../images/rain.png";
import snowImg from "../images/snow.png";
import windImg from "../images/wind.png";
import clearImg from "../images/clear.png";
import cloudsImg from "../images/clouds.png";
import dustImg from "../images/dust.png";
import fogImg from "../assets/fog.png";
import smokeImg from "../assets/smoke.png";
import { IoSearchCircleSharp } from "react-icons/io5";

export const WeatherData = () => {
  const [city, setCity] = useState("mumbai");
  const [selectedInput, setSelectedInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const [error, setError] = useState("");

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0014066d08022922e0730f829e324e0a`
      );
      console.log(response);
      if (response.status === 200) {
        setWeatherData(response.data);
        setError("");
      }
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        setError("City not found");
      }
    }
  };
  useEffect(() => {
    getWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSearchByCity = () => {
    setCity(selectedInput);
  };

  const icon = {
    smoke: smokeImg,

    haze: hazeImg,

    humidity: humidityImg,

    mist: mistImg,

    rain: rainImg,

    snow: snowImg,

    wind: windImg,

    clouds: cloudsImg,

    clear: clearImg,

    drizzle: drizzleImg,

    fog: fogImg,

    dust: dustImg,
  };

  const iconToDisplay = icon?.[weatherData?.weather[0]?.main?.toLowerCase()];

  return (
    <div className="w-full h-[100vh] bg-violet-100 flex flex-col items-center space-y-64">
      <div className="flex flex-row items-center justify-center pt-10 pb-10 rounded-3xl sm:w-full lg:w-[450px] bg-black-300 backdrop-blur-sm bg-opacity-30 fixed top-20 shadow-violet-600 shadow-lg bg-slate-50 bg-gradient-to-r from-violet-400 to-violet-800">
        <div className="flex flex-row items-center justify-center sm:gap-2 lg:gap-4 ">
          <input
            type="search"
            value={selectedInput}
            placeholder="Enter city name"
            onChange={(e) => setSelectedInput(e.target.value)}
            className=" outline-none w-[320px] text-teal pl-4 py-2 pr-4 rounded-full shadow-lg shadow-violet-600 "
          />
          <span
            className="text-5xl text-violet-600	bg-white hover:text-violet-800 rounded-full shadow-lg shadow-slate-600"
            onClick={() => handleSearchByCity()}
          >
            <IoSearchCircleSharp />
          </span>
        </div>
      </div>
      {!error ? (
        <div className="bg-slate-100 backdrop-blur-sm bg-opacity-30 rounded-3xl sm:w-full lg:w-[450px]  flex flex-col items-center justify-center  pb-6 shadow-violet-600 shadow-lg bg-gradient-to-r from-violet-400 to-violet-800 ">
          <div>
            <div className="flex flex-col items-center justify-center mb-4">
              <img src={iconToDisplay} alt="cloudy" width={150} height={150} />
              <p className="text-white font-semibold text-lg">
                {weatherData?.weather[0]?.main}
              </p>
            </div>
            <div className="text-6xl text-white font-bold pb-2">
              {Math?.round(weatherData?.main?.temp)}°c
            </div>
            <div className="text-white font-bold text-4xl flex flex-row gap-2 pt-2">
              <span>
                <IoLocation />
              </span>
              <p>{weatherData?.name}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 mt-8">
            <div className="border-indigo-800 rounded-lg shadow-lg shadow-gray-800 flex flex-row gap-3 px-4 py-6">
              <div className="pt-2">
                <img
                  src={humidityImg}
                  alt="humidityicon"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col items-start justify-start ">
                <div className="text-white font-semibold text-xl">
                  <p>{Math.round(weatherData?.main?.humidity)} %</p>
                </div>
                <div className="text-white font-semibold text-lg">
                  <p>Humidity</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2  ">
              <div className=" border-indigo-800 rounded-lg shadow-lg shadow-gray-800 flex flex-row gap-3 px-4 py-6">
                <div className="">
                  <img src={windImg} alt="windicon" width={50} height={50} />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="text-white font-semibold text-xl">
                    <p>{weatherData?.wind?.speed} km/h</p>
                  </div>
                  <div className="text-white font-semibold text-lg">
                    <p>wind speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm"> {error}</p>
      )}
    </div>
  );
};
