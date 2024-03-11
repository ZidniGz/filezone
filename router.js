const express = require('express');
const router = express.Router();

const monk = require('monk');

const db = monk('mongodb+srv://caliph71:clph1122@cluster0.e1ccz.mongodb.net/myFirstDatabase'); // Ganti dengan URL MongoDB Anda


const collection = db.get('crud-api'); 

// Middleware untuk router ini
router.use((req, res, next) => {
    console.log('Middleware for dataRouter');
    next();
});

// Routes untuk router ini
router.get('/', async(req, res) => {
    const data = await collection.find();
    res.json(data);
});

router.get('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const data = await collection.findOne({ _id: id });
    res.json(data);
});


router.post('/', async (req, res) => {
    const newData = req.body;
    await collection.insert(newData);
    res.status(201).send();
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    await collection.update({ _id: id }, { $set: updatedData });
    res.send();
});

// Delete data
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await collection.remove({ _id: id });
    res.send();
});


module.exports = router;
