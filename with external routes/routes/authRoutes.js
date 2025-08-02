const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const upload = require("../utils/multerConfig")
const { v4: uuidv4 } = require('uuid');

router.get("/", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../view", "signup.html"));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

router.get("/login", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../view", "login.html"));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

router.post("/signup", upload.single("profile_picture"),(req, res) => {
    try {
        fs.readFile(path.join(__dirname, "../users.json"), 'utf-8', (err, data) => {
            try {
                data = JSON.parse(data)
                let userFound = data.find(ele => ele.username == req.body.username);
                if (userFound) {
                    res.redirect('/signup')
                } else {
                    const userObject = {
                        ...req.body,
                        profilePicture: req.file.filename,
                        id: uuidv4()
                    }
                    data.push(userObject);
                    fs.writeFile(path.join(__dirname, "../users.json"), JSON.stringify(data), (err) => {
                        if (!err) {
                            res.redirect('/user/home')
                        }
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "server error" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

router.post('/login', (req, res) => {
    try {
        fs.readFile(path.join(__dirname, "../users.json"), 'utf-8', (err, data) => {
            try {
                data = JSON.parse(data);
                let userFound = data.find(ele => ele.username == req.body.username);
                if (userFound) {
                    if (userFound.password == req.body.password) {
                        req.session.isLoggedIn = true
                        res.cookie("userphoto", userFound.profilePicture)
                        res.redirect('/user/home');
                    } else {
                        res.redirect("/")
                        // res.json({ messgage: "invalid password" });
                    }
                } else {
                    res.redirect("/");
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "server error" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router