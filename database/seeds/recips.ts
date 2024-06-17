// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedRecipes = async (recipes: any) => {
  await prisma.recipes.createMany({
    data: recipes,
  });
};
