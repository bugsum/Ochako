import { Collection } from "discord.js";
import commands from "../commands";
import { Utils } from "../structs";
import { Command } from "../types";

const commandList = commands.map(({ commands }) => commands).flat();
const commandListMap = new Collection<string, Command>(commandList.map(c => [c.options.name, c]));

export default Utils.event("interactionCreate", async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        try {
            const commandName = interaction.commandName;
            const command = commandListMap.get(commandName);

            await command?.callback(client, interaction);
        } catch (error) {
            console.error(error);

            if (interaction.deferred)
                return interaction.editReply({
                    content: "An error occurred while executing this command.",
                    embeds: [],
                    components: []
                });

            return interaction.reply({ content: "An error occurred while executing this command.", ephemeral: true });
        }
    }
})