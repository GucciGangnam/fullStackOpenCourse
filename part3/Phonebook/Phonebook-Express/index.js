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
app.post('/api/persons', async (req, res) => {
    if (!req.body.name) {
        return res.status(403).json("Must include a name")
    }
    if (!req.body.number) {
        return res.status(403).json("Must include a number")
    }
    try {
        let existingPerson = await Person.findOne({ name: req.body.name })
        if (existingPerson) {
            console.log(existingPerson)
            return res.status(403).json("This name aready exists in the phonebook")
        }
        const newPerson = new Person({
            id: uuidv4(),
            name: req.body.name,
            number: req.body.number
        })
        await newPerson.save();
        console.log('Added', newPerson.name, newPerson.number, 'to phonebook');
    } catch (error) {
        console.error("Unable to save new person")
    }
})


// READ 
// Get DB info
app.get('/info', async (req, res) => {
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
        console.error("Cant get number of peoepl in phonebook from DB")
    }
})
// Get all persons 
app.get('/api/persons', async (req, res) => {
    try {
        let persons = await Person.find({});
        res.json(persons)
    } catch (error) {
        console.error("Can not fetch perosns from DB")
    }
})
// Get single person 
app.get('/api/persons/:id', async (req, res) => {
    try {
        let personToFind = await Person.find({ id: req.params.id })
        if (personToFind.length < 1) {
            return res.status(404).json("Can not find that user")
        } else {
            res.json(personToFind)
        }
    } catch (error) {
        console.error("Database error")
    }
})

// UPDATE 

//DELETE
// Delete One user 
app.delete('/api/persons/:id', async (req, res) => {
    try {
        // Find the person by id
        let personToDelete = await Person.findOne({ id: req.params.id });

        // If the person is not found
        if (!personToDelete) {
            return res.status(404).json({ error: "Person not found" });
        }

        // Use deleteOne() to remove the person
        await Person.deleteOne({ id: req.params.id });
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
