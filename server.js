//Christian Yanez
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
//Middleware section of app.use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//API routes

app.get('/notes', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/notes.html'));
});//gets the note from the public folder.

app.get('/api/notes', (requestObj, responseObj) => {
    fs.readFile('./db/db.json', (error, output) => {
        if(error) { 
            throw error;//ensures a valid db is being read
        }
        let noteArray = JSON.parse(output);
        noteArray.push(requestObj.body);
        fs.writeFile('./db/db.json', JSON.stringify(noteArray), (error) => {
            if (error) {
                console.log(error);
            }
        });
    })
});

app.get('*', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/index.html'));
});//wildcard route for last

//just node server.js
app.listen(6358, () => {//gets server started
    console.log('Server started');
});