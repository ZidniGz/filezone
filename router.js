const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const monk = require('monk');

const db = monk('mongodb+srv://caliph71:clph1122@cluster0.e1ccz.mongodb.net/myFirstDatabase');

router.use(bodyParser.json());

router.use((req, res, next) => {
    req.db = db;
    next();
});

// Mendapatkan semua data
router.get('/', (req, res) => {
    const collection = req.db.get('data');
    collection.find({}, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});

// Mendapatkan data berdasarkan ID
router.get('/:id', (req, res) => {
    const collection = req.db.get('data');
    collection.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});

// Menambah data baru
router.post('/', (req, res) => {
    const collection = req.db.get('data');
    const newData = req.body;
    collection.insert(newData, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});

// Mengupdate data berdasarkan ID
router.put('/:id', (req, res) => {
    const collection = req.db.get('data');
    collection.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { returnNewDocument: true }, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});

// Menghapus data berdasarkan ID
router.delete('/:id', (req, res) => {
    const collection = req.db.get('data');
    collection.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});

module.exports = router;
