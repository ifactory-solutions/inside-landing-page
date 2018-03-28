import { IAbstractModel } from './abstract/abstract.model'

export interface ICustomerModel extends IAbstractModel {
    _name: String,
    _email: String
}