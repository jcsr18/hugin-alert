import { ApiScraper } from "@hugin-scrappers/ApiScraper"

export type Scraper = {
  name: string,
  provider: ApiScraper
}