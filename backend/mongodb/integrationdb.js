const express = require('express')
const router = express.Router()
const comsim13 = require('../models/Intregration/comsim13model')
const comtrap = require('../models/Intregration/comtrapmodel')
const sim13 = require('../models/Intregration/sim13model')
const sim38 = require('../models/Intregration/sim38model')
const trapmodel = require('../models/Intregration/trapmodel')

//comsim13
router.post('/pushcomsim13', (req, res) => {
    const insert = new comsim13(req.body)
    console.log('Insert comsim13')
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

router.post('/getallcomsim13',async (req,res)=>{
    console.log('Get All comsim13 in Mongo ')
    try {
        const find = await comsim13.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//comtrap
router.post('/pushcomtrap', (req, res) => {
    const insert = new comtrap(req.body)
    console.log('Insert comtrap')
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

router.post('/getallcomtrap',async (req,res)=>{
    console.log('Get All comtrap in Mongo ')
    try {
        const find = await comtrap.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//sim13
router.post('/pushsim13', (req, res) => {
    const insert = new sim13(req.body)
    console.log('Insert sim13')
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

router.post('/getallsim13',async (req,res)=>{
    console.log('Get All sim13 in Mongo ')
    try {
        const find = await sim13.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//sim38
router.post('/pushsim38', (req, res) => {
    const insert = new sim38(req.body)
    console.log('Insert sim38')
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

router.post('/getallsim38',async (req,res)=>{
    console.log('Get All sim38 in Mongo ')
    try {
        const find = await sim38.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//trapmodel
router.post('/pushtrapmodel', (req, res) => {
    const insert = new trapmodel(req.body)
    console.log('Insert trapmodel')
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

router.post('/getalltrapmodel',async (req,res)=>{
    console.log('Get All trap in Mongo ')
    try {
        const find = await trapmodel.find()
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