const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const mongoConfig = require('./backEnd/Mongo/mongoose');
const path = require('path');
const authentication = require('./backEnd/Athenticate/anthenticate')(router);
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

mongoose.connect(mongoConfig.uri, function(err){
    if (err){
        console.log("Unable to connect to MongoDb"+err)
    }
    else{
        console.log('MongoDb connected...')
    }
})

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/client/dist/')); 
app.use('/authentication', authentication);

app.listen(3000, function(){
    console.log('server at 3000...');
})

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/frontEnd/dist/index.html"))
})
