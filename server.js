//Christian Yanez
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const uuid = require('uuid');
//Middleware section of app.use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//API routes

app.get('/notes', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/notes.html'));
});//sends to the public folder.

app.get('/api/notes', (requestObj, responseObj) => {
    fs.readFile('./db/db.json', (error, output) => {
        if (error) {
            throw error;
        }
        const notes = JSON.parse(output);//gets the notes
        responseObj.json(notes);
    });
});

app.post('/api/notes', (requestObj, responseObj) => {
    fs.readFile('./db/db.json', (error, output) => {
        if (error) {
            throw error;//ensures a valid db is being read
        }
        const id = uuid.v4();//generates id, needs this to be able to click on a note to pull it up again
        const noteText = requestObj.body.text;
        const noteTitle = requestObj.body.title;
        const newNote = {//newNote Object with id
            id: id,
            text: noteText,
            title: noteTitle
        };
        let noteArray = JSON.parse(output);
        noteArray.push(newNote);
        
        fs.writeFile('./db/db.json', JSON.stringify(noteArray), (error) => {//writes notes in db.json
            if (error) {
                console.log(error);
            }
            responseObj.json({//client needs a response to let the notes load without refreshing
                message: 'Note Saved'
            });
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