import { config } from "dotenv";

config({ path: process.cwd() + "/.env" });

export function env(key: string, fallBack?: string): string {
    const value = process.env[key] ?? fallBack;

    if (!value) {
        throw new Error(
            `No Environment Variable or Fallback value found for: ${key}`,
        );
    }

    return value;
}
