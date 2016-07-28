## CRUD api for personal portfolio projects
## Changes
`morgan` middleware has been added, and is used in `dev` mode.
`errorResponse` custom middleware also added in the lib folder, used for logging detailed message on server side and generic message on client side. Ideally, the AppError constructor should be used wherever there's error, but it's only implemented at `localhost:3000/api/projects` at the moment.

## Usage:
  * Navigate to folder `lab-steventhan`
  * Run `node server` to start server
  * To READ all projects, in browser, navigate to `localhost:3000/api/projects/all`,
  * To READ 1 project in browser, navigate to `localhost:3000/api/projects/<valid id>`.
  * To CREATE a new project run `cat sample-project.json | http localhost:3000/api/projects` from the command line, it should appears at `localhost:3000/api/projects/all`
  * To UPDATE an existing project run `cat sample-project.json | http PUT localhost:3000/api/projects/<valid id>`, this should update the dummy project with new data from `sample-project.json`
  * To DESTROY a project run `http DELETE localhost:3000/api/projects/<valid id>`

## Test:
  * Install devDependencies
  * Run either `gulp` or `mocha` to test
