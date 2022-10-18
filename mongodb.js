const mongoose = require("mongoose");
const config = require("./config.json")

mongoose.connect(config.MONGO_CONFIG);
console.log("loaded!");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); //tells us if there is an error

const Schema = mongoose.Schema; //What is a schema? This!
const LvlSchema = new Schema({
  //Define the schema "LvlSchema". Basically a template for data
  user_id: Number, // declair your vars (data to be written) here
  lvl: Number,
});

const lvl_module = mongoose.model("lvl", LvlSchema); // what template (schema) do i use? This one!
const lvl_instance = new lvl_module({ name: "awesome" }); // Create an instance (use of) of model SomeModel


lvl_instance.save((err) => {
  if (err) return handleError(err);
  //saved!
  console.log("written!");
});

//Poss options for schemas

const schemaFeilds = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now() },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } },
});


//STUFF DOR EXPORT:

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @param {Number} UserLevel The new level for the user.
 *  @example lvlData.save({ user_id: "UserID", lvl: "UserLevel"})
 *  @returns Returns nothing.... I think
 **/
const saveLvlData = (UserID, UserLevel) => {
  new lvl_module({ user_id: UserID, lvl: UserLevel});
  console.log("Data added to dB!")
};

const connectToDB = () => {
  mongoose.connection(config.MONGO_CONFIG);
  console.log("Connected to MongoDB!")
};

module.exports = {
  saveLvlData,
  connectToDB
}