import "./styles.css";
import { getWeatherData, getWeatherToday, getWeatherWeek } from "./weather";
import {
  displayCityInfo,
  displayTodayForecast,
  displayWeekForecast,
  displayError,
  displayLoading,
  resetDisplay,
} from "./user-interface";

let tempUnit = "metric";

const formInput = document.querySelector("form>input");
const formSubmitButton = document.querySelector("form>button[type='submit']");
const formUnitButton = document.querySelector(".temp-unit");

formSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();

  const weatherData = getWeatherData(formInput.value, tempUnit);
  showWeather(weatherData);
});

formUnitButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (tempUnit === "metric") {
    formUnitButton.textContent = "°F";
    formUnitButton.value = "F";
    tempUnit = "us";
  } else if (tempUnit === "us") {
    formUnitButton.textContent = "°C";
    formUnitButton.value = "C";
    tempUnit = "metric";
  }

  if (formInput.value !== "") {
    const weatherData = getWeatherData(formInput.value, tempUnit);
    showWeather(weatherData);
  }
});

function showWeather(weatherData) {
  displayLoading();

  weatherData
    .then((response) =>
      Promise.all([getWeatherToday(response), getWeatherWeek(response)]).then(
        (response) => {
          resetDisplay();
          
          const todayForecast = response[0];
          const weekForecast = response[1];

          displayCityInfo(todayForecast);
          displayTodayForecast(todayForecast, tempUnit);
          displayWeekForecast(weekForecast, tempUnit);
        }
      )
    )
    .catch(() => displayError("Something Wrong Happened!"));
}
