import { Opportunity } from "@hugin-types/Opportunity";
import { DiscordNotification } from "@penseapp/discord-notification";
import { JobHandler } from "./JobHandler";

export class DiscordNotificationWebhookJob extends JobHandler {
  public async handle(opportunity: Opportunity) {
    const { DISCORD_WEBHOOK } = process.env;
    const notifyService: DiscordNotification = new DiscordNotification(
      `${opportunity.companyName ?? "Confidencial"}`,
      DISCORD_WEBHOOK as string,
    );

    await notifyService
      .infoMessage()
      .addTitle(opportunity.title)
      .addField({
        name: ":cityscape: Cidade",
        value: opportunity.cityName ?? "N/I",
        inline: false,
      })
      .addField({
        name: ":homes: Home-Office",
        value: opportunity.isRemote ? "Sim" : "Não",
        inline: true,
      })
      .addField({
        name: ":wheelchair: PCD",
        value: opportunity.pcdOnly ? "Sim" : "Não",
        inline: true,
      })
      .addField({
        name: ":tada: Link",
        value: opportunity.url,
        inline: false,
      })
      .addFooter(
        `Publicada em ${opportunity.publishedAt.toLocaleString("pt-BR")} por ${opportunity.provider}`,
      )
      .sendMessage();
  }
}
