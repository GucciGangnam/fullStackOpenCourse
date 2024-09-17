const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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
    },
    {
        "id": "5",
        "name": "Tester",
        "number": "555-555-555"
    }
]

// HOMEPAGE
// Get homepage
app.get('/', (req, res) => {
    res.send("Welcome to the Homepage")
})

// CREATE 
// Creat enew person 
app.post('/api/persons', (req, res) => {
    if (!req.body.name) {
        return res.status(403).json("Must include a name")
    }
    if (!req.body.number) {
        return res.status(403).json("Must include a number")
    }
    // Check if name already exists
    let existingName = persons.find(person => person.name === req.body.name);
    if (existingName) {
        return res.status(403).json("This name aready exists in the phonebook")
    }

    let newPerson = {
        id: uuidv4(),
        name: req.body.name,
        number: req.body.number
    }
    persons.push(newPerson)
    res.send(
        `<p>${newPerson.name} has been added to the phonebook.
        </p>`
    )
});


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
// Delete One user 
app.delete('/api/persons/:id', (req, res) => {
    let personToFind = persons.find(persons => persons.id === req.params.id)
    if (!personToFind) {
        return res.status(404).json("Can not find that user")
    } else {
        persons.pop();
        res.send(
            `<p>
                ${personToFind.name} has been removed from the phonebook.
            </p>`
        )
    }
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
