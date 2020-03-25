const express = require('express')
const router = express.Router()
const math = require('mathjs')
const regression = require('regression')

router.post('/reg',(req,res)=>{
    const result = regression.linear(req.body.linear);
    let exp = result.string.split('=')

    console.log(exp)
    const func = (X) => {
        let expression = exp[1]
        expr = math.compile(expression);
        let scope = { x: X };
        return expr.eval(scope);
    }

    let value = func(req.body.x)
    res.json({
        result:result,
        value:value
    })
})

router.post('/multireg',(req,res)=>{
    const result = regression.polynomial(req.body.poly);
    console.log(result)
    res.json({
        result:result
    })
})

module.exports = router