const apiKey = "0b2997b95f78285cd7dacee7688f011e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&q=";

const searchInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherBox = document.getElementById("weather-box");
const errorMsg = document.getElementById("error-msg");
weatherBox.style.display = "none";

function updateBackground(weatherMain) {
    document.body.className = ""; 
    if (weatherMain === "Clear") {
        document.body.classList.add("clear");
    } else if (weatherMain === "Clouds") {
        document.body.classList.add("clouds");
    } else if (weatherMain === "Rain" || weatherMain === "Drizzle" || weatherMain === "Thunderstorm") {
        document.body.classList.add("rain");
    } else if (weatherMain === "Mist" || weatherMain === "Haze" || weatherMain === "Fog") {
        document.body.classList.add("mist");
    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherBox.style.display = "none";
            document.body.className = ""; 
            document.body.style.backgroundImage = "url('Untitled design.jpg')"; 
            document.body.style.backgroundPosition = "right center";
        } else {
            const data = await response.json();
            document.getElementById("city-name").innerText = data.name;
            document.getElementById("temperature").innerText = Math.round(data.main.temp);
            document.getElementById("humidity").innerText = data.main.humidity + "%";
            document.getElementById("weather-desc").innerText = data.weather[0].description;
            document.body.style.backgroundImage = ""; 
            document.body.style.backgroundPosition = "";
            updateBackground(data.weather[0].main);

            errorMsg.style.display = "none";
            weatherBox.style.display = "block";
        }
    } catch (error) {
        console.error("Gagal mengambil data dari OpenWeather API:", error);
        errorMsg.innerText = "Terjadi kesalahan jaringan. Silakan coba lagi.";
        errorMsg.style.display = "block";
        weatherBox.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim() !== "") {
        checkWeather(searchInput.value);
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchInput.value.trim() !== "") {
        checkWeather(searchInput.value);
    }
});