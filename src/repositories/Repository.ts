import { prisma } from "@hugin/database/Prisma";
import { PrismaClient } from "@prisma/client";

export class Repository {
  protected repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }
}
