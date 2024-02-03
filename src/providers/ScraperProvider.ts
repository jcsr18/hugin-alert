import { GupyScraper } from "@hugin-scrappers/GupyScraper";
import { SolidesScraper } from "@hugin-scrappers/SolidesScraper";
import { Scraper } from "@hugin-types/Scraper";

export class ScraperProvider {
  public static scrapers(): Scraper[] {
    const { SOLIDES_URI, SOLIDES_ENDPOINT } = process.env;
    const { GUPY_URI, GUPY_ENDPOINT } = process.env;

    return [
      {
        name: "Solides",
        provider: new SolidesScraper(
          SOLIDES_URI as string,
          SOLIDES_ENDPOINT as string,
        ),
      },
      {
        name: "Gupy",
        provider: new GupyScraper(GUPY_URI as string, GUPY_ENDPOINT as string),
      },
    ];
  }
}
