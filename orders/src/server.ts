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

export interface SQSQueues {
  recipesQueue: SQS
  registryResponseOrderQueue: SQS
  finishOrderQueue: SQS
}

export class Server {
  private readonly express: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor(port: string, sqs: SQSQueues) {
    this.port = port
    this.express = express()
    this.express.use(
      cors({
        origin: '*',
      }),
    )

    const repository = new Repository()
    new RegistryRecipeOrder(repository).run({
      recipesQueue: sqs.recipesQueue,
      registryResponseOrderQueue: sqs.registryResponseOrderQueue,
    })
    new FinishRecipeOrder(repository).run({
      finishOrderQueue: sqs.finishOrderQueue,
    })

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

  static async initSQS() {
    const recipesQueue = new SQS('recipies_request', 'recipes_queue')
    const registryResponseOrderQueue = new SQS(
      'orders_response',
      'order_response_queue',
    )
    const finishOrderQueue = new SQS('orders_finish', 'order_finish_queue')

    return {
      recipesQueue,
      registryResponseOrderQueue,
      finishOrderQueue,
    }
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
