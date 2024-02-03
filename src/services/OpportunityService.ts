import { OpportunityRepository } from "@hugin-repositories/OpportunityRepository";
import { Opportunity } from "@hugin-types/Opportunity";
import { Scraper } from "@hugin-types/Scraper";
import { ScraperProvider } from "@hugin/providers/ScraperProvider";
import { notificationsQueue } from "@hugin/utils/notificationsQueue";

export class OpportunityService {
  public repository: OpportunityRepository;

  constructor() {
    this.repository = new OpportunityRepository();
  }

  public async alertNews(): Promise<Opportunity[]> {
    console.log(`[${new Date().toLocaleString("pt-BR")}] Scraping...`);

    const opportunities = await this.scrapAll();
    const news: Opportunity[] = await this.repository.diff(opportunities);

    // register in database
    news.forEach((op) => this.storeOpportunity(op));

    // notify on discord webhook
    this.notifyAll(news);

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

  public notifyAll(ops: Opportunity[]): void {
    const now = new Date();
    ops.forEach((op) => {
      notificationsQueue
        .createJob(op)
        .delayUntil(now.setSeconds(now.getSeconds() + 1)) // workaround to discord rate limit =P
        .retries(2)
        .save();
    });
  }
}
