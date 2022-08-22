const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https');
const path = require('path');
const dotenv = require('dotenv');
const { Strategy } = require('passport-google-oauth20');
const passport = require('passport');
const { session } = require('passport');

dotenv.config();

const PORT = 3000;

const config = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback' 
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.callbackURL
}

const serverOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true;

    if(!isLoggedIn) {
        return res.status(401).json({ error: 'You must log in!' });
    }

    next()
}

function verifyCallback(accessToke, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile)
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

const app = express();

app.use(helmet());
app.use(passport.initialize());

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}));

app.get('/auth/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/',
        successRedirect: '/secret',
        session: false
    }),
    () => {
        console.log('Google called us back!');
    }
);

app.get('/auth/logout', (req, res) => {});

app.get('/', (_ ,res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/secret', checkLoggedIn, (_, res) => {
    return res.send('Your personal secret is 401');
});

https.createServer(serverOptions, app)
    .listen(PORT, () => {
        console.log(`Listening on port https://localhost:${PORT}...`); 
    });