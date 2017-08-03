const Blog = require('../Model/blog');
const Data = require('../Mongo/mongoose')
module.exports = (router) => {
    router.post('/thumbnail', (req, res) => {
        if (!req.body.title) {
            res.json({
                success: false,
                message: "Tite is required"
            })
        } 
        else {
            if (!req.body.summery) {
                res.json({
                    success: false,
                    message: "Summery is required"
                })

            } 
            else {
                if (!req.body.googledoc) {
                    res.json({
                        success: false,
                        message: "Please embade your google doc file to publish it as a blog"
                    })

                }
                else{
                    const blog = new Blog({
                        title: req.body.title,
                        tags:req.body.tags,
                        createAt: req.body.createAt,
                        createdBy: req.body.createdBy,
                        summery: req.body.summery,
                        googledoc: req.body.googledoc
                    });

                    blog.save((err)=>{
                        if (err){
                            if (err.errors){
                                if(err.errors.title){
                                    res.json({success:false, message:"please enter a title"})
                                }
                                else{
                                    if (err.errors.summery){
                                        res.json({success:false, message:"please enter a summery"})
                                    }
                                    else{
                                        if (err.errors.googledoc){
                                            res.json({success:false, message:"please enter a googledoc embded link"})
                                        }
                                    }
                                }
                            }
                            res.json({success:false, message:err});

                        }
                        else{
                            res.json({success:true, message:"blog saved"})
                        }
                    })

                }
            }
        }

    });
    return router;
}