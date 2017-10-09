[![Build Status](https://travis-ci.org/noordean/PostIt.svg?branch=implement-feedback)](https://travis-ci.org/noordean/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/noordean/PostIt/badge.svg?branch=chore%2Fsecond-feedback-implementation)](https://coveralls.io/github/noordean/PostIt?branch=chore%2Fsecond-feedback-implementation)
[![Code Climate](https://codeclimate.com/github/noordean/PostIt/badges/gpa.svg)](https://codeclimate.com/github/noordean/PostIt)
# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications. This application allows people to register, create group, add other users to the created group, and then send messages out to members of the group whenever they want. PostIt enhances group-work among people as group members can easily reach out to one another.

## Development
This application is broken into two parts, server(API) and client(reactjs).
The backend(API) was developed using NodeJs with express for routing. PostgreSQL was used for persisting data with sequelizejs as ORM.
The frontend was built using reactJs with redux framework.

## API DOCUMENTATION
### API FEATURES
PostIt has the following API features:

#### Authentication
- It makes use of jsonwebtoken(jwt) for authentication
- It generates a token on successful login and send it as part of response
- It accepts the generated token before given access to all the protected routes

#### Users
- It allows user to create account
- It allows user to login
- It allows user to create groups and post messages to the created groups

#### Groups
- Groups can be created by users to share messages
- Members can be added to group. Only the group creator can add members to a group
- Only unique groups can be created

#### Messages
- Messages are posted based on priority levels, that is: Critical, Urgent and Normal
- SMS and email notification is sent to group members for Critical messages
- Email notification is sent to group members for Urgent messages
- In-app notification is sent to group members for Normal messages
- Only the members of a group can post message into a group
 
## Installation
- Clone this repository to have the app on your machine with ```git clone https://github.com/noordean/PostIt.git```
- Change directory to the app's root with ```cd PostIt```
- Pull the development branch with ```git pull origin development```
- Then run ```npm install```  to install the dependencies
- Tranpile, bundle the neccessary files and start the app with ```npm start```
- Then visit ```http://localhost:3333``` to view the app.
- Run ```npm run server:test``` to run the API tests
- Run ```npm run client:test``` to run the React tests
- Run ```npm run e2e:test``` to run the end-to-end tests

It is also hosted on heroku at <a href="https://full-postit.herokuapp.com/" target="_blank">PostIt API</a>.

### To test the API with postman:

The API contains different endpoints with their respective payloads as stated below:

| Endpoints                    | Functions                                                               | Payloads                 | Request Methods |
|------------------------------|-------------------------------------------------------------------------|--------------------------|-----------------|
| /api/v1/user/signup             | It allows users to register                                | username, email, phoneNumber and password    | POST            |
| /api/v1/user/signin             | It logs users into the app                                       | username and password    | POST            |
| /api/v1/group                   | It allows users to create group for notifications                    | groupName and description | POST            |
| /api/v1/group/:groupID/user     | It allows users to add another user to a created group of id groupID | userId                | POST            |
| /api/v1/group/:groupID/message  | It posts message to group with id groupID                              | message and priority     | POST            |
| /api/v1/group/:groupID/messages | It get all messages from group with id groupID                          | No payload               | GET             |
| /api/v1/user/reset-password            | It sends mail to users for password reset                      | email and password               | POST            |
| /api/v1/users             | It gets all users                      | No payload               | GET            |
| /api/v1/group/:groupID             | It deletes a group of id groupID                      | No payload               | DELETE            |
| /api/v1/message/:messageID             | It deletes a message of id messageID                      | No payload               | DELETE            |

Note: Login token must be supplied in the headers before accessing all the routes except for ```/api/v1/user/signup``` and ```/api/v1/user/signin```


## Technologies Used
* [NodeJS:](https://nodejs.org/en/) is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
* [Javascript ES6:](https://en.wikipedia.org/wiki/ECMAScript) ES6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, spread opeartor, etc.
* [React:](https://facebook.github.io/react/tutorial/tutorial.html) Facebook open source, efficient, javascript library for building front-end projects.
* [PostgreSQL:](https://www.postgresql.org/) PostgreSQL is a powerful, open source object-relational database system (ORDBMS) that offers modern database features such as complex queries, foreign keys, etc.
* [Sequelize:](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js that supports different dialects such PostgreSQL, MySQL, and SQLite.
* [Babel:](https://babeljs.io/)  Babel transpiles es6 codes to es5.
* [Webpack:](https://webpack.github.io/docs/what-is-webpack.html) Webpack is used to bundle modules and does tasks automation.
* [Axios:](https://www.npmjs.com/package/axios) Axios is an http client library used in consuming API.

## Limitations
- Group creator cannot remove users from groups
- Users cannot update their profile
- Users cannot deactivate their accounts

## Coding Style
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

## How to Contribute
- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works
- Refer to this wiki for proper <a href="https://github.com/noordean/PostIt/wiki">GIT CONVENTION</a>

Ensure your codes follow <a href="https://github.com/airbnb/javascript">AirBnB Javascript Styles Guide</a>

The full API documentation can be viewed at <a href="https://app.swaggerhub.com/apis/postit1/PostIt/1.0.0" target="_blank">here</a>

### Author
Nurudeen Ibrahim