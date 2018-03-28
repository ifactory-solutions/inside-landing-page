import { NextFunction, Request, Response } from 'express'

import { AbstractController } from "./abstract/abstract.controller"
import { Customer } from '../schema/customer.schema'
import { MailConfig } from '../config/mail.config'
import { mailBody } from "../resources/mail";

var curl = require('curl')

export class CustomerController extends AbstractController {

    public register(req: Request, res: Response, next: NextFunction) {
        Customer.findOneAndUpdate({ _email: req.body._email }, req.body, { upsert: true, new: true }).exec(
            (err, data) => {
                if (!err) {
                    MailConfig.sendMail({
                        from: '"Ship to BR" <no-reply@shiptobr.com>', // sender address
                        to: data._email,
                        subject: 'Obrigado por se inscrever ', // Subject line
                        text: `${data._name}, seja bem-vindo à Ship to BR.`,
                        html: mailBody
                    })
                    curl.postJSON('https://us16.api.mailchimp.com/3.0/lists/4a954486ec/members',
                        {
                            "email_address": data._email,
                            "status": "subscribed",
                            "merge_fields": {
                                "FNAME": data._name
                            }
                        },
                        { headers: { 'Authorization': 'apikey bdc4702a304c242ea6c1350fd8309b79-us16' } }
                        , (error, response, json) => {
                            if (error) {
                                console.log(error)
                                res.status(500).json(error)
                            } else {
                                res.status(200).json(data)
                            }
                        })
                } else {
                    res.status(500).json(err)
                }
            }
        )
    }
}