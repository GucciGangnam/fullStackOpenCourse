const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// Imports 
const Blog = require('../models/blog')
const initialBlog = [
    {
        title: 'Blog 1 Title',
        author: 'Blog 1 Author',
        url: 'Blog 1 URL',
        likes: 111
    },
    {
        title: 'Blog 2 Title',
        author: 'Blog 2 Author',
        url: 'Blog 2 URL',
        likes: 222
    }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlog[0])
    await blogObject.save();
    blogObject = new Blog(initialBlog[1]);
    await blogObject.save();
})
// Blogs are resturned in JSOn format
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
// There are 2 blogs in teh DB
test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlog.length)
})
// Blog[0] is blog 1
test('the first blog is about Blog 1', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(e => e.title)
    assert(title.includes('Blog 1 Title'))
})
// unique identifier property of the blog posts is named id
test('ID property of blog is returned as id, not _id', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
        // Assert id exists
        assert.ok(blog.id, 'Blog should have an id property');
        // Assert _id doesnt exist
        assert.strictEqual(blog._id, undefined, 'Blog should not have an _id property');
    });
});


after(async () => {
    await mongoose.connection.close()
})