import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ESTANDARIZANDO: 'Lii' es una función que obtiene las propiedades de la etiqueta y retorna contenido JSX 
// OBJECT DISTRACTORING: { children } es todo el contenido dentro de etiquetas, ej:	||	 <li> bla bla </li>   ==>	children: 'bla bla'
// const Lii = ({ children, estado, casa, edad }) => {
// 	// cada etiqueta puede tener sus propias propiedades, entonces podemos aplicar lógica:
// 	if(edad >= 18 || casa){
// 		return(
// 			<li>{children} estoy {estado} </li>		// retornando contenido JSX    <li> ... </li>
// 		);
// 	}
// }


// // acá creo mi función simulando un componente React, que luego lo renderizo en 'root.render()'
// const Xx = () => 
// 	<ul>
// 		<Lii estado={'feliz'} casa={false} edad={18}>
// 			CHANCHO
// 			</Lii>

// 		<Lii estado={'enojado'} casa={false} edad={13}>
// 			CHANCHITO
// 			</Lii>

// 		<Lii estado={'comiendo'} casa={true} edad={24}>
// 			FELIPE
// 			</Lii>
// 	</ul>

//const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render( <Xx></Xx> );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

