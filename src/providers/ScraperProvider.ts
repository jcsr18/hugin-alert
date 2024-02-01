import { SolidesScraper } from "@hugin-scrappers/SolidesScraper";
import { Scraper } from "@hugin-types/Scraper";

export class ScraperProvider {
  public static scrapers(): Scraper[] {
    const { SOLIDES_URI, SOLIDES_ENDPOINT } = process.env;

    return [
      {
        name: 'Solides',
        provider: new SolidesScraper(SOLIDES_URI as string, SOLIDES_ENDPOINT as string),
      },
    ];
  }
}
