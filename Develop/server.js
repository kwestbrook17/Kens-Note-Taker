const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT =  3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while reading the database.' });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while reading the database.' });
    }
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = Date.now().toString(); 
    notes.push(newNote);
    fs.writeFile('db.json', JSON.stringify(notes), (err) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while writing to the database.' });
      }
      res.json(newNote);
    });
  });
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
