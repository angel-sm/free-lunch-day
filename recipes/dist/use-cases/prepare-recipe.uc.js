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
exports.PreprareRecipe = void 0;
class PreprareRecipe {
    constructor(repository, ingredientsQueue, ingredientsResponseQueue, registryOrderQueue, finishOrderQueue, registryResponseOrderQueue) {
        this.repository = repository;
        this.ingredientsQueue = ingredientsQueue;
        this.ingredientsResponseQueue = ingredientsResponseQueue;
        this.registryOrderQueue = registryOrderQueue;
        this.finishOrderQueue = finishOrderQueue;
        this.registryResponseOrderQueue = registryResponseOrderQueue;
    }
    run(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipes = yield this.repository.getRecipes();
            const number = Math.floor(Math.random() * recipes.length);
            const recipe = recipes[number];
            try {
                yield this.registryOrderQueue.sendMessage(JSON.stringify(recipe));
                const order = (yield this.registryResponseOrderQueue.consumeMessage());
                // await this.ingredientsQueue.sendMessage(
                //   JSON.stringify(recipe.ToPrimitive()),
                // )
                // await this.ingredientsResponseQueue.consumeMessage()
                // await this.finishOrderQueue.sendMessage(
                //   JSON.stringify({
                //     id: order.id,
                //   }),
                // )
                // response.status(200).json(recipe)
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
}
exports.PreprareRecipe = PreprareRecipe;
