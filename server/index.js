const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./module/Users');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/crud')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.listen(5175, () => {
    console.log('Server is running on port 5175');
});


app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.post('/createuser', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});


app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id) 
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/deleteUserById/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)    
.then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

    