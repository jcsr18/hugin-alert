import { OpportunityService } from "@hugin-services/OpportunityService";
import * as schedule from "node-schedule";

export class OpportunityCron {
  public execute() {
    const rule = "*/5 * * * *";

    schedule.scheduleJob(rule, function () {
      new OpportunityService().alertNews();
    });
  }
}
