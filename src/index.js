import './style.css';
const input = document.querySelector(".location");
const button = document.querySelector("button");
const location = document.querySelector(".information-location");
const temperature = document.querySelector(".information-temp");
const description = document.querySelector(".information-desc");

async function fetchData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=AV9JRG7GAE9UQN322VK9FXJDK&contentType=json`, {mode: "cors"});
        
        if (!response.ok) {
            throw new Error("Resource unnavailable.");
        }

        const data = await response.json();

        return data;
    }
    catch (error) {
        console.log(error);
    }
};

function convertToCelcius(temp) {
    return (temp - 32) * 5 / 9;
}

function returnFormattedTemp(temp) {
    return Math.floor(convertToCelcius(temp)) + "°C"
}

button.addEventListener("click", () => {
    fetchData(input.value)
        .then((response) => {
            console.log(response);
            location.textContent = response.address;
            temperature.textContent = returnFormattedTemp(response.currentConditions.temp);
            description.textContent = response.description;
        })
        .catch((e) => {
            alert(`Never heard of that place before...`);
        })
})

window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
})