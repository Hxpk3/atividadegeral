const express = require('express')
const app = express()
const consign = require('consign')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

consign()
    .include('MVC/controller')
    .into(app)

app.listen(3000, () => console.log('Online server at port 3000'))
module.exports = app