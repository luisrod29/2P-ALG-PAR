const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

const arr = [];
const valuesToAdd = 200;
const binarySearchValue = Math.floor(valuesToAdd * Math.random()) + 1;

const port = process.env.PORT || 3002;
app.set('port', port);


for (let i = 1; i < valuesToAdd; i++){
    arr.push(Math.floor(valuesToAdd * Math.random()) + 1);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.disable('x-powered-by');


server.listen(3002, '10.0.0.6' || 'localhost', function () {
    console.log('Algoritmo de busqueda binaria y metodo burbuja ' + process.pid + ' Iniciada...')
});

app.get('/', (req, res) => {
    res.send('<h1>POD #2 - ALGORITMO DE BUSQUEDA BINARIA Y METODO BURBUJA</h1>' +
        '<h2><hr>LUIS ARTURO RODRIGUEZ ==> 1-18-0858<hr>');
});

app.get('/binarySearch', (req, res) => {
    const arraybs = BubbleSort()
    const respuesta = binarySearch(arraybs, binarySearchValue);
    
    if (respuesta === -1) {
        res.send('<h2><hr>ALGORITMO DE BUSQUEDA BINARIA Y METODO BURBUJA<hr></h2>El VALOR BUSCADO ES: ' + binarySearchValue +
            '<br>ESTE VALOR NO SE ENCUENTRA EN LA LISTA DE DATOS SIGUIENTE<br><hr>' + arraybs.toString());
    } else {
        res.send('<h2><hr>ALGORITMO DE BUSQUEDA BINARIA Y METODO BURBUJA<hr></h2>'
            + 'El VALOR BUSCADO ES: ' + binarySearchValue
            + '<br>Y FUE ENCONTRADO EN LA POSICION: ' + (respuesta)
            + '<hr>EL ALGORITMO SIN ORDENAR ERA: ' + arr.toString()
            + '<br>LUEGO DEL METODO BURBUJA QUEDO:<br>' + arraybs.toString());
    }
});

function binarySearch(array, seekElement) {
    let startIndex = 0;
    let endIndex = array.length - 1;

    while (startIndex <= endIndex) {
        const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

        if (array[middleIndex] == seekElement) {
            return middleIndex;
        }

        if (array[middleIndex] < seekElement) {
            startIndex = middleIndex + 1;
        } else {
            endIndex = middleIndex - 1;
        }
    }

    return -1;

}

function BubbleSort() {

    let swapped = false;
    const array = [...arr];

    for (let i = 1; i < array.length; i++) {
        swapped = false;

        for (let j = 0; j < array.length -1; j += 1) {
            if (array[j + 1] < array[j]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                swapped = true;
            }
        }

        if (!swapped) {
            return array;
        }
        
    }

    return array
}