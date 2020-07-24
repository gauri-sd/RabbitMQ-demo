const request = require('request-promise');

exports.getWeather = async(cities)=> {
    let weather_data = [];
    
    //console.log(weather_data);
    //return weather_data;
    return new Promise(async(resolve,reject) => {
        for(let city_obj of cities){
            let city = city_obj.name;
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b5f28b1c9aac7832803766c896778d83`;
            let response_body = await request(url);
            let weather_json = JSON.parse(response_body);
            let weather = {
                city,
                temperature : Math.round(weather_json.main.temp),
                description : weather_json.weather[0].description
            };
            weather_data.push(weather);
        }
        resolve(weather_data);
    });
}

// const request = require('request');

// exports.getWeather = () => {
//     let city = 'Pune';
//     const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b5f28b1c9aac7832803766c896778d83`;
            
//     if(city){
//         return console.log("Please enter city name");
//     }

//     request(url, (error,response,payload) => {
//         const data = JSON.parse(payload);
//         console.log(`It's currently ${data.main.temp} outside`);
//     });
// }
