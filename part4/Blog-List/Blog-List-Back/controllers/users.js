const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


// CREATE 
usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body;

        // Validate password length before processing
        if (!password || password.length < 3) {
            return response.status(400).json({ error: "Password must be at least 3 chars long" });
        }

        // Validate username length before processing
        if (!username || username.length < 3) {
            return response.status(400).json({ error: "Username must be at least 3 chars long" });
        }

        // Proceed with password hashing after validations
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create the new user object with passwordHash
        const user = new User({
            username,
            name,
            passwordHash
        });

        // Save the user in the database
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        next(error);  // Pass any error to the error-handling middleware
    }
});

// READ

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs')
    response.json(users)
})


module.exports = usersRouter