const Mail = require('../models/mail');
var nodemailer = require('nodemailer');
//var smtpPassword = require('aws-smtp-credentials');
var smtpTransport = require('nodemailer-smtp-transport');



exports.create = async (req, res, next) => {
    Mail.find({email: req.body.email}).exec()
        .then(user => {
            if (user.length >= 1)
                return res.status(409).json({
                    error: "Cette addresse email n'est plus disponible."
                })
            else {
                        const user = new Mail({
                            email: req.body.email,
                            name: req.body.name,
                            phoneNumber: req.body.phoneNumber || null,
                            reference: req.body.reference
                        }).save().then(u => {
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
                                to: req.body.email,
                                subject: `Message from groupeynovk@gmail.com`,
                                text: "nous avons bien enregistre votre mail et nous vous contacterons dans les plus brefs delais",
                                html: '<b>Hey there! </b><br> Votre addresse a été bien enregistré et nous vous contacterons dans les plus brefs delais<br /><img src="cid:icon.png" alt="icon" />',
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
                                    // res.status(200).json({ message: 'send Mail' });
                                    res.status(201).json({
                                        user: u
                                    })

                                }
                            });

                        }).catch(err => {
                            res.status(500).json({
                                error: "Une erreur est survenue lors de votre inscription",
                                message: err
                            })
                        });
                    }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                error: "Une erreur est survenue",
                err: err
            })
        });
};




exports.update = (req, res, next) => {
    Mail.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, data) {
        if (err) {
            res.send({state: "erreur update Mail"})
        }
        res.send(data)
    })
};

exports.delete = (req, res, next) => {
    // TODO delete files
    Mail.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Success",
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
