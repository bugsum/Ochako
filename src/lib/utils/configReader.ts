import { readFileSync } from "node:fs";

export function fetchConfig(path: string): Record<string, any> {
    const config = readFileSync(path, "utf-8");
    const YAML = require("yaml");
    const result = YAML.parse(config);

    return result;
}
