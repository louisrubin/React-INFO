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
            <b>id:</b> ${user._id}  |  ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
        </li>
    `
    const userList = document.getElementById('user-list')
    //              con map() iteramos, recibe un parámetro 'user' el cual ejecuta la funcion 'template()' el cual espera por parámetro un usuario, asi que le pasamos el mismo usuario
    userList.innerHTML = users.map(user => template(user)).join('')
    // por cada 'user' devuelto por el servidor, ejecuta la funcion 'template()'. Esto devuelve un arreglo [ ] donde se contiene la plantilla de ese user, por eso llamamos al método join() para convertir todo eso en un 'string' separados por ningún caracter: .join('')
    users.forEach( user => {    // llamamos a forEach() y no a map() pq no vamos a retornar nada, solo asignamos comportamientos a cada nodo de los botones 'eliminar'
        
                    // cuando usamos un propiedad custom como en este caso 'data-id' tenemos que usar [ ]
        const userNode = document.querySelector(`[data-id="${user._id}"]`)    // buscamos el boton con la método querySelector()
        
        userNode.onclick = async e => {
            // en fetch llamamos a '/users' y le pasamos el id del usuario el cual vamos a eliminar
            await fetch(`/users/${user._id}`, {
                method: 'DELETE',
                // no le pasamos un header pq en nuestro back-end no estamos usando la propiedad de -body- del request
            })
            userNode.parentNode.remove() // subimos un nivel en el árbol html para poder borrar el elemento <li>
            alert('Eliminado con éxito')
        }
    
    })     


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


const checkLogin = () => 
    localStorage.getItem('jwt')  // verifica si hay un JWT en el localStorage (si no hay significa que el usuario no está logeado)


const homePage = () => {
    // main function del HomePage 
    loadInitialTemplate()
    addFormListener()   // ejecuta el formulario
    getUsers()      // una vez cargado la página ejecuta getUsers() el cual imprime todos los usuarios existentes en BD
}

const loadRegisterTemplate = () => {
    // template Register
    const template = `

        <h1>Register</h1>
        <form id="register-form">
            <div>
                <label>Correo</label>
                <input name="email" />
            </div>
            <div>
                <label>Contraseña</label>
                <input name="password" />
            </div>
            
            <button type="submit">Enviar</button>
        </form>

        <a href="#" id="a-login">Iniciar Sesión</a>
        <div id="div-error"></div>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template   // inyecta el   const 'template'   en la etiqueta 'body'
}

const addRegisterListener = () => {
    // aplicando toda la lógica al formulario Register

}
const gotoLoginListener = () => {

}

const registerPage = () => {
    // function Register
    console.log('pagina de registro')
    loadRegisterTemplate()
    addRegisterListener()   // ejecuta el formulario
    gotoLoginListener()
}

const loginPage = () => {
    // function Login
    loadLoginTemplate()
    addLoginListener()
    gotoRegisterListener()
}

const loadLoginTemplate = () => {
    // template Login
    const template = `

        <h1>Login</h1>
        <form id="login-form">
            <div>
                <label>Correo</label>
                <input name="email" />
            </div>
            <div>
                <label>Contraseña</label>
                <input name="password" />
            </div>
            
            <button type="submit">Enviar</button>
        </form>

        <a href="#" id="a-register">Registrarse</a>
        <div id="div-error"></div>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template   // inyecta el   const 'template'   en la etiqueta 'body'
}

const gotoRegisterListener = () => {
    // function aplicado al link 'Registrarse' debajo del form Login
    const gotoRegister = document.getElementById('a-register')
    gotoRegister.onclick = (e) => {
        e.preventDefault()
        registerPage()
    }
}


const addLoginListener = () => {
    // aplicando toda la lógica al formulario Login

    const loginForm = document.getElementById('login-form')
    loginForm.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(loginForm)    // obtenemos los datos ingresados en el formulario
        const data = Object.fromEntries(formData.entries())     // transformamos los datos anteriores en un objeto JS
    
        const response = await fetch('/login', {
            // enviamos los datos anteriores al end-point '/login'
            method: 'POST',
            body: JSON.stringify(data),  // transformamos los datos a String para que el servidor pueda interpretarlos
            headers: {
                'Content-Type': 'application/json',     // esto es para que el servidor -express- pueda interpretar los datos enviados y los transforme a un objeto JS en el lado del servidor
            }
        })

        const responseData = await response.text()  // capturamos la respuesta emitido por el servidor -> Secc-25: 154 - 2:18 min
        
        if(response.status >= 300){
            // status devuelto por el    fetch('/login')
            const errorNode = document.getElementById('div-error')
            errorNode.innerHTML = responseData  // si el servidor retornó un error lo inyectamos en el    <div id="div-error"> 
        }
        else {
            // si no hubo errores
            console.log(responseData)
        }
    }
}

window.onload = () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn){
        homePage()  // function página de inicio
    }
    else {
        loginPage()     // function página Login
    }
}