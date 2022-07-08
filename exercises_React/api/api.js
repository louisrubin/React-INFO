const express = require('express')  // require importa dependencias. 'express' nombre de la librería
const mongoose = require('mongoose')    // mongoose
const user = require('./user.controller')
const app = express()   // -app- se crea partir de la ejecución de la función 'express'
const { Auth, isAuthenticated } = require('./auth.controller')
const port = 3000

app.use(express.json())     /* Esto toma todas las peticiones que vengan en un formato JSON, los transforma en un objeto JavaScript y los asigna a la propiedad body     
                             Esto es un MIDDLEWARE: se ejecuta cuando realizamos cualquier tipo de peticion en la app, o sea siempre
                                    se utilizan generalmente para realizar Validaciones, como en este caso; sacar los datos que vienen
                                    a través de una peticion POST e inyectarlos en la propiedad de 'body' de nuestro objeto 'request'
                           */
mongoose.connect(  process.env.MONGODB_CLUSTER_0  +  '&w=majority'  )


app.get('/users', isAuthenticated, user.list)    
app.post('/users', isAuthenticated, user.create)
app.get('/users/:id', isAuthenticated, user.get)
app.put('/users/:id', isAuthenticated, user.update)
app.patch('/users/:id', isAuthenticated, user.update)
app.delete('/users/:id', isAuthenticated, user.destroy)


app.post('/login', Auth.login)
app.post('/register', Auth.register)


// use() es para llamar a un MIDDLEWARE de, en este caso express
app.use(express.static('app'))     // con el método static() le indicamos a -express- que tiene que ir a buscar TODOS los archivos dentro de la carpeta '' 

app.get('/', (req, res) => {
    //  __dirname es ruta en la que se está ejecutando el script api.js
    res.sendFile(`${__dirname}/index.html`) // empty HTML file 
})

app.get('*', (req, res) => {
    //  '*' en caso de intentar ingresar a una url que no existe ejecuta esto
    res.status(404).send('Page not found')
})

app.listen(port, () => {
    console.log('Arrancando la app. PORT: ', port)
})
