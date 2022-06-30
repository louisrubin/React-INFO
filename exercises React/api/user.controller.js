const Users = require('./User')

const User = {
    //    async   
    list: async (req, res) => {
        const users = await Users.find()    // find() busca todos los elementos en la BD
        res.status(200).send(users)
    },
    get: async (req, res) => {
        const { id } = req.params     // extraemos el 'id' de los parámetros del request
        const user = await Users.findOne({_id: id})     // llamamos la funcion findOne() buscando un elemento con ese mis Id extraido
        res.status(200).send(user)
    }, 
    create: async (req, res) => {
                                           // los datos de las peticiones POST vienen en 'body'
        const user = new Users(req.body)    // creamos un nueva instancia del modelo 'Users' con los datos que vienen en el 'body'
        const saveUser = await user.save()      // ejecutamos save() que crea el user en la BD
        res.status(201).send(saveUser._id)      // retornamos el estado 201 y el ID del nuevo usuario creado
    },
    update: async (req, res) => {
        const { id } = req.params   // id del usuario que estamos buscando
        const user = await Users.findOne({_id: id})
                //   (user que vamos a modificar  ,  los nuevos datos )
        Object.assign(     user                   ,   req.body)
        await user.save()
        res.sendStatus(204)
    },
    destroy: async (req, res) => {
        const { id } = req.params
        const user = await Users.findOne({ _id: id })

        if (user){
            user.remove()
        }
        res.sendStatus(204)
    }
}

module.exports = User