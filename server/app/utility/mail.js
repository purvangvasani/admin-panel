const _ = require('lodash');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const nodemailer = require('nodemailer');

let mailId = {
    notification: `"Notifications ${process.env.APP_NAME} Adminpanel" ${process && process.env && process.env.NOTIFICATION_EMAIL_ACC ? process.env.NOTIFICATION_EMAIL_ACC : 'purvang.vasani@nextgen-webworks.in'}`,
    support: `"Support ${process.env.APP_NAME} Adminpanel" ${process && process.env && process.env.NOTIFICATION_EMAIL_ACC ? process.env.NOTIFICATION_EMAIL_ACC : 'purvang.vasani@nextgen-webworks.in'}`
};

module.exports = {
    mailId: mailId,
    subject: {
        forgotPassword: `${process.env.APP_NAME} Your password has been updated`,
        otp: `${process.env.APP_NAME} OTP Authentication`,
        passwordReset: `${process.env.APP_NAME} Your password has been updated`,
        registration: `${process.env.APP_NAME} Your password`,
        resetPasswordOnMultipleLogin: `${process.env.APP_NAME} Password reset due to multiple unsuccessful login attempts`,
        welcomeUser: `${process.env.APP_NAME} Registration complete`,
    },
    template: {
        assignedUser: 'assignedUser',
        forgotPassword: 'forgotPassword',
        general: 'general',
        knowledgeLibrary: 'knowledgeLibrary',
        otp: 'otp',
        passwordReset: 'password_reset',
        registration: 'registration',
        resetPasswordOnMultipleLogin: 'resetPasswordOnMultipleLogin',
        rmInvitation: 'rmInvitation',
        welcomeUser: 'welcomeUser',
        offCycleRelease: 'offCycleRelease',
        customerUsage: 'customerUsage',
        elasticSearchIndexNotification: 'elasticSearchIndexNotification',
        cronStatus: 'cronStatus',
        wqlQueryDeleteNotification: 'wqlQueryDeleteNotification'
    },
    extraParams: {
        updateTypeWhatsNew: "What's New",
        updateTypeServiceUpdate: 'Service Update'
    },
    sendMail: sendMail
};

function sendMail(templateName, params, success, failure) {
    params['contactEmail'] = process && process.env && process.env.NOTIFICATION_EMAIL_ACC ? process.env.NOTIFICATION_EMAIL_ACC : 'purvang.vasani@nextgen-webworks.in';
    // params['portalLink'] = constants.portalLink;
    params['portalLink'] = 'http://localhost:4200/';
    params['logoUrl'] = `${params.portalLink}/assets/images/logo_white.svg`;

    let transportOptions = {
        service: 'Gmail',
        secure: true,
        auth: {}
    };
    switch (params.from) {
        case mailId.notification:
            transportOptions.auth = {
                user: process.env.NOTIFICATION_EMAIL_ACC,
                pass: process.env.NOTIFICATION_EMAIL_PASS
            };
            break;
        case mailId.support:
            transportOptions.auth = {
                user: process.env.NOTIFICATION_EMAIL_ACC,
                pass: process.env.NOTIFICATION_EMAIL_PASS
            };
            break;
    }
    sendByNodeMail(templateName, params, success, failure, transportOptions);
}

function sendByNodeMail(templateName, params, success, failure, transportOptions) {
    try {
        let rawTemplate = fs.readFileSync(path.join(__dirname, `../mail-templates/${templateName}/html.ejs`), { encoding: 'utf8' });
        // params['portalTitle'] = constants.portalTitle;
        params['portalTitle'] = `${process.env.APP_NAME}`;
        let html = ejs.render(rawTemplate, params);

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secureConnection: false, // use SSL
            // secure: true,
            // pool: true, // Check this option
            auth: transportOptions.auth,
            tls: {
                ciphers:'SSLv3'
            }
        });

        // let fromMail = (params && params.from && params.from === mailId.notification) ? '"Notifications" ' : '"Support" ';
        // fromMail += (params && params.from) ? params.from : transportOptions.auth.user;
        let mailOptions = {
            from: params.from || mailId.notification,
            to: params.email,
            subject: params.subject + ' (' + `${process.env.APP_NAME}` + ')',
            html: html,
            attachments: []
        };
        if (params && params.cc) {
            mailOptions['cc'] = params.cc;
        }
        if (params && params.attachments && params.attachments.filename && params.attachments.content) {
            mailOptions['attachments'] = [{
                filename: params.attachments.filename,
                content: params.attachments.content,
                contentType: params.attachments.contentType
            }];
        }
        // mailOptions['attachments'].push({
        //     filename: 'logo.svg',
        //     path: params['logoUrl'],
        //     cid: 'logoUrl'
        // });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Line:116 => Failed to send email: ', error);
                failure(error);
            } else {
                // console.log('Email sent: ', info.response);
                success(info);
            }
        });
    } catch (e) {
        console.error('Line:124 => Failed to send email: ', e);
        failure(e);
    }
}