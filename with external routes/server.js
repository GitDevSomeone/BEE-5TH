const express = require('express')
const authRoute = require('./routes/authRoutes')
const app = express()


app.use(express.static("public"))
app.use(express.urlencoded())
app.use(express.json())

app.use('/', authRoute)

app.listen(3000, ()=>{
    console.log("server started...")
})


