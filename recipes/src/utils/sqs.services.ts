import * as amqp from 'amqplib'
import { Response } from 'express'
import { v4 } from 'uuid'

export class SQS {
  constructor(
    private exchange: string,
    private queue: string,
  ) {}

  async connect() {
    const connection = await amqp.connect('amqp://rabbitmq:5672')
    const channel = await connection.createChannel()
    await channel.assertExchange(this.exchange, 'fanout', {
      durable: true,
    })
    await channel.assertQueue(this.queue)
    await channel.bindQueue(this.queue, this.exchange, '')
  }

  async publishMessage(message: string) {
    const connection = await amqp.connect('amqp://rabbitmq:5672')
    const channel = await connection.createChannel()
    const correlationId = v4()

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

  async receiveMessages(cb: any) {
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
      async (msg: any) => {
        if (msg?.content) {
          channel.ack(msg)
          await cb(JSON.parse(msg.content.toString()))
          channel.close()
        }
      },
      { noAck: false },
    )
  }
}
