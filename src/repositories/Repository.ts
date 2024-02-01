import { PrismaClient } from "@prisma/client";

export class Repository {
  protected repository: PrismaClient;

  constructor() {
    this.repository = new PrismaClient();
  }
}
