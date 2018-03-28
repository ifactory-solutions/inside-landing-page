import { AbstractSchema } from './abstract/abstract.schema'
import { ICustomerModel } from '../model/customer.model'
import { model } from "mongoose"

export class CustomerSchema extends AbstractSchema {
    constructor() {
        super({
            _name: {
                type: String
            },
            _email: {
                type: String,
                unique: true,
            }
        })
    }
}

export const Customer = model<ICustomerModel>("Customer", new CustomerSchema)

