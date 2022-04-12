import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import * as http from 'http';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';
import * as database from '@src/database';
import { BeachesController } from './controllers/beaches';
import { UsersController } from './controllers/users';
import { VideosController } from './controllers/videos';
import { CourtsController } from './controllers/courts';
import logger from './logger';
import { apiErrorValidator } from './middlewares/api-errror-validator';
import apiSchema from './schemas/api.json';
import { CamsController } from './controllers/cams';

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    // await this.docsSetup();
    this.setupControllers();
    await this.databaseSetup();
    this.setupErrorHandlers();
  }

  // private async docsSetup(): Promise<void> {
  //   this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
  //   this.app.use(
  //     OpenApiValidator.middleware({
  //       apiSpec: apiSchema as OpenAPIV3.Document,
  //       validateRequests: true, //will be implemented in step2
  //       validateResponses: true, //will be implemented in step2
  //     })
  //   );
  // }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());

    this.app.use(
      expressPino({
        logger,
      })
    );
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();
    const videosController = new VideosController();
    const courtsController = new CourtsController();
    const camsController = new CamsController();
    this.addControllers([
      forecastController,
      beachesController,
      usersController,
      courtsController,
      videosController,
      camsController,
    ]);
  }

  public getApp(): Application {
    return this.app;
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }
}
