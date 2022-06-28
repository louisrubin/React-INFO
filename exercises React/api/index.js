const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://louis-rbn:admin123@cluster0.oyqdl0d.mongodb.net/miapp?retryWrites=true&w=majority')

const User = mongoose.model(   'User', {
    // forma que tendrán nuestros objetos dentro del modelo llamado 'User'
    username: String,
    edad: Number,

})

const crear = async () => {
    const user = new User ({ username: 'chanchito feliz', edad: 15 })
    const savedUser = await user.save()     // save() retorna una promesa, por eso 'await' que queda a la espera de la respuesta
    console.log(savedUser)
}

crear()     // ejecutamos la funcion

