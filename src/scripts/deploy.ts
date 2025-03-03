import { Command } from "@lib/types";
import { env, logger, traverse } from "@lib/utils";
import { APIUser, REST, Routes } from "discord.js";
import { config } from "dotenv";
import path from "node:path";

config({ path: ".env" });

export async function fetchCommands(path: string) {
    const commands = (await traverse(path)) as Command[];

    return commands.flat();
}

const rest = new REST().setToken(env("TOKEN"));
const content = fetchCommands(path.join(__dirname, "../commands"));

async function deploy() {
    const user = (await rest.get(Routes.user())) as APIUser;
    const endpoint =
        env("NODE_ENV") === "production"
            ? Routes.applicationCommands("962735903523098654")
            : Routes.applicationGuildCommands(
                  "962735903523098654",
                  env("GUILD_ID"),
              );

    await rest.put(endpoint, { body: await content });

    return user;
}

deploy()
    .then((user) => {
        const tag = `${user.username}`;
        const response =
            env("NODE_ENV") === "production"
                ? `Successfully released commands in production as ${user.username}`
                : `Successfully registered commands for development as ${user.username}`;

        logger.info(response);
    })
    .catch(console.error);
