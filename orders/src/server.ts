import express, { type Request, type Response } from 'express'
import type * as http from 'http'
import httpStatus from 'http-status'
import cors from 'cors'
import { Repository } from './data-access/mongo.repository'
import { RegistryRecipeOrder } from './use-cases/registry-recipe-order.uc'
import { FinishRecipeOrder } from './use-cases/finish-recipie-order.uc'
import { SQS } from './utils/sqs.services'
import { RetrieveOrders } from './use-cases/retrieve-orders.uc'
import { Controller } from './controllers'

interface SQSList {
  registryOrderQueue: SQS
  registryResponseOrderQueue: SQS
  finishOrderQueue: SQS
}

export class Server {
  private readonly express: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.express = express()
    this.express.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    )

    const repository = new Repository()
    new RegistryRecipeOrder(repository).run()
    new FinishRecipeOrder(repository).run()

    const retrieveOrders = new RetrieveOrders(repository)
    const controllers = new Controller(retrieveOrders)

    this.express.get('/orders', async (request, reply) =>
      controllers.retrieveOrdersHandler(request, reply),
    )

    this.express.use(
      (err: Error, req: Request, res: Response, next: Function) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
      },
    )
  }

  async listen(): Promise<void> {
    await new Promise<void>(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`,
        )
        console.log('Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  getHTTPServer() {
    return this.httpServer
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            reject(error)
            return
          }
          resolve()
        })
      }

      resolve()
    })
  }
}
