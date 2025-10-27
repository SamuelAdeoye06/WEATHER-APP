// let loader = document.getElementById('loader')
        // loader.style.display = "block"
        const getCountries = async () => {
            const url = 'https://country-state-city-search-rest-api.p.rapidapi.com/allcountries';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'c8ef807c1bmshe26fceca56e567bp1ba0a3jsna890848659aa',
                    'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                // loader.style.display = "none"
                

                result.forEach(country => {
                     myScreen.innerHTML += `
                         <option value="${country.isoCode}">${country.name}</option>
                     `
                 });
            } catch (error) {
                console.error(error);
            }
        }
        getCountries()

        const getState = async (countryCode) => {
            if (!countryCode) {
                myScreen2.innerHTML = `<option value="">Select State</option>`;
                myScreen2.style.display = "none"
                return;
            }

            const url = `https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode?countrycode=${countryCode}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'c8ef807c1bmshe26fceca56e567bp1ba0a3jsna890848659aa',
                    'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);

                myScreen2.innerHTML = `<option value = "">Select State</option>`
                myScreen2.style.display = "block"
                myScreen3.style.display = "none";

                result.forEach(state => {
                     myScreen2.innerHTML += `
                         <option value="${state.isoCode}" data-country="${countryCode}">${state.name}</option>
                     `
                 });
            } catch (error) {
                console.error(error);
            }
        }

        const getCity = async (countryCode, stateCode) => {
            // if (!countryCode || !stateCode) {
            //     myScreen3.innerHTML = `<option value="">Select City</option>`;
            //     myScreen3.style.display = "none";
            //     return;
            // }

            const url = `https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode?countrycode=${countryCode}&statecode=${stateCode}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'c8ef807c1bmshe26fceca56e567bp1ba0a3jsna890848659aa',
                    'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);

                // myScreen3.innerHTML = `<option value = "">Select City</option>`
                // myScreen2.style.display = "block"

                // result.forEach(city => {
                //      myScreen3.innerHTML += `
                //          <option value="${city.latitude},${city.longitude}">${city.name}</option>
                //      `
                //  });

                myScreen3.innerHTML = `<option value="">Select City</option>`;
                myScreen3.style.display = "block";


                result.forEach(city => {
                    if (city.latitude && city.longitude) {
                        myScreen3.innerHTML += `
                            <option value="${city.latitude},${city.longitude}">${city.name}</option>
                        `;
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        
        const displayWeather = (latLog) => { 

            const [lat, lon] = latLog.split(',');
            console.log('Latitude:', lat, 'Longitude:', lon);

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=faa3b74d58700a19f63c3a500cf3799c`)
            .then(response => response.json())
            .then(weather => {
                const city = weather.name;
                const country = weather.sys.country;
                const icon = weather.weather[0].icon;
                const condition = weather.weather[0].description;
                const temp = weather.main.temp.toFixed(1);
                const feelsLike = weather.main.feels_like.toFixed(1);


                // weatherScreen.innerHTML = `
                // <div class="weather-card text-center p-4 mt-4">
                //     <h2 id="location">${city}, ${country}</h2>
                //     <img id="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}" class="weather-icon my-2">
                //     <h1 id="temperature">${temp}°C</h1>
                //     <p id="condition" class="condition">${condition}</p>
                //     <p id="feels-like" class="feels-like">Feels like ${feelsLike}°C</p>
                // </div>
                // `

                weatherScreen.innerHTML = `
                    <div class="weather-card text-center p-4 mt-4">
                        <h2 id="location">${city}, ${country}</h2>
                        <img id="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}" class="weather-icon my-2">
                        <h1 id="temperature">${temp}°C</h1>
                        <p id="condition" class="condition">${condition}</p>
                        <p id="feels-like" class="feels-like">Feels like ${feelsLike}°C</p>

                        <hr>
                        <div class="row text-start mt-3">
                            <div class="col-6">
                                <p><strong>Humidity:</strong> ${weather.main.humidity}%</p>
                                <p><strong>Pressure:</strong> ${weather.main.pressure} hPa</p>
                                <p><strong>Clouds:</strong> ${weather.clouds.all}%</p>
                            </div>
                            <div class="col-6">
                                <p><strong>Wind:</strong> ${weather.wind.speed} m/s</p>
                                <p><strong>Visibility:</strong> ${(weather.visibility / 1000).toFixed(1)} km</p>
                                <p><strong>Sunrise:</strong> ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                <p><strong>Sunset:</strong> ${new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(error => console.error('Error:', error));
        }
        // displayWeather()

        const clearWeather = () => {
            weatherScreen.innerHTML = "";
        }

        