const express = require('express')
const router = express.Router()
const bisecmodel = require('../models/Root/bisectmodel')
const falsemodel = require('../models/Root/falsemodel')
const onepoint = require('../models/Root/onepointmodel')
const newton = require('../models/Root/newtonmodel')
const secant = require('../models/Root/secantmodel')



///Push Data to Mongo 
router.post('/pushbisect', (req, res) => {
    const insert = new bisecmodel({
        xl: req.body.xl,
        xr: req.body.xr,
        equation: req.body.equation,
        result: req.body.result
    })
    console.log('Insert Bisection')
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

router.post('/pushfalse',(req,res)=>{
    const insert = new falsemodel({
        xl: req.body.xl,
        xr: req.body.xr,
        equation: req.body.equation,
        result: req.body.result
    })
    console.log('Insert Falsemodel')
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

router.post('/pushonepoint',(req,res)=>{
    const insert = new onepoint({
        xnew: req.body.xnew,
        equation: req.body.equation,
        result: req.body.result
    })
    console.log('Insert onepoint')
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

router.post('/pushnewton',(req,res)=>{
    const insert = new newton({
        xnew: req.body.xnew,
        equation: req.body.equation,
        result: req.body.result
    })
    console.log('Insert onepoint')
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

router.post('/pushsecant',(req,res)=>{
    const insert = new secant({
        x0: req.body.x0,
        x1: req.body.x1,
        equation: req.body.equation,
        result: req.body.result
    })
    console.log('Insert onepoint')
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






////Get Data
router.post('/getallfalse',async (req,res)=>{
    console.log('Get All False in Mongo ')
    try {
        const find = await falsemodel.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})


router.post('/getallbisection',async (req,res)=>{
    console.log('Get All bisection in Mongo ')
    try {
        const find = await bisecmodel.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

router.post('/getallonepoint',async (req,res)=>{
    console.log('Get All Onepoint in Mongo ')
    try {
        const find = await onepoint.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

router.post('/getallnewton',async (req,res)=>{
    console.log('Get All newton in Mongo ')
    try {
        const find = await newton.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

router.post('/getallsecant',async (req,res)=>{
    console.log('Get All bisection in Mongo ')
    try {
        const find = await secant.find()
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