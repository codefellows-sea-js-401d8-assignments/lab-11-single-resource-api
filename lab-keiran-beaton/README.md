# Lab-11 Single-Resource API

## Getting Started

run `npm install` in the command line to run the dependencies

## To use the app

in the command line run `mongod --dbpath ./db` to start mongo

In a separate command line, run `node server` to start the server

In another command line you can now make requests

To create a resource, make a post request to the path localhost:3000/api/food and the resource must have these properties:
  name: String,
  countryOfOrigin: String,
  isItGood: boolean

To get all, make a get request to the path localhost:3000/api/food

To get a single resource, make a get request to the path localhost:3000/api/food/:id

To update a resource, make a put request to the path localhost:3000/api/food/:id with the key-value pair you would like to update.

To remove a resource, make a delete request to the path localhost:3000/api/food/:id

## Testing

To run the linter and tests, run `gulp` from the command line. Be sure that mongo is running when you perform tests.
