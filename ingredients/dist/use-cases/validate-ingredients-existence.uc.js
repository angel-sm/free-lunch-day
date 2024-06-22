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
exports.ValidateIngredientsExistence = void 0;
const Ingredient_model_1 = require("../models/Ingredient.model");
class ValidateIngredientsExistence {
    constructor(repository) {
        this.repository = repository;
    }
    run(_a) {
        return __awaiter(this, arguments, void 0, function* ({ recipesQueue, ingredientsQueue, purchaseQueue }) {
            try {
                console.log('Validando ingredientes');
                yield recipesQueue.receiveMessages((message) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log(`${new Date().toISOString()} - Ingredients request`);
                        const recipeIngredients = {};
                        message.recipe.ingredients.forEach(({ id, ingredient, quantity }) => {
                            recipeIngredients[ingredient] = new Ingredient_model_1.Ingredient(id, ingredient, quantity);
                        });
                        const storedIngredients = yield this.repository.getEmptyIngredients(Object.keys(recipeIngredients));
                        new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                            for (const ingredient of storedIngredients) {
                                const ingredientName = ingredient.getIngredient();
                                const recipeIngredientRequirement = recipeIngredients[ingredientName].getExistence();
                                while (recipeIngredientRequirement > ingredient.getExistence()) {
                                    yield ingredient.buy(purchaseQueue);
                                    console.log('Comprando ingredientes', ingredient.getIngredient());
                                }
                                ingredient.spend(recipeIngredientRequirement);
                                yield this.repository.updateIngredientExistence(ingredient.getId(), ingredient.getExistence());
                            }
                            resolve(true);
                        })).then(() => __awaiter(this, void 0, void 0, function* () {
                            console.log('Ingrediente listo');
                            yield ingredientsQueue.publishMessage(JSON.stringify(recipeIngredients));
                        }));
                    }
                    catch (error) {
                        console.log('🚀 ~ ~ error:', error);
                    }
                }));
            }
            catch (error) {
                console.log('🚀 ~ ValidateIngredientsExistence ~ run ~ error:', error);
            }
        });
    }
}
exports.ValidateIngredientsExistence = ValidateIngredientsExistence;
