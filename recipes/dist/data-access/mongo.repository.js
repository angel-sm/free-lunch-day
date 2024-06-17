"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const Recipe_model_1 = require("../models/Recipe.model");
const client_1 = require("@prisma/client");
class Repository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield this.prisma.recipes.findMany();
            const recipes = documents.map((recipes) => new Recipe_model_1.Recipe(recipes.id, recipes.title, recipes.description, recipes.ingredients, recipes.instructions, recipes.cover, recipes.createdAt, recipes.updatedAt));
            return recipes;
        });
    }
}
exports.Repository = Repository;
