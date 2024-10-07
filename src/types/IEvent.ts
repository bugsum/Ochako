import type { Client, ClientEvents, Awaitable } from "discord.js";

export type EventName = keyof ClientEvents;
export type EventCallback<T extends EventName> = (client: Client, ...args: ClientEvents[T]) => Awaitable<unknown>;

export interface Event<T extends EventName = EventName> {
    name: T;
    callback: EventCallback<T>;
}
