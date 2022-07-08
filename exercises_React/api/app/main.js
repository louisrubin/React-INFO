const loadInitialTemplate = () => {
    const template = `

        <h1>Bienvenido</h1>
        <h3>Agregar Ropa</h3>
        <form id="clothes-form" style="margin-left:20px;">
            <div style="margin-bottom: 10px;">
                <label>Nombre</label>
                <input name="name" />
            </div>
            <div>
                <label>Tipo</label>
                <input name="type" />
            </div>
            
            <button type="submit" 
                style="margin: 15px 70px;
                padding: 5px 10px;
                background-color: #ffb266;
                border: 1px solid #000";
                cursor: pointer;"
                >Agregar</button>
        </form>

        <h3>Lista de Ropas</h3>
        <ul id="clothes-list"></ul>
    `
    const body = document.getElementsByTagName('body')[0]  // getElementsByTagName() busca por el nombre de la etiqueta -pero devuelve un listado- por eso el [0]
    body.innerHTML = template   // innerHTML asignamos el html dentro de la etiqueta body real

}

// GET CLOTHES
const getClothes = async () => {
    const response = await fetch('/clothes', {
        headers: {
            Authorization: localStorage.getItem('jwt')  // pasamos el JWT por cabecera del localStorage
        },
    })
    const clothes = await response.json()     // la respuesta que nos devuelve -fetch- dentro de const 'response' cuenta con un metodo json() el cual nos permite transformar esas respuestas en un -objeto- javascript
    const template_List = clothe => `
        
        <li style="margin-bottom: 10px;">
            <b>Nombre: </b>${clothe.name} 
            <b>Tipo: </b>${clothe.type}

            <button data-id="${clothe._id}" 
            style="background-color: #FF3333;
            margin-left: 10px;
            border: 1px solid #000;
            padding: 3px 8px;
            cursor: pointer;
            ">Eliminar</button>

        </li>
    `
    const clotheList = document.getElementById('clothes-list')
    //              con map() iteramos, recibe un parámetro 'user' el cual ejecuta la funcion 'template()' el cual espera por parámetro un usuario, asi que le pasamos el mismo usuario
    clotheList.innerHTML = clothes.map(clothe => template_List(clothe)).join('')
    // por cada 'clothe' devuelto por el servidor, ejecuta la funcion 'template()'. Esto devuelve un arreglo [ ] donde se contiene la plantilla de ese user, por eso llamamos al método join() para convertir todo eso en un 'string' separados por ningún caracter: .join('')
    clothes.forEach( clothe => {    // llamamos a forEach() y no a map() pq no vamos a retornar nada, solo asignamos comportamientos a cada nodo de los botones 'eliminar'
        
                    // cuando usamos un propiedad custom como en este caso 'data-id' tenemos que usar [ ]
        const clotheNode = document.querySelector(`[data-id="${clothe._id}"]`)    // buscamos el boton con la método querySelector()
        
        clotheNode.onclick = async e => {
            // en fetch llamamos a '/clothes' y le pasamos el id del usuario el cual vamos a eliminar
            await fetch(`/clothes/${clothe._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('jwt')  // pasamos el JWT por cabecera del localStorage
                },
            })
            clotheNode.parentNode.remove() // subimos un nivel en el árbol HTML para poder borrar el elemento <li>
            alert('Eliminado con éxito')
        }
    
    })     


}

// CLOTHES LISTENER (authorization)
const addClothesListener = () => {
    const clotheForm = document.getElementById('clothes-form')    // buscamos nuestro formulario
    clotheForm.onsubmit = async (e) => {
        e.preventDefault()      // preventDefault() evita que la página se refresque cuando presionamos en el botón 'Enviar'
        const formData = new FormData(clotheForm)   // buscamos todos los datos que se encuentren en el formulario -pasandole la referencia del formulario html (la const userForm)-
        const data = Object.fromEntries(formData.entries())     // transforma un objeto a un objeto JSON pero que cumpla con la condición de que sea iterable DE INPUTS, cosa que el método - formData.entries() - devuelve un iterador
        
        // llamamos a nuestro endPoint '/clothes' y seguido de eso le pasamos un objeto de configuracion
        await fetch('/clothes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                // cabecera del mensaje enviado
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('jwt')  // pasamos el JWT por cabecera del localStorage
            },
        }) // await es pq nos interesa que se termine de crear el usuario antes de pasar a la siguiente instruccion
        clotheForm.reset()    // una vez presionado en el boton enviar, el formulario se resetea
        getClothes()

    }

}


const checkLogin = () => 
    localStorage.getItem('jwt')  // verifica si hay un JWT en el localStorage (si no hay significa que el usuario no está logeado)


// HOME PAGE
const homePage = () => {
    // main function del HomePage 
    loadInitialTemplate()
    addClothesListener()   // ejecuta el formulario
    getClothes()      // una vez cargado la página ejecuta getClothes() el cual imprime todos los usuarios existentes en BD
}

// REGISTER TEMPLATE
const loadRegisterTemplate = () => {
    const template = `

        <h1>Register</h1>
        <form id="register-form" style="margin-left:20px;">
            <div style="margin-bottom: 10px;">
                <label>Correo</label>
                <input name="email" />
            </div>
            <div>
                <label>Contraseña</label>
                <input name="password" />
            </div>
            
            <button type="submit" 
                style="margin: 15px 70px;
                padding: 5px 10px;
                background-color: #66ffb2;
                border: 1px solid #000";
                cursor: pointer;"
            >Registrarse</button>
        </form>

        <a href="#" id="a-login">Iniciar Sesión</a>
        <div id="div-error"></div>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template   // inyecta el   const 'template'   en la etiqueta 'body'
}
// LOGIN TEMPLATE
const loadLoginTemplate = () => {
    const template = `

        <h1>Login</h1>
        <form id="login-form" style="margin-left:20px;">
            <div style="margin-bottom: 10px;">
                <label>Correo</label>
                <input name="email" />
            </div>
            <div>
                <label>Contraseña</label>
                <input name="password" type="password" />
            </div>
            
            <button type="submit" 
                style="margin: 15px 70px;
                padding: 5px 10px;
                background-color: #e5ccff;
                border: 1px solid #000";
                cursor: pointer;"
            >Iniciar Sesión</button>
        </form>

        <a href="#" id="a-register">Registrarse</a>
        <div id="div-error"></div>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template   // inyecta el   const 'template'   en la etiqueta 'body'
}

// una funcion que retorna otra funcion
const authListener = action => () => {
    // aplicando toda la lógica los formularios 'Login' y 'Register'
    const form = document.getElementById(`${action}-form`)
    form.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(form)    // obtenemos los datos ingresados en el formulario
        const data = Object.fromEntries(formData.entries())     // transformamos los datos anteriores en un objeto JS
    
        const response = await fetch(`/${action}`, {
            // enviamos los datos anteriores al end-point '/register'
            method: 'POST',
            body: JSON.stringify(data),  // transformamos los datos a String para que el servidor pueda interpretarlos
            headers: {
                'Content-Type': 'application/json',     // esto es para que el servidor -express- pueda interpretar los datos enviados y los transforme a un objeto JS en el lado del servidor
            }
        })

        const responseData = await response.text()  // capturamos la respuesta emitido por el servidor -> Secc-25: 154 - 2:18 min
        
        if(response.status >= 300){
            // status devuelto por el    fetch
            const errorNode = document.getElementById('div-error')
            errorNode.innerHTML = responseData  // si el servidor retornó un error lo inyectamos en el    <div id="div-error"> 
        }
        else {
            // si no hubo errores
            localStorage.setItem('jwt', `Bearer ${responseData}`)
            homePage()
        }
    }
}
// REGISTER LISTENER
const addRegisterListener = authListener('register')
// LOGIN LISTENER
const addLoginListener = authListener('login')


// una funcion que retorna otra funcion
const gotoListener = action => () => {
    const goTo = document.getElementById(`a-${action}`)
    goTo.onclick = (e) => {
        e.preventDefault()

        if (action === 'login'){
            loginPage()
        }else {
            registerPage()
        }
    }
}

const gotoLoginListener = gotoListener('login')
const gotoRegisterListener = gotoListener('register')


// REGISTER PAGE
const registerPage = () => {
    // function Register
    console.log('pagina de registro')
    loadRegisterTemplate()
    addRegisterListener()   // ejecuta el formulario
    gotoLoginListener()
}

// LOGIN PAGE
const loginPage = () => {
    // function Login
    loadLoginTemplate()
    addLoginListener()
    gotoRegisterListener()
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