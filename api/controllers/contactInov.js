
var nodemailer = require('nodemailer');
//var smtpPassword = require('aws-smtp-credentials');
var smtpTransport = require('nodemailer-smtp-transport');



exports.create = (req, res, next) => {


    var transporter = nodemailer.createTransport(smtpTransport({
        port: 587,
        host: "ssl0.ovh.net",
        encryption : "tls",
        auth: {
            user: "info@nkap.info",
            pass: "4.e2@?<W7Tm)/XW@G+;y;+_)DB`Lc&"
        }
    }));


    var mailOptions = {
        from: 'info@nkap.info',
        to: req.body.mail,
        subject: `Message from ${req.body.email}: ${req.body.title}`,
        text: req.body.description,
        // attachments: [{
        //     filename: req.body.file,
        //     path: req.body.file
        // }]
    };
    var mailOptionse = {
        from: 'info@nkap.info',
        to: req.body.email,
        subject: `Message from info@nkap.info`,
        text: "nous avons bien recu votre mail et nous vous contacterons dans les plus brefs delais",
        html: '<b>Bienvenue!!!</b><br> Nous vous remercions de votre inscription à notre newsletter. Vous faites désormais partie de la communauté INNOV CORP. En effet, INNOV CORP est une Entreprise de Conseil qui accompagne les personnes et entreprises dans divers services liés aux NTIC (Nouvelles Technique de l\'Information et de la Communication) tel que: Le developpement d\'application, le testing, le Marketing Digital, la Securité et le Reseau informatique...<br /><img src="cid:inov.png" alt="icon" />',
        attachments: [
            {
                filename: 'logo.png',
                path: __dirname + '/inov.png',
                cid: 'inov.png'
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


    module.exports = transporter;
};


