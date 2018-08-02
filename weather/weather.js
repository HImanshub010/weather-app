const request=require('request');


var getWeather=(latitude,longitude,callback)=>{

request({
	url:`https://api.darksky.net/forecast/cd2a7f842cb9d42b522221f733e030a7/${latitude},${longitude}`,
	json:true
},(error,response,body)=>{
    if(error){
    	callback("Unable to connect to google servers");
    }else if(response.statusCode===404||response.statusCode===403){
    	callback('Unable to fetch weather'); 
    }else if(response.statusCode===200){
        callback(undefined,{
            temperature:body.currently.temperature,
            apparentTemperature:body.currently.apparentTemperature
        })
    	
    }
	//console.log(JSON.stringify(body,undefined,2));
	
});
};
module.exports.getWeather=getWeather;