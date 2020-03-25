const express = require('express')
const router = express.Router()
const math = require('mathjs')

router.post('/fw', (req, res) => {
    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    let x = req.body.x;
    let h = req.body.h;
    let f1, f2, f3, f4, e1, e2, e3, e4

    f1 = (func(parseFloat(x) + (h * 1)) - func(parseFloat(x))) / h
    f2 = (func(parseFloat(x) + (h * 2)) - (2 * func(parseFloat(x))) + func(parseFloat(x))) / (h * h)
    f3 = (func(parseFloat(x) + (h * 3)) - (3 * func(parseFloat(x) + (h * 2))) + (3 * func(parseFloat(x) + (h * 1))) - func(parseFloat(x))) / (h * h * h)
    f4 = (func(parseFloat(x) + (h * 4)) - (4 * func(parseFloat(x) + (h * 3))) + (6 * func(parseFloat(x) + (h * 2))) - (4 * func(parseFloat(x) + (h * 1))) + func(parseFloat(x))) / (h * h * h * h)
    e1 = Math.abs(func(x) - f1) / func(x)
    e2 = Math.abs(func(x) - f2) / func(x)
    e3 = Math.abs(func(x) - f3) / func(x)
    e4 = Math.abs(func(x) - f4) / func(x)

    res.json({
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        e1: e1,
        e2: e2,
        e3: e3,
        e4: e4
    })
})

router.post('/bw', (req, res) => {
    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    let x = req.body.x;
    let h = req.body.h;
    let f1, f2, f3, f4, e1, e2, e3, e4
    let m = (x - ((h) * 1))

    f1 = (func(parseFloat(x) + (h * 1)) - func(parseFloat(x))) / h
    f2 = (func(parseFloat(x) + (h * 2)) - (2 * func(parseFloat(x))) + func(parseFloat(x))) / (h * h)
    f3 = (func(parseFloat(x) + (h * 3)) - (3 * func(parseFloat(x) + (h * 2))) + (3 * func(parseFloat(x) + (h * 1))) - func(parseFloat(x))) / (h * h * h)
    f4 = (func(parseFloat(x) + (h * 4)) - (4 * func(parseFloat(x) + (h * 3))) + (6 * func(parseFloat(x) + (h * 2))) - (4 * func(parseFloat(x) + (h * 1))) + func(parseFloat(x))) / (h * h * h * h)
    e1 = Math.abs(func(x) - f1) / func(x)
    e2 = Math.abs(func(x) - f2) / func(x)
    e3 = Math.abs(func(x) - f3) / func(x)
    e4 = Math.abs(func(x) - f4) / func(x)


    res.json({
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        e1: e1,
        e2: e2,
        e3: e3,
        e4: e4
    })
})

router.post('/oh2', (req, res) => {
    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    let x = req.body.x;
    let h = req.body.h;
    let f1, f2, f3, f4, e1, e2, e3, e4


    f1 = (func(parseFloat(x) + (h * 1)) - func(parseFloat(x) - (h * 1))) / (2 * h)
    f2 = (func(parseFloat(x) + (h * 1)) - (2 * func(parseFloat(x))) + func(parseFloat(x) - (h * 1))) / (h * h)
    f3 = (func(parseFloat(x) + (h * 2)) - (2 * func(parseFloat(x) + (h * 1))) + (2 * func(parseFloat(x) - (h * 1))) - func(parseFloat(x) - (h * 2))) / (2 * (h * h * h))
    f4 = (func(parseFloat(x) + (h * 2)) - (4 * func(parseFloat(x) + (h * 1))) + (6 * func(parseFloat(x))) - (4 * func(parseFloat(x) - (h * 1))) + func(parseFloat(x) - (h * 2))) / (h * h * h * h)
    e1 = Math.abs(func(x) - f1) / func(x)
    e2 = Math.abs(func(x) - f2) / func(x)
    e3 = Math.abs(func(x) - f3) / func(x)
    e4 = Math.abs(func(x) - f4) / func(x)


    res.json({
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        e1: e1,
        e2: e2,
        e3: e3,
        e4: e4
    })
})


router.post('/oh4', (req, res) => {
    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    let x = req.body.x;
    let h = req.body.h;
    let f1, f2, f3, f4, e1, e2, e3, e4


    f1 = (-func(parseFloat(x) + (h * 2)) + (8 * func(parseFloat(x) + (h * 1))) - (8 * func(parseFloat(x) - (h * 1)) - func(parseFloat(x) - (h * 2)))) / (12 * h)
    f2 = (-func(parseFloat(x) + (h * 2)) + (16 * func(parseFloat(x) + (h * 1))) - (30 * func(parseFloat(x))) + (16 * func(parseFloat(x) - (h * 1))) - func(parseFloat(x) - (h * 2))) / (12 * h * h)
    f3 = (-func(parseFloat(x) + (h * 3)) + (8 * func(parseFloat(x) + (h * 2))) - (13 * func(parseFloat(x) + (h * 1))) + (13 * func(parseFloat(x) - (h * 1))) - (8 * func(parseFloat(x) - (h * 2))) + func(parseFloat(x) - (h * 3))) / (8 * h * h * h)
    f4 = (-func(parseFloat(x) + (h * 3)) + (12 * func(parseFloat(x) + (h * 2))) - (39 * func(parseFloat(x) + (h * 1))) + (56 * func(parseFloat(x))) - (39 * func(parseFloat(x) - (h * 1))) + (12 * func(parseFloat(x) - (h * 2))) - func(parseFloat(x) - (h * 3))) / (6 * h * h * h * h)
    e1 = Math.abs(func(x) - f1) / func(x)
    e2 = Math.abs(func(x) - f2) / func(x)
    e3 = Math.abs(func(x) - f3) / func(x)
    e4 = Math.abs(func(x) - f4) / func(x)


    res.json({
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        e1: e1,
        e2: e2,
        e3: e3,
        e4: e4
    })
})


router.post('/fwoh2', (req, res) => {
    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    let x = req.body.x;
    let h = req.body.h;
    let f1, f2, f3, f4, e1, e2, e3, e4

    f1 = (- func((x * 1) + (h * 2)) + (4 * func((x * 1) + (h * 1))) - (3 * func(x))) / (h * 2);
    f2 = (- func((x * 1) + (h * 3)) + (4 * func((x * 1) + (h * 2))) - (5 * func((x * 1) + (h * 1))) + (2 * func(x))) / (h * h);
    f3 = (- (3 * func((x * 1) + (h * 4))) + (14 * func((x * 1) + (h * 3))) - (24 * func((x * 1) + (h * 2))) + (18 * func((x * 1) + (h * 1))) - (5 * func(x))) / (2 * (h * h * h));
    f4 = (- (2 * func((x * 1) + (h * 5))) + (11 * func((x * 1) + (h * 4))) - (24 * func((x * 1) + (h * 3))) + (26 * func((x * 1) + (h * 2))) - (14 * func((x * 1) + (h * 1))) + (3 * func(x))) / (h * h * h * h);
    e1 = Math.abs(func(x) - f1) / func(x)
    e2 = Math.abs(func(x) - f2) / func(x)
    e3 = Math.abs(func(x) - f3) / func(x)
    e4 = Math.abs(func(x) - f4) / func(x)

    res.json({
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        e1: e1,
        e2: e2,
        e3: e3,
        e4: e4
    })
})

router.post('/bwoh2', (req, res) => {
    const func = (X) => {
        var expression = req.body.exp
        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    let x = req.body.x;
    let h = req.body.h;
    let f1, f2, f3, f4, e1, e2, e3, e4
    let m = (x - ((h) * 1))

    f1 = ((3 * func(x)) - (4 * func((x * 1) - (h * 1))) + func((x * 1) - (h * 2))) / (h * 2)
    f2 = ((2 * func(x)) - (5 * func((x * 1) - (h * 1))) + (4 * func((x * 1) - (h * 2))) - func(x * 1) - (h * 3)) / (h * h)
    f3 = (- (3 * func((x * 1) + (h * 4))) + (14 * func((x * 1) + (h * 3))) - (24 * func((x * 1) + (h * 2))) + (18 * func((x * 1) + (h * 1))) - (5 * func(x))) / (2 * (h * h * h));
    f4 = (- (2 * func((x * 1) + (h * 5))) + (11 * func((x * 1) + (h * 4))) - (24 * func((x * 1) + (h * 3))) + (26 * func((x * 1) + (h * 2))) - (14 * func((x * 1) + (h * 1))) + (3 * func(x))) / (h * h * h * h);
    e1 = Math.abs(func(x) - f1) / func(x)
    e2 = Math.abs(func(x) - f2) / func(x)
    e3 = Math.abs(func(x) - f3) / func(x)
    e4 = Math.abs(func(x) - f4) / func(x)

    res.json({
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        e1: e1,
        e2: e2,
        e3: e3,
        e4: e4
    })
})

router.post('/euler', (req, res) => {
    const func = (X, expression) => {

        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    const funcdif = (X, Y, expression) => {

        expr = math.compile(expression);
        let scope = { x: parseFloat(X), y: parseFloat(Y) };
        return expr.eval(scope);
    }

    var expression = req.body.exp;
    var diffexpression = req.body.diff;
    var startx = req.body.startx;
    var endx = req.body.endx;
    var y = req.body.y;
    var h = req.body.h;

    var e = 0, n = 0;
    var y = parseFloat(y);
    var h = parseFloat(h);
    var startx = parseFloat(startx);
    var currentx = startx;
    var realy

    // var arrayofCurx = []
    // var arrayofY = []
    // var arrayofRealY = []
    // var arrayofErr = []
    let result = []

    while (currentx <= endx) {
        n++;
        y = y + funcdif(currentx, y, diffexpression) * h
        realy = func(currentx, expression);
        e = Math.abs(realy - y);

        // arrayofCurx.push(currentx)
        // arrayofY.push(y)
        // arrayofRealY.push(realy)
        // arrayofErr.push(e)

        let obj = { currentx: currentx, y: y, realy: realy, e: e }

        result.push(obj)

        currentx = currentx + h;
    }
    res.json({
        result: result
    })
})


router.post('/heun', (req, res) => {

    const func = (X, expression) => {

        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    const funcdif = (X, Y, expression) => {

        expr = math.compile(expression);
        let scope = { x: parseFloat(X), y: parseFloat(Y) };
        return expr.eval(scope);
    }

    var expression = req.body.exp;
    var diffexpression = req.body.diff;
    var startx = req.body.startx;
    var endx = req.body.endx;
    var y = req.body.y;
    var h = req.body.h;

    var e = 0, n = 0;
    var y = parseFloat(y);
    var h = parseFloat(h);
    var startx = parseFloat(startx);
    var currentx = startx;
    var realy
    var y0 = 0

    // var arrayofCurx = []
    // var arrayofY0 = []
    // var arrayofY = []
    // var arrayofRealY = []
    // var arrayofErr = []
    let result = []

    while (currentx <= endx) {
        n++;
        y0 = y + funcdif(currentx, y, diffexpression) * h
        y = y + ((funcdif(currentx, y, diffexpression) + funcdif(currentx + h, y0, diffexpression)) / 2) * h
        realy = func(currentx + h, expression);
        e = Math.abs(realy - y);

        // arrayofCurx.push(currentx)
        // arrayofY.push(y)
        // arrayofY0.push(y0)
        // arrayofRealY.push(realy)
        // arrayofErr.push(e)


        let obj = { currentx: currentx, y0: y0, y: y, realy: realy, e: e }
        result.push(obj)

        currentx = currentx + h;
    }
    res.json({
        result: result
    })
})

router.post('/eulermodi', (req, res) => {
    const func = (X, expression) => {

        expr = math.compile(expression);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    const funcdif = (X, Y, expression) => {

        expr = math.compile(expression);
        let scope = { x: parseFloat(X), y: parseFloat(Y) };
        return expr.eval(scope);
    }

    var expression = req.body.exp;
    var diffexpression = req.body.diff;
    var startx = req.body.startx;
    var endx = req.body.endx;
    var y = req.body.y;
    var h = req.body.h;

    var e = 0, n = 0;
    var y = parseFloat(y);
    var h = parseFloat(h);
    var startx = parseFloat(startx);
    var currentx = startx;
    var realy
    var ytemp = 0;


    var arrayofCurx = []
    var arrayofY = []
    var arrayofRealY = []
    var arrayofErr = []
    let result = []

    while (currentx <= endx) {
        n++;
        ytemp = y + funcdif(currentx, y, diffexpression) * (h / 2);
        y = y + funcdif(currentx + (h / 2), ytemp, diffexpression) * h;
        realy = func(currentx + h, expression);
        e = Math.abs(realy - y);

        // arrayofCurx.push(currentx)
        // arrayofY.push(y)
        // arrayofRealY.push(realy)
        // arrayofErr.push(e)

        let obj = { currentx: currentx, y: y, realy: realy, e: e }

        result.push(obj)


        currentx = currentx + h;
    }
    res.json({
        result:result
    })
})


module.exports = router