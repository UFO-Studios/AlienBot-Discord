import { Schema, model } from "mongoose";
import { connectToDB } from "./mongodb";

let connected;
let db;

const bannedWordsSchema = new Schema({
    word: String
  },
  {collection: "bannedwords"});
  
  const bannedWordsModule = model("bannedwords", bannedWordsSchema);
  //END schema
  
  //START module
const addBW = async (Bword) => {
  if(!connected || !db) {
    await connectToDB() 
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




