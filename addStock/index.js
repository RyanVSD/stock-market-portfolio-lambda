const { DynamoDB } = require("@aws-sdk/client-dynamodb");
// Set the AWS Region.
const REGION = "us-east-1";
// Create an Amazon DynamoDB service client object.
const ddb = new DynamoDB({ region: REGION });

const params = {
  TableName: "stocks",
  Item: {
      ticker: {S: null},
      shares: {N: null},
      purchasePrice: {N: null},
  },
  ReturnConsumedCapacity: "TOTAL"
}

exports.handler = async(event) => {
  try {
    console.log(event.body);
    let data = JSON.parse(event.body);
    console.log(data);
    let ticker = data.ticker;
    let shares = data.shares;
    let purchasePrice = data.purchasePrice;
    
    let isValid = (ticker.length > 0);              // ticker isn't blank
    isValid = isValid && (shares.length > 0);       // shares isn't blank
    isValid = isValid && (purchasePrice.length > 0);// purchasePrice isn't blank
    isValid = isValid && !/[^A-Z]/.test(ticker);    // ticker has letters only
    
    params.Item.ticker.S = ticker;
    params.Item.shares.N = shares;
    params.Item.purchasePrice.N = purchasePrice;
    
    if(!isValid) {
      return ({statusCode: 200, error: true, msg: 'Invalid data'});
    }

    const put = await ddb.putItem(params);
    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: "success",
    };
    console.log(response);
    return(response);
  }
  catch (err) {
    console.log("Error", err);
    return { statusCode: 500 }
  }
};

