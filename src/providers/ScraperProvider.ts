import { GupyScraper } from "@hugin-scrappers/GupyScraper";
import { SolidesScraper } from "@hugin-scrappers/SolidesScraper";
import { Scraper } from "@hugin-types/Scraper";
import { UndefinedSearchEnvError } from "@hugin/errors/UndefinedSearchEnvError";

export class ScraperProvider {
  public static scrapers(): Scraper[] {
    const { SOLIDES_URI, SOLIDES_ENDPOINT } = process.env;
    const { GUPY_URI, GUPY_ENDPOINT } = process.env;

    const search: string | undefined = process.env.SEARCH_QUERY;

    if (!search) {
      throw new UndefinedSearchEnvError();
    }

    return [
      {
        name: "Solides",
        provider: new SolidesScraper(
          SOLIDES_URI as string,
          SOLIDES_ENDPOINT as string,
          search,
        ),
      },
      {
        name: "Gupy",
        provider: new GupyScraper(
          GUPY_URI as string,
          GUPY_ENDPOINT as string,
          search,
        ),
      },
    ];
  }
}
