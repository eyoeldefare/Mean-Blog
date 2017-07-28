const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const mongoConfig = require('./backEnd/Mongo/mongoose');
const path = require('path');
const authentication = require('./backEnd/Athenticate/anthenticate')(router);

mongoose.Promise = global.Promise;

mongoose.connect(mongoConfig.uri, function(err){
    if (err){
        console.log("Unable to connect to MongoDb"+err)
    }
    else{
        console.log('MongoDb connected...')
    }
})
app.listen(3000, function(){
    console.log('server at 3000...');
})
//middleware
app.use(express.static(__dirname+"/frontEnd/dist/"));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/frontEnd/dist/index.html"))
})
app.use('/authentication',authentication);