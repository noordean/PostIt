[![Build Status](https://travis-ci.org/noordean/PostIt.svg?branch=development)](https://travis-ci.org/noordean/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/noordean/PostIt/badge.svg?branch=development)](https://coveralls.io/github/noordean/PostIt?branch=development)
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
- It allows user to create groups, post message to the created groups

#### Groups
- It allows groups to be created for users to share messages
- Only the group creator can add members to a group
- Only unique groups can be created

#### Messages
- It allows users to post messages to the created groups
- Only the members of a group can post message into a group

## Installation
- Clone this repository to have the app on your machine with ```git clone https://github.com/noordean/PostIt.git```
- Change directory to the app's root with ```cd PostIt```
- Pull the develop branch with ```git pull origin development```
- Then run ```npm install```  to install the dependencies
- Tranpile, bundle the neccessary files and start the app with ```npm start```
- Then visit ```http://localhost:3333``` to view the app.

### To test the API with postman:
- run ```npm start```
- then visit ```http://localhost:3333```, you should see 'PostIt API running...' 

It is also hosted on heroku at <a href="https://full-ostit.herokuapp.com/" target="_blank">PostIt API</a>.

The API contains different endpoints with their respective payloads as stated below:

| Endpoints                    | Functions                                                               | Payloads                 | Request Methods |
|------------------------------|-------------------------------------------------------------------------|--------------------------|-----------------|
| /api/v1/user/signup             | It allows users to register                                             | username, email and password    | POST            |
| /api/v1/user/signin             | It gives users access to login                                          | username and password    | POST            |
| /api/v1/group                   | It allows users to create group for notifications                       | groupName and createdBy | POST            |
| /api/v1/group/:groupID/user     | It allows users to add another user to a created group of id groupID    | username                 | POST            |
| /api/v1/group/:groupID/message  | It allows users to post message to a created group of id groupID        | message and postedBy     | POST            |
| /api/v1/group/:groupID/messages | It allows users to retrieve messages from a created group of id groupID | No payload               | GET             |

## Note:
- The client part is still in progress, and yet to be completed