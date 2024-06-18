import express, { type Request, type Response } from 'express'
import type * as http from 'http'
import httpStatus from 'http-status'
import cors from 'cors'
import { Repository } from './data-access/mongo.repository'
import { Controller } from './controllers'
import { ValidateIngredientsExistence } from './use-cases/validate-ingredients-existence.uc'
import { RetrieveIngredients } from './use-cases/retrieve-ingredients.uc'
import { SQS } from './utils/sqs.services'

export interface SQSQueues {
  recipesQueue: SQS
  purchaseQueue: SQS
  ingredientsQueue: SQS
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
        credentials: true,
      }),
    )

    const repository = new Repository()
    new ValidateIngredientsExistence(repository).run({
      recipesQueue: sqs.recipesQueue,
      ingredientsQueue: sqs.ingredientsQueue,
      purchaseQueue: sqs.purchaseQueue,
    })

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

  static async initSQS() {
    const recipesQueue = new SQS('recipies_request', 'ingredients_queue')
    const ingredientsQueue = new SQS(
      'ingredients_response',
      'ingredients_response_queue',
    )
    const purchaseQueue = new SQS('ingredient_purchase', 'purchases_queue')

    await recipesQueue.connect()
    await ingredientsQueue.connect()
    await purchaseQueue.connect()

    return {
      recipesQueue,
      purchaseQueue,
      ingredientsQueue,
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
