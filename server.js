const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const api = require('./server/routes/api')

const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/expensesDB'", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/', api)

const port = 3200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})