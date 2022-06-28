const express = require('express')  // require importa dependencias. 'express' nombre de la librería
const mongoose = require('mongoose')    // mongoose
const user = require('./user.controller')
const app = express()   // -app- se crea partir de la ejecución de la función 'express'
const port = 3000

app.use(express.json())     /* Esto toma todas las peticiones que vengan en un formato JSON, los transforma en un objeto JavaScript y los asigna a la propiedad body     
                             Esto es un MIDDLEWARE: se ejecuta cuando realizamos cualquier tipo de peticion en la app, o sea siempre
                                    se utilizan generalmente para realizar Validaciones, como en este caso; sacar los datos que vienen
                                    a través de una peticion POST e inyectarlos en la propiedad de 'body' de nuestro objeto 'request'
                           */
mongoose.connect('mongodb+srv://louis-rbn:admin123@cluster0.oyqdl0d.mongodb.net/miapp?retryWrites=true&w=majority')


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
