var express = require('express')
var cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
var bodyParser = require('body-parser')
require('dotenv').config()

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET

var app = express()

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*',
}));

app.use(bodyParser.json())

const pool = require('./database')

app.get('/addmessage', async function (req, res) {
    const { email, duration, message, share_public } = req.query;
    
    // Insert data into the PostgreSQL database
    const query = 'INSERT INTO messages(email, duration, message, share_public) VALUES($1, $2, $3, $4)';
    const values = [email, duration, message, share_public];

    try {
        await pool.query(query, values);
    } catch (err) {
        console.error(err.stack);
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
    })
});

app.get('/getUserData', async function (req, res) {
    const authHeader = req.get("Authorization");
    console.log(authHeader)
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
