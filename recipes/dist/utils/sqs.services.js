'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.SQS = void 0
const amqp = __importStar(require('amqplib'))
const uuid_1 = require('uuid')
class SQS {
  constructor(exchange, queue) {
    this.exchange = exchange
    this.queue = queue
  }
  async connect() {
    const connection = await amqp.connect('amqp://rabbitmq:5672')
    const channel = await connection.createChannel()
    await channel.assertExchange(this.exchange, 'fanout', {
      durable: true,
    })
    await channel.assertQueue(this.queue)
    await channel.bindQueue(this.queue, this.exchange, '')
  }
  async publishMessage(message) {
    const connection = await amqp.connect('amqp://rabbitmq:5672')
    const channel = await connection.createChannel()
    const correlationId = (0, uuid_1.v4)()
    await channel.assertQueue(this.queue)
    await channel.bindQueue(this.queue, this.exchange, 'routing_key')
    await channel.assertExchange(this.exchange, 'fanout', { durable: true })
    channel.publish(this.exchange, '', Buffer.from(message), {
      correlationId,
      replyTo: this.queue,
    })
    setTimeout(() => {
      connection.close()
    }, 500)
  }
  async receiveMessages(cb) {
    const connection = await amqp.connect('amqp://rabbitmq:5672')
    const channel = await connection.createChannel()
    await channel.assertExchange(this.exchange, 'fanout', {
      durable: true,
    })
    await channel.assertQueue(this.queue, { durable: true })
    await channel.bindQueue(this.queue, this.exchange, '')
    console.log(
      `[*] Microservice A is waiting for messages. To exit press CTRL+C`,
    )
    channel.consume(
      this.queue,
      async msg => {
        if (msg === null || msg === void 0 ? void 0 : msg.content) {
          channel.ack(msg)
          await cb(JSON.parse(msg.content.toString()))
        }
      },
      { noAck: false },
    )
  }
}
exports.SQS = SQS
//# sourceMappingURL=sqs.services.js.map
