const body = document.body;
const searchInput = document.querySelector('.search-box__input');
const searchIcon = document.querySelector('.search-box__icon');
const weatherIcon = document.querySelector('.main__icon');

async function getData(location) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=eb0308ac37205e4215288756bee1d255`;
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error ->', error);
    }
}

async function processData(promise) {
    const object = {};
    await promise.then(response => {
        object.name = response.name;
        object.country = response.sys.country;
        object.date = response.dt;
        object.temp = response.main.temp;
        object.weather = response.weather[0];
        object.weather.id = (response.weather[0].main === 'Clear' ? 9 : parseInt((response.weather[0].id).toString().split('')[0]));
        object.wind = response.wind.speed;
        object.humidity = response.main.humidity;
    });
    return object;
}

function displayData(weatherData) {
    console.log('displayDataObject: ', weatherData);
    switch (weatherData.weather.id) {
        case 9:
            weatherIcon.src = './imgs/clear_icon.svg';
            break;
    }
}

function inputSubmit(e) {
    e.preventDefault();
    const someData = processData(getData(searchInput.value));
    console.log('inputSubmit: ', someData);
    displayData(someData);
}

searchIcon.addEventListener('click', inputSubmit);
searchInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        inputSubmit(e);
    }
});
