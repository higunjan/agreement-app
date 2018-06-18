let express  = require('express');
const app      = express();
let mongoose = require('mongoose');
let bodyParser   = require('body-parser');
global.__parentDir = __dirname;

const configDB = require('./config/database.js');
const config = require('./config/config-test.json');
const port     = process.env.PORT || config.PORT;
const hostIp     = config.HOST_IP || "0.0.0.0";

configDB.connectMongoDB(); // connect to our database

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(bodyParser.json({limit: '500mb'}));

//static public folder
app.use(express.static('public'))

// routes
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch
app.listen(port, hostIp);
console.log('The magic happens on port ' + port);