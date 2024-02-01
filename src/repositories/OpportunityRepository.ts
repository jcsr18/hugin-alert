import { Prisma } from "@prisma/client";
import { Repository } from "./Repository";
import { Opportunity } from "@hugin-types/Opportunity";

export class OpportunityRepository extends Repository {
  private model: Prisma.OpportunityDelegate;

  constructor() {
    super();
    this.model = this.repository.opportunity;
  }

  public async storeFromScraper(opportunity: Opportunity) {
    return await this.model.create({
      data: {
        title: opportunity.title,
        providerId: String(opportunity.id),
        provider: opportunity.provider,
        url: opportunity.url,
        isRemote: opportunity.isRemote,
        pcdOnly: opportunity.pcdOnly,
        companyName: opportunity.companyName,
        city: opportunity.cityName,
        publishedAt: opportunity.publishedAt,
      }
    });
  }

  public async diff(opportutinies: Opportunity[]): Promise<Opportunity[]> {
    const withoutRegister = await this.model.findMany({
      where: {
        AND: [
          {
            providerId: {
              notIn: opportutinies.map(op => op.provider)
            },
          },
          {
            provider: {
              notIn: opportutinies.map(op => String(op.id))
            }
          }
        ]
      }
    });

    return opportutinies.filter((op) => {
      return !withoutRegister.some((wr) => String(op.id) === String(wr.providerId) && op.provider === wr.provider);
    });
  }
}
