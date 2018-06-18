# Agreement Application

Before processed with following steps please update configuration file of mongodb.

```sh
// config/config-test.json
"mongo": {
    "replicas"	: ["0.0.0.0:27017"],
    "port"		: 27017,
    "database"	: "apttus",  // database name
    "username"	: "local",   // if your database have any username
    "password"	: "local"    // & Password
}
```
For running above application go each and every app with terminal, follow commands

```sh
// Each folder have dependancies, first install all
$ npm install    
// For back-end application you have to run 
$ node server.js
OR
$ npm start
```
**NOTE:**
  - I'm mostly expertise in back-end development with NodeJS and Mongo/MySQL
  - AngularJS I don't have idea, Which I know is Angular 2/4 & jQuery so, I develop both in single application used jQuery @ front-end side. Honestly I'm not much aware about Designing so, Please test functionality only. sorry for bad UI.