const blogRouter = require('express').Router()
// Models 
const Blog = require('../models/blog')


// blogRouter.get('/', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })


blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
    try {
        const blog = new Blog(req.body)
        console.log(blog)
        await blog.save();
        res.status(201).json(blog)
    } catch (error) {
        console.error(error)
    }
})


module.exports = blogRouter