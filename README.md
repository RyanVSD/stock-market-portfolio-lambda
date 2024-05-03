# Stock market portfolio lambda functions

Find the actual project here https://github.com/RyanVSD/stock-market-portfolio

These are the Lambda functions used in the project. 
- GetPortfolio
- GetStockPrice
- GetStockName
- DeleteStock
- AddStock

GetPortfolio, AddStock, and DeleteStock interface with the DynamoDB to make retrieving and updating data easier.
GetStockName interfaces with the AlphaVantage API and its overview function to retrieve the stock name.
GetStockPrice interfaces with the MarketData API and their quote function to retrieve stock quote data.
