[![Build Status](https://travis-ci.org/noordean/PostIt.svg?branch=server)](https://travis-ci.org/noordean/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/noordean/PostIt/badge.svg?branch=server)](https://coveralls.io/github/noordean/PostIt?branch=server)
# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications. This application allows people to register, create group, add other users to the created group, and then send messages out to members of the group whenever they want. PostIt enhances group-work among people as group members can easily reach out to one another.
## Usage
Since this application is broken into two parts, server(API) and client(reactjs), the following methods of installation must be fulfilled before it can be used locally.
## Installation
### step 1.
- Open your command prompt, make and navigate into a new directory 'server' with ```mkdir server```, then ```cd server```
- Clone this repository to have the app on your machine with ```git clone https://github.com/noordean/PostIt.git```
- Change directory to the app's root with ```cd PostIt```
- Pull the server branch to have the API part of the app with ```git pull origin server```
- Then run ```npm install```  to install the dependencies
- Tranpile and start the API with ```npm start```
- Then visit ```http://localhost:3000```, you should see ```PostIt API running...```

### Step 2.
- Open another command prompt, make and navigate into a new directory 'client' with ```mkdir client```, then ```cd client```
- Clone this repository to have this app with ```git clone https://github.com/noordean/PostIt.git```
- Change directory to the app's root with ```cd PostIt```
- Pull the client branch to have the client part of the app with ```git pull origin client```
- Then run ```npm install```  to install the dependencies
- Tranpile and bundle the neccessary files with ```npm run dev```
- Run the app by visiting ```http://localhost:8080```

The server side of the application has been hosted on <a href="https://postit-api.herokuapp.com/" target="_blank">PostIt API</a>, but the client side is yet to be hosted.

## Note:
- Some features are yet to be implemented 