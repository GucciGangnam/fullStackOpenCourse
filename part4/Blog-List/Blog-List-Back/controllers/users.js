const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


// CREATE 
usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)  // Pass any error to the error-handling middleware
    }
})

// READ

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs')
    response.json(users)
})

// usersRouter.get('/', async (request, response, next) => {
//     try {
//         const users = await User.find({})
//         response.json(users)
//     } catch (error) {
//         next(error)
//         console.log(errorF)
//     }
// })

module.exports = usersRouter