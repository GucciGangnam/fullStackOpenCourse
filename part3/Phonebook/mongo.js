const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://feint09rebuild:${password}@fullstackopenphonebook.gzduu.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=FullStackOpenPhoneBook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// Person.find({}).then(result => {
//     if (Person.length < 1) {
//         console.log("No people in the phonebook")
//     } else {
//         result.forEach(note => {
//             console.log(note)
//         })
//     }
//     mongoose.connection.close()
// })

const showPeople = async () => { 
    try { 
        const peopleArray = await Person.find({});
        console.log("People in the phonebook ////////////");
        if (peopleArray.length > 0) {
            console.table(
                peopleArray.map(person => ({
                    Name: person.name,
                    Number: person.number
                }))
            );
        } else {
            console.log("No people in the phonebook.");
        }
    } catch (error) { 
        console.error("Can't fetch people from DB", error);
    } finally { 
        mongoose.connection.close();
    }
};


const addPerson = async () => { 
    try{ 
        const newPerson = new Person({ 
            id: uuidv4(),
            name: process.argv[3],
            number: process.argv[4]
        })
        await newPerson.save();
        console.log('Added', newPerson.name, newPerson.number, 'to phonebook');
    } catch (error){ 
        console.error("Unable to save new person")
    } finally { 
        mongoose.connection.close();
    }
}

if (process.argv.length === 5){ 
    addPerson()
} else { 
    showPeople();
}
