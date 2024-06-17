import { Server } from './server'

export class App {
  server?: Server

  async start() {
    const port = process.env.PORT ?? '5001'
    this.server = new Server(port, await Server.initRabbitMq())
    await this.server.listen()
  }

  get httpServer() {
    return this.server?.getHTTPServer()
  }

  async stop() {
    return await this.server?.stop()
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
