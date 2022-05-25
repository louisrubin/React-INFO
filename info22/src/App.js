<<<<<<< HEAD
import { Component, useSyncExternalStore } from "react";
import Counter from "./components/NewComponent";
import './components/Estilos.css';

class Entrada extends Component {
	render() {
		return(
			<input valor={this.props.valor} onChange={this.props.onChange} />
		)
	}
=======
import logo from './logo.svg';
import './App.css';
import MiComponente from './components/Noticia';
import Counter from './components/NewComponent';

// COMPONENTE PRINCIPAL DE NUESTRA APP
import React, { Component } from 'react';


const valor = 'Mundo!';
class App extends Component{
    render(){
        return (
            <div style={ { ...estilo1({ bg: '#333', txt: 'right'}), ...estilo2 } }>
                <h1>¡Hola {valor}</h1>
                <p>Bienvenidos a los primeros pasos con React</p>
                <MiComponente style={ { ...estilo1({ bg: '#333', txt: 'center'}) } }> </MiComponente>
                <Counter></Counter>
            </div>
        );
    }
>>>>>>> bdac7778fa875dbd5c8d391963d8f4c8d25c548c
}
 
class App extends Component {
	state = {
		name : '',
		surname: '',
	}

	updateValues = (prop, value) => {
		// propiedades dinámicas [] 
		this.setState({ [prop]: value });
	}

	render(){
		return (
			<div>
				<p>Nombre Completo: {`${this.state.name} ${this.state.surname}`}</p>
				<Entrada valor={this.state.name} onChange={e => this.updateValues('name', e.target.value) }/>
				<Entrada valor={this.state.surname} onChange={e => this.updateValues('surname', e.target.value) }/>
			</div>
		)
	}
}

export default App;