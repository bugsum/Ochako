import { createEvent } from "@handlers/eventHandler";
import { logger } from "@lib/utils";
import { MessageFlags } from "discord.js";

export default createEvent({
    name: "interactionCreate",
    listener: (client, interaction) => {
        if (interaction.isChatInputCommand()) {
            try {
                const commandName = interaction.commandName;
                const command = client.commandMap.get(commandName);

                logger.info(client.commandMap.map((cmd) => cmd));

                if (!command) {
                    interaction.reply({
                        content: "No command found with that name",
                        flags: [MessageFlags.Ephemeral],
                    });
                }

                command?.interact(client, interaction);
            } catch (error) {
                logger.error(error);

                if (interaction.deferred)
                    return interaction.editReply({
                        content:
                            "An error occurred while executing this command.",
                        embeds: [],
                        components: [],
                    });

                return interaction.reply({
                    content: "An error occurred while executing this command.",
                    flags: [MessageFlags.Ephemeral],
                });
            }
        }
    },
});
