![Triforce](./resources/triforce2.gif)

#Express API with mongo#

###Summary###
A basic singe resource http server utilizing express and mongoDB.


###Instructions###
From the root directory of 'lab-jeff' run the following command in your terminal:

`npm install`

Assuming you have mongoDB installed on your machine, next start mongod by running:

`mongod --dbpath db`

To run the linter, watcher and start the server type the command:
`gulp`

Using HTTPie or you prefered HTTP request interface run any of the following commands:

POST: `http POST :3000/api/pokemon "pokeName=charizard" "pokeType=fire"`

You will recieve a unique ID for that pokemon, save that number.

To retrieve or delete a Pokemon follow the below format, "pokeId" must match with the ID created with the Pokemon.

GET ALL: `http :3000/api/pokemon`

GET: `http :3000/api/pokemon/thatIdYouSaved`

DELETE: `http delete :3000/api/pokemon/thatIdYouSaved`

###Test###

To run all tests, type the following command:

`mocha`



`Jeff Gebhardt - CF JS 401`
