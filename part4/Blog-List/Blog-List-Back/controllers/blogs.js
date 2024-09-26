const blogRouter = require('express').Router()
// JWT
const jwt = require('jsonwebtoken')
// Models 
const Blog = require('../models/blog')
const User = require('../models/user')

// GET //
// Get All Blogs //
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user')
    response.json(blogs)
})

// POST //
// Post a new blog
blogRouter.post('/', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        console.log("positng new blog --- USER ID below")
        console.log(decodedToken.id)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)

        console.log("user fetched from DB with ID from above.")
        console.log("That ID for teh fetched user is BLEOW")
        console.log(user._id)

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
        const blog = new Blog({
            title: req.body.title,
            author: user.username,
            url: req.body.url,
            user: user._id
        })
        console.log(blog)
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save();
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

        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const userID = decodedToken.id
        const blogToDelete = await Blog.findOne({ _id: req.params.id })
        if (!blogToDelete) {
            throw new Error("No such blog with this ID")
        }

        if (blogToDelete.user.toString() === userID.toString()) {
            await Blog.findByIdAndDelete(req.params.id)
        } else {
            throw new Error("Your access token doesnt allow deleting access to this blog")
        }


        res.status(200).json("Blog deleted");
    } catch (error) {
        next(error)
    }
})



module.exports = blogRouter