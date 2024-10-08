import express, { type Request, type Response } from 'express'
import type * as http from 'http'
import httpStatus from 'http-status'
import cors from 'cors'
import { Repository } from './data-access/mongo.repository'
import { RegistryIngredientPurchase } from './use-cases/registry-ingredient-purchase'
import { RetirevePurchases } from './use-cases/retrieve-purchases.uc'
import { Controller } from './controllers'
import { SQS } from './utils/sqs.services'

export interface SQSQueues {
  purchaseQueue: SQS
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
    new RegistryIngredientPurchase(repository).run({
      purchaseQueue: sqs.purchaseQueue,
    })

    const retrievePurchases = new RetirevePurchases(repository)
    const controllers = new Controller(retrievePurchases)

    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      )
      next()
    })

    this.express.get('/purchases', async (request, reply) =>
      controllers.retrievePurchasesHandler(request, reply),
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
    const purchaseQueue = new SQS('ingredient_purchase', 'purchases_queue')
    purchaseQueue.connect()
    return {
      purchaseQueue,
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
