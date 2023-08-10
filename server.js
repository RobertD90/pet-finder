//after installing and setting up the server - set the path
const express = require(`express`);
const { param } = require("express/lib/request");
// we need this to use express
const app = express();
//import but this time with the help of "require" -backEnd
const path = require(`path`);
const pets = require(`./petlist`)

//__dirname + public = sending the user the public folder
app.use('/public', express.static(path.join(__dirname + '/public')))

//request and response
app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html')
})

app.get('/pets', (req, res) => {
    //res.send so that the server will not get stuck 
    res.send(pets)
})

//GET REQUEST also a for loop to get all the owners.
//request and response
app.get(`/pets-by-owner`, (req, res) => {
    const allPets = []
    const ownerName = req.query.name;
    console.log(ownerName)
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].owner === ownerName) {
            allPets.push(pets[i])
        }
    }
    //call allPets
    res.send(allPets)
})

//GET REQUEST also a for loop to get all the animals.
app.get('/pets/:name', (req, res) => {
    const allPets = []
    const animalName = req.params.name;
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].name === animalName) {
            allPets.push(pets[i])
        }
    }
    //run allPets
    res.send(allPets)
})


//create a server from scratch (use PORT 8080 - also CTR+C to stop, node server.js to start)
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
})