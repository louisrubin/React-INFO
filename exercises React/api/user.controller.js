const Users = require('./User')

const User = {
    get: async (req, res) => {
        res.status(200).send('Este es un chanchito')
    },    
    list: async (req, res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    create: async (req, res) => {
        console.log(req.body)   // los datos de las peticiones POST vienen en 'body'
        res.status(201).send('Creando un Chanchito')
    },
    update: async (req, res) => {
        res.status(204).send('Actualizando Chanchito')
    },
    destroy: async (req, res) => {
        res.status(204).send('Eliminando un chanchito :(')
    }
}

module.exports = User