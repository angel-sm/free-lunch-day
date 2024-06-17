"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const uuid_1 = require("uuid");
class Recipe {
    constructor(id, title, description, ingredients, instructions, cover, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.cover = cover;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static Create({ title, description, ingredients, instructions, cover }) {
        const id = (0, uuid_1.v4)();
        const createdAt = new Date();
        const recipe = new Recipe(id, title, description, ingredients, instructions, cover, createdAt, createdAt);
        return recipe;
    }
    ToPrimitive() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            ingredients: this.ingredients,
            instructions: this.instructions,
            cover: this.cover,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
exports.Recipe = Recipe;
