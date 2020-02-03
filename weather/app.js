window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let LocationTimezone= document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/9689495f9495c3c4a7dfb48d2b032389/37.8267,-122.4233`;
            fetch(api)
            .then(res =>{ 
                return res.json();
            })
            .then(data => { 
                console.log(data);
                const {temperature, summary, icon } = data.currently;
                // Set DOM Elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                LocationTimezone.textContent = data.timezone;
                // Set Icon
                setIcons(icon, documents.querySelector(".icon"));
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});