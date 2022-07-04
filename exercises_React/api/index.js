const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://louis-rbn:admin123@cluster0.oyqdl0d.mongodb.net/miapp?retryWrites=true&w=majority')

const User = mongoose.model( 'User', {
    // forma que tendrán nuestros objetos dentro del modelo llamado 'User'
    username: String,
    edad: Number,

})

const crear = async () => {
    const user = new User ({ username: 'chanchito triste', edad: 25 })
    const savedUser = await user.save()     // save() retorna una promesa, por eso 'await' que queda a la espera de la respuesta
    console.log(savedUser)
}

//crear()     // ejecutamos la funcion

const buscarTodo = async () => {
    const users = await User.find()     // retorna un arreglo [ ] de todos los usuarios
    console.log(users)
}

// buscarTodo()

const buscar = async () => {
    const user = await User.find( { username: 'chanchito feliz' } )     // retorna un arreglo [ ] buscando TODOS los elementos que cumplan esa condicion 'username'
    console.log(user)
}

// buscar()

const buscarUno = async () => {
    const user = await User.findOne({ username: 'chanchito feliz' })    // findOne() retorna un objeto { } con un único elemento 
    console.log(user)
}

// buscarUno()

const actualizar = async ()  => {
    const user = await User.findOne({ username: 'chanchito feliz' })
    console.log(user)
    user.edad = 30
    await user.save()
}

// actualizar()

const elminar = async () => {
    const user = await User.findOne({ username: 'chanchito triste'})
    console.log(user)
    if (user){
        await user.remove()
    }
}
// elminar()
