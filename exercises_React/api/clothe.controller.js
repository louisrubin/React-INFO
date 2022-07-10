const Clothes = require('./clothes.model')

const Clothe = {
    //    async   
    list: async (req, res) => {
        const clothes = await Clothes.find()    // find() busca todos los elementos en la BD
        res.status(200).send(clothes)
    },

    get: async (req, res) => {
        const { id } = req.params     // extraemos el 'id' de los parámetros del request
        const clothe = await Clothes.findOne({_id: id})     // llamamos la funcion findOne() buscando un elemento con ese mis Id extraido
        res.status(200).send(clothe)
    }, 

    create: async (req, res) => {
        const { body } = req            // los datos de las peticiones POST vienen en 'body'
        try{
            const clothe = new Clothes(body)    // creamos un nueva instancia del modelo 'Clothes' con los datos que vienen en el 'body'
            const saveClothe = await clothe.save()      // ejecutamos save() que crea el user en la BD
            res.status(201).send(saveClothe._id)      // 201 Created
        }catch (err){
            res.status(400).send(err.message)   // 400 Bad Request
        }
        
    },

    update: async (req, res) => {
        const { id } = req.params   // id del usuario que estamos buscando
        const clothe = await Clothes.findOne({_id: id})
                //   (clothe que vamos a modificar  ,  los nuevos datos )
        Object.assign(     clothe                   ,   req.body)
        await clothe.save()
        res.sendStatus(204)
    },

    destroy: async (req, res) => {
        const { id } = req.params
        const clothe = await Clothes.findOne({ _id: id })

        if (clothe){
            clothe.remove()
        }
        res.sendStatus(204)
    }
}

module.exports = Clothe