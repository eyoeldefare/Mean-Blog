const Blog = require('../Model/blog');
const Data = require('../Mongo/mongoose')
module.exports = (router) => {

    router.use('/blogs/thumbnail', (req, res, next) => {

        const token = req.headers['authorization'];
        if (!token) {
            res.json({
                success: false,
                message: 'No token provided'
            });
        } else {
            jwt.verify(token, Data.secret, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Token invalid: ' + err
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });
    router.post('/thumbnail', (req, res) => {
        if (!req.body.title) {
            res.json({
                success: false,
                message: "Title is required"
            })
        } else {
            if (!req.body.summery) {
                res.json({
                    success: false,
                    message: "Summery is required"
                })

            } else {
                if (!req.body.googledoc) {
                    res.json({
                        success: false,
                        message: "Please embade your google doc file to publish it as a blog"
                    })

                } else {
                    if (!req.body.tags) {
                        res.json({
                            success: false,
                            message: "Please select a tag"
                        })

                    }
                    else {
                    const blog = new Blog({
                        title: req.body.title,
                        tags: req.body.tags,
                        createAt: req.body.createAt,
                        createdBy: req.body.createdBy,
                        summery: req.body.summery,
                        googledoc: req.body.googledoc
                    });

                    blog.save((err) => {
                        if (err) {
                            if (err.errors) {
                                if (err.errors.title) {
                                    res.json({
                                        success: false,
                                        message: "please enter a title"
                                    })
                                } else {
                                    if (err.errors.tags) {
                                        res.json({
                                            success: false,
                                            message: "something wrong here"
                                        })
                                    } else {
                                        if (err.errors.summery) {
                                            res.json({
                                                success: false,
                                                message: "please enter a summery"
                                            })
                                        } else {
                                            if (err.errors.googledoc) {
                                                res.json({
                                                    success: false,
                                                    message: "please enter a googledoc embded link"
                                                })
                                            }
                                        }

                                    }



                                }
                            }
                            res.json({
                                success: false,
                                message: err
                            });

                        } else {
                            res.json({
                                success: true,
                                message: "blog saved"
                            })
                        }
                    })

                }
                } 
            }
        }

    });
    router.get("/blogthumbnails", (req, res) => {
        Blog.find({}, (err, blogs) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                })
            } else {
                if (!blogs) {
                    res.json({
                        success: false,
                        message: "blogs not available"
                    })
                } else {
                    res.json({
                        success: true,
                        blogs: blogs
                    });
                }
            }
        })
    })
    return router;
}