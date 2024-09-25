const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;
    try {
        const user = await User.findOne({ username });
        // Check if user exists and verify password
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return response.status(401).json({
                error: 'invalid username or password',
            });
        }
        // Create token
        const userForToken = {
            username: user.username,
            id: user._id,
        };
        const token = jwt.sign(
            userForToken,
            process.env.SECRET,
            { expiresIn: 60 * 60 }
        )
        // Send response
        response.status(200).send({
            token,
            username: user.username,
            name: user.name,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = loginRouter;
