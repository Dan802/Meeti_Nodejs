import nodemailer from 'nodemailer'
import fs from 'fs'
import util from 'util'
import ejs from 'ejs'
import { fileURLToPath } from "url"; // __dirname
import * as path from "path"; // path.resolve, path.join
import {emailConfig} from '../config/emails.js'

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
})

export async function sendEmail(options) {

    // read the file to use as email file
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const file = __dirname + `/../views/emails/${options.file}.ejs`

    // compile
    const compile = ejs.compile(fs.readFileSync(file, 'utf-8'))

    // create the HTML
    const html = compile({url: options.url})

    // email options
    const optionsEmail = {
        from: 'Meeti <noreply@meeti.com>',
        to: options.user.email,
        subject: options.subject,
        html
    }

    // send email
    const sendingEmail = util.promisify(transport.sendMail, transport)

    return sendingEmail.call(transport, optionsEmail)

}