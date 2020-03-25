const express = require('express')
const router = express.Router()
const interpolatingPolynomial = require('interpolating-polynomial')
const Spline = require('cubic-spline');

router.post('/poly', (req, res) => {
    let f = interpolatingPolynomial(req.body.poly)
    let ref = req.body.poly
    let i = 0
    let j, temp = 0
    let round_old = []
    let round_new = []
    let arrayofC = []
    let counter = 1
    let backward = req.body.poly.length - 1
    while (i < req.body.poly.length) {
        round_new = []
        for (j = 0; j < backward; j++) {
            if (i == 0) {
                temp = ((ref[j + 1][1] - ref[j][1]) / (ref[j + 1][0] - ref[j][0]))
                console.log(`(${ref[j + 1][1]} - ${ref[j][1]}) / (${ref[j + 1][0]} - ${ref[j][0]})`)
                round_old.push(temp)
            } else {
                console.log(counter)
                temp = ((round_old[j + 1] - round_old[j]) / (ref[j + counter][0] - ref[j][0]))
                if (counter == 2) {
                    console.log(temp)
                }
                console.log(`(${round_old[j + 1]} - ${round_old[j]}) / (${ref[j + counter][0]} - ${ref[j][0]})`)
                round_new.push(temp)
            }
        }
        if (i == 0 && round_old[0] != null ) {
            arrayofC.push(round_old[0])
        } else if(round_new[0] != null){
            arrayofC.push(round_new[0])
            round_old = round_new
        }
        backward--;
        counter++;
        i++;
    }
    console.log(arrayofC)
    res.json({
        result: arrayofC
    })

})

router.post('/lagrange', (req, res) => {
    let f = interpolatingPolynomial(req.body.poly)
    let ref = req.body.poly
    let i, temp, j
    let L = []
    for (i = 0; i < ref.length; i++) {
        temp = 1
        for (j = 0; j < ref.length; j++) {
            if (ref[j][0] != ref[i][0]) {
                temp = temp * ((ref[j][0] - req.body.x) / (ref[j][0] - ref[i][0]))
                console.log(`(${ref[j][0]})- (${req.body.x}) / (${ref[j][0]}) - (${ref[i][0]})`)
            }
        }
        temp = temp * f(ref[i][0])
        console.log(temp)
        L.push(temp)
    }
    console.log(L)

    res.json({
        resultL: L,
        resultX: f(req.body.x)
    })

})

router.post('/spline', (req, res) => {
    const xs = req.body.x;
    const ys = req.body.fx;

    // new a Spline object
    const spline = new Spline(xs, ys);

    // get Y at arbitrary X
    console.log(spline.at(req.body.xmark));

    // interpolate a line at a higher resolution
    // for (let i = 0; i < 50; i++) {
    //     console.log(spline.at(i * 0.1));
    // }

    res.json({
        result:spline.at(req.body.xmark)
    })
})


module.exports = router