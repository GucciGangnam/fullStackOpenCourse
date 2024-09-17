const express = require('express')
const app = express()

persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// HOMEPAGE
// Get homepage
app.get('/', (req, res) => {
    res.send("Welcome to the Homepage")
})

// CREATE 


// READ 
// Get all Info 
app.get('/info', (req, res) => {
    let numberOfPeople = persons.length;
    let date = new Date();
    res.send(`
        <p>This phonebook has info for ${numberOfPeople} people
            <br/>
            The date is: ${date}
        </p>
    `);
});
// Get all persons 
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
// Get single person 
app.get('/api/persons/:id', (req, res) => {
    let personToFind = persons.find(persons => persons.id === req.params.id)
    if (!personToFind) {
        return res.status(404).json("Can not find that user")
    } else {
        res.json(personToFind)
    }
})

// UPDATE 

//DELETE



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
