const mongoose = require("mongoose");
const config = require("./config.json");
const { consoleMessage } = require("./log");

let connected;
let db;

//silece mongoose warnings
mongoose.set("strictQuery", true);

//START schemas
const LvlSchema = new mongoose.Schema({
  userId: Number,
  xp: Number,
  level: Number,
});

const uptimeSchema = new mongoose.Schema({
  time: Number,
});

const AWSchema = new mongoose.Schema({
  guildId: Number,
  userId: Number,
  warns: Number,
});

const bannedWordsSchema = new mongoose.Schema({
  word: String,
});

const loggingURLSchema = new mongoose.Schema({
  guildID: Number,
  URL: String,
});

const loggingToggleSchema = new mongoose.Schema({
  guildId: Number,
  toggle: Boolean,
});

const BWToggleSchema = new mongoose.Schema({
  guildID: Number,
  toggle: Boolean,
});

const welcomeToggleSchema = new mongoose.Schema({
  guildId: Number,
  toggle: Boolean,
  webhookUrl: String,
  welcomeMsg: String,
  leaveMsg: String,
});

const addIgnoredChannelSchema = new mongoose.Schema({
  guildID: Number,
  channelID: Number,
});

const setWelcomeSchema = new mongoose.Schema({
  guildID: Number,
  message: String,
  webhookURL: String,
  leaveMessage: String,
});

const EconomySchema = new mongoose.Schema({
  userId: Number,
  balance: Number,
});

const loggingChannelSchema = new mongoose.Schema({
  guildID: Number,
  channelID: Number,
});

const rankSchema = new mongoose.Schema({
  userId: Number,
  rank: Number,
});

//END (schemas)

//START modules
const loggingChannelModule = mongoose.model(
  "loggingChannel",
  loggingChannelSchema
);
const lvl_module = mongoose.model("lvl", LvlSchema);
const economicModule = mongoose.model("economic", EconomySchema);
const uptimeModule = mongoose.model("uptime", uptimeSchema);
const bannedWordsModule = mongoose.model("bannedWords", bannedWordsSchema);
const AWModel = new mongoose.model("warns", AWSchema);
const loggingToggleModel = new mongoose.model(
  "loggingToggle",
  loggingToggleSchema
);
const loggingURLModel = new mongoose.model("loggingURL", loggingURLSchema);
const BWToggleModel = new mongoose.model("BWToggle", BWToggleSchema);
const welcomeToggleModel = new mongoose.model(
  "welcomeToggle",
  welcomeToggleSchema
);
const ignoredChannelModel = new mongoose.model(
  "ignoredChannel",
  addIgnoredChannelSchema
);
const setWelcomeModel = new mongoose.model("setWelcome", setWelcomeSchema);
const rankModule = new mongoose.model("rank", rankSchema);
//END modules

//Start JSON Management
const getJsonValue = async (input, valueNeeded) => {
  const string = await JSON.stringify(input);
  const objectValue = await JSON.parse(string);

  if (objectValue == null) {
    consoleMessage("JSON is null! Did you format it correctly?", "mongoDB");
  } else if (objectValue == undefined) {
    consoleMessage("JSON is undefined! Did you format it correctly?", "mongoDB");
    return null;
  } else {
    return objectValue[valueNeeded];
  }
};
//End JSON Management
/**
 *  @example await connectToDB
 * @returns {Boolean} true if connected sccessfully, false if not.
 **/
const connectToDB = async () => {
  await mongoose.connect(config.MONGO_CONFIG);
  connected = true;
  console.log("MongoDB is loaded!");
  db = await mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:")); //tells us if there is an error
  consoleMessage("Connection complete!", "mongoDB");
  return true;
};

const setRank = async (userId, rank) => {
  consoleMessage(`setRank run with params userID: ${userId} and rank ${rank}`, "mongoDB");
  if (!connected || !db) {
    await connectToDB();
  }

  const rankNew = lvl_module({ userId, rank, rank });

  rankNew.save((err) => {
    if (err) {
      console.error(err);
      return false;
    } else {
      consoleMessage("Complete! Returning...", "mongoDB");
      return true;
    }
  });
};

const getRank = async (userId) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const rankJSON = await rankModule.find({ userId });
  getJsonValue(rankJSON, "rank");
  return rankJSON;
};

const addLoggingChannel = async (guildID, channelID) => {
  if (!connected || !db) {
    await connectToDB();
  }
  const loggingChannelNew = loggingChannelModule({ guildID, channelID });
  loggingChannelNew.save((err) => {
    if (err) {
      console.error(err);
      return false;
    }
  });
  return true;
};

const checkBW = async (word) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const checkWord = await bannedWordsModule.find({ word });

  if (!checkWord[0]) {
    return false;
  } else {
    return true;
  }
};


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

    console.log("XP: " + xp + " Level: " + level + " UserID: " + userId);
  const oldObj = await lvl_module.findOne({ userId });

  if (!oldObj) {
    const newModel = lvl_module({ userId, xp, level });

    newModel.save((err) => {
      if (err) {
        console.error(err);
        return false;
      }
    });

    //consoleMessage("Data updated in DB!", "mongoDB"); //for dubugging
    return true;
  }

  await lvl_module.findOneAndUpdate({ userId: userId }, { userId, xp, level });
  //consoleMessage("Data updated in DB!", "mongoDB"); //for debugging
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
  const userRank = await lvl_module.findOne({ userId });
  consoleMessage("XP retreived sucsessfully! Returning...", "mongoDB/getXP")
  return userRank.xp ?? 0;
};

/**
 *  @param {Number} startTime Start time of the bot
 *  @example await startTime("time")
 * @returns {Bool} true if saved sccessfully, false if not.
 **/
const startTime = async (startTime) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const UPMN = uptimeModule({ time: startTime }); //create a new "lvlNew" object (data)
  //UPMN is UpTime Module New
  await UPMN.save((err) => {
    if (err) {
      console.error(err);
      return false;
    }
  });

  consoleMessage("Start time logged and written! Bot started at " + startTime, "mongoDB");
  return true;
};

/**
 *
 * @param {string} word
 * @returns boolean
 */
const addBW = async (Bword) => {
  //only to be used manually!
  if (!connected || !db) {
    await connectToDB();
  }
  const newBW = await bannedWordsModule({ word: Bword });
  await newBW.save((err) => {
    if (err) {
      console.error(err);
      return false;
    }
  });
  console.log("run");
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

const addIgnoredChannel = async (guildID, channelID) => {
  if (!connected || !db) {
    await connectToDB();
  } //connect
  const newIgnoredChannel = await ignoredChannelModel({
    guildID: guildID,
    channelID: channelID,
  });
  await newIgnoredChannel.save((err) => {
    if (err) {
      console.error(err);
      console.log("error!");
      return false;
    }
    return true;
  });
};

const checkIgnoredChannel = async (guildId, channelId) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const ignoredChannelJSON = await ignoredChannelModel.findOne({
    guildId,
    channelId,
  });
  //console.log(ignoredChannelJSON);
  if (ignoredChannelJSON == null) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  saveXP,
  getXP,
  startTime,
  connectToDB,
  getJsonValue,
  addWarn,
  getWarns,
  clearWarns,
  saveLogToggle,
  getLogToggle,
  getBannedWordToggle,
  saveBannedWordToggle,
  addIgnoredChannel,
  checkIgnoredChannel,
  saveEconomy,
  saveWelcomeToggle,
  checkBW,
  getWelcomeToggle,
  setRank,
  getRank,
};

consoleMessage("mongodb.js run" , "botInit");
