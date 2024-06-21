"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetriveRecipes = void 0;
class RetriveRecipes {
    constructor(repository) {
        this.repository = repository;
    }
    async run(response) {
        try {
            const recipes = await this.repository.getRecipes();
            response.status(200).send(recipes);
        }
        catch (error) {
            response.status(500).send(error);
        }
    }
}
exports.RetriveRecipes = RetriveRecipes;
//# sourceMappingURL=retrieve-recipes.js.map