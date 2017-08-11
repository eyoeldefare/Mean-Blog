const Blog = require('../Model/blog');
const Data = require('../Mongo/mongoose')
const jwt = require('jsonwebtoken');

module.exports = (router) => {

    router.use('/thumbnail', (req, res, next) => {

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
                    if (!req.body.tags || !req.body.thumbnail) {
                        res.json({
                            success: false,
                            message: "Please enter a tag and thumbnail pic"
                        })

                    }
                    else {
                    const blog = new Blog({
                        title: req.body.title,
                        tags: req.body.tags,
                        createAt: req.body.createAt,
                        createdBy: req.body.createdBy,
                        summery: req.body.summery,
                        thumbnail: req.body.thumbnail,
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
                                    if (err.errors.tags || err.errors.thumbnail) {
                                        res.json({
                                            success: false,
                                            message: "Please enter a correct thumbnail and tags "
                                        })
                                    } else {
                                        if (err.errors.summery) {
                                            res.json({
                                                success: false,
                                                message: "Unalble to post summery"
                                            })
                                        } else {
                                            if (err.errors.googledoc) {
                                                res.json({
                                                    success: false,
                                                    message: "Unalble to post summery googledoc embded link"
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