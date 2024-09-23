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

beforeEach(async() => { 
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlog[0])
    await blogObject.save();
    blogObject = new Blog(initialBlog[1]);
    await blogObject.save();
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlog.length)
})

test('the first blog is about Blog 1', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(e => e.title)
    assert(title.includes('Blog 1 Title'))
})

after(async () => {
    await mongoose.connection.close()
})