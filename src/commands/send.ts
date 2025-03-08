import { createCommand } from "@handlers/commandHandler";
import { CommandOptionType, CommandType } from "@lib/types";
import { MessageFlags } from "discord.js";

export default createCommand({
    name: "send",
    description: "A advanced content sending command",
    type: CommandType.CHAT_INPUT,
    options: [
        {
            name: "message",
            description: "The message content to be sent.",
            type: CommandOptionType.STRING,
            required: true,
        },
    ],

    interact: (client, interaction) => {
        const messageContent =
            interaction.options.getString("message") ?? "No Message provided.";

        return interaction.reply({
            content: messageContent,
            flags: [MessageFlags.Ephemeral],
        });
    },
});
