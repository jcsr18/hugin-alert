import { AxiosResponse } from "axios";
import { ApiScraper } from "./ApiScraper";
import { Opportunity } from "@hugin-types/Opportunity";

export class SolidesScraper extends ApiScraper {
  public async request(): Promise<AxiosResponse<any, any>> {
    return await this.api.get(this.endpoint, {
      params: {
        page: 1,
        title: 'php',
        take: 20,
      }
    });
  }

  public parseOpportunitiesFromApi(response: AxiosResponse<any, any>): Opportunity[] {
    const data = response.data.data.data;

    return data.map((op: any) => {
      return {
        id: op.id,
        provider: 'SOLIDES',
        url: op.redirectLink,
        title: op.title,
        isRemote: op.homeOffice,
        pcdOnly: op.pcdOnly,
        companyName: op.companyName,
        cityName: op.city?.name,
        publishedAt: new Date(op.createdAt),
      }
    });
  }
}
