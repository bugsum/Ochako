import { bold, inlineCode, SlashCommandBuilder } from "discord.js";
import { Utils } from "../../structs";

const options = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Reports with the live latency of Ochako!");

export default Utils.command(options, (client, interaction) => {
    return interaction.reply(`Ochako's Live Latency: ${bold(inlineCode(`${client.ws.ping}`))}`);
})