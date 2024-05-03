const fetch = require('node-fetch');

exports.handler = async(event) => {
 try {
   // Data passed from the HTTP request is saved as a JSON string in event.body
   // We need to parse it into a Javascript object before we can use it.
   let { ticker } = JSON.parse(event.body);
   const BASE_URL = "https://api.marketdata.app/v1/";
   const STOCK_URI = "stocks/quotes/";
   const MARKETDATA_AUTH = "/?token=UHFfMVhJWGlCQ1hmLUdxTURiLUJSV3pJcTV3Nmh3bjU1OFdYRXBwME5URT0";
   let result = await fetch(BASE_URL+STOCK_URI+ticker+MARKETDATA_AUTH);
   let data = await result.json();
   const response = {
     statusCode: 200,
     headers: {
       "Access-Control-Allow-Headers": "Content-Type",
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
     },
     body: JSON.stringify({
       ticker,
       data
     }),
   };
   return response;
 }
 catch (err) {
   console.log("Error", err);
   return { statusCode: 500 };
 }
};
