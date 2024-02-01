import { Opportunity } from "@hugin-types/Opportunity";
import { AxiosInstance, AxiosResponse } from "axios";

export interface ScraperApiContract {
  scrap(): Promise<Opportunity[]>;
  request(): Promise<AxiosResponse>;
  createAxiosInstance(): AxiosInstance;
  parseOpportunitiesFromApi(data: AxiosResponse): Opportunity[];
}