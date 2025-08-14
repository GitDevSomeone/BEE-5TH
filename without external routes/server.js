const express = require('express')
const fs = require('fs')
const path = require('path')
const jwt = require("jsonwebtoken")
// const session = require('express-session')
const app = express()

app.use(express.static("public"))
app.use(express.json()) // middle ware for parsing json data
app.use(express.urlencoded()) // for parsing form data 
// app.use(session({
//     secret: "secretkey",
//     saveUninitialized: false,
//     resave: false,
//     rolling: true
// }))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'signup.html'))
})

app.post('/signup', (req, res) => {
    try {
        fs.readFile("./users.json", 'utf-8', (err, data) => {
            data = JSON.parse(data)
            let userFound = data.find(user => user.username == req.body.username)
            if (userFound) {
                res.json({message: "username already exist"})
            } else {
                data.push(req.body)
                fs.writeFile("./users.json", JSON.stringify(data), (err) => {
                    if (!err) {
                        res.json({message: "user created"})
                    }
                })
            }

        })
    } catch (error) {
        console.log(error)
        res.json({message: "server error"})
    }
})

app.post('/login', (req, res)=>{
    try {
        fs.readFile('./users.json', 'utf-8', (err, data)=>{
            data = JSON.parse(data)
            let userFound = data.find(user => user.username == req.body.username)
            if(userFound){
                if(userFound.password == req.body.password){
                    req.session.isLoggedIn = true;
                    res.redirect("/home")
                }else{
                    res.send('invalid password')
                }
            }else{
                res.send('invalid username')
            }


        })
    } catch (error) {
        
    }
})



app.get('/home', (req, res)=>{
    if(req.session.isLoggedIn == true){
        res.sendFile(path.join(__dirname , 'pages' , "home.html"))
    }else{
        res.sendFile(path.join(__dirname , 'pages' , "login.html"))
    }
   
})

app.listen(3000, () => {
    console.log('server started...')
})