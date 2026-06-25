const apiKey = "0b2997b95f78285cd7dacee7688f011e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&q=";

const searchInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherBox = document.getElementById("weather-box");
const errorMsg = document.getElementById("error-msg");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherBox.style.display = "none";
        } else {
            const data = await response.json();
            document.getElementById("city-name").innerText = data.name;
            document.getElementById("temperature").innerText = Math.round(data.main.temp);
            document.getElementById("humidity").innerText = data.main.humidity + "%";
            document.getElementById("weather-desc").innerText = data.weather[0].description;

            errorMsg.style.display = "none";
            weatherBox.style.display = "block";
        }
    } catch (error) {
        console.error("Gagal mengambil data dari OpenWeather API:", error);
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
checkWeather(searchInput.value);