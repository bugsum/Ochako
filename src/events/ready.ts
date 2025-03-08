import { createEvent } from "@handlers/eventHandler";
import { logger } from "@lib/utils";
import { ActivityType } from "discord.js";

export default createEvent({
    name: "ready",
    runOnce: true,
    listener: (client) => {
        logger.info(`${client.user?.username} is ready!`);

        client.user?.setActivity({
            name: "to Endbyte",
            type: ActivityType.Listening,
        });
    },
});
