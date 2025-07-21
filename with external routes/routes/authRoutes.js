const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname , "../view", "signup.html"))
})

router.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname , "../view", "login.html"))
})

router.get('/home', (req, res)=>{
     res.sendFile(path.join(__dirname , "../view", "home.html"))
})

router.post("/signup", (req, res)=>{
    try {
        fs.readFile(path.join(__dirname , "../users.json"), 'utf-8', (err , data)=>{
            data = JSON.parse(data)
            let userFound = data.find(ele => ele.username == req.body.username)
            if(userFound){
                res.json({messgage : "username already taken"})
            }else{
                data.push(req.body)
                fs.writeFile(path.join(__dirname , "../users.json"), JSON.stringify(data), (err)=>{
                    if(!err){
                        res.json({message: "user created..."})
                    }
                } )
            }
        })
    } catch (error) {
        console.log(error)
        res.json({message: "server error"})   
    }
})

router.post('/login', (req, res)=>{
    try {
        fs.readFile(path.join(__dirname , "../users.json"), 'utf-8', (err, data)=>{
             data = JSON.parse(data)
            let userFound = data.find(ele => ele.username == req.body.username)
            if(userFound){
                if(userFound.password == req.body.password){
                    res.redirect('/home')
                }else{
                    res.json({messgage : "invalid password"})
                }
            }else{
                res.redirect("/")
            }
        })
    } catch (error) {
        
    }
})

module.exports = router