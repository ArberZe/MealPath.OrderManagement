# Product Name
> MealPath is an order management system for italian style Pizza

[![NPM Version][npm-image]][npm-url]

MealPath is a faculty course project, it is built as an online pizza ordering web app, with different roles for content management.
MealPath is build using Asp.Net core framework for backend(API project) and a React App for front end which consumes the API.
Main features of this web app: User registration and management with .NET identity, 3 different roles(User, Admin, SuperAdmin), Content management,
Integration of Stripe for payments.


![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/f7809015-da9e-4284-9839-2bfac7709077)


## Usage example

After you clone the project,
You don't have to change the connection string because it uses the defaul sql server instance name, 
and you don't have to run **dotnet ef update database** because it is using entity framework feature: localdb 

steps to run .NET API (.NET 6):
- Open .sln file with visual studio(2022, 2019 or 2017)
- run without debugging

steps to run react project:
- Open mealpath.app(React) folder possibly with vscode
- open terminal inside vscode and run the command:
- ```sh
  npm install
  ```
- then run the command : ```sh
  npm start
  ```
- React Project should run seamlessly


## Development setup

To be able to run this project you should have these technologies installed on you machine:
- SQL server express: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- MongoDb with MongoDbCompass: https://www.mongodb.com/try/download/community
- .NET 6: https://dotnet.microsoft.com/en-us/download/dotnet/6.0
- Node Js >18.x.x: https://nodejs.org/en/download
- npm: preferably: 10.2.4: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
## Meta

Arber Zeka – [@ArberZeka](https://www.linkedin.com/in/arber-zeka-742452220/) 
Erion Ismajli [@ErionIsmajli](https://www.linkedin.com/in/erion-ismajli/)

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
