
const request=require('request');
var geocodeAddress=(Address,callback  )=>{
var encodedAddress=encodeURIComponent(Address);
 // console.log(encodedAddress);

request({
	url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true 	
},(error,response,body)=>{
	//console.log(JSON.stringify(body,undefined,2));
    if(error){
    	callback('"Unable to connect to google server"');
    	
    }else if(body.status==='ZERO_RESULTS'){
    	callback("Invalid address");
    }else if(body.status==='OK'){
    	callback(undefined,{
    		address:body.results[0].formatted_address,
    		latitude:body.results[0].geometry.location.lat,
    		longitude:body.results[0].geometry.location.lng
    	});
       }
    else{
    	console.log("Error");
    }
    // console.log(`Address: ${body.results[0].formatted_address}`);

   // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
   // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
};

module.exports.geocodeAddress=geocodeAddress;