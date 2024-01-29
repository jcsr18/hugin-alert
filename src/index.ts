import Bot from "@discord/Bot";
import { MissingDiscordEnvironmentError } from "@errors/MissingDiscordEnvironmentError";
import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (! DISCORD_TOKEN || ! DISCORD_CLIENT_ID) {
  throw new MissingDiscordEnvironmentError;
}

(new Bot({
  clientId: DISCORD_CLIENT_ID,
  token: DISCORD_TOKEN,
})).init();