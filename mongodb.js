const { add } = require('libsodium-wrappers');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://AB:xKBuXE6sQxDT2zp3@abdb.dijoszh.mongodb.net/level');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

const connect = async () => {
    await mongoose.connect('mongodb+srv://AB:xKBuXE6sQxDT2zp3@abdb.dijoszh.mongodb.net/level');
}


//TEMPLATE CODE DO NOT USE

const testData = {
    "tessa": "1"
}
const Schema = new mongoose.Schema;


/**
 *  @param {String} dbName name of the collection to add data to.
 *  @param {String} docName name of the document to add data to.
 *  @param dataObj JS object, the data to add to the document.
 *  @example await addData("users", "test", {hello: "world"})
 *  @returns data Reference
 **/
 const addData = async (dbName, docName, dataObj) => {
    await mongoose.connect('mongodb+srv://AB:xKBuXE6sQxDT2zp3@abdb.dijoszh.mongodb.net/level');
    console.log("connected");
    mongoose.model(`lvl_test`, Schema(testData))

  };

  mongoose.model(`lvl_test`, new mongoose.Schema({"test": "hi!"}))