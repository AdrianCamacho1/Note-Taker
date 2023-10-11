const express = require('express');
const path = require('path');
const fs = require('fs');
// const api = require('./routes/api')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));


app.get('/notes', (req, res)=> res.sendFile(path.join(__dirname, '/public/notes.html')));

// Send all the requests that begin with /api to the index.js in the routes folder
app.get('/api/notes', (req, res)=> res.sendFile(path.join(__dirname, '/db/db.json')));
console.log('hello')


app.get('/api/id', (req,res)=> {
  let Saved = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  res.json(Saved[Number(req.params.id)]);
});

app.post('/api/notes', (req, res)=> {
  let Saved =JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let NewNote = req.body;
  let NoteId = Saved.length.toString();
  NewNote.id = NoteId;
  Saved.push(NewNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(Saved));
  res.json(Saved);
});
app.get('*', (req,res)=> res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);