// This file is just for old times sake at this point.
const firebase = require("firebase-admin/app");
const firestore = require("firebase-admin/firestore");
const Config = require("./config.json");

const app = firebase.initializeApp({
  credential: firebase.cert(Config.FIREBASE_CONFIG),
});

const db = firestore.getFirestore(app);

const addTestData = async () => {
  // data from docs
  const docRef = db.collection("users").doc("alovelace");

  await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });

  const aTuringRef = db.collection("users").doc("aturing");

  await aTuringRef.set({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912,
  });
};

/**
 *  @param {String} collectionName name of the collection to add data to.
 *  @param {String} docName name of the document to add data to.
 *  @param dataObj JS object, the data to add to the document.
 *  @example await addData("users", "test", {hello: "world"})
 *  @returns data Reference
 **/
const addData = async (collectionName, docName, dataObj) => {
  const dataRef = db.collection(collectionName).doc(docName);

  const dataSet = await dataRef.set(dataObj);
  
  return dataSet;
};

/**
 *  @param {String} collectionName name of the collection to get a doc from.
 *  @param {String} docName name of the doc ot get data from.
 *  @example const data = await getData("users", "Kingerious")
 *  @returns if no data is found, returns null, if data is found, returns the document data as a JS Object
 **/
const getData = async (collectionName, docName) => {
  const dataRef = db.collection(collectionName).doc(docName);
  const doc = await dataRef.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

/**
 *
 * @param {String} collectionName The name of the collection
 * @param {String} docName The name of teh document
 * @example await deleteData("cities", "LA")
 */
const deleteData = async (collectionName, docName) => {
  try {
    const res = await db.collection(collectionName).doc(docName).delete();
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  addData,
  getData,
  deleteData,
};
