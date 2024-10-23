import { Utils } from "../../structs";
import ban from "./ban";
import kick from "./kick";
import purge from "./purge";
// import timeout from "./timeout";

export default Utils.category(
    "Moderation",
    [
        purge,
        kick,
        ban,
        // timeout
    ],
    {
        description: "Moderation commands",
        emoji: "🛠️"
    }
);