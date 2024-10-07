import { Client, GatewayIntentBits as Intents } from "discord.js";
import "dotenv/config";
import { Utils } from "./structs";
import events from "./events"

const ochako = new Client({
    intents: [
        Intents.Guilds,
        Intents.GuildMessages,
        Intents.GuildMembers,
        Intents.MessageContent
    ]
});

Utils.registerEvents(ochako, events);

ochako.login(Utils.getVariable("TOKEN")).catch(err => {
    console.error("[Login Error]", err);
    process.exit(1);
});