import express, { type Request, type Response } from 'express'
import type * as http from 'http'
import httpStatus from 'http-status'
import cors from 'cors'
import { Repository } from './data-access/mongo.repository'
import { Controller } from './controllers'
import { ValidateIngredientsExistence } from './use-cases/validate-ingredients-existence.uc'
import { SQS } from './utils/sqs.services'
import { RetrieveIngredients } from './use-cases/retrieve-ingredients.uc'

interface SQSList {
  ingredientsQueue: SQS
  ingredientsResponseQueue: SQS
  purchaseQueue: SQS
}

export class Server {
  private readonly express: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor(port: string, sqsList: SQSList) {
    this.port = port
    this.express = express()
    this.express.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    )

    const repository = new Repository()
    new ValidateIngredientsExistence(
      repository,
      sqsList.ingredientsQueue,
      sqsList.ingredientsResponseQueue,
      sqsList.purchaseQueue,
    ).run()

    const retrieveIngredients = new RetrieveIngredients(repository)
    const controllers = new Controller(retrieveIngredients)

    this.express.get('/ingredients', async (request, reply) =>
      controllers.retrieveRecipesHandler(request, reply),
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

  static async initRabbitMq() {
    const ingredientsQueue = new SQS('ingredients_queue')
    const ingredientsResponseQueue = new SQS('ingredients_response_queue')
    const purchaseQueue = new SQS('purchases_queue')

    await ingredientsQueue.connect()
    await ingredientsResponseQueue.connect()
    await purchaseQueue.connect()

    return {
      ingredientsQueue,
      ingredientsResponseQueue,
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
