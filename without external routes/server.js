const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
app.use(express.static("public"))
app.use(express.json()) // middle ware for parsing json data
app.use(express.urlencoded()) // for parsing form data 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'signup.html'))
})

app.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname , 'pages' , "home.html"))
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

app.listen(3000, () => {
    console.log('server started...')
})