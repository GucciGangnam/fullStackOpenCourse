const blogRouter = require('express').Router()
// Models 
const Blog = require('../models/blog')


blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {

    // Validate req body
    // if body.title is null

    try {
        console.log(req.body.title)
        if (!req.body.title) {
            const error = new Error("Title can't be null");
            error.status = 400;
            throw error;
        }
        if (!req.body.url) {
            const error = new Error("Url can't be null");
            error.status = 400;
            throw error;
        }
        const blog = new Blog(req.body)
        console.log(blog)
        await blog.save();
        res.status(201).json(blog)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


module.exports = blogRouter