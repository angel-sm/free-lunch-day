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
exports.RetrieveIngredients = void 0;
class RetrieveIngredients {
    constructor(repository) {
        this.repository = repository;
    }
    run(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingredients = yield this.repository.getIngredients();
                response.status(200).send(ingredients);
                return;
            }
            catch (error) {
                console.log('🚀 ~ ValidateIngredientsExistence ~ run ~ error:', error);
                response.status(400).send('Error');
            }
        });
    }
}
exports.RetrieveIngredients = RetrieveIngredients;
