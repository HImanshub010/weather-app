
const yargs=require('yargs');
const axios=require('axios');

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
 var encodedAddress=encodeURIComponent(argv.Address);
 var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

 axios.get(geocodeUrl).then((response)=>{
  if(response.data.status==='ZERO_RESULTS'){
    throw new Error('Unable to find that Address');
  }
  console.log(response);
  var latitude=response.data.results[0].geometry.location.lat;
  var longitude=response.data.results[0].geometry.location.lng;
  var weatherUrl=`https://api.darksky.net/forecast/cd2a7f842cb9d42b522221f733e030a7/${latitude},${longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
 }).then((response)=>{
   var temperature=response.data.currently.temperature;
   var appareentTemperature=response.data.currently.apparentTemperature;
   console.log(`It is currently ${temperature}.But feels like ${appareentTemperature}`);
 }).catch((e)=>{
  if(e.code==='ENOTFOUND'){
    console.log("Unable to connect to api service");
  }else{
    console.log(e.message);
  }
 });