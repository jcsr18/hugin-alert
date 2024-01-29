import { Client, CommandInteraction } from "discord.js";
import Command from "./Command";

export class PingCommand extends Command {
  async run(client: Client, interaction: CommandInteraction): Promise<void> {
    interaction.reply('pong');
  }
}
