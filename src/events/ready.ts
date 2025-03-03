import { createEvent } from "@handlers/eventHandler";
import { logger } from "@lib/utils";

export default createEvent({
    name: "ready",
    runOnce: true,
    listener: (client) => {
        logger.info(`${client.user?.username} is ready!`);
    },
});
