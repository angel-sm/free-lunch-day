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
const uuid_1 = require("uuid");
class SQS {
    constructor(exchange, queue) {
        this.exchange = exchange;
        this.queue = queue;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqp.connect('amqp://rabbitmq:5672');
            const channel = yield connection.createChannel();
            yield channel.assertExchange(this.exchange, 'fanout', {
                durable: true,
            });
            yield channel.assertQueue(this.queue);
            yield channel.bindQueue(this.queue, this.exchange, '');
        });
    }
    publishMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqp.connect('amqp://rabbitmq:5672');
            const channel = yield connection.createChannel();
            const correlationId = (0, uuid_1.v4)();
            yield channel.assertQueue(this.queue);
            yield channel.bindQueue(this.queue, this.exchange, 'routing_key');
            yield channel.assertExchange(this.exchange, 'fanout', { durable: true });
            channel.publish(this.exchange, '', Buffer.from(message), {
                correlationId,
                replyTo: this.queue,
            });
            setTimeout(() => {
                connection.close();
            }, 500);
        });
    }
    receiveMessages(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqp.connect('amqp://rabbitmq:5672');
            const channel = yield connection.createChannel();
            yield channel.assertExchange(this.exchange, 'fanout', {
                durable: true,
            });
            yield channel.assertQueue(this.queue, { durable: true });
            yield channel.bindQueue(this.queue, this.exchange, '');
            console.log(`[*] Microservice A is waiting for messages. To exit press CTRL+C`);
            channel.consume(this.queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg === null || msg === void 0 ? void 0 : msg.content) {
                    channel.ack(msg);
                    yield cb(JSON.parse(msg.content.toString()));
                }
            }), { noAck: false });
        });
    }
}
exports.SQS = SQS;
