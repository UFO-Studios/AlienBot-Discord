const mongoose = require("mongoose");


export const LvlSchema = new mongoose.Schema({
  userId: Number,
  xp: Number,
  level: Number,
});

export const AWSchema = new mongoose.Schema({
  guildId: Number,
  userId: Number,
  warns: Number,
});

export const bannedWordsSchema = new mongoose.Schema({
  word: String,
});

export const loggingToggleSchema = new mongoose.Schema({
  guildId: Number,
  toggle: Boolean,
});

export const BWToggleSchema = new mongoose.Schema({
  guildID: Number,
  toggle: Boolean,
});

export const welcomeToggleSchema = new mongoose.Schema({
  guildId: Number,
  toggle: Boolean,
  webhookUrl: String,
  welcomeMsg: String,
  leaveMsg: String,
});

export const addIgnoredChannelSchema = new mongoose.Schema({
  guildID: Number,
  channelID: Number,
});
