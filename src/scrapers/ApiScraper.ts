import { ScraperApiContract } from "@hugin-contracts/ScraperApiContract";
import { Opportunity } from "@hugin-types/Opportunity";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export abstract class ApiScraper implements ScraperApiContract {
  public baseUri: string;
  public endpoint: string;
  public search: string;

  protected api: AxiosInstance;

  constructor(baseUri: string, endpoint: string, search: string) {
    this.baseUri = baseUri;
    this.endpoint = endpoint;
    this.search = search;
    this.api = this.createAxiosInstance();
  }

  public async scrap(): Promise<Opportunity[]> {
    const response: AxiosResponse = await this.request();

    return this.parseOpportunitiesFromApi(response);
  }

  public async request(): Promise<AxiosResponse> {
    throw new Error("request method not implemented.");
  }

  public parseOpportunitiesFromApi(response: AxiosResponse): Opportunity[] {
    throw new Error("parseOpportunityFromApi method not implemented.");
  }

  public createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.baseUri,
      timeout: 10000,
    });
  }
}
