const express = require('express')
const app  = express()
const cors = require("cors")
const roe = require('./api/roe')
const matrix = require('./api/matrix')
const inter = require('./api/interpolation')
const mongo = require('mongoose')
const derv = require('./api/derivative')
const sqr = require('./api/leastsqr')
const ing = require('./api/integration')
const bodyparser = require('body-parser')
const roedb = require('./mongodb/roedb')
const matrixdb =require('./mongodb/matrixdb')
const dervdb = require('./mongodb/derivativedb')
const ingdb = require('./mongodb/integrationdb')
const interdb = require('./mongodb/interpolationdb')
const regdb = require('./mongodb/regdb')

require('dotenv').config()
app.use(bodyparser.json())
app.use(cors());
app.use('/inter',inter)
app.use('/roe',roe)
app.use('/derv',derv)
app.use('/sqr',sqr)
app.use('/matrix',matrix)
app.use('/integration',ing)
app.use('/roedb',roedb)
app.use('/matrixdb',matrixdb)
app.use('/dervdb',dervdb)
app.use('/ingdb',ingdb)
app.use('/interdb',interdb)
app.use('/regdb',regdb)

mongo.connect(process.env.DB_MONGO,{useNewUrlParser:true,userMongoClient:true},()=>{
    console.log("connected")
})

app.listen(3000)