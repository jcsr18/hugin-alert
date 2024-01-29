import { Client, CommandInteraction, InteractionType } from "discord.js";

interface SlashCommandContract {
  run(client: Client, interaction: CommandInteraction): Promise<void>;
  getName(): string;
  getDescription(): string;
  getType(): InteractionType;
}

export default SlashCommandContract;