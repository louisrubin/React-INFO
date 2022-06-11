import { Component, useSyncExternalStore } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import './components/Estilos.css';
import HomePage from "./pages/HomePage";
import Expenses from './routes/expenses';
import Invoices from './routes/invoices';

class Entrada extends Component {
	render() {
		return(
			<input valor={this.props.valor} onChange={this.props.onChange} />
		)
	}
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
				<HomePage />
		);
	}
}

export default App;


/* <div>
	<p>Nombre Completo: {`${this.state.name} ${this.state.surname}`}</p>
	<Entrada valor={this.state.name} onChange={e => this.updateValues('name', e.target.value) }/>
	<Entrada valor={this.state.surname} onChange={e => this.updateValues('surname', e.target.value) }/>
</div>
<HomePage/> */