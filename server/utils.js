const AWS = require('aws-sdk')

const SES_CONFIG = {
    region: "eu-central-1",
    access_key: process.env.AWS_ACCESS_KEY,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY
}

AWS.config.update(SES_CONFIG);

const AWS_SES = new AWS.SES();

const verificationCode = () => { return Math.floor(100000 + Math.random() * 900000); }

const sendEmailVerification = async (recipientEmail, code) => {
    let params = {
        Source: "noreply@kubecapsule.com",
        Destination: {
            ToAddresses: [
                recipientEmail
            ]
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<div style="max-width: 600px; margin: 50px auto; background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd;"><img style="width: 75%;" src="https://raw.githubusercontent.com/Kubezy/KubeCapsule/main/images/logos/logo-colored.svg" />
                    <h1 style="margin: 0 15; font-size: 24px; color: #0086ff;">Email Verification Code</h1>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                    <p style="font-size: 18px; line-height: 1.6;">Thank you participating with KubeCapsule project. Please use the following verification code to complete your email verification process:</p>
                    <div style="display: inline-block; padding: 10px 20px; font-size: 24px; font-weight: bold; color: #fff; background-color: #0086ff; border-radius: 4px; margin-top: 20px;">${code}</div>
                    <p style="font-size: 18px; line-height: 1.6;">This code will expire in 10 MINUTES. If you can't verify using this code, try entering your email again.</p>
                    </div>
                    <div style="text-align: center; padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; font-size: 14px; color: #999;">
                    <p>If you did not request this email, please ignore it.</p>
                    </div>
                    </div>`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Please use code ${code} for email verification.`
            }
        }
    }

    try {
        const res = await AWS_SES.sendEmail(params).promise();
        console.log("email sent", res)
    }
    catch (e) {
        console.log(e)
    }
}

function formatMessageWithNewlines(message) {
    return message.split('\n').map(line => line).join('<br>');
}

const sendSummary = async (recipientEmail, summary) => {
    let params = {
        Source: "noreply@kubecapsule.com",
        Destination: {
            ToAddresses: [
                recipientEmail
            ]
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<div style="max-width: 600px; margin: 50px auto; background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd;"><img style="width: 75%;" src="https://raw.githubusercontent.com/Kubezy/KubeCapsule/main/images/logos/logo-colored.svg" />
                    <h1 style="margin: 0 15; font-size: 24px; color: #0086ff;">Your Capsule Summary</h1>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                    <p style="font-size: 18px; line-height: 1.6;">Thank you participating with KubeCapsule project. Here's a summary of your message:</p>
                    </div>
                     <div style="padding: 20px;">
                    <p style="font-size: 18px; line-height: 1.6;">Full name: ${summary.fullName}</p>
                    <p style="font-size: 18px; line-height: 1.6;">Duration: ${summary.duration}</p>
                    <p style="font-size: 18px; white-space: pre-wrap; line-height: 1.6;">Message: ${formatMessageWithNewlines(summary.message)}</p>
                    <p style="font-size: 18px; line-height: 1.6;">Share with public: ${summary.share_public ? "Yes" : "No"}</p>
                    </div>
                     <div style="padding: 20px; text-align: center;">
                    <p style="font-size: 18px; line-height: 1.6;">If you did not submit this request, please contact help@kubecapsule.com immeadiately.</p>
                    </div>
                    </div>`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Message submitted to ${summary.duration} Year Kubecapsule`
            }
        }
    }

    try {
        const res = await AWS_SES.sendEmail(params).promise();
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = { verificationCode, sendEmailVerification, sendSummary }