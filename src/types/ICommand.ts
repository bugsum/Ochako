import { Awaitable, Client, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export type CommandOptions = SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export type CommandCallback = (client: Client, interaction: ChatInputCommandInteraction) => Awaitable<unknown>;

export interface Command {
    options: CommandOptions,
    callback: CommandCallback
}

export interface CommandCategoryOptions {
    description?: string;
    emoji?: string;
}

export interface COmmmandCategory extends CommandCategoryOptions {
    name: string,
    commands: Command[]
}