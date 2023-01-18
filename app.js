console.log("HI!");

// const createParaElement = async (countryProperty, countryContainer) => {
//     const countryProperty = document.createElement("p");
//     countryProperty.textContent = countryProperty;
// }

const displayCountries = async (jsonData) => {

    // Get the existing div with the countries, and if it exists, remove it
    const bigContainer = document.querySelector("#country-container");
    if (bigContainer !== null) {
        bigContainer.remove();
    }

    // Make a new div to contain the countries
    const countriesBigContainer = document.createElement("div");
    countriesBigContainer.id = "country-container";

    // For each country returned by the function, get its flag, name and population, appending it to a div for itself
    jsonData.forEach((country) => {
        const countryContainer = document.createElement("div");

        const flag = document.createElement("img");
        flag.src = `${country.flags.png}`;

        countryContainer.appendChild(flag);

        const textContainer = document.createElement("div");

        const countryName = document.createElement("h3");
        countryName.textContent = country.flag + " " + country.name.common;
        textContainer.appendChild(countryName);

        const countryPopulation = document.createElement("p");
        countryPopulation.textContent = "Population: " + country.population;
        textContainer.appendChild(countryPopulation);

        const countryCapital = document.createElement("p");
        countryCapital.textContent = "Capital: " + country.capital;
        textContainer.appendChild(countryCapital);

        const countryRegion = document.createElement("p");
        countryRegion.textContent = "Region: " + country.region;
        textContainer.appendChild(countryRegion);

        textContainer.classList.add("textContainer");

        countryContainer.appendChild(textContainer);

        countryContainer.classList.add("card");


        // Append the country to the countries div
        countriesBigContainer.appendChild(countryContainer);        
    })

    countriesBigContainer.classList.add("container");

    // Append the countries div to the document body
    document.body.appendChild(countriesBigContainer);

    // bigContainer.innerHTML(countriesBigContainer);

}

// Get the country form
const countryForm = document.querySelector("#country-selector");

// When the form is submitted, get the countries by name, and empty the form input area
const handleCountryFormSubmit = (event) => {
    event.preventDefault();
    
    document.querySelector("#fetch-progress").textContent = "";

    const input = event.target.country.value;

    if (event.target.country.value !== "") {
        getCountryByName(input);
    }
    else {
        getAllCountries();
    }
    
    event.target.country.value = null;
}

//Fetch the appopriate url for the inputted country via string interpolation
// const getCountryByName = async (countryName) => {
//     const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
//     const jsonData = await response.json();

//     displayCountries(jsonData);

//     console.log(jsonData);
// }

const getCountryByName = (countryName) => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        document.querySelector("#fetch-progress").textContent = "Fetching...";
        return response.json()
    })
    .then((jsonData) => {
        document.querySelector("#fetch-progress").textContent = "Completed";
        return displayCountries(jsonData)
    })
    .catch(() => {
        document.querySelector("#fetch-progress").textContent = "Error: invalid input";
    });
    
    
}

// Fetch all countries via appropriate url
const getAllCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await response.json();

    displayCountries(jsonData);

    console.log(jsonData);
}

// Add event listener to the form with the submit type
countryForm.addEventListener('submit', handleCountryFormSubmit);

getAllCountries();
// getCountryByName("united");
// getCountryByName("germany");
