const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/dbConfig');

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Route to add a new user
router.post('/users', async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required.' });
    }

    try {
        const pool = await poolPromise;
        
        // Check if the username already exists
        const userCheck = await pool.request()
            .input('username', username)
            .query('SELECT * FROM Users WHERE name = @username');
        
        if (userCheck.recordset.length > 0) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // Check if the email already exists
        const emailCheck = await pool.request()
            .input('email', email)
            .query('SELECT * FROM Users WHERE email = @email');
        
        if (emailCheck.recordset.length > 0) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // Insert the new user into the database
        await pool.request()
            .input('username', username)
            .input('email', email)
            .query('INSERT INTO Users (name, email) VALUES (@username, @email)');
        
        res.status(200).json({ username, message: 'User added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert user into database.' });
    }
});

module.exports = router;
