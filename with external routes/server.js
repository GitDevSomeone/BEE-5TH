const express = require('express')
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoutes')
const app = express()


app.use(express.static("public"))
app.use(express.urlencoded())
app.use(express.json())

app.use('/', authRoute)
app.use('/user', userRoute)
app.use('/admin', adminRoute)

app.listen(3000, ()=>{
    console.log("server started...")
})


