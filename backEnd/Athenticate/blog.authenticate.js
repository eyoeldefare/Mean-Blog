const Blog = require('../Model/blog');
const Data = require('../Mongo/mongoose')
const jwt = require('jsonwebtoken');
const User = require("../Model/user");

module.exports = (router) => {
    //only for thumbnail blogs
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
                        message: "Please login to comment"
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
                            message: "Please enter a tag or thumbnail pic"
                        })

                    } else {
                        const blog = new Blog({
                            title: req.body.title,
                            tags: req.body.tags,
                            createdAt: req.body.createdAt,
                            createdBy: req.body.createdBy,
                            summery: req.body.summery,
                            thumbnail: req.body.thumbnail,
                            googledoc: req.body.googledoc,

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

    router.get("/blogthumbnails/blog:id", (req, res) => {
        Blog.findOne({
            _id: req.params.id
        }, (err, blog) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (!blog) {
                    res.json({
                        success: false,
                        message: "blog is not found"
                    });
                } else {
                    res.json({
                        success: true,
                        blog: blog
                    })
                }
            }
        })
    })

    router.put("/thumbnail", (req, res) => {
        if (!req.body.id) {
            res.json({
                success: false,
                message: "id not found"
            })

        } else {
            if (!req.body.comment) {
                res.json({
                    success: false,
                    message: "Enter a comment"
                })
            } else {
                Blog.findOne({
                    _id: req.body.id
                }, (err, blog) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: "id not found"

                        })
                    } else {
                        if (!blog) {
                            res.json({
                                success: false,
                                message: "blog not found"
                            })
                        } else {
                            User.findOne({
                                _id: req.decoded.userId
                            }, (err, user) => {
                                if (err) {
                                    rers.json({
                                        success: false,
                                        message: "No user was found"
                                    })
                                } else {
                                    if (!user) {
                                        res.json({
                                            success: false,
                                            message: "user not found"
                                        })
                                    } else {
                                        blog.comments.push({
                                            comment: req.body.comment,
                                            time: req.body.time,
                                            createdby: user.username
                                        });
                                        blog.save((err) => {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    message: "not able to save blog"
                                                })
                                            } else {
                                                res.json({
                                                    success: true,
                                                    message: "Comment submitted"
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
    return router;
}