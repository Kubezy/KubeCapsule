var express = require('express')
var cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
var bodyParser = require('body-parser')

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET

var app = express()

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*',
}));

app.use(bodyParser.json())

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
