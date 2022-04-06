const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const ProductRoute = require('./api/routes/product')
const facultyRoute = require('./api/routes/faculty')
const UserRoute = require('./api/routes/user')

mongoose.connect('mongodb://localhost:27017/restful_api_learn')

mongoose.connection.on('err',err=>{
    console.log('connection failed')
})
mongoose.connection.on('connected',connected=>{
    console.log('connected with database.')
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/product',ProductRoute)
app.use('/faculty',facultyRoute)
app.use('/user',UserRoute)


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })

});

module.exports = app;