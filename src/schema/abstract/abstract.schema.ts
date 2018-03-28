import * as timestamp from 'mongoose-timestamp'

import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose'

export abstract class AbstractSchema extends Schema {
    constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
        definition.__v = { type: Number, select: false }
        super(definition, options)
        this.plugin(timestamp, {
            createdAt: '_createdAt',
            updatedAt: '_updatedAt'
        })
    }
}