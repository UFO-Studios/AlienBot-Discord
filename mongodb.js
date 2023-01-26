const mongoose = require("mongoose");
const config = require("./config.json");

let connected;
let db;

//silece mongoose warnings
mongoose.set("strictQuery", true);

//START schemas
const LvlSchema = new mongoose.Schema({
  userId: Number,
  xp: Number,
});

const uptimeSchema = new mongoose.Schema({
  time: Number,
});

//warns (AW = Add Warns)
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

//END (schemas)

//START modules
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
const ignoredChannelModel = new mongoose.model(
  "ignoredChannel",
  addIgnoredChannelSchema
);
const setWelcomeModel = new mongoose.model("setWelcome", setWelcomeSchema);
//END modules

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
  console.log("Complete!");
};

const checkBW = async (word) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const checkWord = await bannedWordsModule.find({ word });
  if (checkWord == false) {
    return false;
  } else {
    return true;
  }
};

/**
 *
 * @param {Number} userId
 * @param {Number} balance
 */
const saveEconomy = async (userId, balance) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const economyNew = economicModule({ userId, balance });

  economyNew.save((err) => {
    if (err) {
      console.error(err);
      return false;
    }
  });

  console.log("Data added to DB!");
  return true;
};

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @param {Number} UserLevel The new level for the user.
 *  @param {String} _ID The ID. Yes im lazy
 *  @example await saveXP("userID", "XP")
 * @returns {Bool} true if saved successfully, false if not.
 **/
const saveXP = async (userId, xp, _id) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const lvlnew = lvl_module({ userId, xp });

  if (_id == null) {
    console.log("Document ID is " + _id + " ! Skipping deletion...");
  } else {
    await lvl_module.findByIdAndDelete({ _id });
  }

  await lvlnew.save((err) => {
    if (err) {
      console.error(err);
      return false;
    }
  });

  console.log("Data added to DB!");
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

  const userXp = await lvl_module.findOne({ userId });
  //console.log(userXp);
  if (userXp == null) {
    return 0;
  };

    const xpOut = getJsonValue(userXp, "xp");
  //console.log("Data recived from DB!");
  return xpOut;
};

const getEconomy = async (userId) => {
  if (!connected || !db) {
    await connectToDB();
  }

  const userEconomy = await economicModule.findOne({ userId });

  console.log("Data recived from DB!");
  console.log(userEconomy);
  return userEconomy;
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

  console.log("Start time logged and written! Bot started at " + startTime);
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

// completely useless
const getJsonValue = async (input, valueNeeded) => {
  const string = await JSON.stringify(input);
  const objectValue = await JSON.parse(string);

  if (objectValue == null) {
    console.log("JSON is null! Did you format it correctly?");
  } else {
    return objectValue[valueNeeded];
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
    console.log("connected");
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
    console.log("connected");
  } //connect
  const BWToggleJSON = await BWToggleModel.findOne({ guildID });
  if (BWToggleJSON == null) {
    return false;
  } else {
    var string = JSON.stringify(BWToggleJSON);
    var objectValue = JSON.parse(string);
    const BWToggle = objectValue["toggle"];
    return BWToggle;
  }
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
  console.log(ignoredChannelJSON);
  if (ignoredChannelJSON == null) {
    return false;
  } else {
    return true;
  }
};

async function setWelcome(guildID, welcomeMessage, leaveMessage, webhookURL) {
  if (!connected || !db) {
    await connectToDB();
  } //connect
  const newWelcome = await setWelcomeModel({
    guildID: guildID,
    welcomeMessage: welcomeMessage,
    webhookURL: webhookURL,
    leaveMessage: leaveMessage,
  });
  await newWelcome.save((err) => {
    if (err) {
      console.error(err);
      console.log("error!");
      return false;
    }
    return true;
  });
}

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
  setWelcome,
  saveEconomy,
  getEconomy,
  checkBW,
};

console.log("mongodb.js run");
