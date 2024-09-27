const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


//...

describe('when there is initially one user in db', () => {
    console.log('running user tests')

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: "DEV", password: passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Creating a user with username less than 3 chars long will result in error and user is not created', async () => {
        const usersAtStart = await helper.usersInDb();
    
        const newUser = {
            username: 'a',  // Invalid username
            name: 'Superuser',
            password: 'salainen',
        };
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    
        const usersAtEnd = await helper.usersInDb();
    
        // Assert that the response error message includes username length issue
        assert(result.body.error.includes('Username must be at least 3 chars long'));
        
        // Ensure no new user is added
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test('creating a user with a password under 3 chars results in an error and user is not created', async () => { 
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'longusername',
            name: 'Superuser',
            password: 'a',  // Password less than 3 chars
        };
        const result = await api
            .post('/api/users')
            .send(newUser);
        // Use assert to check the status code and content type
        assert.strictEqual(result.status, 400);  // Ensure 400 status code
        assert.strictEqual(result.headers['content-type'], 'application/json; charset=utf-8');  // Ensure correct content type
        // Use assert to check the error message
        assert(result.body.error.includes('Password must be at least 3 chars long'));  // Ensure correct error message
        const usersAtEnd = await helper.usersInDb();
        // Assert that the number of users hasn't changed
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);  // No new user should be created
    });

})

after(async () => {
    await mongoose.connection.close()
})