import { DatabaseConfig } from './config/database.config'
import { Express } from 'express'
import { RouterConfig } from "./config/router.config";
import { ServerConfig } from './config/server.config'

class Index {
  constructor() {
    // DatabaseConfig.connect()
    RouterConfig.initRoutes()
    ServerConfig.startServer()
  }

}

export default new Index()