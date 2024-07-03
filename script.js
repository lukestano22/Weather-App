// Selecting elements from the HTML
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '72855f9afa1560f89f756d504a0e314d';


// Event listener for form submission
weatherForm.addEventListener('submit', async event => {
    event.preventDefault();

    // Gets the city name from the input field
    const city = cityInput.value;

    if(city){
        try{
            // Fetch weather data for the entered city
            const weatherData = await getWeatherData(city);
            // Display weather informatino on the card
            displayWeatherInfo(weatherData);
        }
        catch(error){
            // Handle errors, ex: if city name is not valid
            console.error(error);
            displayError(error);
        }

    }
    else{
        // displays error if no city is entered
        displayError('Please enter a city')
    }
})

// function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Make the API request and handle errors
    const response = await fetch(apiUrl);


    if (!response.ok){
        throw new Error('Could not fetch weather data');

    }

    // Return the parsed JSON response
    return await response.json();
}

// Function to display weather information on card
function displayWeatherInfo(data){

    // Destructuring data to extraxt relevant info
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;

    // Clearing existing content in the card and make it visible
    card.textContent = '';
    card.style.display = 'flex';

    // Create and display elements with weather info
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp -273.15) * 1.8 + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    // Add styling to created elements
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');

    // Append elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// function to get an emoji based on weather conditions
function getWeatherEmoji(weatherId){
    // Switch case to map weather ids to emojis
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // ThunderStorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";// Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";// Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";// Snow
        case (weatherId >= 700 && weatherId < 800):
            return "💨";// Atmosphere
        case (weatherId == 800):
            return "☀️";// Clear sky
        case (weatherId > 800 && weatherId < 900):
            return "☁️";// Clouds
        default:
            return "⁉️";// Unknown
    }

}
// Function to display an error message on the card
function displayError(message){

    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    // Clear existing content in the card and show the error
    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}