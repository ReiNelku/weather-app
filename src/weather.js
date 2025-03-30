export async function getWeatherData(location, unitGroup = "metric") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=HC3X4HPHRZNZX6DNTH28JJTCL`
    );
    const weatherData = await response.json();

    return weatherData;
  } catch (error) {
    throw new Error(error);
  }
}

export function getWeatherToday(weatherData) {
  const todayWeather = {
    condition: weatherData.currentConditions.conditions,
    description: weatherData.description,
    icon: weatherData.currentConditions.icon,
    feelslike: weatherData.currentConditions.feelslike,
    temperature: weatherData.currentConditions.temp,
    address: weatherData.resolvedAddress,
    windspeed: weatherData.currentConditions.windspeed,
  };

  return todayWeather;
}

export function getWeatherWeek(weatherData) {
  let weekWeather = [];

  for (let i = 1; i <= 8; i++) {
    let day = {};

    day.condition = weatherData.days[i].conditions;
    day.datetime = weatherData.days[i].datetime;
    day.icon = weatherData.days[i].icon;
    day.feelslike = weatherData.days[i].feelslike;
    day.temperature = weatherData.days[i].temp;
    day.windspeed = weatherData.days[i].windspeed;

    weekWeather.push(day);
  }

  return weekWeather;
}
