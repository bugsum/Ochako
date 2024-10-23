import { PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { Utils } from "../../structs";

const options = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .addUserOption(
        option => option
            .setName("user")
            .setDescription("The user to ban")
            .setRequired(true))
    .addStringOption(
        option => option
            .setName("reason")
            .setDescription("The reason for banning the user")
            .setRequired(false))
    .addIntegerOption(
        option => option
            .setName("days")
            .setDescription("The amount of days of messages to delete")
            .setRequired(false));

export default Utils.command(options as SlashCommandBuilder, (client, interaction) => {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") ?? "No reason provided";
    const days = interaction.options.getInteger("days") ?? 0;

    if ((interaction.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.BanMembers)) {
        if (interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.BanMembers)) {
            if (user) {
                const member = interaction.guild.members.cache.get(user.id);

                if (member) {
                    member.ban({ reason, deleteMessageDays: days });
                    return interaction.reply({ content: `Banned ${user.tag} for ${reason}`, ephemeral: true });
                }

                return interaction.reply({ content: "The user is not in the server.", ephemeral: true });
            }

            return interaction.reply({ content: "The user is not in the server.", ephemeral: true });
        }

        return interaction.reply({ content: "I don't have permission to ban members.", ephemeral: true });
    }

    return interaction.reply({ content: "You don't have permission to ban members.", ephemeral: true });
})