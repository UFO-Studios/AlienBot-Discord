const mongoose = require("mongoose");
const config = require("../config.json");
const { consoleMessage } = require("../log");
const schemas = require("./schema");
let connected;
let db;

//silece mongoose warnings
mongoose.set("strictQuery", true);

//START modules

const XPModule = mongoose.model("XP", schemas.LvlSchema);
const bannedWordsModule = mongoose.model(
  "bannedWords",
  schemas.bannedWordsSchema
);
const AWModel = new mongoose.model("warns", schemas.AWSchema);
const loggingToggleModel = new mongoose.model(
  "loggingToggle",
  schemas.loggingToggleSchema
);
const BWToggleModel = new mongoose.model("BWToggle", schemas.BWToggleSchema);
const welcomeToggleModel = new mongoose.model(
  "welcomeToggle",
  schemas.welcomeToggleSchema
);
//END modules

const BADWORDS = (await fetch('https://niceygy.net/badwords.txt').then(res => res.text())).split('\n');

/**
 *  @example await connectToDB
 * @returns {Boolean} true if connected sccessfully, false if not.
 **/
async function connectToDB() {
  await mongoose.connect(config.MONGO_CONFIG);
  connected = true;
  console.log("MongoDB is loaded!");
  db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:")); //tells us if there is an error
  consoleMessage("Connection complete!", "mongoDB");
  return true;
}

/**
 * Checks if a word is bad
 * @param {string} word 
 * @returns {bool} true if the word is bad, false if not
 */
async function checkBW(word) {
  return word in BADWORDS; 
}

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @param {Number} UserLevel The new level for the user.
 *  @param {String} _ID The ID. Yes i`m lazy
 *  @example await saveXP("userID", "XP")
 * @returns {Bool} true if saved successfully, false if not.
 **/
const saveXP = async (userId, xp, level) => {
  if (!connected || !db) {
    await connectToDB();
  }

  // xp = xp.toString().split("[object Object]")[1];

  // console.log("XP: " + xp + " Level: " + level + " UserID: " + userId);
  const oldObj = await XPModule.findOne({ userId });

  if (!oldObj) {
    const newModel = XPModule({ userId, xp, level });

    newModel.save((err) => {
      if (err) {
        console.error(err);
        return false;
      }
    });

    return true;
  }

  await XPModule.findOneAndUpdate({ userId: userId }, { userId, xp, level });
  return true;
};
//END (saveXP)

//START (getXP)

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @example const userXP = await getXP(UserID)
 *  @returns {Number} Value of the users XP.
 **/
const getXP = async (userId) => {
  if (!connected || !db) {
    await connectToDB();
  }
  const userRank = await XPModule.findOne({ userId });
  // consoleMessage("XP retreived sucsessfully! Returning...", "mongoDB/getXP");
  if (userRank != null) {
    return userRank.xp ?? 0;
  } else {
    return 0;
  }
};

/**
 *
 * @param {number} GuildID
 * @param {number} ClientID
 * @returns boolean
 * @example await addWarn(GuildID, ClientID)
 */
const addWarn = async (guildId, userId) => {
  if (!connected || !db) {
    await connectToDB();
  } //connect

  const oldWarnCount = (await AWModel.findOne({ guildId, userId })).warns;

  if (oldWarnCount == null) {
    const firstWarnForUser = await bannedWordsModule({
      guildId,
      userId,
      warns: 1,
    });

    await firstWarnForUser.save((err) => {
      if (err) {
        console.error(err);
        console.log("error! Aborted operation");
      }
    });
  } else {
    await AWModel.findOneAndRemove({ guildId, userId });

    const newWarnCount = oldWarnCount + 1;
    const newWC = await bannedWordsModule({
      guildId,
      userId,
      warns: newWarnCount,
    });

    await newWC.save((err) => {
      if (err) {
        console.error(err);
        console.log("error!");
      }
      return newWarnCount;
    });
  }
};

const getWarns = async (guildId, userId) => {
  if (!connected || !db) {
    await connectToDB();
  } //connect

  const warnCount = await AWModel.findOne({ guildId, userId });
  if (warnCount == null) {
    return 0;
  } else {
    return warnCount;
  }
};

const clearWarns = async (guildId, userId) => {
  if (!connected || !db) {
    await connectToDB();
  } //connect

  await AWModel.findOneAndRemove({ guildId, userId });
  return true;
};

const saveLogToggle = async (guildId, toggle) => {
  if (!connected || !db) {
    await connectToDB();
  } //connect

  const newToggle = await loggingToggleModel({
    guildId,
    toggle,
  });

  await loggingToggleModel.findOneAndRemove({ guildId, toggle });
  await newToggle.save((err) => {
    if (err) {
      console.error(err);
      console.log("error!");
      return false;
    }
    return true;
  });
};

const getLogToggle = async (guildId) => {
  if (!connected || !db) {
    await connectToDB();
    consoleMessage("Connected to MongoDB", "mongoDB");
  } //connect
  const logToggleJSON = await loggingToggleModel.findOne({ guildId });
  if (logToggleJSON == null) {
    return false;
  }
  var string = JSON.stringify(logToggleJSON);
  var objectValue = JSON.parse(string);
  const logToggle = objectValue["toggle"];
  return logToggle;
};

const getBannedWordToggle = async (guildID) => {
  if (!connected || !db) {
    await connectToDB();
    consoleMessage("Connected to DB", "mongoDB");
  } //connect

  const BWToggleJSON = await BWToggleModel.findOne({ guildID });
  if (!BWToggleJSON) {
    return { toggle: false };
  } else {
    return BWToggleJSON["toggle"];
  }
};

const getWelcomeToggle = async (guildId) => {
  if (!connected || !db) {
    await connectToDB();
    consoleMessage("Connected to DB", "mongoDB");
  } //connect

  const welcomeToggle = await welcomeToggleModel.findOne({ guildId });
  //console.log(welcomeToggle);
  if (!welcomeToggle) {
    return { toggle: false };
  } else {
    return welcomeToggle;
  }
};

const saveWelcomeToggle = async (
  guildId,
  toggle,
  webhookUrl,
  welcomeMsg,
  leaveMsg
) => {
  if (!connected || !db) {
    await connectToDB();
  } //connect

  const newToggle = welcomeToggleModel({
    guildId,
    toggle,
    webhookUrl,
    welcomeMsg,
    leaveMsg,
  });

  await welcomeToggleModel.findOneAndRemove({ guildId });
  await newToggle.save((err) => {
    if (err) {
      console.error(err);
      console.log("error!");
      return false;
    }
    return true;
  });

  return true;
};

const saveBannedWordToggle = async (guildID, BWToggle) => {
  if (!connected || !db) {
    await connectToDB();
  } //connect
  const newToggle = BWToggleModel({ guildID: guildID, toggle: BWToggle });

  await BWToggleModel.findOneAndRemove({ guildID });
  await newToggle.save((err) => {
    if (err) {
      console.error(err);
      console.log("error!");
      return false;
    }
    return true;
  });
};


export default {
  saveXP,
  getXP,
  connectToDB,
  addWarn,
  getWarns,
  clearWarns,
  saveLogToggle,
  getLogToggle,
  getBannedWordToggle,
  saveBannedWordToggle,
  saveWelcomeToggle,
  checkBW,
  getWelcomeToggle,
};

consoleMessage("mongodb.js run", "botInit");
