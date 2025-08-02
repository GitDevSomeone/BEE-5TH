const express = require('express')
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoutes')
const session = require('express-session')
const app = express()

app.use(session({
    secret: "this is the sescret key that will be used to sign the session-id",
    resave: false,
    saveUninitialized: false
}))



app.use(express.static("public"))
app.use(express.static("./uploads/profile"))
app.use(express.urlencoded())
app.use(express.json())

app.use('/', authRoute)
app.use('/user', userRoute)
app.use('/admin', adminRoute)

app.listen(3000, ()=>{
    console.log("server started...")
})


