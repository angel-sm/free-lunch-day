"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const Recipe_model_1 = require("../models/Recipe.model");
const client_1 = require("@prisma/client");
class Repository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getRecipes() {
        const documents = await this.prisma.recipes.findMany();
        const recipes = documents.map((recipes) => new Recipe_model_1.Recipe(recipes === null || recipes === void 0 ? void 0 : recipes.id, recipes === null || recipes === void 0 ? void 0 : recipes.title, recipes === null || recipes === void 0 ? void 0 : recipes.description, recipes === null || recipes === void 0 ? void 0 : recipes.ingredients, recipes === null || recipes === void 0 ? void 0 : recipes.instructions, recipes === null || recipes === void 0 ? void 0 : recipes.cover, recipes === null || recipes === void 0 ? void 0 : recipes.createdAt, recipes === null || recipes === void 0 ? void 0 : recipes.updatedAt));
        return recipes;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=mongo.repository.js.map