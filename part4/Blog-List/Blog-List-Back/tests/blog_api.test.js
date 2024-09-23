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
// GETTING
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

// POSTING 
test('making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
    const testBlog = new Blog({ title: "Test Author", author: "Test Author", url: "Test URL", likes: 0 })
    const saveRes = await testBlog.save();
    const blogInDB = await Blog.find({ _id: saveRes._id });
    assert.strictEqual(blogInDB.length, 1)
})

test('Adding a new blog with no like sproperty will default its vlikes value to 0', async () => {
    const testBlog = new Blog({ title: "TestLikes Title", author: "TestLikes Author", url: "TestLikes URL" })
    const saveRes = await testBlog.save();
    const blogInDB = await Blog.find({ _id: saveRes._id });
    assert.strictEqual(blogInDB[0].likes, 0)
})

test('missing title or url results in 400 bad request', async () => {
    // Case 1: Missing title
    const blogWithoutTitle = {
        author: "Test Author",
        url: "Test URL",
        likes: 0
    };

    await supertest(app)
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/);

    // Case 2: Missing url
    const blogWithoutUrl = {
        title: "Test Title",
        author: "Test Author"
    };

    await supertest(app)
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/);
});




after(async () => {
    await mongoose.connection.close()
})