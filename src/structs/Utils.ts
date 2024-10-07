import { Client } from "discord.js";
import { Command, CommandCallback, CommandCategoryOptions, CommandOptions, COmmmandCategory, Event, EventCallback, EventName } from "../types";

export class Utils {
    // This method gets a variable from the environment
    public static getVariable(variable: string, fallback?: string): string {
        const value = process.env[variable] ?? fallback;

        if (!value) {
            throw new Error(`Variable ${variable} is not set`);
        }

        return value;
    }

    // This is a generic method that creates an event object
    public static event<T extends EventName>(name: T, callback: EventCallback<T>): Event<T> {
        return { name, callback };
    }

    // This is a generic method that creates a command object
    public static command(options: CommandOptions, callback: CommandCallback): Command {
        return { options, callback };
    }

    // This is a generic method that creates a category object
    public static category(name: string, commands: Command[], extra: CommandCategoryOptions): COmmmandCategory {
        return { name, commands, ...extra };
    }

    // This method registers events to the client
    public static registerEvents(client: Client, events: Event[]): void {
        for (const event of events) {
            client.on(event.name, (...args) => {
                const log = console.log.bind(console, `[Event: ${event.name}]`);

                try {
                    event.callback(client, ...args)
                } catch (error) {
                    log('[Error]', error);
                }
            });
        }
    }
}