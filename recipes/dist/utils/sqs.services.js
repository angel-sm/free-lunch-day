"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SQS = void 0;
const amqp = __importStar(require("amqplib"));
class SQS {
    constructor(queue) {
        this.queue = queue;
    }
    getQueue() {
        return this.queue;
    }
    connect(host) {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield amqp.connect(host !== null && host !== void 0 ? host : 'amqp://rabbitmq:5672', (error) => {
                if (error) {
                    console.log(error);
                }
            });
            const channel = yield this.connection.createChannel();
            yield channel.assertQueue(this.queue);
            this.channel = channel;
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!this.channel) {
                throw new Error('Channel undefined');
            }
            try {
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.sendToQueue(this.queue, Buffer.from(message));
                yield this.channel.close();
                yield ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.close());
            }
            catch (error) {
                console.error(`Failed to send message to queue ${this.queue}:`, error);
                throw error;
            }
        });
    }
    consumeMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a;
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.consume(this.queue, msg => {
                    var _a;
                    if (msg) {
                        resolve(JSON.parse(msg.content.toString()));
                        (_a = this.channel) === null || _a === void 0 ? void 0 : _a.ack(msg);
                    }
                    else {
                        reject(new Error('Failed to consume message from queue'));
                    }
                }, { noAck: false });
            });
        });
    }
}
exports.SQS = SQS;
