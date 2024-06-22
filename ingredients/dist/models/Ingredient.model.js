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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const axios_1 = __importDefault(require("axios"));
class Ingredient {
    constructor(id, ingredient, existence) {
        this.id = id;
        this.ingredient = ingredient;
        this.existence = existence;
    }
    ToPrimitive() {
        return {
            id: this.id,
            ingredient: this.ingredient,
            existence: this.existence,
        };
    }
    getIngredient() {
        return this.ingredient;
    }
    getExistence() {
        return this.existence;
    }
    getId() {
        return this.id;
    }
    buy(sqs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { quantitySold }, } = yield axios_1.default.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${this.ingredient}`);
            if (quantitySold > 0) {
                sqs.publishMessage(JSON.stringify({
                    ingredient: this.ingredient,
                    createdAt: new Date(),
                    quantity: quantitySold,
                }));
                this.existence = this.existence + quantitySold;
            }
        });
    }
    spend(recipeRequired) {
        return __awaiter(this, void 0, void 0, function* () {
            this.existence = this.existence - recipeRequired;
        });
    }
}
exports.Ingredient = Ingredient;
