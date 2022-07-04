const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const User = require('./user')


mongoose.connect('mongodb+srv://louis-rbn:admin123@cluster0.oyqdl0d.mongodb.net/auth?retryWrites=true&w=majority')

const app = express()

app.use(express.json())   // express tiene que utilizar 'express.json()' para recibir los datos que estamos enviando en formato JSON

const signToken = _id => {
    // encriptamos el ID a un JSON Web Token
    return jwt.sign({ _id }, 'mi-string-secreto')      // (el id que vamos a encriptar   ,   de que forma vamos a encriptar el JWT)
}

app.post('/register', async (req, res) => {
    // end-point   =>   Registro de usuario
    
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
        const signed = signToken(user._id)      // funcion signToken() que retorna un JSON Web Token
        res.status(201).send(signed) // status 201: un recurso fue creado con exito

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})


app.post('/login', async (req, res) => {
    // end-point   =>   Inicio de sesión
    
    const { body } = req

    try {
        const user = await User.findOne({ email: body.email})
        if (!user){
            // si no se encontró ningun user en BD
            res.status(403).send('Usuario y/o contraseña incorrecto')
        } else {
            //                    bcrypt.compare( string sin encriptar    ,  string encriptado )  =>  boolean
            const isMatch = await bcrypt.compare(    body.password        ,    user.password)
            if (isMatch){
                const signed = signToken(user._id)      // funcion signToken() que retorna un JSON Web Token
                res.status(200).send(signed)
            } else {
                // si las 2 contraseñas no son las mismas
                res.status(403).send('Usuario y/o contraseña incorrecto')
            }
        }


    } catch (err) {
        res.status(500).send(err.message)
    }
})


app.listen(3000, () => {
    console.log('listening in port 3000')
})

