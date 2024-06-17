// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedIngredients = async (ingredients: Array<any>) => {
  await prisma.ingredients.createMany({
    data: ingredients,
  });
};
