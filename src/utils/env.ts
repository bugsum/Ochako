import { config } from "dotenv";

config();

export function env(key: string, fallBack?: string): string {
    const value = process.env[key] ?? fallBack;

    if (!value) {
        throw new Error(
            `No Environment Variable or Fallback value found for: ${key}`,
        );
    }

    return value;
}
