
var nodemailer = require('nodemailer');
//var smtpPassword = require('aws-smtp-credentials');
var smtpTransport = require('nodemailer-smtp-transport');



    exports.create = (req, res, next) => {


    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        secureConnection: true,
        port: 465,
        transportMethod: 'SMTP',
        auth: {
            user: "groupeynovk@gmail.com",
            pass: "Audrey010193!"
        }
    }));


    var mailOptions = {
        from: req.body.email,
        to: `groupeynovk@gmail.com,${req.body.mail}`,
        subject: `Message from ${req.body.email}: ${req.body.title}`,
        text: req.body.description,
        // attachments: [{
        //     filename: req.body.file,
        //     path: req.body.file
        // }]
    };
    var mailOptionse = {
        from: req.body.email,
        to: req.body.email,
        subject: `Message from groupeynovk@gmail.com`,
        text: "nous avons bien recu votre mail et nous vous contacteron dans les plus brefs delais",
        html: '<b>Hey there! </b><br> nous avons bien recu votre mail et nous vous contacteron dans les plus brefs delais<br /><img src="cid:icon.png" alt="icon" />',
        attachments: [
            {
                filename: 'logo.png',
                path: __dirname + '/icon.png',
                cid: 'icon.png'
            }
        ]
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            transporter.sendMail(mailOptionse, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).json({ message: 'send Mail' });

        }
    });


//     var mailOptions = {
//         from: req.body.email,
//         to: 'momorockwell@gmail.com',
//         text: 'This is some text',
//         html: '<b>This is some HTML</b>',
//     };
//     function callback(error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Message sent: ' + info.response);
//         }
//     }
//
// // Send e-mail using AWS SES
//     mailOptions.subject = 'Nodemailer SES transporter';
//     var sesTransporter = nodemailer.createTransport(sesTransport({
//         accessKeyId: 'AKIAYHZOZEZ3A5LZKR6K',
//         secretAccessKey: 'BMD+UQOocCTpjKMTeDz/Ui/B9vq1ji7b3YM0XYwrBZXt',
//         region: 'eu-west-3'
//
//     }));
//     sesTransporter.sendMail(mailOptions, callback);
//
// // Send e-mail using SMTP
//     mailOptions.subject = 'Nodemailer SMTP transporter';
//     var smtpTransporter = nodemailer.createTransport({
//         port: 587,
//         host: 'email-smtp.us-east-2.amazonaws.com',
//         secure: true,
//         auth: {
//             user: 'AKIAYHZOZEZ3A5LZKR6K',
//             pass: 'BMD+UQOocCTpjKMTeDz/Ui/B9vq1ji7b3YM0XYwrBZXt',
//         },
//         debug: true
//     });
//     smtpTransporter.sendMail(mailOptions, callback);
    module.exports = transporter;
};


