async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return alert("Enter a city");


  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) return alert("City not found");
  const { latitude, longitude, name } = geoData.results[0];


  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
  const weatherData = await weatherRes.json();


  document.getElementById('cityName').textContent = name;
  document.getElementById('temperature').textContent = weatherData.current_weather.temperature;


  const tbody = document.getElementById('forecastTable');
  tbody.innerHTML = '';
  const { time, temperature_2m_min, temperature_2m_max, precipitation_sum } = weatherData.daily;
  for (let i = 0; i < time.length; i++) {
    tbody.innerHTML += `<tr>
      <td>${time[i]}</td>
      <td>${temperature_2m_min[i]}</td>
      <td>${temperature_2m_max[i]}</td>
      <td>${precipitation_sum[i]}</td>
    </tr>`;
  }
}
document.getElementById('getWeatherBtn').addEventListener('click', getWeather); 