const express = require('express')
const router = express.Router()
const lagrange = require('../models/Interpolation/lagrangemodel')
const poly = require('../models/Interpolation/polymodel')
const spline = require('../models/Interpolation/splinemodel')

//lagrange
router.post('/pushlagrange', (req, res) => {
    const insert = new lagrange(req.body)
    console.log('Insert lagrange')
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

router.post('/getalllagrange',async (req,res)=>{
    console.log('Get All lagrange in Mongo ')
    try {
        const find = await lagrange.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})

//poly
router.post('/pushpoly', (req, res) => {
    const insert = new poly(req.body)
    console.log('Insert poly')
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

router.post('/getallpoly',async (req,res)=>{
    console.log('Get All poly in Mongo ')
    try {
        const find = await poly.find()
        res.json({
            data:find
        })
    } catch (error) {
        res.json({
            err:error
        })
    }
})


//spline
router.post('/pushspline', (req, res) => {
    const insert = new spline(req.body)
    console.log('Insert spline')
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

router.post('/getallspline',async (req,res)=>{
    console.log('Get All spline in Mongo ')
    try {
        const find = await spline.find()
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