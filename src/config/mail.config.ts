import * as nodemailer from 'nodemailer'

export class MailConfig {
    private static _transporter: nodemailer.Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    public static sendMail(mailOption) {
        this._transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Message %s sent: %s', info.messageId, info.response)
        })
    }

}