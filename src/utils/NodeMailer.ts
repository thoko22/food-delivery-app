import * as nodeMailer from 'nodemailer';
import { getEnvironmentVariables } from '../environments/environment';

export class NodeMailer {

    private static initiateTransport() {
         return nodeMailer.createTransport(
        //     SendGrid({
        //     auth: {
        //         api_key: getEnvironmentVariables().sendgrid.api_key
        //     }
        // })

        {
            service: 'gmail',
            auth: {
                user: getEnvironmentVariables().gmail_auth.user,
                pass: getEnvironmentVariables().gmail_auth.pass 
            }
        }
        // Note: https://myaccount.google.com/lesssecureapps
    );
    }

    static sendMail(data: {to: [string], subject: string, html: string}): Promise<any> {
        return NodeMailer.initiateTransport().sendMail({
            //from: getEnvironmentVariables().sendgrid.email_from,
            from: getEnvironmentVariables() .gmail_auth.user,
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}