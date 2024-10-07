import { Utils } from "../structs";

export default Utils.event("ready", (client) => {
    return console.log(`Logged in as ${client.user?.tag}`);
})