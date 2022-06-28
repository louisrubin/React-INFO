const express = require('express')  // require importa dependencias. 'express' nombre de la librería
const app = express()   // -app- se crea partir de la ejecución de la función 'express'
const port = 3000


//              request, response
app.get('/',    (req,     res) => {
    res.status(200).send('Chanchito feliz')
})

app.post('/', (req, res) => {
    res.status(201).send('creando chanchito')
})

app.put('/:id', (req, res) => {
    res.sendStatus(204)
})

app.patch('/:id', (req, res) => {
    res.sendStatus(204)
})

app.delete('/:id', (req, res) => {
    res.sendStatus(204)
})



app.listen(port, () => {
    console.log('arrancando la app.')
})