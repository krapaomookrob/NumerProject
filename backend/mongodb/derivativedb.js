const express = require('express')
const router = express.Router()
const bw = require('../models/Derivative/bwmodel')
const bwoh2 = require('../models/Derivative/bwoh2model')
const euler = require('../models/Derivative/euler')
const eulermodi = require('../models/Derivative/eulermodimodel')
const fw = require('../models/Derivative/fwmodel')
const fwoh2 = require('../models/Derivative/fwoh2model')
const heun = require('../models/Derivative/heunmodel')
const oh2 = require('../models/Derivative/oh2model')
const oh4 = require('../models/Derivative/oh4model')

//bw
router.post('/pushbw', (req, res) => {
    const insert = new bw(req.body)
    console.log('Insert bw')
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

router.post('/getallbw',async (req,res)=>{
    console.log('Get All bw in Mongo ')
    try {
        const find = await bw.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//bwoh2

router.post('/pushbwoh2', (req, res) => {
    const insert = new bwoh2(req.body)
    console.log('Insert bwoh2')
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

router.post('/getallbwoh2',async (req,res)=>{
    console.log('Get All bwoh2 in Mongo ')
    try {
        const find = await bwoh2.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})


//euler

router.post('/pusheuler', (req, res) => {
    const insert = new euler(req.body)
    console.log('Insert euler')
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

router.post('/getalleuler',async (req,res)=>{
    console.log('Get All euler in Mongo ')
    try {
        const find = await euler.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//eulermodi

router.post('/pusheulermodi', (req, res) => {
    const insert = new eulermodi(req.body)
    console.log('Insert eulermodi')
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

router.post('/getalleulermodi',async (req,res)=>{
    console.log('Get All eulermodi in Mongo ')
    try {
        const find = await eulermodi.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//fw

router.post('/pushfw', (req, res) => {
    const insert = new fw(req.body)
    console.log('Insert fw')
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

router.post('/getallfw',async (req,res)=>{
    console.log('Get All fw in Mongo ')
    try {
        const find = await fw.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//fwoh2

router.post('/pushfwoh2', (req, res) => {
    const insert = new fwoh2(req.body)
    console.log('Insert fwoh2')
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

router.post('/getallfwoh2',async (req,res)=>{
    console.log('Get All fwoh2 in Mongo ')
    try {
        const find = await fwoh2.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//heun

router.post('/pushheun', (req, res) => {
    const insert = new heun(req.body)
    console.log('Insert heun')
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

router.post('/getallheun',async (req,res)=>{
    console.log('Get All heun in Mongo ')
    try {
        const find = await heun.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//oh2

router.post('/pushoh2', (req, res) => {
    const insert = new oh2(req.body)
    console.log('Insert oh2')
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

router.post('/getalloh2',async (req,res)=>{
    console.log('Get All oh2 in Mongo ')
    try {
        const find = await oh2.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//oh4

router.post('/pushoh4', (req, res) => {
    const insert = new oh4(req.body)
    console.log('Insert oh4')
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

router.post('/getalloh4',async (req,res)=>{
    console.log('Get All oh4 in Mongo ')
    try {
        const find = await oh4.find()
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