import { SQSQueues, Server } from './server'

export class App {
  server?: Server

  async start() {
    const port = process.env.PORT ?? '5000'

    const sqs = (await Server.initSQS()) as SQSQueues

    this.server = new Server(port, sqs)
    await this.server.listen()
  }
}

try {
  new App().start()
} catch (e) {
  console.log(e)
  process.exit(1)
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
