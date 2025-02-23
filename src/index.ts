import { Client } from "@/ochako";
import { env } from "@utils/env";
import { GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
    console.log(client.user?.username);
});

client.login(env("TOKEN")).then();
