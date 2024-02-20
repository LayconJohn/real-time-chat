const passport = require("passport");
const GitHubStrategy = require('passport-github2').Strategy;
const express = require('express');

import Users from "../models/userModel.js";
import bcrypt from "bcrypt";



const router = express.Router()
require("dotenv").config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await Users.findOne({ username: profile.username });
    if (!user) {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({ username: profile.username, email: profile.email, password: hashPassword });
    } 
    return done(null, profile);
  }
));

router("/", passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/callback',
    passport.authenticate('github', { failureRedirect: '/auth/github/error' })
);

router.get('/sucess', async (req, res) => {
    const userInfo = {
        username: req.session.passport.user.username,
        avatarImage: req.session.passport.user.passport.avatarImage,
        isAvatarImageSet: req.session.passport.user.passport.isAvatarImageSet
    }
    res.render('fb-github-sucess', { user: userInfo })
});

router.get('/error', (req, res) => res.send("Error logging with Github"));

router.get('/signout', (req, res) => {
    try {
        req.session.destroy((err) => {
            console.log("Session destroyed")
        })
        res.render("auth")
    } catch (error) {
        res.status(400).send({ message: 'Failed to sign out fb user' })
    }
});





