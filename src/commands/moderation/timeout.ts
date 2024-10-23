import { PermissionsBitField, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { Utils } from "../../structs";

const options = new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user from the server")
    .addUserOption(
        option => option
            .setName("user")
            .setDescription("The user to timeout")
            .setRequired(true))
    .addStringOption(
        option => option
            .setName("reason")
            .setDescription("The reason for timing out the user")
            .setRequired(false));

export default Utils.command(options as SlashCommandBuilder, (client, interaction) => {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    if (interaction.member?.permissions instanceof PermissionsBitField && interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
        if (interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.KickMembers)) {
            if (user) {
                const member = interaction.guild.members.cache.get(user.id);

                if (member) {
                    member.timeout(1, reason);
                    return interaction.reply({ content: `Timed out ${user.tag} for ${reason}`, ephemeral: true });
                }

                return interaction.reply({ content: "The user is not in the server.", ephemeral: true });
            }

            return interaction.reply({ content: "The user is not in the server.", ephemeral: true });
        }

        return interaction.reply({ content: "I don't have permission to kick members.", ephemeral: true });
    }

    return interaction.reply({ content: "You don't have permission to kick members.", ephemeral: true });
})