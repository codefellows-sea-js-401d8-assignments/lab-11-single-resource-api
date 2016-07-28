# Lab 09: Crud Api with Express!

This project creates an http server through which a user can use upload and access data about Pokemon.

## Getting Started
To begin, simply clone down the repo and run it in the terminal via `npm i`. All commands outlaid below will assume input in terminal.

- To start the server, use `node lib/server.js`.

  - To upload initial data onto the server, use `http POST localhost:3000/api/pokemon/pikachu "pokemon=pikachu" "name=pikachu" "type=lightning" "final evolution=Raichu"`

  - To then "GET" that data, use `http GET localhost:3000/api/pokemon/pikachu`.

  - To update data already on server, use a "PUT" or "PATCH" request `http PUT localhost:3000/api/pokemon/pikachu "pokemon=pikachu" "name=pikachu" "type=awesome" "final evolution=Beyonce"`

    - To then retrieve the updated data, simply perform a "GET" `http GET localhost:3000/api/pokemon/pikachu`

  - To "DELETE" data from the server, use `http DELETE localhost:3000/api/pokemon/pikachu`

  - To view all Pokemon currently on the server, use `http GET localhost:3000/api/pokemon/all`

- To run any tests or file linting, use `gulp`
