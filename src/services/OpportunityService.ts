import { OpportunityRepository } from "@hugin-repositories/OpportunityRepository";
import { Opportunity } from "@hugin-types/Opportunity";
import { Scraper } from "@hugin-types/Scraper";
import { ScraperProvider } from "@hugin/providers/ScraperProvider";
import { DiscordNotification } from "@penseapp/discord-notification";

export class OpportunityService {
  public repository: OpportunityRepository;

  constructor() {
    this.repository = new OpportunityRepository();
  }

  public async alertNews(): Promise<Opportunity[]> {
    const opportunities = await this.scrapAll();
    const toRegisterOpportunities: Opportunity[] =
      await this.repository.diff(opportunities);

    toRegisterOpportunities.forEach((op: Opportunity) => {
      this.storeOpportunity(op);
      this.notify(op);
    });

    return [];
  }

  public async scrapAll(): Promise<Opportunity[]> {
    const scrapers: Scraper[] = ScraperProvider.scrapers();
    let opportunities: Opportunity[] = [];

    await Promise.all(
      scrapers.map(async (scraper: Scraper) => {
        const latest = await scraper.provider.scrap();
        opportunities = [...opportunities, ...latest];
      }),
    );

    return opportunities;
  }

  public async storeOpportunity(opportunity: Opportunity) {
    await this.repository.storeFromScraper(opportunity);
  }

  public async notify(opportunity: Opportunity) {
    const { DISCORD_WEBHOOK } = process.env;
    const notifyService: DiscordNotification = new DiscordNotification(
      opportunity.provider,
      DISCORD_WEBHOOK as string,
    );

    await notifyService
      .infoMessage()
      .addTitle(opportunity.title)
      .addField({
        name: "",
        value: `:trophy: ${opportunity.companyName ?? "Confidencial"}`,
        inline: false,
      })
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
        `Publicada em ${opportunity.publishedAt.toLocaleString("pt-BR")}`,
      )
      .sendMessage();
  }
}
