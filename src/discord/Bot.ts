import { CommandRegister } from "@discord-commands/CommandRegister";
import { onInteractionCreate } from "@discord-events/onInteractionCreate";
import { onReady } from "@discord-events/onReady";
import { DiscordConfig } from "@discord-types/DiscordConfig";
import { Client, Interaction, REST } from "discord.js";

class Bot {
	public clientId: string;
  public client: Client;
  
  private rest: REST;
	private token: string;
  
	constructor(config: DiscordConfig) {
		this.clientId = config.clientId;
		this.token = config.token;
    this.client = new Client({
      intents: [],
    });
    this.rest = this.createRest(config.token);
	}

	public async init(): Promise<this> {
		this.client.login(this.token);
    this.registerEvents();
    await CommandRegister.register(this);

    return this;
	}

  private createRest(token: string): REST {
    return new REST({
      version: "10"
    }).setToken(token);
  }

  protected registerEvents(): void {
    this.client.on('ready', onReady); 
    this.client.on('interactionCreate', (interac: Interaction) => onInteractionCreate(this.client, interac)); 
  }

  public getRest(): REST {
    return this.rest;
  }
}

export default Bot;