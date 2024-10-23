import { ChannelType } from "discord.js";
import { Utils } from "../structs";

export default Utils.event("ready", async (client) => {
    console.log(`Logged in as ${client.user?.tag}`);

    // get guild id by name
    const guild = client.guilds.cache.find((g) => g.name === "Ochako Tests");
    
    // check username by id from discord api
    if (guild) {
        const userId = '1183624057862770729'; // Replace with the actual user ID
        try {
            const user = await client.users.fetch(userId);
            console.log(`Username: ${user.username}`);
        } catch (error) {
            console.error(`Failed to fetch user: ${error}`);
        }
    } else {
        console.error('Guild not found');
    }
})