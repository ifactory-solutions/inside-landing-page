import { Document } from 'mongoose'

export interface IAbstractModel extends Document {
    _createdAt: Date
    _updatedAt: Date
}