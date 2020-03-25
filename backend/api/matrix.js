const express = require('express')
const router = express.Router()
const Gordan = require('gordan');
const cho = require('cholesky')
const math = require('mathjs')

const {
    Matrix,
    inverse,
    solve,
    linearDependencies,
    QrDecomposition,
    LuDecomposition,
    CholeskyDecomposition,
} = require('ml-matrix');


// Ax = B
router.post('/cramer', (req, res) => {

    var matrix = req.body.matrixA;
    var freeTerms = req.body.matrixB;


    /**
     * Compute Cramer's Rule
     * @param  {array} matrix    x,y,z, etc. terms
     * @param  {array} freeTerms
     * @return {array}           solution for x,y,z, etc.
     */
    function cramersRule(matrix, freeTerms) {
        var det = detr(matrix),
            returnArray = [],
            i,
            tmpMatrix;

        for (i = 0; i < matrix[0].length; i++) {
            var tmpMatrix = insertInTerms(matrix, freeTerms, i)
            returnArray.push(detr(tmpMatrix) / det)
        }
        return returnArray;
    }

    /**
     * Inserts single dimensional array into
     * @param  {array} matrix multidimensional array to have ins inserted into
     * @param  {array} ins single dimensional array to be inserted vertically into matrix
     * @param  {array} at  zero based offset for ins to be inserted into matrix
     * @return {array}     New multidimensional array with ins replacing the at column in matrix
     */
    function insertInTerms(matrix, ins, at) {
        var tmpMatrix = clone(matrix),
            i;
        for (i = 0; i < matrix.length; i++) {
            tmpMatrix[i][at] = ins[i];
        }
        return tmpMatrix;
    }
    /**
     * Compute the determinate of a matrix.  No protection, assumes square matrix
     * function borrowed, and adapted from MIT Licensed numericjs library (www.numericjs.com)
     * @param  {array} m Input Matrix (multidimensional array)
     * @return {number}   result rounded to 2 decimal
     */
    function detr(m) {
        var ret = 1,
            k,
            A = clone(m),
            n = m[0].length,
            alpha;

        for (var j = 0; j < n - 1; j++) {
            k = j;
            for (i = j + 1; i < n; i++) { if (Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
            if (k !== j) {
                temp = A[k]; A[k] = A[j]; A[j] = temp;
                ret *= -1;
            }
            Aj = A[j];
            for (i = j + 1; i < n; i++) {
                Ai = A[i];
                alpha = Ai[j] / Aj[j];
                for (k = j + 1; k < n - 1; k += 2) {
                    k1 = k + 1;
                    Ai[k] -= Aj[k] * alpha;
                    Ai[k1] -= Aj[k1] * alpha;
                }
                if (k !== n) { Ai[k] -= Aj[k] * alpha; }
            }
            if (Aj[j] === 0) { return 0; }
            ret *= Aj[j];
        }
        return Math.round(ret * A[j][j] * 100) / 100;
    }

    /**
     * Clone two dimensional Array using ECMAScript 5 map function and EcmaScript 3 slice
     * @param  {array} m Input matrix (multidimensional array) to clone
     * @return {array}   New matrix copy
     */
    function clone(m) {
        return m.map(function (a) { return a.slice(); });
    }

    var result = cramersRule(matrix, freeTerms);
    console.log(result);
    res.json({
        result: result
    })
})

//Ax = B
router.post('/gausseli', (req, res) => {

    var abs = Math.abs;

    function array_fill(i, n, v) {
        var a = [];
        for (; i < n; i++) {
            a.push(v);
        }
        return a;
    }

    /**
     * Gaussian elimination
     * @param  array A matrix
     * @param  array x vector
     * @return array x solution vector
     */
    function gauss(A, x) {
        var i, k, j;
        // Just make a single matrix
        for (i = 0; i < A.length; i++) {
            A[i].push(x[i]);
        }
        var n = A.length;
        for (i = 0; i < n; i++) {
            // Search for maximum in this column
            var maxEl = abs(A[i][i]),
                maxRow = i;
            for (k = i + 1; k < n; k++) {
                if (abs(A[k][i]) > maxEl) {
                    maxEl = abs(A[k][i]);
                    maxRow = k;
                }
            }
            // Swap maximum row with current row (column by column)
            for (k = i; k < n + 1; k++) {
                var tmp = A[maxRow][k];
                A[maxRow][k] = A[i][k];
                A[i][k] = tmp;
            }
            // Make all rows below this one 0 in current column
            for (k = i + 1; k < n; k++) {
                var c = -A[k][i] / A[i][i];
                for (j = i; j < n + 1; j++) {
                    if (i === j) {
                        A[k][j] = 0;
                    } else {
                        A[k][j] += c * A[i][j];
                    }
                }
            }
        }
        // Solve equation Ax=b for an upper triangular matrix A
        x = array_fill(0, n, 0);
        for (i = n - 1; i > -1; i--) {
            x[i] = A[i][n] / A[i][i];
            for (k = i - 1; k > -1; k--) {
                A[k][n] -= A[k][i] * x[i];
            }
        }
        return x;
    }
    let result = gauss(req.body.matrixA, req.body.matrixB)

    console.log(result)
    res.json({
        result: result
    })

    //[[-2, 3, 1], [3, 4, -5], [1, -2, 1]] = [9,0,-4]
})

// Ax|B
router.post('/gordan', (req, res) => {
    let solvedMatrix = Gordan.solveByGaussJordan(req.body.matrixgordan);
    res.json({
        result: solvedMatrix
    })

    //[[-2, 3, 1,9], [3, 4, -5,0], [1, -2, 1,-4]]
})

router.post('/invert', (req, res) => {
    let A = new Matrix(req.body.matrixA)
    let B = new Matrix(req.body.matrixB)

    let invertA = inverse(A)
    let transposeB = B.transpose()
    console.log(transposeB)
    let result = invertA.mmul(transposeB)

    res.json({
        result: result
    })
})

router.post('/ludecom', (req, res) => {
    let gnum = req.body.size
    let resultL, resultU
    const LU = (a, b) => {
        var L = [], U = []
        for (var i = 0; i < gnum; i++) {
            L.push([]);
            U.push([]);

        }
        for (var i = 0; i < gnum; i++) {
            for (var j = 0; j < gnum; j++) {
                L[i].push(0);
                U[i].push(0);
            }
        }
        for (var j = 0; j < gnum; j++) {
            for (var i = 0; i < gnum; i++) {
                if (i >= j) {
                    if (i == j) {
                        U[i][j] = 1
                    }
                    L[i][j] = L[i][j] + a[i][j]
                    for (var k = 0; k < j; k++) {
                        L[i][j] = L[i][j] - (L[i][k] * U[k][j])
                        console.log("L L[" + i + "][" + j + "] =" + L[1][0])
                    }
                } else {
                    U[i][j] = U[i][j] + a[i][j]

                    for (var k = 0; k < i; k++) {
                        U[i][j] = U[i][j] - (L[i][k] * U[k][j])
                    }
                    U[i][j] = U[i][j] / L[i][i]
                }
            }
        }
        var y = []
        var x = []
        for (var i = 0; i < gnum; i++) {
            y.push(0);
            x.push(0)
        }
        resultL = L
        resultU = U
        console.log(L);
        console.log(U);
        for (var i = 0; i < gnum; i++) {
            y[i] += b[i]
            for (var j = 0; j <= i; j++) {
                if (i == j) {
                    y[i] = y[i] / L[i][j]
                } else {
                    y[i] -= y[j] * L[i][j]
                }
            }
        }
        for (var i = (gnum - 1); i >= 0; i--) {
            x[i] += y[i]
            for (var j = i; j < gnum; j++) {
                if (i == j) {
                    x[i] = x[i] / U[i][j]
                } else {
                    x[i] -= x[j] * U[i][j]
                }
            }
        }
        return x
    }
    let result = LU(req.body.matrixA, req.body.matrixB)
    res.json({
        result: result,
        L: resultL,
        U: resultU
    })
})
router.post('/chol', (req, res) => {
    let L = cho(req.body.matrixA)

    res.json({
        result: L
    })
})


router.post('/jacobi', (req, res) => {
    let Ir = []
    let arrayofX = []
    let err = []
    let ArrayofObj = []
    let size = req.body.size

    for (let i = 0; i < size; i++) {
        let iteration
        let x = []
        let obj = { key: i + 1, x }
        ArrayofObj.push(obj)
    }


    const Jacobi_Ireration = (a, b, x) => {
        var n = a.length;
        var xold = [];
        var temp = [];
        var check = [];
        var checkT;
        var Iteration = 1;
        for (i = 0; i < n; i++) {
            temp.push(0.0);
            check.push(0.0);
            xold.push(0.0);
        }
        do {
            checkT = false;
            for (i = 0; i < n; i++) {
                temp[i] = b[i];
                for (j = 0; j < n; j++) {
                    if (i != j) {
                        temp[i] = temp[i] - a[i][j] * x[j];
                    }
                }
                temp[i] = temp[i] / a[i][i];
            }
            xold = x.slice();
            x = temp.slice();
            for (i = 0; i < n; i++) {
                check[i] = Math.abs((x[i] - xold[i]) / x[i]);
                if (check[i] > 0.00001) {
                    checkT = true;
                }
            }
            if (Iteration == 1) {
                checkT = true;
            }
            for (i = 0; i < parseInt(n) * 2 + 1; i++) {
                if (i == 0) {
                    Ir.push(Iteration)
                } else if (i < parseInt(n) + 1) {
                    arrayofX.push(i,parseFloat(x[i - 1]).toPrecision(8))
                } else {
                    err.push(parseFloat(check[i - n - 1]).toPrecision(4))
                }
            }
            Iteration++;
        } while (checkT && Iteration < 100)
    }

    Jacobi_Ireration(req.body.matrixA, req.body.matrixB, req.body.init)

    for(let i= 0 ;i<size;i++){
        ArrayofObj[i].x.push(req.body.init[i].toString())
    }


    console.log(ArrayofObj)


    let f = 0
    while (f < arrayofX.length) {
        for (let j = 1; j <= size; j++) {
            if (arrayofX[f] == j) {
                ArrayofObj[j-1].x.push(arrayofX[f+1])
            }
        }
        f++
    }


    res.json({
        iteration: Ir,
        x: ArrayofObj,
        xerr: err
    })
})

router.post('/conju', (req, res) => {

    let a = req.body.matrixA
    let b = req.body.matrixB
    let x = req.body.init
    let result
    let size = req.body.size
    let ArrayofObj = []

    for (let i = 0; i < size; i++) {
        let iteration
        let x = []
        let obj = { key: i + 1, x }
        ArrayofObj.push(obj)
    }


    let ArrayofIteration = []
    let ArrayofX = []
    let ArrayofErr = []

    const Conjugate_Gradient = (a, b, x) => {
        var n = a.length;
        var m = parseInt(n) + 1;

        var r = math.subtract(math.multiply(a, x), b);
        var d = math.multiply(-1, r);

        var ramda;
        var alpha;
        var check = parseFloat(0.000000);

        var Iteration = 1;
        do {
            ramda = math.multiply(-1, math.divide(
                math.multiply(math.transpose(d), r),
                math.multiply(math.multiply(math.transpose(d), a), d)));
            x = math.add(math.multiply(ramda, d), x);
            r = math.subtract(math.multiply(a, x), b);
            check = math.sqrt(math.multiply(math.transpose(r), r)).toFixed(8);

            var temp1 = check;
            var temp2 = x;

            for (i = 0; i <= parseInt(n) + 1; i++) {
                if (i == 0) {
                    ArrayofIteration.push(Iteration)
                } else if (i == parseInt(n) + 1) {
                    ArrayofErr.push(parseFloat(temp1).toPrecision(8))

                } else {
                    ArrayofX.push(i, parseFloat(temp2[i - 1]).toPrecision(8))
                }
            }
            Iteration++;

            alpha = math.divide(
                math.multiply(math.multiply(math.transpose(r), a), d),
                math.multiply(math.multiply(math.transpose(d), a), d));
            d = math.subtract(math.multiply(alpha, d), r);
            console.log(check);
        } while (check > 0.00001 && Iteration < 100)
        console.log(x);
        result = x
    }

    Conjugate_Gradient(a, b, x)

    for(let i= 0 ;i<size;i++){
        ArrayofObj[i].x.push(req.body.init[i].toString())
    }


  

    let f = 0
    while (f < ArrayofX.length) {
        for (let j = 1; j <= size; j++) {
            if (ArrayofX[f] == j) {
                ArrayofObj[j-1].x.push(ArrayofX[f+1])
            }
        }
        f++
    }

    console.log(ArrayofObj)
    res.json({
        iteration: ArrayofIteration,
        x: ArrayofObj,
        err: ArrayofErr,
        result: result
    })
})

router.post('/seidel', (req, res) => {
    let a = req.body.matrixA
    let b = req.body.matrixB
    let c = [...req.body.init]
    let size = req.body.size
    let result
    let ArrayofObj = []

    for (let i = 0; i < size; i++) {
        let iteration
        let x = []
        let obj = { key: i + 1, x }
        ArrayofObj.push(obj)
    }


    let ArrayofIteration = []
    let ArrayofX = []
    let ArrayofErr = []
    const Gauss_Seidel_Iteration = (a, b, x) => {
        var n = a.length;
        var xold = [];
        var check = [];
        var checkT;
        var Iteration = 1;
        for (i = 0; i < n; i++) {
            check.push(0.0);
            xold.push(0.0);
        }
        do {
            checkT = false;
            //คำนวน
            for (i = 0; i < n; i++) {
                x[i] = b[i];
                for (j = 0; j < n; j++) {
                    if (i != j) {
                        x[i] = x[i] - a[i][j] * x[j];
                    }
                }
                x[i] = x[i] / a[i][i];
            }
            //ตรวจค่าทีละตัว
            for (i = 0; i < n; i++) {
                console.log(x[i] - xold[i]);
                check[i] = Math.abs((x[i] - xold[i]) / x[i]);
                if (check[i] > 0.00001) {
                    checkT = true;
                }
            }

            xold = x.slice();
            //รอบแรก
            if (Iteration == 1) {
                checkT = true;
            }

            for (i = 0; i < parseInt(n) * 2 + 1; i++) {
                if (i == 0) {
                    ArrayofIteration.push(Iteration)
                } else if (i < parseInt(n) + 1) {
                    ArrayofX.push(i, parseFloat(x[i - 1]).toPrecision(8))
                } else {
                    ArrayofErr.push(i, parseFloat(check[i - n - 1]).toPrecision(4))
                }
            }
            Iteration++;

        } while (checkT && Iteration < 100)
        result = x
    }

    Gauss_Seidel_Iteration(a, b, c)

    for(let i= 0 ;i<size;i++){
        console.log(req.body.init[i].toString())
        ArrayofObj[i].x.push(req.body.init[i].toString())
    }
    console.log(ArrayofObj)



    let f = 0
    while (f < ArrayofX.length) {
        for (let j = 1; j <= size; j++) {
            if (ArrayofX[f] == j) {
                ArrayofObj[j-1].x.push(ArrayofX[f+1])
            }
        }
        f++
    }


    res.json({
        iteration: ArrayofIteration,
        x: ArrayofObj,
        err: ArrayofErr,
        result: result
    })

})


module.exports = router