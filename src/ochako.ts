import { ClientOptions, Client as DiscordClient } from "discord.js";

export class Client<
    Ready extends boolean = boolean,
> extends DiscordClient<Ready> {
    constructor(options: ClientOptions) {
        super(options);
    }
}
