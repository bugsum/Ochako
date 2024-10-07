import { ChannelType, SlashCommandBuilder, TextChannel } from "discord.js";
import { Utils } from "../../structs";

const options = new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge messages from a channel")
    .addIntegerOption(
        option => option
            .setName("amount")
            .setDescription("The amount of messages to purge")
            .setRequired(true));

export default Utils.command(options as SlashCommandBuilder, (client, interaction) => {
    const amount = interaction.options.getInteger("amount") ?? 0;

    if (amount < 1 || amount > 100) {
        return interaction.reply({ content: "The amount of messages to purge must be between 1 and 100.", ephemeral: true });
    }

    if (interaction.channel?.type === ChannelType.GuildText) {
        (interaction.channel as TextChannel).bulkDelete((amount), true);
    }

    return interaction.reply({ content: `Purged ${amount} messages.`, ephemeral: true });
})