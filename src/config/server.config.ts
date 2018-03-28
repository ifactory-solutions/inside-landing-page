import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as http from 'http';

var httpFac = require('http')

export class ServerConfig {
  private static _express: express.Express

  private static _http: http.Server

  private constructor() { }

  public static startServer() {
    var port = process.env.PORT || 3000
    this.getHttpInstance().listen(port, () => {
      console.log("Server is runing on port " + port + " at " + new Date().toLocaleString())
    })
    process.on('SIGINT', () => {
      this.getHttpInstance().close(() => {
        console.log("Server on port 3000 is closed.")
        process.exit()
      })
    })
  }

  public static getExpressInstance(): express.Express {
    if (!this._express) {
      this._express = this._factoryExpress()
    }
    return this._express
  }

  public static getHttpInstance(): http.Server {
    if (!this._http) {
      this._http = this._factoryHttp()
    }
    return this._http
  }

  public static _factoryExpress(): express.Express {
    var app: express.Express = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    let clientPath = `${process.cwd()}/dist/client/`

    app.use(express.static(clientPath))

    return app
  }

  public static _factoryHttp(): http.Server {
    return httpFac.Server(this.getExpressInstance())
  }
}