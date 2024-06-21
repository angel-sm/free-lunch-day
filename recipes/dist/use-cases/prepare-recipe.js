"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreprareRecipe = void 0;
const uuid_1 = require("uuid");
class PreprareRecipe {
    constructor(repository) {
        this.repository = repository;
    }
    async run({ recipesQueue, finishOrderQueue, registryOrderQueue, ingredientsQueue, }) {
        try {
            const recipes = await this.repository.getRecipes();
            const number = Math.floor(Math.random() * recipes.length);
            const recipe = recipes[number];
            const order = (0, uuid_1.v4)();
            await recipesQueue.publishMessage(JSON.stringify({
                recipe,
                order,
            }));
            await registryOrderQueue.receiveMessages(async (message) => {
                console.log('Order registered');
            });
            return new Promise(async (resolve) => {
                await ingredientsQueue.receiveMessages(async (message) => {
                    await finishOrderQueue.publishMessage(JSON.stringify({
                        order,
                    }));
                    resolve(recipe);
                    console.log('Ingredientes recividos');
                });
            });
        }
        catch (error) {
            return 'error';
        }
    }
}
exports.PreprareRecipe = PreprareRecipe;
//# sourceMappingURL=prepare-recipe.js.map