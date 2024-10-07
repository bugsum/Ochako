import { APIUser, REST, Routes } from "discord.js";
import commands from "../commands";
import { Utils } from "../structs";
import { config } from "dotenv";

config({ path: ".env" });

const rest = new REST({ version: "10" }).setToken(Utils.getVariable("TOKEN"));
const content = commands.map(({ commands }) => commands.map(({ options }) => options)).flat();

async function deploy() {
    const user = await rest.get(Routes.user()) as APIUser;
    const endpoint = Utils.getVariable("NODE_ENV") === "production"
        ? Routes.applicationCommands(user.id)
        : Routes.applicationGuildCommands(user.id, Utils.getVariable("GUILD_ID"));

    await rest.put(endpoint, { body: content })

    return user;
}

deploy()
    .then((user) => {
        const tag = `${user.username}`;
        const response = Utils.getVariable("NODE_ENV") === "production"
            ? `Successfully released commands in production as ${user.username}`
            : `Successfully registered commands for development as ${user.username}`;

        console.log(response);
    })
    .catch(console.error);