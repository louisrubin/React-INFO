const loadInitialTemplate = () => {
    const template = `

        <h1>Usuarios</h1>
        <form id="user-form">
            <div>
                <label>Nombre</label>
                <input name="name" />
            </div>
            <div>
                <label>Apellido</label>
                <input name="lastname" />
            </div>
            
            <button type="submit">Enviar</button>
        </form>

        <ul id="user-list"></ul>
    `
    const body = document.getElementsByTagName('body')[0]  // getElementsByTagName() busca por el nombre de la etiqueta -pero devuelve un listado- por eso el [0]
    body.innerHTML = template   // innerHTML asignamos el html dentro de la etiqueta body real

}

const getUsers = async () => {
    const response = await fetch('/users')
    const users = await response.json()     // la respuesta que nos devuelve -fetch- dentro de const 'response' cuenta con un metodo json() el cual nos permite transformar esas respuestas en un -objeto- javascript
    const template = user => `
        <li>
            ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
        </li>
    `
    const userList = document.getElementById('user-list')
    //              con map() iteramos, recibe un parámetro 'user' el cual ejecuta la funcion 'template()' el cual espera por parámetro un usuario, asi que le pasamos el mismo usuario
    userList.innerHTML = users.map(user => template(user)).join('')
    // por cada 'user' devuelto por el servidor, ejecuta la funcion 'template()'. Esto devuelve un arreglo [ ] donde se contiene la plantilla de ese user, por eso llamamos al método join() para convertir todo eso en un 'string' separados por ningún caracter: .join('')

}

const addFormListener = () => {
    const userForm = document.getElementById('user-form')    // buscamos nuestro formulario
    userForm.onsubmit = async (e) => {
        e.preventDefault()      // preventDefault() evita que la página se refresque cuando presionamos en el botón 'Enviar'
        const formData = new FormData(userForm)   // buscamos todos los datos que se encuentren en el formulario -pasandole la referencia del formulario html (la const userForm)-
        const data = Object.fromEntries(formData.entries())     // transforma un objeto a un objeto JSON pero que cumpla con la condición de que sea iterable DE INPUTS, cosa que el método - formData.entries() - devuelve un iterador
        
        // llamamos a nuestro endPoint '/users' y seguido de eso le pasamos un objeto de configuracion
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                // cabecera del mensaje enviado
                'Content-Type': 'application/json'
            }
        }) // await es pq nos interesa que se termine de crear el usuario antes de pasar a la siguiente instruccion
        userForm.reset()    // una vez presionado en el boton enviar, el formulario se resetea
        getUsers()

    }

}

window.onload = () => {
    // window es un objeto global que hace referencia a nuestra ventana del explorador
    // onload() es la función que se va a ejecutar una vez que se cargue TODO el contenido en la ventana
    loadInitialTemplate()
    addFormListener()   // ejecuta el formulario
    getUsers()      // una vez cargado la página ejecuta getUsers() el cual imprime todos los usuarios existentes

}