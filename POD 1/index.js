const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

const arr = [];
const valuesToAdd = 200;
const linealSearchValue = Math.floor(valuesToAdd * Math.random()) + 1;

let arrjs = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

const port = process.env.PORT || 3000;

let _valuesToAdd = valuesToAdd;
while (_valuesToAdd) {
    arr.push(_valuesToAdd);
    _valuesToAdd--;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

server.listen(3000, '10.0.0.6' || 'localhost', function () {
    console.log('Algoritmo de busqueda lineal y por saltos ' + process.pid + ' Iniciada...')
});

app.get('/', (req, res) => {
    res.send('<h1>POD #1 - ALGORITMO DE BUSQUEDA LINEAL Y POR SALTOS</h1>' +
        '<h2><hr>LUIS ARTURO RODRIGUEZ ==> 1-18-0858<hr>');
});

app.get('/linearSearch', (req, res) => {
    
    const respuesta = linearSearch(arr, linealSearchValue);
    
    if (respuesta === -1) {
        res.send('<h2><hr>ALGORITMO DE BUSQUEDA LINEAL <hr></h2>El VALOR BUSCADO ES: ' + linealSearchValue +
            '<br>ESTE VALOR NO SE ENCUENTRA EN LA LISTA DE DATOS SIGUIENTE<br><hr>' + arr.toString());
    } else {
        res.send('<h2><hr>ALGORITMO DE BUSQUEDA LINEAL <hr></h2>El VALOR BUSCADO ES: ' + linealSearchValue +
            '<br>Y FUE ENCONTRADO EN LA POSICION: ' + respuesta +
            '<br><hr>EN EL ARRAY QUE FUE BUSCADO ES:<br>' + arr.toString());
    }
});

app.get('/jumpSearch', (req, res) => {
    
    const respuesta = jumpSearch(arrjs, 55);
    
    if (respuesta === -1) {
        res.send('<h2><hr>ALGORITMO DE BUSQUEDA POR SALTOS <hr></h2>El VALOR BUSCADO ES: 55 <br>ESTE VALOR NO SE ENCUENTRA EN LA LISTA DE DATOS SIGUIENTE<br><hr>'
            + arrjs.toString());
    } else {
        res.send('<h2><hr>ALGORITMO DE BUSQUEDA POR SALTOS <hr></h2>EL VALOR BUSCADO ES: ' + arrjs[respuesta] +
            '<br>Y FUE ENCONTRADO EN LA POSICION: ' + respuesta +
            '<br><hr>EN EL ARRAY QUE FUE BUSCADO FUE:<br>' + arrjs.toString());
    }
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

function linearSearch(array, seekElement) {
    const foundIndices = [];

    array.forEach((element, index) => {
        if (element === seekElement) {
            foundIndices.push(index);
        }
    });

    return foundIndices;
}

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
