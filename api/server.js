// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const server = express();
server.use(express.json());


// Get
// testing and endpoint
server.get('/hiya', (req, res) => {
    res.status(200).json({message: "Hiya! We're a go for this proejct"})
});

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message: "Cannot find users"});
    }
});

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({
                message: "User does not exist"
            })
        } else {
            res.status(200).json(user);
        }
    }
    catch (err) {
        res.status(500).json({message: `Cannot find use with id ${req.params.id}`});
    }
});

// Delete
server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const deleteUser = await User.remove(id);

        if (!deleteUser) {
            res.status(404).json({message: `User with ID ${id} does not exist, and thus can't be deleted`})
        } else {
            res.status(200).json(user)
        }   
    }
    catch (err) {
        res.status(500).json({message: "Error deleting user"})
    }
})

// Post
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body;
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const createdUser = await User.insert({ name, bio });
            res.status(201).json(createdUser)
        }
    }
    catch (err) {
        res.status(500).json({message: "Error creating new user"})
    }
})

// Put
server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, bio } = req.body;
        if (!name || !bio) {
            res.status(400).json({ 
                message: "Please provide name and bio for the user" 
            })
        } else {
            const updatedUser = await User.update(id, { name, bio });

            if (!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json(updatedUser);
            }
        }
    }
    catch (err) {
        res.status(500).json({message: "The user information could not be modified"})
    }
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
