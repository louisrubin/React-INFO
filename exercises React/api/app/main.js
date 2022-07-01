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
    addFormListener()

}