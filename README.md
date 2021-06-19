# nodejs-rest-api-with-docker
Nodejs REST API to make requests to perform CRUD operations for book. API uses mongodb to persist data.

## Prerequisites

1) Docker needs to be installed and running on your machine. Please follow instructions on [Docker Official Site](https://docs.docker.com/docker-for-mac/install/).

2) Docker compose also needs to be installed. You can get it from [Docker Official Site - Docker Compose Install](https://docs.docker.com/compose/install/).

3) You need to have ```.env``` file in root folder. File must have MONGO_URI to run and connect mongodb for traditional node app.
  ```
  MONGO_URI='mongodb://localhost:your-port/your-mongo-db-name'

  Default PORT: 27017
  ```
4) You need to have ```.env.dev``` file in root folder. File must have MONGO_URI to run and connect mongodb for dockerized app.
  ```
  MONGO_URI='mongodb://mongo:your-port/your-mongo-db-name'

  Default PORT: 27017
  ```

## To Run API on Port 3000 with Docker
1) To build images (It can take a while at the first place.)
```
docker-compose build --no-cache
```
2) This will run the API on PORT 3000. Thanks to nodemon package, changes will be watched and immediately served.
```
docker-compose --env-file .env.dev up
```
** To stop the running API
```
docker-compose down
```
You can send requests to ;

* localhost:3000/book GET/PUT/POST/DELETE
## To Run API on Port 3000 without Docker
To run REST API on your local machine, you need to install [Node](https://nodejs.org/en/download/) and [MongoDB](https://docs.mongodb.com/manual/installation/). You can install following these urls.
```
npm install
```
To run server
```
npm run start
```
Or run server and watch changes with nodemon
```
npm run start-watch
```

To run tests
```
npm run test
```

## POSTMAN REQUESTS

There is a folder in project named postman_requests. That folder has 

* requests.postman_collection
* requests.postman_environment

files. You can import collection and environment file to test API with postman.
