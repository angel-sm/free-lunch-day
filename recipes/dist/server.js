"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const cors_1 = __importDefault(require("cors"));
const controllers_1 = require("./controllers");
const mongo_repository_1 = require("./data-access/mongo.repository");
const prepare_recipe_1 = require("./use-cases/prepare-recipe");
const retrieve_recipes_1 = require("./use-cases/retrieve-recipes");
const sqs_services_1 = require("./utils/sqs.services");
class Server {
    constructor(port, sqs) {
        this.port = port;
        this.express = (0, express_1.default)();
        this.express.use((0, cors_1.default)({
            origin: '*',
            credentials: true,
        }));
        const repository = new mongo_repository_1.Repository();
        const preprareRecipe = new prepare_recipe_1.PreprareRecipe(repository);
        const retrieveRecipes = new retrieve_recipes_1.RetriveRecipes(repository);
        const recipeController = new controllers_1.Controller(preprareRecipe, retrieveRecipes, sqs);
        this.express.get('/recipes', async (request, reply) => recipeController.retrieveRecipesHandler(request, reply));
        this.express.post('/recipes', async (request, reply) => recipeController.prepareRecipeHandler(request, reply));
        this.express.use((err, req, res, next) => {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    static async initSQS() {
        const recipesQueue = new sqs_services_1.SQS('recipies_request', 'recipes_queue');
        const registryOrderQueue = new sqs_services_1.SQS('orders_response', 'order_response_queue');
        const finishOrderQueue = new sqs_services_1.SQS('orders_finish', 'order_finish_queue');
        const ingredientsQueue = new sqs_services_1.SQS('ingredients_response', 'ingredients_response_queue');
        await recipesQueue.connect();
        await registryOrderQueue.connect();
        await ingredientsQueue.connect();
        return {
            recipesQueue,
            registryOrderQueue,
            finishOrderQueue,
            ingredientsQueue,
        };
    }
    async listen() {
        await new Promise(resolve => {
            this.httpServer = this.express.listen(this.port, () => {
                console.log(`Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
                console.log('Press CTRL-C to stop\n');
                resolve();
            });
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    async stop() {
        await new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close(error => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                });
            }
            resolve();
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map