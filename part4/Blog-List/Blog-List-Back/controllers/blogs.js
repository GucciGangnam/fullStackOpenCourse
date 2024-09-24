const blogRouter = require('express').Router()
// Models 
const Blog = require('../models/blog')

// GET //
// Get All Blogs //
blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})


// POST //
// Post a new blog
blogRouter.post('/', async (req, res, next) => {
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


// UPDATE //
// Update individual blog 
blogRouter.patch('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const updates = req.body;
    const blogToUpdate = await Blog.findById(req.params.id);
        if (!blogToUpdate) {
            return res.status(404).send({ error: "Blog not found" });
        }
        for (let key in updates) {
            if (updates.hasOwnProperty(key)) {
                blogToUpdate[key] = updates[key];
            }
        }
        const updatedBlog = await blogToUpdate.save();
        res.status(200).send(updatedBlog);
    } catch (error) {
        res.status(400).send({ error: "Failed to update the blog", details: error });
    }
});


// DELETE //
// Delete a single blog post 
blogRouter.delete("/:id", async (req, res, next) => {
    try {
        const blogToDelete = await Blog.findOne({ _id: req.params.id })
        if (!blogToDelete) {
            throw new Error("No such blog with this ID")
        }
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json("Blog deleted");
    } catch (error) {
        next(error)
    }
})



module.exports = blogRouter