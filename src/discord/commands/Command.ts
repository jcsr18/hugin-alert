import SlashCommandContract from "@discord-contracts/SlashCommandContract";
import { Client, CommandInteraction, InteractionType } from "discord.js";

abstract class Command implements SlashCommandContract {
  private name: string;
  private description: string;
  private type: InteractionType;

  constructor(name: string, description: string, type: InteractionType) {
    this.name = name;
    this.description = description;
    this.type = type;
  }

  getName(): string {
    return this.name;
  }
  
  getDescription(): string {
    return this.description;
  }
  
  getType(): InteractionType {
    return this.type;
  }

  run(client: Client, interaction: CommandInteraction): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
}

export default Command;