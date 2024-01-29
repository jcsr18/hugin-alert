import { PingCommand } from '@discord-commands/PingCommand';
import { InteractionType } from 'discord.js';

export const commands: any = {
  ping: new PingCommand('ping', 'ping pong desc', InteractionType.ApplicationCommand),
};