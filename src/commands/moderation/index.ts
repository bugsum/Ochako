import { Utils } from "../../structs";
import kick from "./kick";
import purge from "./purge";

export default Utils.category(
    "Moderation",
    [
        purge,
        kick
    ],
    {
        description: "Moderation commands",
        emoji: "🛠️"
    }
);