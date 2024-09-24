const { test, after, beforeEach, describe } = require('node:test')
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

// INITIALLY SAVING NEW NOTES 


describe('Test DB environment is initatiated properly with 2 blogs', () => {
    // Clear dB before each test is run
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

})


// GETTING

describe('Getting Blogs', () => {

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

    test('Getting all returns all blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlog.length)
    })

})









// POSTING 
describe('Posting Blogs', () => {

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

})


// DLETEING //
describe("deleteing a blog", () => {

    test('delete req to enpoint with blog ID deletes the blog', async () => {
        const allBlogs = await Blog.find({});
        const targetID = allBlogs[0]._id;
        await supertest(app)
            .delete(`/api/blogs/${targetID}`)
            .expect(200)
        const blogInDb = await Blog.findById(targetID);
        assert.strictEqual(blogInDb, null); // Ensure blog is null after deletion
    })

    test('Deleting a blog with wrong ID doesnt chnage DB and returns 400', async () => {
        const beforeArray = await Blog.find({});
        await supertest(app)
            .delete('/api/blogs/0000')
            .expect(400)
        const afterArray = await Blog.find({});
        assert.strictEqual(beforeArray.length, afterArray.length);
    })

})


// UPDATING //
describe("Updating blogs", () => {

    test("Updating title changes title only", async () => {
        const allBlogs = await Blog.find({});
        const targetID = allBlogs[0]._id;
        const originalBlog = await Blog.findById(targetID);
        const newTitle = Math.random().toString();
        await supertest(app)
            .patch(`/api/blogs/${targetID}`)
            .send({ title: newTitle })
            .expect(200);
        const updatedBlog = await Blog.findById(targetID);
        assert.strictEqual(updatedBlog.title, newTitle);
        assert.strictEqual(updatedBlog.likes, originalBlog.likes);
        assert.strictEqual(updatedBlog.url, originalBlog.url);
        assert.strictEqual(updatedBlog._id.toString(), originalBlog._id.toString());
    });






    test("Updating both title and likes changes both fields", async () => {
        // Fetch all blogs and get the first one
        const allBlogs = await Blog.find({});
        const targetID = allBlogs[0]._id;

        // Store the original blog details before the update
        const originalBlog = await Blog.findById(targetID);

        // Generate a new title and a new number of likes
        const newTitle = Math.random().toString();
        const newLikes = originalBlog.likes + 1;

        // Perform the PATCH request to update both title and likes
        await supertest(app)
            .patch(`/api/blogs/${targetID}`)
            .send({ title: newTitle, likes: newLikes })
            .expect(200);

        // Retrieve the blog again after the update
        const updatedBlog = await Blog.findById(targetID);

        // Assertions
        assert.strictEqual(updatedBlog.title, newTitle); // Ensure the title is updated
        assert.strictEqual(updatedBlog.likes, newLikes); // Ensure the likes is updated
        assert.strictEqual(updatedBlog.url, originalBlog.url); // Ensure the url remains unchanged
        assert.strictEqual(updatedBlog._id.toString(), originalBlog._id.toString()); // Ensure the _id remains unchanged
    });

    test("Updating likes changes likes only", async () => {
        // Fetch all blogs and get the first one
        const allBlogs = await Blog.find({});
        const targetID = allBlogs[0]._id;

        // Store the original blog details before the update
        const originalBlog = await Blog.findById(targetID);

        // Generate a new number of likes
        const newLikes = originalBlog.likes + 1;

        // Perform the PATCH request to update only the likes
        await supertest(app)
            .patch(`/api/blogs/${targetID}`)
            .send({ likes: newLikes })
            .expect(200);

        // Retrieve the blog again after the update
        const updatedBlog = await Blog.findById(targetID);

        // Assertions
        assert.strictEqual(updatedBlog.likes, newLikes); // Ensure likes is updated
        assert.strictEqual(updatedBlog.title, originalBlog.title); // Ensure title remains unchanged
        assert.strictEqual(updatedBlog.url, originalBlog.url); // Ensure url remains unchanged
        assert.strictEqual(updatedBlog._id.toString(), originalBlog._id.toString()); // Ensure the _id remains unchanged
    });

})






after(async () => {
    await mongoose.connection.close()
})