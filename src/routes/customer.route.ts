import { NextFunction, Request, Response } from 'express'

import { AbstractRouter } from './abstract/abstract.router'
import { CustomerController } from "../controller/customer.controller"

export class CustomerRoute extends AbstractRouter<CustomerController> {

    constructor() {
        super("/api/customer", new CustomerController())
    }

    public init() {
        this.router.post("/register", this.controller.register)
        super.beUsed()
    }
}