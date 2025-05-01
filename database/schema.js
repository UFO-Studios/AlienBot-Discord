const mongoose = require("mongoose");


const LvlSchema = new mongoose.Schema({
  userId: Number,
  xp: Number,
  level: Number,
});

const AWSchema = new mongoose.Schema({
  guildId: Number,
  userId: Number,
  warns: Number,
});

const bannedWordsSchema = new mongoose.Schema({
  word: String,
});

const loggingToggleSchema = new mongoose.Schema({
  guildId: Number,
  toggle: Boolean,
});

 BWToggleSchema = new mongoose.Schema({
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

export default {
  LvlSchema,
  AWSchema,
  bannedWordsSchema,
  loggingToggleSchema,
  BWToggleSchema,
  welcomeToggleSchema,
};