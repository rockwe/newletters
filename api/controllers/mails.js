const Mail = require('../models/mail');


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
                            phoneNumber: req.body.phoneNumber || null
                        }).save().then(u => {
                            res.status(201).json({
                                user: u
                            })
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
