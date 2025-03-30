const main = document.querySelector("main");

const titleCity = document.querySelector(".title>h1");
const titleDescription = document.querySelector(".title>p");

export function displayCityInfo({ address, description }) {
  titleCity.textContent = address;
  titleDescription.textContent = description;
}

export function displayTodayForecast(todayForecast, tempUnit) {
  const todayForecastDiv = document.createElement("div");
  todayForecastDiv.classList.add("today");
  main.appendChild(todayForecastDiv);

  const cardTitle = "Today";

  generateCard(todayForecast, cardTitle, tempUnit, todayForecastDiv);
}

export function displayWeekForecast(weekForecast, tempUnit) {
  const weekForecastDiv = document.createElement("div");
  weekForecastDiv.classList.add("week");
  main.appendChild(weekForecastDiv);

  const weekForecastTitle = document.createElement("h2");
  weekForecastTitle.textContent = "Next Week Forecast";
  weekForecastDiv.appendChild(weekForecastTitle);

  const weekForecastCards = document.createElement("div");
  weekForecastCards.classList.add("week-cards");
  weekForecastDiv.appendChild(weekForecastCards);

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  weekForecast.forEach((weatherData) => {
    const date = new Date(weatherData.datetime);
    const day = weekday[date.getDay()];
    generateCard(weatherData, day, tempUnit, weekForecastCards);
  });
}

function generateCard(
  { condition, icon, feelslike, temperature, windspeed },
  title,
  tempUnit,
  cardList
) {
  const card = document.createElement("div");
  card.classList.add("card");
  cardList.appendChild(card);

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;
  card.appendChild(cardTitle);

  const cardIcon = document.createElement("img");
  import(`./Icons/${icon}.svg`).then((module) => {
    cardIcon.src = module.default;
  });
  cardIcon.classList.add("card-icon");
  card.appendChild(cardIcon);

  const cardCondition = document.createElement("p");
  cardCondition.classList.add("card-condition");
  cardCondition.textContent = condition;
  card.appendChild(cardCondition);

  const cardInfoDiv = document.createElement("div");
  cardInfoDiv.classList.add("card-info");
  card.appendChild(cardInfoDiv);

  const cardTemperature = document.createElement("p");
  cardTemperature.classList.add("card-temperature");
  cardTemperature.textContent =
    tempUnit === "metric"
      ? `Temperature: ${temperature}°C / ${feelslike}°C`
      : `Temperature: ${temperature}°F / ${feelslike}°F`;
  cardInfoDiv.appendChild(cardTemperature);

  const cardWindspeed = document.createElement("p");
  cardWindspeed.classList.add("card-wind");
  cardWindspeed.textContent =
    tempUnit === "metric"
      ? `Windspeed: ${windspeed} m/s`
      : `Windspeed: ${windspeed} mph`;
  cardInfoDiv.appendChild(cardWindspeed);
}

export function resetDisplay() {
  titleCity.textContent = "Get Weather";
  titleDescription.textContent = "Your weather application of choice";

  main.textContent = "";
}

export function displayError(errorMessage) {
  resetDisplay();

  const error = document.createElement("h2");
  error.classList.add("error");
  error.textContent = errorMessage;
  main.appendChild(error);
}

export function displayLoading() {
  resetDisplay();

  const loading = document.createElement("h2");
  loading.classList.add("loading");
  loading.textContent = "Loading...";
  main.appendChild(loading);
}
