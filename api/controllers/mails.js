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
                                service: 'gmail',
                               // port: 587,
                                auth: {
                                    user: "groupeynovk@gmail.com",
                                    pass: "Audrey010193!"
                                }
                            }));

                            var mailOptions = {
                                from: 'groupeynovk@gmail.com',
                                to: req.body.email,
                                subject: `Message from info@nkap.fr`,
                                text: "Nous vous remercions de votre inscription à notre newsletter.",
                                html: '<b>Bienvenue!!!</b><br> Nous vous remercions de votre inscription à notre newsletter. Vous faites désormais partie de la communauté NKAP. \n' +
                                    'En effet, NKAP SARL est une Entreprise de Conseil qui accompagne les personnes et entreprises dans divers services liés aux NTIC (Nouvelles Technique de l\'Information et de la Communication) tel que: Le developpement d\'application, le testing, le Marketing Digital, la Securité et le Reseau informatique...<br /><img src="cid:icon.png" alt="icon" />',
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
