const mongoose = require('mongoose') 
const { mongoPath } = require('./config.json') 
  
 module.exports = async () => { 
   mongoose.connect(mongoPath, { 
     keepAlive: true, 
     useNewUrlParser: true, 
     useUnifiedTopology: true, 
   }) 
 } 
const { MongoClient } = require('mongodb') 
 const mongoose = require ('mongoose')
const mongo = require('./mongo')