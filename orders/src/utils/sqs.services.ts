import * as amqp from 'amqplib'

export class SQS {
  private channel: amqp.Channel | undefined
  private connection: amqp.Connection | undefined

  constructor(private queue: string) {}

  getQueue() {
    return this.queue
  }

  async connect(host?: string) {
    this.connection = await amqp.connect(
      host ?? 'amqp://rabbitmq:5672',
      (error: any) => {
        if (error) {
          console.log(error)
        }
      },
    )
    const channel = await this.connection.createChannel()
    await channel.assertQueue(this.queue)
    this.channel = channel
  }

  sendMessage(message: any) {
    if (!this.channel) {
      throw new Error('Channel undefined')
    }

    try {
      this.channel?.sendToQueue(this.queue, Buffer.from(message))
    } catch (error) {
      console.error(`Failed to send message to queue ${this.queue}:`, error)
      throw error
    }
  }

  async consumeMessage(cb: any) {
    this.channel?.consume(this.queue, msg => {
      if (msg) {
        cb(JSON.parse(msg.content.toString()))
        this.channel?.ack(msg)
      } else {
        throw new Error('Failed to consume message from queue')
      }
    })
  }
}
