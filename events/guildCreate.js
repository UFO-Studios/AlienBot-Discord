const { Guild, Client } = require("discord.js");

module.exports = {
  name: "guildCreate",
  /**
   *
   * @param {Guild} guild
   * @param {Client} client
   */
  async execute(guild, client) {
    await guild.publicUpdatesChannel.send({
      content: "Initializing Server Setup Protocol...",
    });

    await client.F.addData("banned-words", guild.id, { toggleValue: "on" });
    await client.F.addData("level", guild.id, {
      exist: "yes",
    });

    await guild.publicUpdatesChannel.send({
      content: "Server Setup Complete!",
    });
  },
};
