const express = require('express')
const router = express.Router()
const math = require('mathjs')

router.post('/trap', (req, res) => {

    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    let A = req.body.A
    let B = req.body.B
    let h = (B - A) / 2
    let ans = h * (func(A) + func(B))

    res.json({
        result: ans
    })
})

router.post('/comtrap', (req, res) => {

    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    let A = req.body.A
    let B = req.body.B
    let h = (B - A) / req.body.n
    let sum = 0
    for (let i = 1; i < req.body.n; i++) {
        sum += func(parseFloat(A) + (h * i))
    }
    let ans = h / 2 * (func(A) + (2 * sum) + func(B))

    res.json({
        result: ans
    })
})

router.post('/sim13', (req, res) => {

    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        var check = 0
        var a = String(expression)
        for (i = 0; i < a.length; i++) {
            if (a[i] == 'y')
                check = 1
        }
        let scope
        if (check == 1) {
            scope = { y: parseFloat(X) };
            console.log(check);
        }
        if (check == 0) {
            scope = { x: parseFloat(X) };
        }
        return expr.eval(scope);
    }


    let A = req.body.A
    let B = req.body.B
    let h = (B - A) / req.body.n
    let m = (parseFloat(A) + h);
    let sum = 0
    for (let i = 1; i < req.body.n; i++) {
        sum += func(parseFloat(A) + (h * i))
    }
    let ans = (h * (func(A) + (4 * func(m)) + func(B))) / 3

    res.json({
        result: ans
    })
})


router.post('/comsim13', (req, res) => {

    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    let A = req.body.A
    let B = req.body.B
    let h = (B - A) / req.body.n
    let m=(parseFloat(A)+h);
    var sumev = 0;
    var sumod = 0;
    console.log(m);
    for (var i = 1; i < req.body.n; i++) {
        if (i % 2 == 0) {
            sumev += func(parseFloat(A) + h * i);
        } else {
            sumod += func(parseFloat(A) + h * i);
        }
    }
    var ans = (h * (func(A) + (4 * sumod) + (2 * sumev) + func(B))) / 3
    console.log(sumod);
    console.log(sumev);
    console.log(B);
    res.json({
        result: ans
    })
})

router.post('/sim38', (req, res) => {

    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    let A = req.body.A
    let B = req.body.B
    let h = (B - A) / req.body.n
    var ans= ((3*h)*(func(A)+(3*func(A)+(h*1))+(3*func(A)+(h*2))+func(B)))/8

    
    res.json({
        result: ans
    })
})

module.exports = router