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
    body.innerHTML = template   // innnerHTML asignamos el html dentro de la etiqueta body real

}

const addFormListener = () => {
    const userForm = document.getElementById('user-form')    // buscamos nuestro formulario
    userForm.onsubmit = async (e) => {
        e.preventDefault()      // preventDefault() evita que la página se refresque cuando presionamos en el botón 'Enviar'
        const formData = new FormData(userForm)   // buscamos todos los datos que se encuentren en el formulario -pasandole la referencia del formulario html (la const userForm)-
        const data = Object.fromEntries(formData.entries())     // transforma un objeto a un objeto JSON pero que cumpla con la condición de que sea iterable, cosa que el método - formData.entries() - devuelve un iterador
        console.log(data)

    }

}

window.onload = () => {
    // window es un objeto global que hace referencia a nuestra ventana del explorador
    // onload() es la función que se va a ejecutar una vez que se cargue TODO el contenido en la ventana
    loadInitialTemplate()
    addFormListener()

}