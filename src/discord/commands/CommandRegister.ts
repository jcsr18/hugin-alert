import Bot from "@discord/Bot";
import Command from "./Command";
import { OAuth2Guild, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes, SlashCommandBuilder } from "discord.js";
import { commands } from "@discord-utils/commands";

export class CommandRegister {
  static async register(bot: Bot) {
    const fetchGuilds = await bot.client.guilds.fetch();
    const guilds: string[] = fetchGuilds.map((guild: OAuth2Guild) => guild.id);
    const slashCommands = this.parseCommands(Object.values(commands));

    guilds.forEach(async (guild: string) => {
      await this.registerInRest(bot.getRest(), slashCommands, bot.clientId, guild)
    });
  }

  private static parseCommands(commands: Command[]): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
    return commands.map((command: Command) => {
      return new SlashCommandBuilder()
        .setName(command.getName())
        .setDescription(command.getDescription())
        .toJSON()
    });
  }
  
  private static async registerInRest(rest: REST, commands: RESTPostAPIChatInputApplicationCommandsJSONBody[], clientId: string, guildId: string) {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId), {
        body: commands
      }
    );
  }
}