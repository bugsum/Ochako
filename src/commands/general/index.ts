import { Utils } from "../../structs";
import help from "./help";
import ping from "./ping";

export default Utils.category(
    "General",
    [
        help,
        ping
    ],
    {
        description: "General commands",
        emoji: "🌐"
    }
);