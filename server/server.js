var express = require('express')
var cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
var bodyParser = require('body-parser')
require('dotenv').config()

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET

var app = express()

app.use(cors());

app.use(bodyParser.json())

const pool = require('./database')

app.get('/addmessage', async function (req, res) {
    const { email, secondary_email, duration, message, share_public } = req.query;
    
    // Insert data into the PostgreSQL database
    const query = 'INSERT INTO messages(email, duration, message, share_public, secondary_email) VALUES($1, $2, $3, $4, $5)';
    const values = [email, duration, message, share_public, secondary_email];

    try {
        await pool.query(query, values);
    } catch (err) {
        console.error(err.stack);
    }
});

app.get('/emailcount/:email', async function (req, res) {
    const email = req.params.email;
    // Count count of a specific email
    const query = 'SELECT COUNT(*) AS count FROM messages WHERE email = $1';
    const values = [email];

    try {
        const result = await pool.query(query, values);
        // Send the count of the specific email back to the client
        if (result.rows.length > 0) {
            res.send({email: email, count: parseInt(result.rows[0].count)});
        } else {
            res.send({email: email, count: 0});
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Error querying the database');
    }
});


app.get('/getAccessToken', async function (req, res) {
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        res.json(data)
    }).catch(error => {
        res.status(400).json({ error: error.toString() });
    })
});

app.get('/getUserData', async function (req, res) {
    const authHeader = req.get("Authorization");

    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": authHeader
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch(error => {
        res.status(400).json({ error: error.toString() });
    });
});

app.listen(4000, function () {
    console.log("CORS Server Running")
})
