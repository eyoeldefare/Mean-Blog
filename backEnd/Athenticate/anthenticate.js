const User = require('../User/user'); 

module.exports = (router) => {
    router.post('/register', (req, res) => {
        // email
        if (!req.body.email) {
            res.json({
                success: false,
                message: 'Please enter an e-mail'
            }); 
        } else {
            
            if (!req.body.username) {
                res.json({
                    success: false,
                    message: 'Please enter a username'
                }); 
            } else {
                if (!req.body.password) {
                    res.json({
                        success: false,
                        message: 'Please enter a password'
                    }); 
                } else {
                    //new user
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    // save user
                    user.save((err) => {
                        
                        if (err) {
                            // account exists already?
                            if (err.code === 11000) {
                                res.json({
                                    success: false,
                                    message: 'Username or e-mail already exists'
                                }); 
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({
                                            success: false,
                                            message: err.errors.email.message
                                        }); 
                                    } else {
                                        if (err.errors.username) {
                                            res.json({
                                                success: false,
                                                message: err.errors.username.message
                                            }); 
                                        } else {
                                            if (err.errors.password) {
                                                res.json({
                                                    success: false,
                                                    message: err.errors.password.message
                                                }); 
                                            } else {
                                                res.json({
                                                    success: false,
                                                    message: err
                                                }); 
                                            }
                                        }
                                    }
                                } else {
                                    res.json({
                                        success: false,
                                        message: 'Could not save user ',
                                        err
                                    }); 
                                }
                            }
                        } else {
                            res.json({
                                success: true,
                                message: 'Registered!'
                            }); 
                        }
                    });
                }
            }
        }
    });

    return router; 
}