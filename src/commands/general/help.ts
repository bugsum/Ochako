import { SlashCommandBuilder } from "discord.js";
import { Utils } from "../../structs";

const options = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows a list of commands");

export default Utils.command(options, (client, interaction) => {
    return interaction.reply("Support has Arrived!");
})