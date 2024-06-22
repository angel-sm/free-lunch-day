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
const client_1 = require("@prisma/client");
const Ingredient_model_1 = require("../models/Ingredient.model");
class Repository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getIngredients() {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield this.prisma.ingredients.findMany({});
            const ingredientsMapped = documents.map((doc) => new Ingredient_model_1.Ingredient(doc.id, doc.ingredient, doc.existence));
            return ingredientsMapped;
        });
    }
    getEmptyIngredients(ingredients) {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield this.prisma.ingredients.findMany({
                where: {
                    ingredient: {
                        in: ingredients,
                    },
                },
            });
            const ingredientsMapped = documents.map((doc) => new Ingredient_model_1.Ingredient(doc.id, doc.ingredient, doc.existence));
            return ingredientsMapped;
        });
    }
    updateIngredientExistence(id, existence) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.ingredients.update({
                where: {
                    id,
                },
                data: {
                    existence,
                },
            });
        });
    }
}
exports.Repository = Repository;
