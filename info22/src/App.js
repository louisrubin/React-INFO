import logo from './logo.svg';
import './App.css';
import MiComponente from './components/Noticia';

// COMPONENTE PRINCIPAL DE NUESTRA APP
import React, { Component } from 'react';
class App extends Component{
    // Ejemplo 'Hola Mundo' visto en el apunte "Primeros Pasos en React" del Aula virtual
    render(){
        return (
            <div>
                <h1>Hola Mundo!</h1>
                <p>Bienvenidos a los primeros pasos con React</p>
                <MiComponente> </MiComponente>
            </div>
        );
    }
}

export default App;




/*  DOCUMENTACION:

        - Desarrollo Declarativo Vs Imperativo:
            .React trabaja con un estilo de programación Declarativa; en el que nosotros contamos con un estado de la aplicación y sus componentes reaccionan ante el cambio de ese estado.
                Esto es así ya que los componentes vienen con una funcionalidad dada y cuando cambia una de sus propiedades ellos producen un cambio.
            .Sin embargo otras librerías como JQuery o Vanilla Javascript, trabajan con un estilo Imperativo; el cual nos obligan a escribir mucho código,
                ya que hay que informar paso por paso que acciones o cambios en el DOM se deben realizar con cada pequeño evento que llega.

        - Performance gracias al DROM Virtual:
            .El desempeño de React es muy alto, a la hora del renderizado de la aplicación. Esto se consigue por medio del DOM Virtual. 
                No es que React no trabaje con el DOM real del navegador, pero sus operaciones las realiza antes sobre el DOM Virtual, que es mucho más rápido.
            .El DOM Virtual está cargado en memoria y gracias a la herramienta de diferenciación entre él y el real, el DOM del navegador se actualiza. 
            .El resultado es que estas operaciones permiten actualizaciones de hasta 60 frames por segundo, lo que producen aplicaciones muy fluidas, con movimientos suavizados.
        
        - Isomorfismo:
            .Es la capacidad de ejecutar el código tanto en el cliente como el servidor. Sirve principalmente para solucionar problemas de posicionamiento tradicionales de las aplicaciones Javascript.

        - Elementos y JSX:
            .ReactJS no retorna HTML. El código dentro de Javascript parece HTML pero realmente es JSX. 
                Son como funciones Javascript, pero expresadas mediante una sintaxis propia de React llamada JSX.
            .Lo que produce son elementos en memoria y no elementos del DOM tradicional, 
                con lo cual las funciones no ocupan tiempo en producir pesados objetos del navegador sino simplemente elementos de un DOM virtual.

*/


/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

*/ 