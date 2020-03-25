const express = require('express')
const router = express.Router()
const reg = require('../models/Regression/regmodel')
const multireg = require('../models/Regression/multiregmodel')

//reg
router.post('/pushreg', (req, res) => {
    const insert = new reg(req.body)
    console.log('Insert reg')
    insert.save()
    .then(()=>{
        res.json({
            result:'insert success'
        })
    })
    .catch(err => {
        res.json({
            error:err
        })
    })
})

router.post('/getallreg',async (req,res)=>{
    console.log('Get All reg in Mongo ')
    try {
        const find = await reg.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//multireg
router.post('/pushmultireg', (req, res) => {
    const insert = new multireg(req.body)
    console.log('Insert multireg')
    insert.save()
    .then(()=>{
        res.json({
            result:'insert success'
        })
    })
    .catch(err => {
        res.json({
            error:err
        })
    })
})

router.post('/getallmultireg',async (req,res)=>{
    console.log('Get All multireg in Mongo ')
    try {
        const find = await multireg.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})



module.exports = router