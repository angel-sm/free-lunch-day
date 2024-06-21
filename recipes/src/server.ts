import express, { type Request, type Response } from 'express'
import type * as http from 'http'
import httpStatus from 'http-status'
import cors from 'cors'
import { Controller } from './controllers'
import { Repository } from './data-access/mongo.repository'
import { PreprareRecipe } from './use-cases/prepare-recipe'
import { RetriveRecipes } from './use-cases/retrieve-recipes'
import { SQS } from './utils/sqs.services'

export interface SQSQueues {
  recipesQueue: SQS
  registryOrderQueue: SQS
  finishOrderQueue: SQS
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
    const preprareRecipe = new PreprareRecipe(repository)
    const retrieveRecipes = new RetriveRecipes(repository)

    const recipeController = new Controller(
      preprareRecipe,
      retrieveRecipes,
      sqs,
    )

    this.express.get('/recipes', async (request, reply) =>
      recipeController.retrieveRecipesHandler(request, reply),
    )

    this.express.post('/recipes', async (request, reply) =>
      recipeController.prepareRecipeHandler(request, reply),
    )

    this.express.use(
      (err: Error, req: Request, res: Response, next: Function) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
      },
    )
  }

  static async initSQS() {
    const recipesQueue = new SQS('recipies_request', 'recipes_queue')
    const registryOrderQueue = new SQS(
      'orders_response',
      'order_response_queue',
    )
    const finishOrderQueue = new SQS('orders_finish', 'order_finish_queue')
    const ingredientsQueue = new SQS(
      'ingredients_response',
      'ingredients_response_queue',
    )

    await recipesQueue.connect()
    await registryOrderQueue.connect()
    await ingredientsQueue.connect()
    await finishOrderQueue.connect()

    return {
      recipesQueue,
      registryOrderQueue,
      finishOrderQueue,
      ingredientsQueue,
    }
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
