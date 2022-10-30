const firestore = require("./firebase")
const mongoose = require("mongoose");
const mongodbjs = require("./mongodb");

let connected;
let db;

const bannedWordsSchema = new mongoose.Schema({
    word: String
  },
  {collection: "bannedwords"});
  
  const bannedWordsModule = mongoose.model("bannedwords", bannedWordsSchema);
  //END schema
  
  //START module
const addBW = async (Bword) => {
  if(!connected || !db) {
    await mongodbjs.connectToDB() 
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
    await mongodbjs.connectToDB() 
  } //conect

  const checkWord = await bannedWordsModule.findById(word)
  if (checkWord = !data)
    return false
  else
    return true

};




