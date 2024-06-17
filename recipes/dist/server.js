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
const prepare_recipe_uc_1 = require("./use-cases/prepare-recipe.uc");
const controllers_1 = require("./controllers");
const sqs_services_1 = require("./utils/sqs.services");
class Server {
    constructor(port, sqsList) {
        this.port = port;
        this.express = (0, express_1.default)();
        this.express.use((0, cors_1.default)({
            origin: '*',
            credentials: true,
        }));
        const repository = new mongo_repository_1.Repository();
        const preprareRecipe = new prepare_recipe_uc_1.PreprareRecipe(repository, sqsList.ingredientsQueue, sqsList.ingredientsResponseQueue, sqsList.registryOrderQueue, sqsList.finishOrderQueue, sqsList.registryResponseOrderQueue);
        const recipeController = new controllers_1.Controller(preprareRecipe);
        this.express.post('/recipes', (request, reply) => __awaiter(this, void 0, void 0, function* () { return recipeController.prepareRecipeHandler(request, reply); }));
        this.express.use((err, req, res, next) => {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    static initRabbitMq() {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredientsQueue = new sqs_services_1.SQS('ingredients_queue');
            const ingredientsResponseQueue = new sqs_services_1.SQS('ingredients_response_queue');
            const registryOrderQueue = new sqs_services_1.SQS('registry_order_queue');
            const registryResponseOrderQueue = new sqs_services_1.SQS('registry_response_order_queue');
            const finishOrderQueue = new sqs_services_1.SQS('finish_order_queue');
            yield ingredientsQueue.connect();
            yield ingredientsResponseQueue.connect();
            yield registryOrderQueue.connect();
            yield registryResponseOrderQueue.connect();
            yield finishOrderQueue.connect();
            return {
                ingredientsQueue,
                ingredientsResponseQueue,
                registryOrderQueue,
                registryResponseOrderQueue,
                finishOrderQueue,
            };
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
