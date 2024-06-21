"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
class Controller {
    constructor(preprareRecipeUseCase, retireveReciepesUseCase, sqs) {
        this.preprareRecipeUseCase = preprareRecipeUseCase;
        this.retireveReciepesUseCase = retireveReciepesUseCase;
        this.sqs = sqs;
    }
    async prepareRecipeHandler(request, response) {
        const recipe = await this.preprareRecipeUseCase.run({
            finishOrderQueue: this.sqs.finishOrderQueue,
            recipesQueue: this.sqs.recipesQueue,
            registryOrderQueue: this.sqs.registryOrderQueue,
            ingredientsQueue: this.sqs.ingredientsQueue,
        });
        response.status(200).json(recipe);
    }
    async retrieveRecipesHandler(req, response) {
        await this.retireveReciepesUseCase.run(response);
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controllers.js.map