const express = require('express')
const router = express.Router()
const math = require('mathjs')


router.post('/bisection', (req, res) => {
    const findxm = (xl, xr) => {
        return (xl + xr) / 2
    }
    const func = (X) => {
        let expression = req.body.equation
        expr = math.compile(expression);
        let scope = { x: X };
        return expr.eval(scope);
    }
    //array
    let result = []
    //variable
    let xL = parseFloat(req.body.xL)
    let xR = parseFloat(req.body.xR)
    let x_Old = xR
    let xm = 0
    let count = 0
    let err = 100
    if (func(xL) * func(xR) < 0) {
        do {
            xm = findxm(xL, xR)
            err = Math.abs((xm - x_Old) / xm).toFixed(8);
            count++
            let obj = { iteration: count, xL: xL, xM: xm, xR: xR, Error: err }
            result.push(obj)
            if (func(xm) * func(xL) > 0) {
                xL = xm;
            }
            else {
                xR = xm;
            }
            x_Old = xm
        } while (err > 0.0001)
    }
    console.log('Bisection')
    res.json({
        result: result
    })
})

router.post('/false', (req, res) => {
    const findxm = (xl, xr) => {
        return (xl * func(xr) - xr * func(xl)) / (func(xr) - func(xl));
    }
    const func = (X) => {
        let expression = req.body.equation
        expr = math.compile(expression);
        let scope = { x: X };
        return expr.eval(scope);
    }
    //array
    let result = []
    //variable
    let xL = parseFloat(req.body.xL)
    let xR = parseFloat(req.body.xR)
    let x_Old = xR
    let xm = 0
    let count = 0
    let err = 100
    do {
        xm = findxm(xL, xR)
        err = Math.abs((xm - x_Old) / xm).toFixed(8);
        count++
        let obj = { iteration: count, xL: xL, xR: xR, xM: xm, Error: err }
        result.push(obj)
        if (func(xm) * func(xL) > 0) {
            xL = xm;
        }
        else {
            xR = xm;
        }
        x_Old = xm
    } while (err > 0.0001)
    res.json({
        result: result
    })
})

router.post('/onepoint', (req, res) => {
    const func = (X) => {
        let expression = req.body.equation
        expr = math.compile(expression);
        let scope = { x: X };
        return expr.eval(scope);
    }
    //array
    let result = []
    //variable
    let x_new = parseFloat(req.body.xnew)
    let x_old = 0
    let err = 100
    let count = 0
    do {
        x_new = func(x_new);
        err = Math.abs((x_new - x_old) / x_new).toFixed(8);
        count++

        let obj = { iteration: count, xold: x_old, xnew: x_new, err: err }
        result.push(obj)
        x_old = x_new
    } while (err > 0.00001 && count <= 40)

    res.json({
        result: result
    })
})

router.post('/newton', (req, res) => {
    const func = (X) => {
        let expression = req.body.equation
        expr = math.compile(expression);
        let scope = { x: X };
        return expr.eval(scope);
    }
    const funcdif = (X) => {
        let expression = req.body.equation
        expr = math.derivative(expression, 'x');
        let scope = { x: X };
        return expr.eval(scope);
    }
    let result = []
    //array
    //variable
    let x_new = parseFloat(req.body.xnew)
    let x_old = 0
    let err = 100
    let count = 0
    do {
        x_new = x_old - (func(x_old) / funcdif(x_old));
        err = Math.abs((x_new - x_old) / x_new).toFixed(8);
        count++

        let obj = { iteration: count, xold: x_old, xnew: x_new, err: err }
        result.push(obj)
        x_old = x_new
    } while (err > 0.00001 && count <= 40)

    res.json({
        result: result
    })
})

router.post('/secant', (req, res) => {
    const func = (X) => {
        let expression = req.body.equation
        expr = math.compile(expression);
        let scope = { x: X };
        return expr.eval(scope);
    }
    let result = []
    //array

    //variable
    let x0 = parseFloat(req.body.x0)
    let x1 = parseFloat(req.body.x1)
    let x_new = 0
    let err = 100
    let count = 0

    do {
        x_new = x1 - ((func(x1) * (x1 - x0)) / (func(x1) - func(x0)));
        err = Math.abs((x_new - x1) / x_new).toFixed(8);
        count++

        let obj = { iteration: count, x0: x0, x1: x1, xnew: x_new, err: err }
        result.push(obj)
        x0 = x1
        x1 = x_new
    } while (err > 0.00001 && count <= 40)

    res.json({
        result: result
    })

})
module.exports = router