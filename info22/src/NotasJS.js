import { Component } from "react";
import Counter from "./components/NewComponent";
import './components/Estilos.css';


class Wea extends Component{
	state = {
		info : 'feliz',
	}

	constructor(props){
		// se utiliza para setear propiedades del estado por defecto 
		super(props)
		console.log('constructor ', props);
	}

	componentDidMount() {
		// este metodo se ejecuta al final, luego de render()
		// se utiliza para actualizar un estado LUEGO de haber realizado el render()
		console.log('component Did Mount')
	}

	componentDidUpdate(prevProps, prevState){
		// este metodo no se ejecuta la primera vez (el motado), sino cuando se actualiza el component
		console.log('Component Did Update' , prevProps, prevState)
		// recibe 2 argumentos, props anterior, y state anterior
	}

	componentWillUnmount(){
		console.log('desmontando component', this.props, this.state);
	}

	render() {
		console.log('Metodo render de Wea')
		return(
			<div>
				<p className={this.state.info}>Chanchito {this.state.info}</p> 
				
				<button onClick={() => this.setState({info: 'feliz'})}>Feliz</button>
				<button onClick={() => this.setState({info: 'triste'})}>Triste</button>
			</div>
		)
	}
}

// Componente basado en Clases
class App extends Component {
	// el estado de un componente siempre deber ser llamado 'state'
	state = {
		valor : 2,
	}

	// 'setState()' proviene de 'Component' from 'react'
	render() {
		console.log('App Console.Log');
		return(
			<div>
				{ this.state.valor === 2
				? <h1 className={this.state.valor}>¡Hola Mundo!</h1> 
				: null }
				<button onClick={() => this.setState({valor: 5})}>Clic</button>
				<Wea chanchito="feliz"/>
				<Counter></Counter>
			</div>
		)
	}
}


export default App;

// // ESTILOS INLINE

// // funcion 
// const estilo1 = ( {bg = '#222', txt= 'center'} ) => ({
// 	backgroundColor: bg,
// 	color: '#fff',
// 	padding: '10px 15px',
// 	margin: '10px 15px',
// 	textAlign: txt,
// });

// // object
// const estilo2 = {
// 	boxShadow: '0 5px 3px rgba(0,0,0, 0.5)'
// }



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
 