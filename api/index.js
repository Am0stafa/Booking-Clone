const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoute')
const hotelsRoute = require('./routes/hotelsRoute')
const roomsRoutes = require('./routes/roomsRoutes')
const usersRoute = require('./routes/usersRoute')
const cookieParser =require('cookie-parser') 

const app = express()
dotenv.config();
app.use(express.json())
app.use(cookieParser())
const DB= process.env.mongo

mongoose.connect(DB , {
  useNewUrlParser:true,
  useUnifiedTopology: true
}).then(con => {
  console.log("DB is connection successful");
}).catch(err=>{
  console.log(err)
  server.close(()=>{
    process.exit(1)
  })
});

app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/rooms',roomsRoutes)
app.use('/api/hotels',hotelsRoute)

app.listen(8800,() => console.log("running"))