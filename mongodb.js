const { add } = require('libsodium-wrappers');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://AB:xKBuXE6sQxDT2zp3@abdb.dijoszh.mongodb.net/level');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

//TEMPLATE CODE DO NOT USE


const Schema = mongoose.Schema; //What is a schema?

const LvlSchema = new Schema({ //Define the schema "LvlSchema". Basically a template for data
    user_id: Number,
    lvl: Number,
  });

const Lvl = mongoose.model("Lvl", LvlSchema);


const lvl_instance = new Lvl({ name: "awesome" }); // Create an instance of model SomeModel

lvl_instance.save((err) => {
  if (err) return handleError(err);
  //saved!
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
  