const apiKey = '886a79aeba9e2dc242fce85e28e42f6a'; // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('get-weather');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${description}</p>
    `;
}