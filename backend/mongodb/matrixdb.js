const express = require('express')
const router = express.Router()
const cramer = require('../models/Matrix/cramermodel')
const chol = require('../models/Matrix/cholmodel')
const conju = require('../models/Matrix/conjumodel')
const gausseli = require('../models/Matrix/gausselimodel')
const jordan = require('../models/Matrix/gaussjordanmodel')
const invert = require('../models/Matrix/invertmodel')
const jacobi = require('../models/Matrix/jacobimodel')
const lu = require('../models/Matrix/lumodel')
const seidel = require('../models/Matrix/seidelmodel')

//Push Cramer
router.post('/pushcramer', (req, res) => {
    const insert = new cramer(req.body)
    console.log('Insert Cramer')
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

router.post('/getallcramer',async (req,res)=>{
    console.log('Get All Cramer in Mongo ')
    try {
        const find = await cramer.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//Chol 

router.post('/pushchol', (req, res) => {
    const insert = new chol(req.body)
    console.log('Insert chol')
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

router.post('/getallchol',async (req,res)=>{
    console.log('Get All chol in Mongo ')
    try {
        const find = await chol.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//Conju

router.post('/pushconju', (req, res) => {
    const insert = new conju(req.body)
    console.log('Insert conju')
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

router.post('/getallconju',async (req,res)=>{
    console.log('Get All conju in Mongo ')
    try {
        const find = await conju.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//Gausseli


router.post('/pushgausseli', (req, res) => {
    const insert = new gausseli(req.body)
    console.log('Insert gausseli')
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

router.post('/getallgausseli',async (req,res)=>{
    console.log('Get All gausseli in Mongo ')
    try {
        const find = await gausseli.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})


//jordan

router.post('/pushjordan', (req, res) => {
    const insert = new jordan(req.body)
    console.log('Insert jordan')
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

router.post('/getalljordan',async (req,res)=>{
    console.log('Get All jordan in Mongo ')
    try {
        const find = await jordan.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//invert 

router.post('/pushinvert', (req, res) => {
    const insert = new invert(req.body)
    console.log('Insert invert')
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

router.post('/getallinvert',async (req,res)=>{
    console.log('Get All invert in Mongo ')
    try {
        const find = await invert.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//jacobi 

router.post('/pushjacobi', (req, res) => {
    const insert = new jacobi(req.body)
    console.log('Insert jacobi')
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

router.post('/getalljacobi',async (req,res)=>{
    console.log('Get All jacobi in Mongo ')
    try {
        const find = await jacobi.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//Lu


router.post('/pushlu', (req, res) => {
    const insert = new lu(req.body)
    console.log('Insert lu')
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

router.post('/getalllu',async (req,res)=>{
    console.log('Get All lu in Mongo ')
    try {
        const find = await lu.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//seidel

router.post('/pushseidel', (req, res) => {
    const insert = new seidel(req.body)
    console.log('Insert seidel')
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

router.post('/getallseidel',async (req,res)=>{
    console.log('Get All seidel in Mongo ')
    try {
        const find = await seidel.find()
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