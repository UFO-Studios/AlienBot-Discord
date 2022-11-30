const mongoose = require("mongoose");
const mongo = require("./mongodb")
const Firebase = require("./firebase.js");
//const { Client } = require("./node_modules/discord.js/typings/index");

let connected;
let db;

const bannedWordsSchema = new mongoose.Schema({
    word: String
});
  
const bannedWordsModule = new mongoose.model("bannedwords", bannedWordsSchema);



  //END schema
  
  //START module
const addBW = async (Bword) => {
  if(!connected || !db) {
    await mongo.connectToDB() 
  }
  const newBW = await bannedWordsModule({"word": Bword})
  await newBW.save(err => {
    if (err) {
      console.error(err)
      return false;
    }
  })
  console.log("run")
};

const checkBW =  async (word) => {
  if(!connected || !db) {
    await connectToDB() 
  } //conect

  const checkWord = await bannedWordsModule.findById(word)
  if (checkWord = !data)
    return false
  else
    return true

};

addBW("your_banned_word")