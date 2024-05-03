const { DynamoDB } = require("@aws-sdk/client-dynamodb");
// Set the AWS Region.
const REGION = "us-east-1";
// Create an Amazon DynamoDB service client object.
const ddb = new DynamoDB({ region: REGION });

const params = {
  TableName: "stocks",
  Key: {
      ticker: null,
  },
}

exports.handler = async(event) => {
  try {
    let { ticker } = JSON.parse(event.body);
    
    params.Key.ticker = {S: ticker};
    
    const del = await ddb.deleteItem(params)
    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: "success",
    };
    
    return(response);
  }
  catch (err) {
    console.log("Error", err);
    return { statusCode: 500 }
  }
};

