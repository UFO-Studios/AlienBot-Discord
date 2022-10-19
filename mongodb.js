const mongoose = require("mongoose");
const config = require("./config.json")

// lvl_instance.save((err) => {
//   if (err) return handleError(err);
  //saved!
//  console.log("written!");
//});

//Poss options for schemas

//const schemaFeilds = new Schema({
 // name: String,
  //binary: Buffer,
  //living: Boolean,
  //updated: { type: Date, default: Date.now() },
  //age: { type: Number, min: 18, max: 65, required: true },
  //mixed: Schema.Types.Mixed,
  //_someId: Schema.Types.ObjectId,
  //array: [],
  //ofString: [String], // You can also have an array of each of the other types too.
  //nested: { stuff: { type: String, lowercase: true, trim: true } },
//});




//STUFF FOR EXPORT:

let connected;
let db;

const LvlSchema = new mongoose.Schema({
  userId: Number,
  xp: Number,
});

// const lvl_module = mongoose.model("lvl", LvlSchema); // what template (schema) do i use? This one!

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
  
  const lvlnew = lvl_module({ userId: UserID, xp: UserLevel})
   
  await lvlnew.save(err => {
    if (err) {
      console.error(err)
      return false;
    }
  })
  
  console.log("Data added to DB!")
  return true
};


module.exports = {
  saveXP
}
