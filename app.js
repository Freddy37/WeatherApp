window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature button');
    let windSuperSpeed = document.querySelector('.windspeed');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/" //just bc fetching api doesn't work on localhost
            const api = `${proxy}https://api.darksky.net/forecast/f71ebaad2e269fd9f0fee62d079975a9/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                
                    //curly brackets bc it's an object so I can just put anything from object to brackets
                    const {temperature, summary, icon, windSpeed } = data.currently;

                    //set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    windSuperSpeed.textContent = windSpeed + " m/s Current Wind Speed";

                    //formula for celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //set icon
                    setIcons(icon, document.querySelector('.icon'));

                    //change F to C°
                    temperatureSection.addEventListener('click', ()=> {
                        if(temperatureSpan.textContent === "F°"){
                            temperatureSpan.textContent = "C°";
                            temperatureDegree.textContent = Math.round(celsius *100) / 100;
                        } else {
                            temperatureSpan.textContent = "F°";
                            temperatureDegree.textContent = Math.round(temperature *100) / 100;
                        }
                    });
                });
        });

        } else {
                h1.textContent = "you have to allow your GPS location on pop up in browser"
            };

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});