import { seedIngredients } from "./ingredients";
import { seedRecipes } from "./recips";

import { ingredients } from "../mockups/ingredients";
import { recipes } from "../mockups/recipes";

const recupeMocks = recipes(ingredients);

console.log("Seeding database...");
seedIngredients(Object.values(ingredients));
seedRecipes(recupeMocks);
console.log("Database seeded successfully");
