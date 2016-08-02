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

POST Trainer: `http POST :3000/api/trainer "trainerName=jeff" "trainerSkill=5"`

You will recieve a unique ID for that trainer, save that number.

To retrieve or delete a Pokemon follow the below format, ID must match with the ID created with the trainer.

POST Pokemon to specific trainer: `http POST :3000/api/trainerIdGoesHere/pokemon "pokeName=charizard" "pokeType=fire"`

GET ALL Pokemon: `http :3000/api/pokemon`

GET ALL Pokemon for trainer: `http :3000/api/trainerIdGoesHere/pokemon`

GET Specific Pokemon: `http :3000/api/pokemon/pokemonIdGoesHere`

DELETE Specific Pokemon: `http DELETE :3000/api/pokemon/pokemonIdGoesHere` 

GET ALL trainers: `http :3000/api/trainer`

GET Specific trainer: `http :3000/api/trainer/trainerIdGoesHere`

DELETE Specific: `http DELETE :3000/api/trainer/trainerIdGoesHere`

###Test###

To run all tests, type the following command:

`mocha`



`Jeff Gebhardt - CF JS 401`
