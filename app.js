
const yargs=require('yargs');
const geocode=require('./geocode/geocode.js'); 
const weather=require('./weather/weather.js');
const argv=yargs
 .options({
  a:{
  	demand:true,
  	alias:'Address',
  	describe:'address to fetch weather for',
  	string:true
  }
})
 .help()
 .alias('help','h')
 .argv;

 //console.log(argv);
 geocode.geocodeAddress(argv.Address,(errorMessage,results)=>{
 	if(errorMessage){
 		console.log(errorMessage);
 	}else{
 		     console.log(results.address);
		    weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
			  	if(errorMessage){
			  		console.log(errorMessage);
			  	}else{
			  		console.log(`currently it is  ${weatherResults.temperature}.But feels like${weatherResults.apparentTemperature}`);
			  	}
			  });
 	}
 });
  weather.getWeather(30.349283,78.0509886,(errorMessage,weatherResults)=>{
  	if(errorMessage){
  		console.log(errorMessage);
  	}else{
  		console.log(JSON.stringify(weatherResults,undefined,2));
  	}
  });
//  //cd2a7f842cb9d42b522221f733e030a7

// const request=require('request');

// request({
// 	url:'https://api.darksky.net/forecast/cd2a7f842cb9d42b522221f733e030a7/30.349283,78.0509886',
// 	json:true
// },(error,response,body)=>{
//     if(error){
//     	console.log("Unable to connect to google servers");
//     }else if(response.statusCode===404||response.statusCode===403){
//     	console.log('Unable to fetch weather'); 
//     }else if(response.statusCode===200){
//     	console.log(`current temperature:${body.currently.temperature}`);
//     }
// 	//console.log(JSON.stringify(body,undefined,2));
	
// })