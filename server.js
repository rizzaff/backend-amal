require('dotenv/config')

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./routes');
const uuidv4 = require('uuid/v4');

const logger = function(req, res, next){
    console.log('==============================')
    console.log('Request URL:', req.originalUrl)
    console.log("Request type: " + req.method)
    console.log("Request device: " + req.get('User-Agent'))
    console.log("Request time: " + new Date())
    // console.log("ID: " + uuidv4())
    console.log('==============================')
    next()
}

app.use(logger)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);
console.log('Amal backend, RESTful API server started on: ' + port);
// console.log("ID: " + uuidv4())
// let generateId = uuidv4().slice(24,36);
// let jaminan_id = generateId[4];
// console.log(generateId);    
    