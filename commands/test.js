const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const { add } = require("libsodium-wrappers");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testlol")
    .setDescription("testlol AlienBot!"),
  global: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const mongoS = new Date();
    await mongoose.connect(
      "mongodb+srv://AB:xKBuXE6sQxDT2zp3@abdb.dijoszh.mongodb.net/level"
    );
    console.log("loaded!");

    const db = await mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    const schema = new mongoose.Schema({
      hello: String,
    });

    const hw = new mongoose.model("hwdwsloloed", schema);
    const hwi = new hw({ hello: "world" });

    await hwi.save((err) => {
      if (err) return console.error(err);
    });

    const dataM = hw.find();
    console.log(dataM);

    const mongo = (new Date().getTime() - mongoS.getTime()) / 1000;

    // firebase
    const fireS = new Date();
    await client.F.addData("test", "hw", { hello: "world" });
    const firebase = (new Date().getTime() - fireS.getTime()) / 1000;

    const dataF = await client.F.getData("test", "hw");
    console.log(dataF);

    await interaction.editReply(`mongo: ${mongo}, firebase: ${firebase}`);
  },
};
console.log("test.js run");
