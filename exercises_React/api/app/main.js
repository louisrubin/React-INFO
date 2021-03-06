const styles = `
    body {
        background-color: #eee;
    }

    .header {
        margin-top: 1%;
    }
    .header h1{
        font-size: 2.3em;
        min-width: 85%;
        max-width: 93%;
    }
    .welcome{
        display: inline-block;
        padding-left: 2%;
        text-align: left;
        margin: 0;
    }

    .login-regist{
        text-align: center;
        margin: 25px 0px 30px 0px;
    }

    .header #h1-login {
        text-align: center;
    }
    #logout {
        float: right;
        margin-right: 2%;
    }
    .conteiner { 
        margin-left: 30%;
    }
    #add-product{
        display: inline-block;
        margin-left: 13%
    }    
    #add-product h2 {
        font-size: 2.2em;
    }

    #clothe-list {
        max-width: 550px;
        background-color: #ffcccc;
        padding: 10px 10px 20px 25px;
        margin-bottom: 20px;
    }
    #clothe-list h2 {
        text-decoration: underline;
    }
    #clothes-ul li {
        margin-bottom: 10px;
    }
    #clothes-ul li b {
        text-decoration: underline;
    }
    #add-button {
        cursor: pointer;
        margin: 15px 70px;
        padding: 5px 10px;
        background-color: #ffb266;
        border: 1px solid #000;
        border-radius: 2px; 
        user-select: none;
    }
    #add-button:hover {
        background-color: #E57200;
    }
    #delete-botton {
        background-color: #FF3333;
        margin-left: 10px;
        border: 1px solid #000;
        padding: 3px 8px;
        cursor: pointer;
        border-radius: 2px; 
        user-select: none;
    }
    #delete-botton:hover {
        background-color: #CC0000;
    }
    #btn-logout {
        margin-left: 3%;
        user-select: none;
    }
    .btn-auth {
        border-radius: 2px;
        user-select: none;
        cursor: pointer;
        margin: 15px 70px;
        padding: 5px 10px;
        background-color: #e5ccff;
        border: 1px solid #000;
    }
    #btn-reg{
        background-color: #66ffb2;
    }
    .div-error {
        margin: 20px 10px;
        width: 570px;
    }
`
const styleSheet = document.createElement('style')
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
// https://stackoverflow.com/questions/7693224/how-do-i-right-align-div-elements

// CERRAR SESION NO FUNCIONA
// https://stackoverflow.com/questions/65493867/how-to-remove-jwt-token-from-local-storage

const logout = () => {
    console.log('error cerrando sesion')
    // doesn't work xD
}
const loadInitialTemplate = () => {
    const template = `
        <div class="header">
            <h1 class="h1 welcome">Bienvenido</h1>
            <button id="btn-logout" onClick={ logout() }>Cerrar Sesi??n</button>
        </div>
        <div class="conteiner">
            <div id="add-product">
                <h2 style="text-align: center;">Agregar Ropa</h2>
                <form id="clothes-form" style="margin-left:20px;">
                    <div style="margin-bottom: 10px;">
                        <label>Nombre</label>
                        <input name="name" />
                    </div>
                    <div>
                        <label>Tipo</label>
                        <input name="type" />
                    </div>
                    
                    <button type="submit" id="add-button">Agregar</button>
                </form>
            </div>
            
            <div id="clothe-list">
                <h2>Lista de Ropas</h2>
                <ul id="clothes-ul"></ul>
            </div>
            <div id="div-update" class=""></div>
            <div id="div-error" class="div-error"></div>
        </div>
    `
    const body = document.getElementsByTagName('body')[0]  // getElementsByTagName() busca por el nombre de la etiqueta -pero devuelve un listado- por eso el [0]
    body.innerHTML = template   // innerHTML asignamos el html dentro de la etiqueta body real

}

// | GET | DELETE | UPDATE | CLOTHES
const getClothes = async () => {
    const response = await fetch('/clothes', {
        headers: {
            Authorization: localStorage.getItem('jwt')  // pasamos el JWT por cabecera del localStorage
        },
    })
    const clothes = await response.json()     // la respuesta que nos devuelve -fetch- dentro de const 'response' cuenta con un metodo json() el cual nos permite transformar esas respuestas en un -objeto- javascript
    const clothes2 = await response.json()
    const template_List = clothe => 
    `
        
        <li>
            <b>Nombre:</b> ${clothe.name} 
            <b>Tipo:</b> ${clothe.type}

            <button data-id="${clothe._id}" id="delete-botton" >Eliminar</button>
            <button upd-id="${clothe._id}" id="edit-button" >Editar</button>

        </li>
    `
    const clotheList = document.getElementById('clothes-ul')
    //              con map() iteramos, recibe un par??metro 'user' el cual ejecuta la funcion 'template()' el cual espera por par??metro un usuario, asi que le pasamos el mismo usuario
    clotheList.innerHTML = clothes.map(clothe => template_List(clothe)).join('')
    // por cada 'clothe' devuelto por el servidor, ejecuta la funcion 'template()'. Esto devuelve un arreglo [ ] donde se contiene la plantilla de ese user, por eso llamamos al m??todo join() para convertir todo eso en un 'string' separados por ning??n caracter: .join('')
    

    /*  ||||||||||||||||
            DELETE 
        ||||||||||||||||
    */
    clothes.forEach( clothe => {    // llamamos a forEach() y no a map() pq no vamos a retornar nada, solo asignamos comportamientos a cada nodo de los botones 'eliminar'
        
                    // cuando usamos un propiedad custom como en este caso 'data-id' tenemos que usar [ ]
        const deleteNode = document.querySelector(`[data-id="${clothe._id}"]`)    // buscamos el boton con la m??todo querySelector()
        // buttons

        deleteNode.onclick = async e => {
            const errorNode = document.getElementById('div-error')
            errorNode.innerHTML = ''    // mensaje vacio al div 'error'

            // en fetch llamamos a '/clothes' y le pasamos el id del usuario el cual vamos a eliminar
            await fetch(`/clothes/${clothe._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('jwt')  // pasamos el JWT por cabecera del localStorage
                },
            })
            deleteNode.parentNode.remove() // subimos un nivel en el ??rbol HTML para poder borrar el elemento <li>
            alert('Eliminado con ??xito')
        }  
    })


    /*  ||||||||||||||||
            UPDATE 
        ||||||||||||||||
    */

    clothes2.forEach( clothe => {
        
        const updateNode = document.querySelector(` [upd-id=" ${clothe._id} "] `)

        updateNode.onclick = async e => {
            e.preventDefault()

            const errorNode = document.getElementById('div-error')      // DIV ERROR
            errorNode.innerHTML = ''
            
            loadUpdateTemplate(clothe._id)
            const updateForm = document.getElementById('update-form')   // FORM
            
            const formData = new FormData(updateForm)               // FORM DATA
            const data = Object.fromEntries(formData.entries())

            const response = await fetch(`/clothes/${clothe._id}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('jwt'),
                },
            })

            const responseData = await response.text()

            if (response.status >= 300){
                errorNode.innerHTML = responseData
            }else{
                updateForm.innerHTML = ''
                alert('Actualiado Correctamente')
            }
        }

    })
}   
    
    

    /*  ||||||||||||||||
            UPDATE 
        ||||||||||||||||
    */
    /*
    clothes.forEach( clothe => {

        const updateNode = document.querySelector(` [upd-id=" ${clothe._id} "] `)

        updateNode.onclick = async e => {
            const updateForm = document.getElementById('update-form')

            updateForm.onsubmit = async (e) => {
                const errorNode = document.getElementById('div-error')
                errorNode.innerHTML = ''

                e.preventDefault()
                const formData = new FormData(updateForm)
                const data  = Object.fromEntries(formData.entries())
                
                const response = await fetch(`/clothes/${clothe._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('jwt'),
                    },
                })

                const responseData = await response.text()

                // updateForm.reset()  // no hace falta ya que este forma desaparece al actualizar


                if (response.status >= 300){
                    errorNode.innerHTML = responseData
                }else{
                    updateForm.innerHTML = ''
                    alert('Actualiado Correctamente')
                }
            }
        }
    })

    */



// CLOTHES LISTENER (authorization)
const addClothesListener = () => {
    const clotheForm = document.getElementById('clothes-form')    // buscamos nuestro formulario
    
    
    clotheForm.onsubmit = async (e) => {
        const errorNode = document.getElementById('div-error')
        errorNode.innerHTML = ''    // mensaje vacio al div 'error'

        e.preventDefault()      // preventDefault() evita que la p??gina se refresque cuando presionamos en el bot??n 'Enviar'
        const formData = new FormData(clotheForm)   // buscamos todos los datos que se encuentren en el formulario -pasandole la referencia del formulario html (la const userForm)-
        const data = Object.fromEntries(formData.entries())     // transforma un objeto a un objeto JSON pero que cumpla con la condici??n de que sea iterable DE INPUTS, cosa que el m??todo - formData.entries() - devuelve un iterador
        
        // llamamos a nuestro endPoint '/clothes' y seguido de eso le pasamos un objeto de configuracion
        const response = await fetch('/clothes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                // cabecera del mensaje enviado
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('jwt'),  // pasamos el JWT por cabecera del localStorage
            },
        }) // await es pq nos interesa que se termine de crear el usuario antes de pasar a la siguiente instruccion
        
        const responseData = await response.text()
        
        clotheForm.reset()    // una vez presionado en el boton enviar, el formulario se resetea
        getClothes()

        if (response.status >= 300) {
            errorNode.innerHTML = responseData
        }
        
    }
    

}


const checkLogin = () => 
    localStorage.getItem('jwt')  // verifica si hay un JWT en el localStorage (si no hay significa que el usuario no est?? logeado)


// HOME PAGE
const homePage = () => {
    // main function del HomePage 
    loadInitialTemplate()   // ejecuta el formulario
    addClothesListener()    // on click
    getClothes()      // una vez cargado la p??gina ejecuta getClothes() el cual imprime todos los usuarios existentes en BD
}

// UPDATE TEMPLATE
const loadUpdateTemplate = (clothe) => {
    const template = `
        <h2>Actualizar Informaci??n</h2>
        <form id="update-form">
            <div style="margin-bottom: 10px;">
                <label>Nombre</label>
                <input name="name" value="${clothe.name}" />
            </div>
            <div>
                <label>Tipo</label>
                <input name="type" value="${clothe.type}" />
            </div>            
            <button type="submit" id="update-button">Actualizar</button>

        </form>
    `

    const update = document.getElementById('div-update')
    update.innerHTML = template
}

// REGISTER TEMPLATE
const loadRegisterTemplate = () => {
    const template = `
        
        <div class="header">
            <h1 class="h1 login-regist">Register</h1>
        </div>
        <div class="conteiner">
            
            <form id="register-form" style="margin-left:20px;">
                <div style="margin-bottom: 10px;">
                    <label>Correo</label>
                    <input name="email" />
                </div>
                <div>
                    <label>Contrase??a</label>
                    <input name="password" type="password" />
                </div>
                
                <button id="btn-reg" type="submit" class="btn-auth">Registrarse</button>
            </form>

            <a href="#" id="a-login">Iniciar Sesi??n</a>
            <div id="div-error" class="div-error"></div>
        </div>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template   // inyecta el   const 'template'   en la etiqueta 'body'
}
// LOGIN TEMPLATE
const loadLoginTemplate = () => {
    const template = `
        
        <div class="header">
            <h1 class="h1 login-regist">Login</h1>
        </div>
        <div class="conteiner">
            <form id="login-form" style="margin-left:20px;">
                <div style="margin-bottom: 10px;">
                    <label>Correo</label>
                    <input name="email" />
                </div>
                <div>
                    <label>Contrase??a</label>
                    <input name="password" type="password" />
                </div>
                
                <button id="btn-login" type="submit" class="btn-auth">Iniciar Sesi??n</button>
            </form>

            <a href="#" id="a-register">Registrarse</a>
            <div id="div-error" class="div-error"></div>
        </div>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template   // inyecta el   const 'template'   en la etiqueta 'body'
}

    

// una funcion que retorna otra funcion
const authListener = action => () => {
    // aplicando toda la l??gica los formularios 'Login' y 'Register'
    const form = document.getElementById(`${action}-form`)
    form.onsubmit = async (e) => {
        const errorNode = document.getElementById('div-error')
        errorNode.innerHTML = ''    // mensaje vacio al div 'error'

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
            errorNode.innerHTML = responseData  // si el servidor retorn?? un error lo inyectamos en el    <div id="div-error"> 
        }
        else if (responseData === 'Correo ya registrado') {
            errorNode.innerHTML = responseData

        }else{
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
        homePage()  // function p??gina de inicio
    }
    else {
        loginPage()     // function p??gina Login
    }
}