import { JobHandlerContract } from "@hugin-contracts/JobHandlerContract";

export abstract class JobHandler implements JobHandlerContract {
  handle(data: any): void {
    throw new Error("Method handle not implemented.");
  }
}
