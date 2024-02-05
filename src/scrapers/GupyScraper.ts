import { AxiosResponse } from "axios";
import { ApiScraper } from "./ApiScraper";
import { Opportunity } from "@hugin-types/Opportunity";

export class GupyScraper extends ApiScraper {
  public async request(): Promise<AxiosResponse<any, any>> {
    return await this.api.get(this.endpoint, {
      params: {
        jobName: this.search,
        limit: 10,
      },
    });
  }

  public parseOpportunitiesFromApi(
    response: AxiosResponse<any, any>,
  ): Opportunity[] {
    const data = response.data.data;

    return data.map((op: any) => {
      return {
        id: op.id,
        provider: "Gupy",
        url: op.jobUrl,
        title: op.name,
        isRemote: op.isRemoteWork,
        pcdOnly: op.disabilities,
        companyName: op.careerPageName,
        cityName: op.city,
        publishedAt: new Date(op.publishedDate),
      };
    });
  }
}
