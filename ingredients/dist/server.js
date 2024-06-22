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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const cors_1 = __importDefault(require("cors"));
const mongo_repository_1 = require("./data-access/mongo.repository");
const controllers_1 = require("./controllers");
const validate_ingredients_existence_uc_1 = require("./use-cases/validate-ingredients-existence.uc");
const retrieve_ingredients_uc_1 = require("./use-cases/retrieve-ingredients.uc");
const sqs_services_1 = require("./utils/sqs.services");
class Server {
    constructor(port, sqs) {
        this.port = port;
        this.express = (0, express_1.default)();
        this.express.use((0, cors_1.default)({
            origin: '*',
        }));
        const repository = new mongo_repository_1.Repository();
        new validate_ingredients_existence_uc_1.ValidateIngredientsExistence(repository).run({
            recipesQueue: sqs.recipesQueue,
            ingredientsQueue: sqs.ingredientsQueue,
            purchaseQueue: sqs.purchaseQueue,
        });
        const retrieveIngredients = new retrieve_ingredients_uc_1.RetrieveIngredients(repository);
        const controllers = new controllers_1.Controller(retrieveIngredients);
        this.express.get('/ingredients', (request, reply) => __awaiter(this, void 0, void 0, function* () { return controllers.retrieveIngredientsHandler(request, reply); }));
        this.express.use((err, req, res, next) => {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => {
                this.httpServer = this.express.listen(this.port, () => {
                    console.log(`Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
                    console.log('Press CTRL-C to stop\n');
                    resolve();
                });
            });
        });
    }
    static initSQS() {
        return __awaiter(this, void 0, void 0, function* () {
            const recipesQueue = new sqs_services_1.SQS('recipies_request', 'ingredients_queue');
            const ingredientsQueue = new sqs_services_1.SQS('ingredients_response', 'ingredients_response_queue');
            const purchaseQueue = new sqs_services_1.SQS('ingredient_purchase', 'purchases_queue');
            yield recipesQueue.connect();
            yield ingredientsQueue.connect();
            yield purchaseQueue.connect();
            return {
                recipesQueue,
                purchaseQueue,
                ingredientsQueue,
            };
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
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
        });
    }
}
exports.Server = Server;
