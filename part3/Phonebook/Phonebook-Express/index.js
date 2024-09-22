const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')

// Models 
const Person = require('./models/person')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'))

// morgan.token('body', (req) => {
//     return JSON.stringify(req.body);
// });
// app.use(
//     morgan(':method :url :status - Body: :body', {
//         skip: (req) => req.method !== 'POST',
//     })
// );
app.use(morgan('tiny'))

// Connectt to mongo
mongoose.set('strictQuery', false);
const url = process.env.MONGO_URI;
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


// HOMEPAGE
// Get homepage
app.get('/', (req, res) => {
    res.send("Welcome to the Homepage")
})

// CREATE 
// Create new person 
app.post('/api/persons', async (req, res, next) => {
    try {
        if (!req.body.name) {
            const error = new Error("New contact must include a name");
            error.status = 403;
            error.message = "New contact must include a name";
            throw error;
        }
        if (!req.body.number) {
            const error = new Error("New contact must include a number");
            error.status = 403;
            error.message = "New contact must include a number";
            throw error;
        }
        let existingPerson = await Person.findOne({ name: req.body.name })
        if (existingPerson) {
            const error = new Error("This person already exists in the phone book");
            error.status = 403;
            error.message = "This person already exists in the phone book";
            throw error;
        }
        const newPerson = new Person({
            id: uuidv4(),
            name: req.body.name,
            number: req.body.number
        })


        await newPerson.save();
        console.log('Added', newPerson.name, newPerson.number, 'to phonebook');
        res.status(201).json(newPerson);



    } catch (error) {
        next(error)
    }
})


// READ 
// Get DB info
app.get('/info', async (req, res, error) => {
    try {
        let numberOfPeople = (await Person.find({})).length
        let date = new Date();
        res.send(`
            <p>This phonebook has info for ${numberOfPeople} people
                <br/>
                The date is: ${date}
            </p>
        `);
    } catch (error) {
        error.status = 500;
        error.message = "Error communicatiign with DB"
        next(error)
    }
})
// Get all persons 
app.get('/api/persons', async (req, res) => {
    try {
        let persons = await Person.find({});
        res.json(persons)
    } catch (error) {
        error.status = 500;
        error.message = "Error communicatiign with DB"
        next(error)
    }
})
// Get single person 
app.get('/api/persons/:id', async (req, res, next) => {
    try {
        let personToFind = await Person.find({ id: req.params.id })
        if (personToFind.length < 1) {
            const error = new Error("Cannot find that person");
            error.status = 404
            error.message = "Can not find that user";
            throw error;
        } else {
            res.json(personToFind)
        }
    } catch (error) {
        next(error)
    }
})

// UPDATE 
app.put('/api/persons/:id', async (req, res, next) => {
    const personID = req.body.id;
    const newNumber = req.body.number;
    try {
        const existingUser = await Person.findOne({ id: personID });
        if (!existingUser) {
            const error = new Error("Person ID not recognised");
            error.status = 404;
            error.message = "Person ID not recognised";
            error.details = "The ID that was passed in the body cannot be located in the database";
            throw error;
        }
        existingUser.number = newNumber;
        const updatedPerson = await existingUser.save();
        res.status(200).json(updatedPerson);
    } catch (error) {
        next(error);
    }
});

//DELETE
// Delete One user 
app.delete('/api/persons/:id', async (req, res) => {
    try {
        let personToDelete = await Person.findOne({ _id: req.params.id });
        if (!personToDelete) {
            return res.status(404).json({ error: "Person not found" });
        }
        await Person.deleteOne({ id: req.params.id });
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/*", (req, res) => {
    res.send("This end point doesnt exist")
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


const errorHandler = async (error, req, res, next) => {

    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else {
        console.log("error haqndler called")
        console.error(error)
        const status = error.rstatus || 500;
        const message = error.message || "An error has occured"
        const details = error.details || "No details have been specified for this error"

        return res.send(
            `<h1>Congratualtions, theres been an error!</h1>
        <br/>
        <p>Status: ${status} </p>
        <p>Message: ${message} </p>
        <p>Details: ${details} </p>
    </p>`
        )
    }



}

app.use(errorHandler)