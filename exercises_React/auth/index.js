const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const User = require('./user')


mongoose.connect('mongodb+srv://louis-rbn:admin123@cluster0.oyqdl0d.mongodb.net/auth?retryWrites=true&w=majority')

const app = express()

app.use(express.json())   // express tiene que utilizar 'express.json()' para recibir los datos que estamos enviando en formato JSON

app.post('/register', async (req, res) => {
    const { body } = req    // capturamos el 'body' de la request
    console.log({ body })

    try {
        const isUser = await User.findOne({ email: body.email })    // buscamos el user en la BD por el email
        if (isUser){
            return res.status(403).send('Usuario ya existente')    // si el email con el que intenta registrarse ya existe retorna un mensaje
        }
        const salt = await bcrypt.genSalt()     // genera el código salt
        const hashed = await bcrypt.hash(body.password, salt)   // encriptamos la contraseña con el salt
        const user = await User.create({ email: body.email, password: hashed, salt })
        res.send({ _id: user._id })     // la api retorna el id

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

app.listen(3000, () => {
    console.log('listening in port 3000')
})

