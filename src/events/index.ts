import { Event } from "../types";
import interactionCreate from "./interactionCreate";
import ready from "./ready";


export default [ready, interactionCreate] as Event[];