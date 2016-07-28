# Lab 11 single resource express api ![idle](./assets/siegward.gif)

## To run server
Clone down then run in terminal:
```
npm i
```
To run tests and lint files in terminal type:
```
gulp
```
To start server in terminal:
```
node server.js
```

## Using httpie to interact with server on the command line
To POST a new movie to the server:
```
http POST localhost:3000/api/movie "name=example movie name" "rating = 322"
```
To GET an movie from the server:
```
http GET localhost:3000/api/movie/exampleid
```
To GET all movies from the server:
```
http GET localhost:3000/api/movie/all
```
To DELETE a movie from the server:
```
http DELETE localhost:3000/api/movie/exampleid
```
To PUT new movie properties to existing movie on the server:
```
http PUT localhost:3000/api/movie/exampleid "name=new movie name" "rating=321"
```
