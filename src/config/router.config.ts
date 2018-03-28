import { CustomerRoute } from "../routes/customer.route";
import { ServerConfig } from "./server.config";

export class RouterConfig {
  static _routes: Array<any> = [
    CustomerRoute
  ]
  static _instanceRoutes

  static initRoutes() {
    RouterConfig._instanceRoutes = RouterConfig._routes.map(route => new route())
    ServerConfig.getExpressInstance().all('*', function (req, res, next) {
      res.sendFile("index.html", { root: `${process.cwd()}/dist/client/` });
    })
  }
}

