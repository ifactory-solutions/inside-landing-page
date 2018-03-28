import { Express, Router } from 'express'

import { AbstractController } from "../../controller/abstract/abstract.controller"
import { ServerConfig } from '../../config/server.config'

export abstract class AbstractRouter<T extends AbstractController> {

    constructor(protected url: string,
        public controller: T,
        protected app: Express = ServerConfig.getExpressInstance(),
        public router: Router = Router()) {
        this.init()
    }

    protected beUsed() {
        this.app.use(this.url, this.router)
        console.log("+ ".concat(this.url))
        this.router.stack.forEach((st) => {
            for (var method in st.route.methods) {
                console.log("   - ".concat(method)
                    .concat(" ".repeat(10 - method.length))
                    .concat(st.route.path))
            }
        })
        console.log("")
    }

    abstract init()
}