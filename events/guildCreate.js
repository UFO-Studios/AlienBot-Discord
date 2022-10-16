const { Guild, Client } = require("discord.js");

module.exports = {
  name: "guildCreate",
  /**
   *
   * @param {Guild} guild
   * @param {Client} client
   */
  async execute(guild, client) {
    await client.F.addData("banned-words", guild.id, { toggleValue: "on" });
    await client.F.addData("level", guild.id, {
      exist: "yes",
    });
  },
};
