[![Build Status](https://travis-ci.org/noordean/PostIt.svg?branch=server)](https://travis-ci.org/noordean/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/noordean/PostIt/badge.svg?branch=server)](https://coveralls.io/github/noordean/PostIt?branch=server)
# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications. This application allows people to register, create group, add other users to the created group, and then send messages out to members of the group whenever they want. PostIt enhances group-work among people as group members can easily reach out to one another.

## Development
This application is broken into two parts, server(API) and client(reactjs).
The backend(API) was developed using NodeJs with express for routing. PostgreSQL was used for persisting data with sequelizejs as ORM.
The frontend was built using reactJs with redux framework.

## Installation
- Clone this repository to have the app on your machine with ```git clone https://github.com/noordean/PostIt.git```
- Change directory to the app's root with ```cd PostIt```
- Then run ```npm install```  to install the dependencies
- Tranpile, bundle the neccessary files and start the app with ```npm run dev```
- Then visit ```http://localhost:8080``` to view the app.

### To test the API with postman:
- run ```npm start```
- then visit ```http://localhost:3000```, you should see 'PostIt API running...' 

It is also hosted on heroku at <a href="https://postit-api.herokuapp.com/" target="_blank">PostIt API</a>.

## Note:
- The client side is yet to be hosted, and many features are yet to be implemented