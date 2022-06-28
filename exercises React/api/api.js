const express = require('express')  // require importa dependencias. 'express' nombre de la librería
const user = require('./user.controller')
const app = express()   // -app- se crea partir de la ejecución de la función 'express'
const port = 3000


//              request, response
app.get('/', user.list)
app.post('/', user.create)
app.get('/:id', user.get)
app.put('/:id', user.update)
app.patch('/:id', user.update)
app.delete('/:id', user.destroy)

app.get('*', (req, res) => {
    res.status(404).send('Page not found')
})

app.listen(port, () => {
    console.log('arrancando la app.')
})
