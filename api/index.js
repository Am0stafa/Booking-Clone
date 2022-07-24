const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoute')


const app = express()
dotenv.config();

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

app.use('/auth',authRoute)

app.listen(8800,() => console.log("running"))