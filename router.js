const express = require('express');
const app = express.Router();

const monk = require('monk');

const db = monk('mongodb+srv://caliph71:clph1122@cluster0.e1ccz.mongodb.net/myFirstDatabase'); // Ganti dengan URL MongoDB Anda


app.use((req, res, next) => {
    req.db = db;
    next();
});

// Mendapatkan semua data
app.get('/', (req, res) => {
    const collection = req.db.get('data');
    collection.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

// Mendapatkan data berdasarkan ID
app.get('/:id', (req, res) => {
    const collection = req.db.get('data');
    collection.findOne({ _id: req.params.id }, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

// Menambah data baru
app.post('/', (req, res) => {
    const collection = req.db.get('data');
    const newData = req.body; // Pastikan newData tidak memiliki properti _id
    collection.insert(newData, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});


// Mengupdate data berdasarkan ID
app.put('/:id', (req, res) => {
    const collection = req.db.get('data');
    collection.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { returnNewDocument: true }, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

// Menghapus data berdasarkan ID
app.delete('/:id', (req, res) => {
    const collection = req.db.get('data');
    collection.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

let router = app;

module.exports = router;
