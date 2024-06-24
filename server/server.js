var express = require('express')
var cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
var bodyParser = require('body-parser')
require('dotenv').config()

const { verificationCode, sendEmailVerification, sendSummary } = require('./utils.js')

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET

var app = express()

const allowedOrigins = ['https://kubecapsule.com', 'https://kubecapsule.com/message', 'https://www.kubecapsule.com', 'https://www.kubecapsule.com/message', 'http://localhost:3000', 'http://localhost:3000/message'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.json())

const pool = require('./database')

app.get('/emailconfirm/:email', async function (req, res) {
    const email = req.params.email;
    const code = verificationCode();
    sendEmailVerification(email, code);
    res.send({ code: code });
})

app.get('/addmessage', async function (req, res) {
    const { fullName, email, secondary_email, duration, message, share_public } = req.query;
    
    const query = 'INSERT INTO messages(email, duration, message, share_public, secondary_email) VALUES($1, $2, $3, $4, $5)';
    const values = [email, duration, message, share_public, secondary_email];

    try {
        await pool.query(query, values);
        sendSummary(email, { fullName, email, secondary_email, duration, message, share_public })
        if (secondary_email) {
           sendSummary(secondary_email, { fullName, email, secondary_email, duration, message, share_public })
        }
        res.status(200).json({ success: true, message: 'Message added successfully' });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

app.get('/emailcount/:email', async function (req, res) {
    const email = req.params.email;
    const query = 'SELECT COUNT(*) AS count FROM messages WHERE email = $1';
    const values = [email];

    try {
        const result = await pool.query(query, values);
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
