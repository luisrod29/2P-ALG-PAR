var express = require('express');
var router = express.Router();
let arrjs = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

const arr = [];
const valuesToAdd = 200;
const linealSearchValue = Math.floor(valuesToAdd * Math.random()) + 1;

let _valuesToAdd = valuesToAdd;
while (_valuesToAdd) {
    arr.push(_valuesToAdd);
    _valuesToAdd--;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'POD #1 - ALGORITMO DE BUSQUEDA LINEAL Y POR SALTOS' });
});

router.get('/linealSearch', function(req, res, next) {
  const respuesta = linearSearch(arr, linealSearchValue);

  if (respuesta === -1) {
    res.render('jump', { title: 'ALGORITMO DE BUSQUEDA LINEAL', Resultado: respuesta, Num: linealSearchValue, Arr:  arr.toString()});
  } else {
    res.render('jump', { title: 'ALGORITMO DE BUSQUEDA LINEAL', Resultado: respuesta, Num: linealSearchValue, Arr:  arr.toString()});
  }
});

router.get('/jumpSearch', function(req, res, next) {
  const respuesta = jumpSearch(arrjs, 55);

  if (respuesta === -1) {
    res.render('jump', { title: 'ALGORITMO DE BUSQUEDA POR SALTOS', Num: '55', Arr:  arrjs.toString()});
  } else {
    res.render('jump', { title: 'ALGORITMO DE BUSQUEDA POR SALTOS', Resultado: respuesta, Num: '55', Arr:  arrjs.toString()});
  }
});

module.exports = router;

function jumpSearch(array, seekElement) {
    const arraySize = array.length;

    let step = Math.sqrt(arraySize);
    
    let prev = 0;
    while (array[Math.min(step, arraySize)-1] < seekElement) {
        prev = step;
        step += Math.sqrt(arraySize);
        if (prev >= arraySize) {
            return -1;
        }
    }

    while (array[prev] < seekElement) {
        prev++;

        if (prev == Math.min(step, arraySize)) {
            return -1;
        }
    }

    if (array[prev] == seekElement) {
        return prev;
    }

    return -1;
}

function linearSearch(array, seekElement) {
    const foundIndices = [];

    array.forEach((element, index) => {
        if (element === seekElement) {
            foundIndices.push(index);
        }
    });

    return foundIndices;
}