const Data = require('../Mongo/mongoose');
const Email = require('../Model/email');

module.exports = (router) => {

    // email/reg
    router.post("/reg", (req, res) => {
        if (!req.body.email) {
            res.json({
                success: false,
                message: 'Please enter an e-mail'
            });

        } else {
            let user = new Email({
                email: req.body.email.toLowerCase()
            });
            user.save((err) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({
                            success: false,
                            message: 'E-mail already exists'
                        });
                    } else {
                        if (err.errors) {
                            if (err.errors.email) {
                                res.json({
                                    success: false,
                                    message: err.errors.email.message
                                });
                            } else {
                                res.json({
                                    success: false,
                                    message: err
                                });
                            }
                        } 
                        else {
                            res.json({
                                success: false,
                                message: "Can't save email"
                            });
                        }

                    }

                } 
                else {
                    res.json({
                        success: true,
                        message: "Cool, email registered"
                    });
                }

            });
        }
    });
    return router;
}