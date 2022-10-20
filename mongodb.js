const mongoose = require("mongoose");
const config = require("./config.json")


let connected;
let db;

const LvlSchema = new mongoose.Schema({
  userId: Number,
  xp: Number,
});

const lvl_module = mongoose.model("lvl", LvlSchema); // what template (schema) do i use? This one!

const connectToDB = async () => {
  await mongoose.connect(config.MONGO_CONFIG);
  connected = true;
  console.log("MongoDB is loaded!");
  db = await mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:")); //tells us if there is an error
};

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @param {Number} UserLevel The new level for the user.
 *  @example await saveXP("userID", "XP")
 * @returns {Bool} true if saved sccessfully, false if not.
 **/
const saveXP = async (UserID, UserLevel) => {
   
  if(!connected || !db) {
    await connectToDB() 
  }
  
  const lvlnew = lvl_module({ userId: UserID, xp: UserLevel}) //create a new "lvlNew" object (data)
   
  await lvlnew.save(err => {
    if (err) {
      console.error(err)
      return false;
    }
  })
  
  console.log("Data added to DB!")
  return true
};
//END (saveXP)

//START (getXP)

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @example const userXP = await getXP(UserID)
 *  @returns {Number} Value of the users XP.
 **/
 const getXP = async (UserID) => {
   
  if(!connected || !db) {
    await connectToDB() 
  }
  
  const userXP = await lvl_module.findOne({ userId: UserID });
  
  console.log("Data recived from DB!")
  return userXP
};


module.exports = {
  saveXP,
  getXP
}
