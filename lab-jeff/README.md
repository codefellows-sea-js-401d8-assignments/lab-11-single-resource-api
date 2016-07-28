![Triforce](./resources/triforce2.gif)

#Express API#

###Summary###
A basic singe resource http server utilizing express.


###Instructions###
From the root directory of 'lab-jeff' run the following command in your terminal:

`npm install`


###Test###

To run the tests, linter, watcher and start the server type the command:
`gulp`


POST: `curl -H "Content-Type: application/json" -X POST -d '{"pokeName":"charizard", "pokeType":"fire"}' http://localhost:3000/api/pokemon/`

You will recieve a unique ID for that pokemon, save that number for future use of that pokemon.

To retrieve or delete a Pokemon follow the below format, "pokeId" must match with the ID created with the Pokemon.

GET: `curl http://localhost:3000/api/pokemon/pokeId/`

DELETE: 'curl -X "DELETE" http:/localhost:3000/api/pokemon/pokeID/'


`Jeff Gebhardt - CF JS 401`
