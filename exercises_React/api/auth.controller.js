const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')   // version: 5.3.3. late versions send error
const User = require('./User.model')

const validateJwt = expressJwt(
    // middleware de validación del JSON Web Token
    { secret:   process.env.SECRET_JWT,   algorithms: ['HS256']     // process.env.SECRET_JWT es una variable local en mi PC que contiene el -string secreto-
})

const signToken = _id => {
    // encriptamos el ID a un JSON Web Token
    return jwt.sign({ _id },  process.env.SECRET_JWT)      // (el id que vamos a encriptar   ,   de que forma vamos a encriptar el JWT)
}

const findAndAssignUser = async (req, res, next)  => {    
    try{
        const user = await User.findById(req.user._id)  // findById() vendría siendo un alias de findOne( _id : id)
        if(!user){
            return res.status(401).end()    // esta linea solo se ejecuta si el usuario no existe  o  si generamos el JWT con un ID inválido
        }
        req.user = user     // le asignamos a la propiedad 'user' en el objeto 'request'
        next()  // llamamos al middleware que está más abajo

    } catch(e) {
        next(e)     // en el caso de llamar a next() con un error, no se va a ejecutar el siguiente middleware, sino que se ejecutará un middleware especial para el manejo de errores
    }
}

// esta funcion es para proteger los end-points (rutas)
const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser)    // use() nos permite componer los middlewares en 1 solo para simplificar

const Auth = {

    login: async (req, res) => {
        const { body } = req
        try {
            const user = await User.findOne({ email: body.email})
            if(!user){
                res.status(401).send('Usuario y/o contraseño incorrecta')
            } 
            else{
                const isMatch = await bcrypt.compare(body.password, user.password)  // compara las contraseñas

                if(isMatch){
                    const signed = signToken(user._id)
                    res.status(200).send(signed)    // devuelve el token firmado
                }
                else {
                    // si las contraseñas no coinciden
                    res.status(401).send('Usuario y/o contraseño incorrecta')
                }
            }
        } catch(e) {
            res.send(e.message)
        }
    },

    register: async (req, res) => {
        const { body} = req
        try {
            const isUser = await User.findOne({ email: body.email})
            if(isUser){
                res.send('Usuario ya existente')
            }
            else {
                const salt = await bcrypt.genSalt()   // genera el salt
                const hashed = await bcrypt.hash( body.password, salt)
                const user = await User.create({ email: body.email, password: hashed, salt})

                const signed = signToken(user._id)  // firmamos el token
                res.send(signed)
            }
        } catch(err) {
            res.status(500).send(err.message)
        }
    },
}


module.exports = { Auth, isAuthenticated }