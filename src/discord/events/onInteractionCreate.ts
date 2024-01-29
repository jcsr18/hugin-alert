import Command from "@discord-commands/Command";
import { commands } from "@discord-utils/commands";
import { Client, CommandInteraction, Interaction } from "discord.js";

export function onInteractionCreate(client: Client, interaction: Interaction) {
  if (interaction.isCommand())
    commandInteraction(client, interaction);
}

function commandInteraction(client: Client, interaction: CommandInteraction) {
  const command = commands[interaction.commandName] as Command;
  command.run(client, interaction)
}